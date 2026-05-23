import asyncio
import os
import sys
import numpy as np
from uuid import uuid4
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(override=True)
print(f"DEBUG: QDRANT_HOST from env (after override): {os.getenv('QDRANT_HOST')}")

# Add src to path
sys.path.append(os.path.join(os.getcwd(), "src"))

from src.vector_store.qdrant_client import VectorStore
from src.services.embeddings import EmbeddingService

# Define Resilient Patterns with Rich Intelligence Metadata
PATTERNS = [
    {
        "name": "ChaosShield v4 (Netflix Style)",
        "category": "High-Availability",
        "industry": "Streaming / Media",
        "survivability": 98,
        "complexity": 65,
        "description": "Multi-region active-active redundancy with circuit breakers and fallback static assets.",
        "metadata": {
            "archetype": "active-active-multi-region",
            "fault_tolerance": 9,
            "scalability": 8,
            "security_level": "Standard",
            "operational_cost": "Premium",
            "traffic_capacity": "1M+ RPS (CDN + Edge)",
            "failover_strategy": "Automated DNS / Global LB",
            "primary_stack": {
                "database": "Global DynamoDB",
                "messaging": "Service Mesh / Circuit Breakers",
                "caching": "Global Redis / Edge"
            }
        },
        "topology": {
            "nodes": [
                {"id": "cdn", "label": "Global CDN", "type": "gateway"},
                {"id": "alb-us", "label": "ALB (US-East)", "type": "gateway"},
                {"id": "alb-eu", "label": "ALB (EU-West)", "type": "gateway"},
                {"id": "api-us", "label": "API Service (US)", "type": "backend"},
                {"id": "api-eu", "label": "API Service (EU)", "type": "backend"},
                {"id": "db-global", "label": "Global DynamoDB", "type": "database"},
                {"id": "cache-us", "label": "Redis (US)", "type": "cache"},
                {"id": "cache-eu", "label": "Redis (EU)", "type": "cache"}
            ],
            "edges": [
                {"id": "e1", "source": "cdn", "target": "alb-us"},
                {"id": "e2", "source": "cdn", "target": "alb-eu"},
                {"id": "e3", "source": "alb-us", "target": "api-us"},
                {"id": "e4", "source": "alb-eu", "target": "api-eu"},
                {"id": "e5", "source": "api-us", "target": "cache-us"},
                {"id": "e6", "source": "api-eu", "target": "cache-eu"},
                {"id": "e7", "source": "api-us", "target": "db-global"},
                {"id": "e8", "source": "api-eu", "target": "db-global"}
            ]
        }
    },
    {
        "name": "AWS Fortress (Fintech Standard)",
        "category": "Security & Compliance",
        "industry": "Banking / Finance",
        "survivability": 95,
        "complexity": 80,
        "description": "Multi-AZ isolation with dedicated VPC endpoints and encrypted cross-region replicas.",
        "metadata": {
            "archetype": "secure-hardened-vpc",
            "fault_tolerance": 8,
            "scalability": 7,
            "security_level": "Highest (SOC2/PCI)",
            "operational_cost": "High",
            "traffic_capacity": "500k RPS (Hardened)",
            "failover_strategy": "Multi-AZ Sync Replica",
            "primary_stack": {
                "database": "Aurora PostgreSQL (Global)",
                "messaging": "Private Link / SQS",
                "caching": "ElastiCache (Encrypted)"
            }
        },
        "topology": {
            "nodes": [
                {"id": "waf", "label": "AWS WAF", "type": "gateway"},
                {"id": "gateway", "label": "API Gateway", "type": "gateway"},
                {"id": "auth-srv", "label": "Auth Service", "type": "backend"},
                {"id": "ledger-srv", "label": "Ledger Service", "type": "backend"},
                {"id": "db-primary", "label": "Aurora (W)", "type": "database"},
                {"id": "db-replica", "label": "Aurora (R)", "type": "database"},
                {"id": "kms", "label": "KMS Key Store", "type": "storage"}
            ],
            "edges": [
                {"id": "e1", "source": "waf", "target": "gateway"},
                {"id": "e2", "source": "gateway", "target": "auth-srv"},
                {"id": "e3", "source": "gateway", "target": "ledger-srv"},
                {"id": "e4", "source": "ledger-srv", "target": "db-primary"},
                {"id": "e5", "source": "ledger-srv", "target": "db-replica"},
                {"id": "e6", "source": "auth-srv", "target": "kms"}
            ]
        }
    },
    {
        "name": "ElasticShop (E-commerce Scale)",
        "category": "Scalability",
        "industry": "Retail",
        "survivability": 92,
        "complexity": 55,
        "description": "Event-driven architecture using message queues to decouple checkout from inventory.",
        "metadata": {
            "archetype": "event-driven-asynchronous",
            "fault_tolerance": 7,
            "scalability": 10,
            "security_level": "Standard",
            "operational_cost": "Medium-Variable",
            "traffic_capacity": "Auto-scaling (Infinite Burst)",
            "failover_strategy": "Message Replay / DLQ",
            "primary_stack": {
                "database": "PostgreSQL + Redis",
                "messaging": "RabbitMQ / Kafka",
                "caching": "Redis Cache-Aside"
            }
        },
        "topology": {
            "nodes": [
                {"id": "fe", "label": "Storefront FE", "type": "frontend"},
                {"id": "order-srv", "label": "Order Service", "type": "backend"},
                {"id": "queue", "label": "RabbitMQ", "type": "queue"},
                {"id": "inv-srv", "label": "Inventory Worker", "type": "backend"},
                {"id": "db-order", "label": "Order DB", "type": "database"},
                {"id": "db-inv", "label": "Inventory DB", "type": "database"}
            ],
            "edges": [
                {"id": "e1", "source": "fe", "target": "order-srv"},
                {"id": "e2", "source": "order-srv", "target": "db-order"},
                {"id": "e3", "source": "order-srv", "target": "queue"},
                {"id": "e4", "source": "queue", "target": "inv-srv"},
                {"id": "e5", "source": "inv-srv", "target": "db-inv"}
            ]
        }
    },
    {
        "name": "NeuralPath (AI Inference Pipeline)",
        "category": "Performance",
        "industry": "Technology / AI",
        "survivability": 90,
        "complexity": 70,
        "description": "High-throughput vector search with read-optimized indexes and load-balanced model workers.",
        "metadata": {
            "archetype": "compute-intensive-pipeline",
            "fault_tolerance": 6,
            "scalability": 9,
            "security_level": "Standard",
            "operational_cost": "High (GPU Resource)",
            "traffic_capacity": "High Inference (Batching)",
            "failover_strategy": "Worker Pool Redundancy",
            "primary_stack": {
                "database": "Qdrant Vector DB",
                "messaging": "gRPC / Protobuf",
                "caching": "Local Model Cache"
            }
        },
        "topology": {
            "nodes": [
                {"id": "api", "label": "Inference API", "type": "backend"},
                {"id": "gpu-1", "label": "GPU Worker 1", "type": "other"},
                {"id": "gpu-2", "label": "GPU Worker 2", "type": "other"},
                {"id": "qdrant", "label": "Qdrant Cluster", "type": "database"},
                {"id": "blob", "label": "Model S3 Store", "type": "storage"}
            ],
            "edges": [
                {"id": "e1", "source": "api", "target": "gpu-1"},
                {"id": "e2", "source": "api", "target": "gpu-2"},
                {"id": "e3", "source": "gpu-1", "target": "qdrant"},
                {"id": "e4", "source": "gpu-2", "target": "qdrant"},
                {"id": "e5", "source": "gpu-1", "target": "blob"},
                {"id": "e6", "source": "gpu-2", "target": "blob"}
            ]
        }
    },
    {
        "name": "EventNexus (Microservices Mesh)",
        "category": "Modernization",
        "industry": "Enterprise",
        "survivability": 94,
        "complexity": 75,
        "description": "Service mesh architecture with mTLS and Kafka-based real-time event auditing.",
        "metadata": {
            "archetype": "service-mesh-distributed",
            "fault_tolerance": 8,
            "scalability": 9,
            "security_level": "High (mTLS/Istio)",
            "operational_cost": "High (Overhead)",
            "traffic_capacity": "Massive Mesh Throughput",
            "failover_strategy": "Sidecar Proxy Routing",
            "primary_stack": {
                "database": "Distributed CockroachDB",
                "messaging": "Kafka / Confluent",
                "caching": "Distributed Redis Mesh"
            }
        },
        "topology": {
            "nodes": [
                {"id": "mesh", "label": "Istio Mesh", "type": "gateway"},
                {"id": "srv-a", "label": "User Service", "type": "backend"},
                {"id": "srv-b", "label": "Profile Service", "type": "backend"},
                {"id": "kafka", "label": "Kafka Bus", "type": "queue"},
                {"id": "audit-srv", "label": "Audit Service", "type": "backend"},
                {"id": "db", "label": "Audit Log DB", "type": "database"}
            ],
            "edges": [
                {"id": "e1", "source": "mesh", "target": "srv-a"},
                {"id": "e2", "source": "mesh", "target": "srv-b"},
                {"id": "e3", "source": "srv-a", "target": "kafka"},
                {"id": "e4", "source": "srv-b", "target": "kafka"},
                {"id": "e5", "source": "kafka", "target": "audit-srv"},
                {"id": "e6", "source": "audit-srv", "target": "db"}
            ]
        }
    }
]

async def seed():
    print("🚀 Initializing Qdrant Seeding...")
    store = VectorStore()
    embeddings = EmbeddingService()
    
    # Force recreate collection to match new Gemini dimensions (3072)
    try:
        print(f"🧹 Clearing existing collection: {store.collection_name}")
        await store.client.delete_collection(collection_name=store.collection_name)
    except Exception:
        pass

    await store.init_collection()
    
    for pattern in PATTERNS:
        print(f"Creating embedding for: {pattern['name']}...")
        # Create a text representation for embedding (enriched with metadata)
        text = f"{pattern['name']} {pattern['category']} {pattern['industry']} {pattern['description']} {pattern['metadata']['archetype']} {pattern['metadata']['primary_stack']['database']}"
        vector = await embeddings.generate_embedding(text)
        
        # Prepare payload
        payload = {
            "id": str(uuid4()),
            "name": pattern["name"],
            "category": pattern["category"],
            "industry": pattern["industry"],
            "survivability": pattern["survivability"],
            "complexity": pattern["complexity"],
            "description": pattern["description"],
            "metadata": pattern["metadata"],
            "nodes": pattern["topology"]["nodes"],
            "edges": pattern["topology"]["edges"]
        }
        
        await store.upsert_architecture(payload["id"], vector, payload)
        print(f"✅ Seeded: {pattern['name']}")

    print("\n🎉 Qdrant Pattern Library Seeding Complete!")

if __name__ == "__main__":
    asyncio.run(seed())
