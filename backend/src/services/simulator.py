from typing import List, Dict, Set
import random
from ..models.architecture import Node, Edge, NodeType

class FailureSimulator:
    def __init__(self):
        # Configuration for different failure scenarios
        self.scenarios = {
            "regional_outage": {
                "type": "Network Failure",
                "trigger": "Complete connectivity loss in primary availability zone.",
                "severity": "Critical",
                "base_latency": 800,
                "base_throughput_drop": 95,
                "recovery": "45-90 min",
                "target_types": [NodeType.GATEWAY, NodeType.STORAGE, NodeType.DATABASE],
                "viz": "zone_blackout"
            },
            "db_crash": {
                "type": "Database Failure",
                "trigger": "Primary database cluster experiencing OOM killer or hardware failure.",
                "severity": "Critical",
                "base_latency": 1500,
                "base_throughput_drop": 100,
                "recovery": "15-30 min (failover duration)",
                "target_types": [NodeType.DATABASE],
                "viz": "data_loss_warning"
            },
            "latency_spike": {
                "type": "Network Failure",
                "trigger": "BGP flapping causing increased packet retransmission and jitter.",
                "severity": "Medium",
                "base_latency": 250,
                "base_throughput_drop": 15,
                "recovery": "5-10 min",
                "target_types": [NodeType.GATEWAY, NodeType.OTHER],
                "viz": "edge_congestion"
            },
            "cache_stampede": {
                "type": "Cache Failure",
                "trigger": "Simultaneous TTL expiration of hot keys causing backend saturation.",
                "severity": "High",
                "base_latency": 400,
                "base_throughput_drop": 40,
                "recovery": "10-20 min",
                "target_types": [NodeType.CACHE],
                "viz": "thermal_runaway"
            },
            "kafka_broker_down": {
                "type": "Messaging System Failure",
                "trigger": "Loss of quorum in message broker cluster.",
                "severity": "High",
                "base_latency": 120,
                "base_throughput_drop": 60,
                "recovery": "20-40 min",
                "target_types": [NodeType.QUEUE],
                "viz": "stream_interruption"
            },
            "resource_exhaustion": {
                "type": "Compute Failure",
                "trigger": "CPU/Memory saturation on worker nodes leading to request queueing.",
                "severity": "Medium",
                "base_latency": 300,
                "base_throughput_drop": 25,
                "recovery": "5-15 min (autoscaling trigger)",
                "target_types": [NodeType.BACKEND],
                "viz": "node_throttling"
            },
            "region_isolation": {
                "type": "Cross-Region Failure",
                "trigger": "Inter-region VPC peering link failure.",
                "severity": "High",
                "base_latency": 600,
                "base_throughput_drop": 50,
                "recovery": "30-60 min",
                "target_types": [NodeType.GATEWAY, NodeType.DATABASE],
                "viz": "regional_split"
            },
            "gateway_failure": {
                "type": "Infrastructure Failure",
                "trigger": "API Gateway saturation or configuration error at ingress layer.",
                "severity": "Critical",
                "base_latency": 1200,
                "base_throughput_drop": 100,
                "recovery": "10-20 min",
                "target_types": [NodeType.GATEWAY],
                "viz": "ingress_block"
            },
            "lb_misrouting": {
                "type": "Routing Failure",
                "trigger": "Misconfigured traffic weights or health-check false positives.",
                "severity": "High",
                "base_latency": 450,
                "base_throughput_drop": 30,
                "recovery": "5-15 min",
                "target_types": [NodeType.GATEWAY],
                "viz": "traffic_drift"
            },
            "mesh_failure": {
                "type": "Service Mesh Failure",
                "trigger": "Control plane desync or sidecar proxy resource exhaustion.",
                "severity": "High",
                "base_latency": 600,
                "base_throughput_drop": 50,
                "recovery": "20-40 min",
                "target_types": [NodeType.BACKEND, NodeType.OTHER],
                "viz": "mesh_collapse"
            },
            "auth_failure": {
                "type": "Security Failure",
                "trigger": "Identity provider outage or JWT validation bottleneck.",
                "severity": "Critical",
                "base_latency": 200,
                "base_throughput_drop": 90,
                "recovery": "15-30 min",
                "target_types": [NodeType.BACKEND],
                "viz": "auth_lockout"
            },
            "disk_saturation": {
                "type": "Storage Failure",
                "trigger": "High I/O wait times on persistent block storage causing backpressure.",
                "severity": "Medium",
                "base_latency": 900,
                "base_throughput_drop": 20,
                "recovery": "30-60 min",
                "target_types": [NodeType.DATABASE, NodeType.STORAGE],
                "viz": "disk_thrashing"
            },
            "dns_failure": {
                "type": "Network Failure",
                "trigger": "Recursive resolver failure or recursive lookup loops.",
                "severity": "Critical",
                "base_latency": 2000,
                "base_throughput_drop": 100,
                "recovery": "5-15 min",
                "target_types": [NodeType.GATEWAY, NodeType.BACKEND],
                "viz": "dns_void"
            },
            "deployment_failure": {
                "type": "Deployment Failure",
                "trigger": "Defective release candidate causing rolling restart loops.",
                "severity": "Medium",
                "base_latency": 350,
                "base_throughput_drop": 40,
                "recovery": "10-20 min",
                "target_types": [NodeType.BACKEND],
                "viz": "bad_rollout"
            }
        }

    async def simulate_failure(self, nodes: List[Node], edges: List[Edge], load_scenario: str) -> Dict:
        """
        Advanced failure simulation with cascading logic and realistic metrics.
        """
        scenario_key = self._match_scenario(load_scenario)
        config = self.scenarios.get(scenario_key)
        
        if not config:
            return self._get_nominal_state()

        # 1. Identify Root Cause Nodes
        root_cause_ids = [n.id for n in nodes if n.type in config["target_types"]]
        # If no nodes match the target type, pick a random backend or gateway
        if not root_cause_ids:
            root_cause_ids = [n.id for n in nodes if n.type in [NodeType.BACKEND, NodeType.GATEWAY]][:1]

        # 2. Cascading Failure Propagation
        failed_nodes, cascade_flow = self._propagate_cascade(nodes, edges, root_cause_ids)

        # 3. Calculate Metrics
        metrics = self._calculate_metrics(nodes, failed_nodes, config)

        # 4. Generate Mitigation Strategies
        mitigations = self._generate_mitigations(config["type"], scenario_key, failed_nodes, nodes)

        # 5. Build Final Response
        return {
            "failure_type": config["type"],
            "trigger_event": config["trigger"],
            "cascade_flow": cascade_flow,
            "impacted_services": [n.label for n in nodes if n.id in failed_nodes],
            "failed_nodes": list(failed_nodes), # Backwards compatibility
            "metrics": {
                "latency_increase": f"+{metrics['latency']}%",
                "throughput_drop": f"{metrics['throughput']}%",
                "survivability_change": f"-{metrics['survivability_loss']}%",
                "blast_radius": f"{metrics['blast_radius']}%"
            },
            "severity": config["severity"],
            "recovery_estimate": config["recovery"],
            "mitigation_strategies": mitigations,
            "visualization_hint": {
                "pattern": config["viz"],
                "root_cause": root_cause_ids,
                "propagation_direction": "upstream"
            },
            "survivability": metrics["current_survivability"], # Backwards compatibility
            "status": "CRITICAL" if config["severity"] == "Critical" else "DEGRADED"
        }

    def _match_scenario(self, text: str) -> str:
        text = text.lower()
        
        # New Scenarios
        if "gateway" in text or "api" in text or "ingress" in text: return "gateway_failure"
        if "load balancer" in text or "lb" in text or "routing" in text: return "lb_misrouting"
        if "mesh" in text or "istio" in text: return "mesh_failure"
        if "auth" in text or "login" in text or "jwt" in text: return "auth_failure"
        if "disk" in text or "io" in text or "storage overload" in text: return "disk_saturation"
        if "dns" in text or "domain" in text or "name resolution" in text: return "dns_failure"
        if "deployment" in text or "rollback" in text or "ci cd" in text: return "deployment_failure"
        
        # Expanded / Existing Scenarios
        if "cache stampede" in text or "redis overload" in text or "cache miss" in text or "cache" in text or "storm" in text: 
            return "cache_stampede"
            
        if "region" in text or "outage" in text: return "regional_outage"
        if "db" in text or "database" in text or "crash" in text: return "db_crash"
        if "latency" in text or "spike" in text or "bgp" in text: return "latency_spike"
        if "kafka" in text or "broker" in text or "queue" in text: return "kafka_broker_down"
        if "resource" in text or "cpu" in text or "memory" in text: return "resource_exhaustion"
        if "isolation" in text or "split" in text: return "region_isolation"
        
        return "latency_spike" # Default fallback

    def _propagate_cascade(self, nodes: List[Node], edges: List[Edge], root_cause_ids: List[str]) -> (Set[str], List[str]):
        failed_nodes = set(root_cause_ids)
        cascade_flow = []
        
        # Mapping labels for better flow descriptions
        id_to_label = {n.id: n.label for n in nodes}
        
        # Iterative propagation: If a dependency (target) is failed, the requester (source) is impacted
        for _ in range(len(nodes)):
            added_this_round = False
            for edge in edges:
                if edge.target in failed_nodes and edge.source not in failed_nodes:
                    failed_nodes.add(edge.source)
                    cascade_flow.append(f"{id_to_label.get(edge.target)} failure propagated to {id_to_label.get(edge.source)}")
                    added_this_round = True
            if not added_this_round:
                break
                
        return failed_nodes, cascade_flow

    def _calculate_metrics(self, nodes: List[Node], failed_nodes: Set[str], config: Dict) -> Dict:
        total_nodes = len(nodes)
        blast_radius = (len(failed_nodes) / total_nodes * 100) if total_nodes > 0 else 0
        
        # Calculate impact based on blast radius and base config
        latency_factor = 1.0 + (blast_radius / 100.0)
        throughput_factor = 1.0 - (blast_radius / 120.0) # Not linear, some survivability
        
        actual_latency = int(config["base_latency"] * latency_factor)
        actual_throughput = int(min(100, config["base_throughput_drop"] * (blast_radius / 50.0)))
        
        # Survivability logic
        critical_types = [NodeType.DATABASE, NodeType.STORAGE, NodeType.GATEWAY]
        critical_nodes = [n for n in nodes if n.type in critical_types]
        failed_critical = [n for n in critical_nodes if n.id in failed_nodes]
        
        base_survivability = 100.0
        if critical_nodes:
            current_survivability = 100.0 - (len(failed_critical) / len(critical_nodes) * 100)
        else:
            current_survivability = 100.0 - (blast_radius * 0.5)

        return {
            "latency": actual_latency,
            "throughput": actual_throughput,
            "survivability_loss": round(100 - current_survivability, 1),
            "current_survivability": round(current_survivability, 1),
            "blast_radius": round(blast_radius, 1)
        }

    def _generate_mitigations(self, failure_type: str, scenario: str, failed_ids: Set[str], nodes: List[Node]) -> List[str]:
        mitigations = []
        
        if "Network" in failure_type:
            mitigations.extend([
                "Enable Global Accelerator with automatic health-check based routing.",
                "Implement aggressive client-side retries with exponential backoff.",
                "Deploy multi-AZ VPC endpoints to bypass public internet congestion."
            ])
        elif "Database" in failure_type:
            mitigations.extend([
                "Trigger automated failover to standby replica (RTO < 60s).",
                "Enable 'Static Content Mode' on frontend to serve from cache during DB downtime.",
                "Implement write-queueing to buffer transactions during recovery."
            ])
        elif "Cache" in failure_type:
            mitigations.extend([
                "Implement Jittered TTLs to prevent synchronized cache expiration.",
                "Use 'Soft Expiry' (Serve Stale while revalidating) to protect backend.",
                "Scale cache cluster horizontally to distribute key load."
            ])
        elif "Messaging" in failure_type:
            mitigations.extend([
                "Switch to 'Direct-to-Store' fallback for critical events.",
                "Increase partition count and replication factor for broker quorum resilience.",
                "Implement Dead Letter Queues (DLQ) to isolate poisonous messages."
            ])
        else:
            mitigations.extend([
                "Apply Circuit Breaker pattern to isolate failing service clusters.",
                "Enable horizontal autoscaling based on custom latency metrics.",
                "Deploy per-service rate limits to prevent cascading resource exhaustion."
            ])
            
        return mitigations[:3] # Return top 3

    def _get_nominal_state(self) -> Dict:
        return {
            "failure_type": "None",
            "trigger_event": "System operating within nominal envelopes.",
            "cascade_flow": [],
            "impacted_services": [],
            "failed_nodes": [],
            "metrics": {
                "latency_increase": "0%",
                "throughput_drop": "0%",
                "survivability_change": "0%",
                "blast_radius": "0%"
            },
            "severity": "Low",
            "recovery_estimate": "N/A",
            "mitigation_strategies": [],
            "visualization_hint": {"pattern": "nominal", "root_cause": [], "propagation_direction": "none"},
            "survivability": 100.0,
            "status": "NOMINAL"
        }
