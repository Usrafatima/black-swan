from ..vector_store.qdrant_client import VectorStore
from .embeddings import EmbeddingService
import random

class SearchService:
    def __init__(self):
        self.vector_store = VectorStore()
        self.embeddings = EmbeddingService()
        
    async def find_similar(self, text: str, limit: int = 3):
        try:
            print(f"📡 Vectorizing architecture for search...")
            vector = await self.embeddings.generate_embedding(text)
            
            print(f"🔎 Querying Qdrant for similar patterns...")
            results = await self.vector_store.search_similar(vector, limit)
            
            if not results:
                print("❌ ERROR: No matching patterns found in Qdrant collection.")
                return []
                
            print(f"✅ Success: Found {len(results)} matches in live database.")
            
            # Merge scores into payloads for the UI
            final_hits = []
            for hit in results:
                # In query_points, hit is a ScoredPoint object
                payload = hit.payload
                payload["score"] = hit.score
                final_hits.append(payload)
                
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
            results = await self.vector_store.search_similar(vector, limit)
            
            final_hits = []
            for hit in results:
                payload = hit.payload
                payload["score"] = hit.score
                payload["evolution_target"] = requirement
                final_hits.append(payload)
                
            return final_hits
        except Exception as e:
            print(f"❌ Recommendation Error: {e}")
            return []
