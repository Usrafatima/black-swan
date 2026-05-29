import asyncio
import os
import sys
import json
import random
from uuid import uuid4
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(override=True)

# Add src to path
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(script_dir, "src"))

from src.vector_store.qdrant_client import VectorStore
from src.services.embeddings import EmbeddingService
from src.services.parser import ArchitectureParser

def generate_metadata(pattern):
    """Dynamically generate metadata based on the architecture pattern."""
    tech_count = len(pattern.get('key_technologies', []))
    desc = pattern.get('description', '').lower()
    
    # Heuristics for survivability and complexity
    survivability = random.randint(85, 99)
    if "low-latency" in desc or "real-time" in desc:
        complexity = random.randint(75, 98)
    elif "distributed" in desc or "multi-region" in desc:
        complexity = random.randint(80, 95)
    else:
        complexity = random.randint(50, 85)
        
    archetypes = {
        "Fintech": "high-consistency-ledger",
        "Logistics": "dynamic-graph-twin",
        "Healthcare": "secure-data-mesh",
        "AdTech": "low-latency-rtb",
        "Energy": "predictive-hpc-farm",
        "Streaming": "edge-distribution-mesh",
        "E-commerce": "event-driven-scale",
        "SaaS": "multi-tenant-metadata-mesh",
        "Gaming": "spatial-sync-grid",
        "Public Sector": "distributed-public-service"
    }
    
    archetype = archetypes.get(pattern['industry'], "cloud-native-microservices")
    
    return {
        "archetype": archetype,
        "fault_tolerance": random.randint(7, 10),
        "scalability": random.randint(7, 10),
        "security_level": "High" if survivability > 90 else "Standard",
        "operational_cost": "Premium" if complexity > 85 else "Standard",
        "traffic_capacity": "Scalable",
        "failover_strategy": "Automated",
        "primary_stack": {
            "database": pattern['key_technologies'][-1] if tech_count > 0 else "N/A",
            "messaging": pattern['key_technologies'][1] if tech_count > 1 else "N/A",
            "caching": pattern['key_technologies'][0] if tech_count > 0 else "N/A"
        }
    }

async def seed():
    print("🚀 Initializing Qdrant Seeding with UNIQUE Architecture Library V3...")
    store = VectorStore()
    embeddings = EmbeddingService()
    parser = ArchitectureParser()
    
    # Load the new unique library
    json_path = os.path.join(os.getcwd(), "backend", "src", "data", "architecture_library_v3.json")
    if not os.path.exists(json_path):
        print(f"❌ ERROR: {json_path} not found!")
        return

    with open(json_path, "r") as f:
        PATTERNS = json.load(f)

    print(f"📂 Loaded {len(PATTERNS)} unique architecture entries from V3.")

    # Force recreate collection
    try:
        print(f"🧹 Clearing existing collection: {store.collection_name}")
        await store.client.delete_collection(collection_name=store.collection_name)
    except Exception as e:
        print(f"Note: Could not delete collection (might not exist): {e}")

    await store.init_collection()
    
    indexed_descriptions = set()
    indexed_count = 0

    for pattern in PATTERNS:
        # 1. Exact duplicate detection (description)
        desc_hash = pattern['description'].strip().lower()
        if desc_hash in indexed_descriptions:
            print(f"⚠️ Skipping duplicate description: {pattern['name']}")
            continue
            
        print(f"Processing: {pattern['name']}...")
        
        # 2. Generate topology
        nodes, edges = await parser.parse_text(pattern['description'] + " " + " ".join(pattern['key_technologies']))
        
        # 3. Create rich intelligence metadata
        metadata = generate_metadata(pattern)
        
        # 4. Create a text representation for embedding (enriched)
        text = f"{pattern['name']} {pattern['industry']} {pattern.get('architecture_type', '')} {pattern['description']} {metadata['archetype']} {' '.join(pattern['key_technologies'])}"
        vector = await embeddings.generate_embedding(text)
        
        # 5. Semantic duplicate detection (Optional: search Qdrant for very high similarity)
        # For seeding, we rely on the clean JSON, but we could add a check here.
        
        # 6. Prepare payload for Qdrant
        payload = {
            "id": pattern.get('id', str(uuid4())),
            "name": pattern["name"],
            "type": "library", # Crucial for filtering
            "architecture_type": pattern.get('architecture_type', 'General'),
            "industry": pattern["industry"],
            "survivability": metadata.get('survivability', random.randint(85, 98)),
            "complexity": metadata.get('complexity', random.randint(60, 95)),
            "description": pattern["description"],
            "metadata": metadata,
            "nodes": [n.dict() if hasattr(n, 'dict') else n for n in nodes],
            "edges": [e.dict() if hasattr(e, 'dict') else e for e in edges]
        }
        
        await store.upsert_architecture(payload["id"], vector, payload)
        indexed_descriptions.add(desc_hash)
        indexed_count += 1
        print(f"✅ Seeded: {pattern['name']}")

    print(f"\n🎉 Qdrant Pattern Library Seeding Complete! {indexed_count} unique architectures indexed.")

if __name__ == "__main__":
    asyncio.run(seed())
