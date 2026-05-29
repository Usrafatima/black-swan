from ..vector_store.qdrant_client import VectorStore
from .embeddings import EmbeddingService
import random

class SearchService:
    def __init__(self):
        self.vector_store = VectorStore()
        self.embeddings = EmbeddingService()
        
    async def find_similar(self, text: str, limit: int = 5):
        try:
            print(f"📡 Vectorizing architecture for search...")
            vector = await self.embeddings.generate_embedding(text)
            
            print(f"🔎 Querying Qdrant for similar patterns (filtering for library entries)...")
            # We fetch more than requested to allow for diversity filtering
            results = await self.vector_store.client.query_points(
                collection_name=self.vector_store.collection_name,
                query=vector,
                limit=limit * 2,
                query_filter={
                    "must": [
                        {
                            "key": "type",
                            "match": {
                                "value": "library"
                            }
                        }
                    ]
                }
            )
            
            hits = results.points
            if not hits:
                print("❌ ERROR: No matching library patterns found in Qdrant.")
                return []
                
            print(f"✅ Success: Found {len(hits)} raw matches. Applying diversity filter...")
            
            # Diversity & Duplicate Filter
            final_hits = []
            seen_descriptions = set()
            seen_industries = set()
            
            for hit in hits:
                payload = hit.payload
                desc = payload.get("description", "").strip().lower()
                industry = payload.get("industry", "General")
                
                # 1. Skip if description is nearly identical to one already in results
                if desc in seen_descriptions:
                    continue
                
                # 2. Add score
                payload["score"] = hit.score
                
                final_hits.append(payload)
                seen_descriptions.add(desc)
                seen_industries.add(industry)
                
                if len(final_hits) >= limit:
                    break
                    
            return final_hits
        except Exception as e:
            print(f"❌ Search Error: {e}")
            return []

    async def recommend_better(self, current_text: str, requirement: str, traffic: str = "unknown", budget: str = "unknown", industry: str = "general", limit: int = 2):
        """
        Strategic Recommendation Engine: Searches for architectures that solve 
        specific weaknesses in the current design based on real-world constraints.
        """
        try:
            # Combine current state with strategic goal and constraints
            strategic_query = (
                f"Architecture optimized for high {requirement}. "
                f"Target Industry: {industry}. "
                f"Scale Requirement: {traffic}. "
                f"Budget Constraint: {budget}. "
                f"Context: {current_text}"
            )
            print(f"📡 Generating strategic embedding for requirement: {requirement}...")
            vector = await self.embeddings.generate_embedding(strategic_query)
            
            print(f"🔎 Searching Qdrant for evolutionary patterns matching constraints...")
            results = await self.vector_store.client.query_points(
                collection_name=self.vector_store.collection_name,
                query=vector,
                limit=limit,
                query_filter={
                    "must": [
                        {
                            "key": "type",
                            "match": {
                                "value": "library"
                            }
                        }
                    ]
                }
            )
            
            final_hits = []
            for hit in results.points:
                payload = hit.payload
                payload["score"] = hit.score
                payload["evolution_target"] = requirement
                final_hits.append(payload)
                
            return final_hits
        except Exception as e:
            print(f"❌ Recommendation Error: {e}")
            return []
