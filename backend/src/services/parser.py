import json
from typing import List, Tuple
from ..models.architecture import Node, Edge, NodeType

class ArchitectureParser:
    async def parse_text(self, text: str) -> Tuple[List[Node], List[Edge]]:
        # In a real scenario, this would call OpenAI/Gemini
        # For MVP/Demo, we'll use a rule-based mock or simple keyword extraction
        nodes = []
        edges = []
        
        # Expanded Mock Logic for Hackathon Demo
        text_lower = text.lower()
        
        components = {
            "next.js": (NodeType.FRONTEND, "Next.js Frontend"),
            "react": (NodeType.FRONTEND, "React Frontend"),
            "vue": (NodeType.FRONTEND, "Vue.js Frontend"),
            "frontend": (NodeType.FRONTEND, "Web Frontend"),
            "website": (NodeType.FRONTEND, "Web Frontend"),
            "mobile": (NodeType.FRONTEND, "Mobile App"),
            "cdn": (NodeType.GATEWAY, "Global CDN"),
            "load balancer": (NodeType.GATEWAY, "Load Balancer"),
            "gateway": (NodeType.GATEWAY, "API Gateway"),
            "fastapi": (NodeType.BACKEND, "FastAPI Backend"),
            "python": (NodeType.BACKEND, "Python Service"),
            "node.js": (NodeType.BACKEND, "Node.js Backend"),
            "go": (NodeType.BACKEND, "Go Service"),
            "kubernetes": (NodeType.BACKEND, "K8s Cluster"),
            "server": (NodeType.BACKEND, "Application Server"),
            "backend": (NodeType.BACKEND, "Backend API"),
            "postgresql": (NodeType.DATABASE, "PostgreSQL Database"),
            "postgres": (NodeType.DATABASE, "PostgreSQL Database"),
            "mysql": (NodeType.DATABASE, "MySQL Database"),
            "mongodb": (NodeType.DATABASE, "MongoDB Database"),
            "database": (NodeType.DATABASE, "System Database"),
            "db": (NodeType.DATABASE, "System Database"),
            "redis": (NodeType.CACHE, "Redis Cache"),
            "cache": (NodeType.CACHE, "Redis Cache"),
            "qdrant": (NodeType.DATABASE, "Qdrant Vector DB"),
            "s3": (NodeType.STORAGE, "S3 Bucket"),
            "storage": (NodeType.STORAGE, "Cloud Storage"),
            "kafka": (NodeType.QUEUE, "Kafka Stream"),
            "sqs": (NodeType.QUEUE, "SQS Queue"),
            "queue": (NodeType.QUEUE, "Message Queue"),
            "rabbitmq": (NodeType.QUEUE, "RabbitMQ Bus"),
            "worker": (NodeType.BACKEND, "Background Worker"),
        }
        
        found_nodes = []
        for key, (ntype, label) in components.items():
            if key in text_lower:
                node_id = key.replace(".", "-").replace(" ", "-")
                # Avoid duplicates
                if not any(n.id == node_id for n in nodes):
                    node = Node(id=node_id, label=label, type=ntype)
                    nodes.append(node)
                    found_nodes.append(node)
        
        # SMART FALLBACK: If no nodes found, create a generic "Legacy Service" so demo doesn't fail
        if not nodes:
            nodes.append(Node(id="custom-service-1", label="Legacy Service", type=NodeType.BACKEND))
            nodes.append(Node(id="custom-db-1", label="Primary Database", type=NodeType.DATABASE))
            found_nodes = nodes
        
        # Simple Edge Logic: connect gateway -> frontend -> backend, backend -> queue/cache -> db
        gateways = [n for n in found_nodes if n.type == NodeType.GATEWAY]
        frontends = [n for n in found_nodes if n.type == NodeType.FRONTEND]
        backends = [n for n in found_nodes if n.type == NodeType.BACKEND]
        others = [n for n in found_nodes if n.type in [NodeType.DATABASE, NodeType.CACHE, NodeType.STORAGE, NodeType.QUEUE]]
        
        if gateways and frontends:
            for g in gateways:
                for f in frontends:
                    edges.append(Edge(id=f"{g.id}-{f.id}", source=g.id, target=f.id, label="ROUTING"))
        
        target_backends = backends if backends else others
        for f in (frontends if frontends else gateways):
            for b in target_backends:
                edges.append(Edge(id=f"{f.id}-{b.id}", source=f.id, target=b.id, label="HTTPS"))
        
        for b in backends:
            for o in others:
                edges.append(Edge(id=f"{b.id}-{o.id}", source=b.id, target=o.id, label="SYNC"))
                
        return nodes, edges
