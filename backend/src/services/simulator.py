from typing import List, Dict
from ..models.architecture import Node, Edge, NodeType

class FailureSimulator:
    async def simulate_failure(self, nodes: List[Node], edges: List[Edge], load_scenario: str) -> Dict:
        """
        High-fidelity failure simulation with blast radius and propagation analysis.
        """
        scenario = load_scenario.lower()
        initial_failures = []
        bottlenecks = []
        
        # 1. SCENARIO INITIALIZATION (Trigger points)
        if "2m" in scenario or "spike" in scenario:
            # Persistent layer saturation
            initial_failures = [n.id for n in nodes if n.type == NodeType.DATABASE]
            bottlenecks.append("Database I/O Saturation")
                
        elif "timeout" in scenario or "gateway" in scenario:
            # Ingress orchestration failure
            initial_failures = [n.id for n in nodes if n.type in [NodeType.GATEWAY, NodeType.BACKEND]]
            bottlenecks.append("Gateway Resource Exhaustion")

        elif "cache" in scenario or "storm" in scenario:
            # Cache invalidation leading to DB overload
            initial_failures = [n.id for n in nodes if n.type == NodeType.CACHE]
            bottlenecks.append("Cache Stampede")
            # Secondary failure (DB)
            initial_failures.extend([n.id for n in nodes if n.type == NodeType.DATABASE])

        elif "ddos" in scenario or "security" in scenario:
            # Edge layer compromise
            initial_failures = [n.id for n in nodes if n.type in [NodeType.FRONTEND, NodeType.GATEWAY]]
            bottlenecks.append("Ingress Bandwidth Saturation")

        elif "outage" in scenario or "region" in scenario:
            # Infrastructure-level failure
            initial_failures = [n.id for n in nodes if n.type in [NodeType.DATABASE, NodeType.STORAGE, NodeType.QUEUE]]
            bottlenecks.append("Availability Zone Outage")

        # 2. TOPOLOGICAL PROPAGATION (The "Cascade")
        failed_nodes = set(initial_failures)
        propagation_path = []
        
        # We simulate upstream failure: If a dependency fails, the component depending on it fails.
        # Max iterations to prevent infinite loops in cycles (though topology should be DAGish)
        for _ in range(len(nodes)):
            added_this_round = False
            for edge in edges:
                if edge.target in failed_nodes and edge.source not in failed_nodes:
                    failed_nodes.add(edge.source)
                    propagation_path.append({
                        "source": edge.source,
                        "trigger": edge.target,
                        "type": "dependency_loss"
                    })
                    added_this_round = True
            if not added_this_round:
                break
        
        # 3. METRIC CALCULATION
        total_nodes = len(nodes)
        blast_radius = (len(failed_nodes) / total_nodes) * 100 if total_nodes > 0 else 0
        
        # Survivability: Weighted health (Sinks like DBs are critical)
        critical_nodes = [n for n in nodes if n.type in [NodeType.DATABASE, NodeType.STORAGE]]
        failed_critical = [n for n in critical_nodes if n.id in failed_nodes]
        
        survivability = 100.0
        if critical_nodes:
            survivability = 100.0 - (len(failed_critical) / len(critical_nodes) * 100)

        # 4. DYNAMIC MITIGATION STRATEGIES
        mitigation_strategies = []
        if survivability < 100:
            if any(n.type == NodeType.DATABASE for n in nodes if n.id in failed_nodes):
                mitigation_strategies.append("Deploy Multi-Region Database replicas with automated failover.")
            if any(n.type == NodeType.CACHE for n in nodes if n.id in failed_nodes):
                mitigation_strategies.append("Implement 'Cache-Aside' with database fallback and circuit breakers.")
            if len(propagation_path) > 2:
                mitigation_strategies.append("Decouple services using an asynchronous Message Queue (Kafka/SQS) to prevent cascading failures.")
            if any(n.type == NodeType.GATEWAY for n in nodes if n.id in failed_nodes):
                mitigation_strategies.append("Introduce Global Load Balancing (GLB) to shift traffic away from failing regions.")

        return {
            "failed_nodes": list(failed_nodes),
            "bottlenecks": list(set(bottlenecks)),
            "blast_radius": round(blast_radius, 1),
            "survivability": round(max(0, survivability), 1),
            "propagation_path": propagation_path,
            "mitigation_strategies": mitigation_strategies,
            "status": "CRITICAL" if survivability < 50 else "DEGRADED" if len(failed_nodes) > 0 else "NOMINAL"
        }

