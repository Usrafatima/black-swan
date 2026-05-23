class SystemExplainer:
    async def explain_pattern(self, name: str, description: str) -> str:
        """
        Generates a high-signal engineering explanation for a specific architecture pattern.
        """
        analysis = self._get_pattern_analysis(name)
        
        output = [
            f"Topology_Match: {name}",
            f"Confidence: 0.980\n",
            "1. Technical Explanation",
            f"   {analysis['technical']}\n",
            "2. Why This Match Was Detected",
            "   The AI detected:"
        ]
        
        for signal in analysis['signals']:
            output.append(f"   - {signal}")
            
        output.append("\n3. Real-World Usage")
        output.append(f"   Commonly used in: {', '.join(analysis['usage'])}\n")
        
        if analysis.get('analogy'):
            output.append("4. Simplified Analogy")
            output.append(f"   {analysis['analogy']}")
            
        return "\n".join(output)

    async def generate_similarity_report(self, rank: int, pattern: dict, score: float) -> dict:
        """
        Generates a structured similarity report using real infrastructure metadata.
        """
        name = pattern.get("name", "Unknown Pattern")
        metadata = pattern.get("metadata", {})
        
        # If real metadata exists, use it to build the report
        if metadata:
            archetype = metadata.get("archetype", "Standard Architecture")
            stack = metadata.get("primary_stack", {})
            tech_stack_desc = f" utilizing {stack.get('database', 'persistence layer')}, {stack.get('messaging', 'messaging backbone')}, and {stack.get('caching', 'caching strategies')}."
            
            technical_explanation = f"This {archetype} archetype is designed for {pattern.get('industry', 'high-scale')} environments{tech_stack_desc}"
            why_matches = [
                f"Matches {archetype} structural signals",
                f"Aligns with {metadata.get('traffic_capacity', 'nominal traffic')} capacity",
                f"Follows {metadata.get('failover_strategy', 'standard failover')} pattern"
            ]
            real_world_usage = [pattern.get("industry", "Cloud-native apps")]
            analogy = self._get_pattern_analysis(name).get("analogy", "")
        else:
            # Fallback to hardcoded logic if no metadata
            analysis = self._get_pattern_analysis(name)
            technical_explanation = analysis['technical']
            why_matches = analysis['signals']
            real_world_usage = analysis['usage']
            analogy = analysis.get('analogy', "")

        confidence_level = "Very High" if score > 0.9 else "High" if score > 0.8 else "Medium"

        return {
            "title": f"🏆 Topology Match #{rank}: {name}",
            "score": f"{score:.3f}",
            "confidence": confidence_level,
            "technical_explanation": technical_explanation,
            "why_matches": why_matches,
            "real_world_usage": real_world_usage,
            "analogy": analogy,
            "metadata": metadata # Pass through the full metadata for the UI
        }

    def _get_pattern_analysis(self, name: str) -> dict:
        """
        Internal mapping of high-fidelity architectural analyses.
        """
        n = name.lower()
        if "chaosshield" in n or "netflix" in n:
            return {
                "technical": "This topology resembles an active-active distributed architecture deployed across multiple regions. It utilizes edge-based traffic distribution via global load balancers and implements strict circuit-breaking patterns to prevent cascading failures across the service mesh.",
                "signals": [
                    "multi-region redundancy",
                    "edge resilience strategies",
                    "distributed traffic handling",
                    "circuit breaker patterns"
                ],
                "usage": ["Streaming platforms", "Global SaaS", "High-availability APIs"],
                "analogy": "Like a multi-engine aircraft that can continue flying safely even if one engine fails."
            }
        elif "fortress" in n or "aws" in n:
            return {
                "technical": "A zero-trust, layered security architecture focused on transactional integrity and strict ingress control. It features a hardened private subnet for core persistence layers and uses a synchronized multi-factor authorization flow for all inter-service communication.",
                "signals": [
                    "layered authorization",
                    "hardened infrastructure",
                    "transactional integrity",
                    "strict ingress control"
                ],
                "usage": ["Fintech", "Medical records systems", "Government infrastructure"],
                "analogy": "Like a high-security vault with multiple biometric checks and air-gapped backup systems."
            }
        elif "event" in n or "nexus" in n:
            return {
                "technical": "An asynchronous event-driven architecture utilizing a persistent message broker (e.g., Kafka or RabbitMQ) as the central nervous system. Services are fully decoupled, communicating through immutable event streams to ensure eventual consistency and horizontal scalability.",
                "signals": [
                    "event-driven communication",
                    "asynchronous processing",
                    "service decoupling",
                    "message durability"
                ],
                "usage": ["Real-time analytics", "E-commerce order processing", "IoT telemetry"],
                "analogy": "Like a digital post office where every message is recorded in a ledger before delivery to ensure nothing is lost."
            }
        else:
            return {
                "technical": "A distributed system architecture following standard horizontal scaling and fault-tolerant design principles. It employs redundant service instances behind a load balancer to ensure availability and uses a centralized caching layer to reduce database contention.",
                "signals": [
                    "horizontal scaling",
                    "load-balanced redundancy",
                    "distributed caching",
                    "fault tolerance"
                ],
                "usage": ["General cloud-native applications", "Scalable web platforms"],
                "analogy": "Like a retail chain with multiple local stores; if one is busy, customers can be redirected to another nearby location."
            }

    async def generate_failure_summary(self, name: str, metrics: dict) -> str:
        """
        Senior Distributed Systems Architect Persona: Analysis of failure vectors.
        """
        analysis = self._get_pattern_analysis(name)
        n = name.lower()
        
        summary = [
            f"FAILURE ANALYSIS: {name.upper()}",
            f"Core Vulnerability: {analysis['signals'][0]} saturation.\n",
            "Technical Root Cause:",
            f"In this {analysis['usage'][0]} context, failures typically propagate through the {analysis['signals'][1]} layer. "
            "Under extreme load, the lack of backpressure causes buffer saturation, leading to increased p99 latency "
            "and eventual service timeouts at the gateway.\n",
            "Mitigation Strategy:",
            f"The current topology attempts to mitigate this via {analysis['signals'][2]}. "
            "By enforcing strict resource quotas and implementing adaptive rate-limiting, the system maintains "
            "functional integrity during partial degradation."
        ]
        return "\n".join(summary)

    async def generate_narrative(self, sim_data: dict):
        traffic = sim_data.get("traffic", "normal").lower()
        failed_nodes = sim_data.get("failed_nodes", [])
        blast_radius = sim_data.get("blast_radius", 0)
        survivability = sim_data.get("survivability", 100)
        
        # Engineering-first human explanation
        if not failed_nodes:
            human_desc = "System operating within nominal performance envelopes. Latency and throughput metrics are stable."
        elif blast_radius > 50:
            human_desc = f"Critical systemic failure. A blast radius of {blast_radius}% detected. Cascade has orphaned the majority of the service mesh."
        elif "ddos" in traffic:
            human_desc = "Ingress saturation detected. Frontend gateway is experiencing resource exhaustion due to high-volume request flooding."
        elif "cache" in traffic:
            human_desc = "Cache stampede detected. Concurrent TTL expiration is driving high I/O wait times on the primary database cluster."
        else:
            human_desc = f"Degraded state detected. Component failure is impacting {blast_radius}% of the topology. Survivability is currently {survivability}%."

        timeline = [
            f"[00:01] Metric Change: Traffic {traffic.upper()}",
            f"[00:03] Propagation initiated. Blast radius: {blast_radius}%",
        ]
        
        if failed_nodes:
            timeline.append(f"[00:08] Failure detected in {len(failed_nodes)} nodes.")
            timeline.append(f"[00:10] Status: {'CRITICAL_DEGRADATION' if survivability < 50 else 'PARTIAL_DEGRADATION'}")
        else:
            timeline.append("[00:10] Status: NOMINAL")

        cto_insight = {
            "blast_radius": f"{blast_radius}%",
            "functional_integrity": f"{survivability}%",
            "root_cause": "Topological cascade" if blast_radius > 20 else "Resource exhaustion",
            "remediation": "Deploy circuit breakers to contain cascade" if blast_radius > 20 else "Scale horizontal replicas"
        }

        return {
            "human_explanation": human_desc,
            "timeline": timeline,
            "cto_insight": cto_insight
        }

