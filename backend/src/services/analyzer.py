from typing import List, Dict
from ..models.architecture import Node, Edge, Risk, RiskSeverity, RiskCategory, NodeType

class ArchitectureAnalyzer:
    async def analyze_risks(self, nodes: List[Node], edges: List[Edge]) -> List[Risk]:
        """
        Performs high-fidelity topological risk analysis.
        """
        risks = []
        
        # 1. Detect SPOFs
        risks.extend(self._detect_spof(nodes))
        
        # 2. Detect Bottlenecks & Scalability Limits
        risks.extend(self._detect_bottlenecks(nodes, edges))
        
        # 3. Security Analysis
        risks.extend(self._detect_security_weaknesses(nodes, edges))
        
        # 4. Cascading Failure Risks
        risks.extend(self._detect_cascading_risks(nodes, edges))
        
        return risks

    def _detect_spof(self, nodes: List[Node]) -> List[Risk]:
        risks = []
        # Critical types that MUST have redundancy
        critical_types = [NodeType.DATABASE, NodeType.GATEWAY, NodeType.QUEUE, NodeType.CACHE]
        
        type_counts = {}
        for node in nodes:
            type_counts[node.type] = type_counts.get(node.type, 0) + 1
            
        for ntype, count in type_counts.items():
            if count == 1 and ntype in critical_types:
                risks.append(Risk(
                    id=f"spof-{ntype.value}",
                    severity=RiskSeverity.CRITICAL if ntype == NodeType.DATABASE else RiskSeverity.HIGH,
                    category=RiskCategory.RELIABILITY,
                    description=f"Single Point of Failure: The system depends on a single {ntype.value.upper()} instance.",
                    mitigation=f"Deploy a redundant cluster or multi-AZ replica for {ntype.value} to eliminate this SPOF."
                ))
        return risks

    def _detect_bottlenecks(self, nodes: List[Node], edges: List[Edge]) -> List[Risk]:
        risks = []
        # Check for high fan-in (many things pointing to one thing)
        fan_in = {}
        for edge in edges:
            fan_in[edge.target] = fan_in.get(edge.target, 0) + 1
            
        for node_id, count in fan_in.items():
            node = next((n for n in nodes if n.id == node_id), None)
            if not node: continue

            if count >= 3:
                if node.type == NodeType.DATABASE:
                    # Check if there's a cache connected to this node
                    has_cache = any(e.source == node_id for e in edges if next((n.type for n in nodes if n.id == e.target), None) == NodeType.CACHE)
                    if not has_cache:
                        risks.append(Risk(
                            id=f"bottleneck-{node_id}",
                            severity=RiskSeverity.HIGH,
                            category=RiskCategory.BOTTLENECK,
                            description=f"Resource Saturation Risk: {node.label} handles traffic from {count} services without a caching layer.",
                            mitigation="Implement a distributed cache (Redis) or a message queue to buffer incoming requests."
                        ))
            
            # Scalability: Synchronous chains
            if node.type == NodeType.BACKEND and count >= 3:
                # If a backend has many incoming sync calls, it's a scalability bottleneck
                risks.append(Risk(
                    id=f"scale-{node_id}",
                    severity=RiskSeverity.MEDIUM,
                    category=RiskCategory.SCALABILITY,
                    description=f"Synchronous Concurrency Limit: {node.label} is a nexus for multiple service calls.",
                    mitigation="Introduce asynchronous communication via a Message Queue to decouple these dependencies."
                ))
        return risks

    def _detect_security_weaknesses(self, nodes: List[Node], edges: List[Edge]) -> List[Risk]:
        risks = []
        # Database connected directly to a Gateway/Frontend (Direct Exposure)
        for edge in edges:
            source = next((n for n in nodes if n.id == edge.source), None)
            target = next((n for n in nodes if n.id == edge.target), None)
            
            if source and target:
                if source.type in [NodeType.GATEWAY, NodeType.FRONTEND] and target.type == NodeType.DATABASE:
                    risks.append(Risk(
                        id=f"sec-{target.id}",
                        severity=RiskSeverity.CRITICAL,
                        category=RiskCategory.SECURITY,
                        description=f"Insecure Data Access: {target.label} is directly connected to a public edge component.",
                        mitigation="Introduce a private backend service layer to encapsulate database logic and enforce IAM/Auth."
                    ))
        return risks

    def _detect_cascading_risks(self, nodes: List[Node], edges: List[Edge]) -> List[Risk]:
        risks = []
        # High Fan-out components (If I fail, I break many things)
        fan_out = {}
        for edge in edges:
            fan_out[edge.source] = fan_out.get(edge.source, 0) + 1
            
        for node_id, count in fan_out.items():
            if count >= 3:
                node = next((n for n in nodes if n.id == node_id), None)
                if node and node.type in [NodeType.DATABASE, NodeType.QUEUE, NodeType.CACHE]:
                    risks.append(Risk(
                        id=f"cascade-{node_id}",
                        severity=RiskSeverity.HIGH,
                        category=RiskCategory.RELIABILITY,
                        description=f"High Cascade Risk: {node.label} is a shared dependency for {count} components.",
                        mitigation="Implement circuit breakers on dependent services and ensure this component has high-availability failover."
                    ))
        return risks

    async def calculate_reliability_scores(self, nodes: List[Node], edges: List[Edge]) -> Dict[str, float]:
        """
        Generates production-grade reliability metrics.
        """
        # Heuristic-based scoring (0-100)
        fault_tolerance = 100.0
        scalability = 100.0
        security = 100.0
        recovery_capability = 100.0
        
        type_counts = {}
        for node in nodes:
            type_counts[node.type] = type_counts.get(node.type, 0) + 1
            
        # 1. Fault Tolerance
        for ntype, count in type_counts.items():
            if count == 1: 
                fault_tolerance -= 10
                if ntype == NodeType.DATABASE: fault_tolerance -= 20
                if ntype == NodeType.GATEWAY: fault_tolerance -= 15
        
        # 2. Scalability
        if NodeType.QUEUE not in type_counts: scalability -= 20
        if NodeType.CACHE not in type_counts: scalability -= 15
        # Penalize for long sync chains (approx)
        if len(edges) > len(nodes) * 1.5: scalability -= 10

        # 3. Security
        risks = await self.analyze_risks(nodes, edges)
        sec_risks = [r for r in risks if r.category == RiskCategory.SECURITY]
        security -= (len(sec_risks) * 30)
        
        # 4. Recovery Capability
        # Presence of redundancy + Queues (for replay) + Gateways (for traffic shifting)
        if type_counts.get(NodeType.DATABASE, 0) < 2: recovery_capability -= 30
        if NodeType.QUEUE not in type_counts: recovery_capability -= 20
        if NodeType.GATEWAY not in type_counts: recovery_capability -= 10
        if any(r.category == RiskCategory.RELIABILITY and r.severity == RiskSeverity.CRITICAL for r in risks):
            recovery_capability -= 20

        return {
            "fault_tolerance": max(0, fault_tolerance),
            "scalability": max(0, scalability),
            "security": max(0, security),
            "recovery_capability": max(0, recovery_capability),
            "operational_complexity": min(100, len(nodes) * 5 + len(edges) * 2)
        }

    async def identify_bottlenecks(self, nodes: List[Node], edges: List[Edge]) -> List[str]:
        # Legacy support/simple list
        fan_in = {}
        for edge in edges:
            fan_in[edge.target] = fan_in.get(edge.target, 0) + 1
        
        bottlenecks = []
        for node_id, count in fan_in.items():
            if count >= 3:
                node = next((n for n in nodes if n.id == node_id), None)
                if node: bottlenecks.append(node.label)
        return bottlenecks

