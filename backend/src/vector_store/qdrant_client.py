import os
from qdrant_client import AsyncQdrantClient
from qdrant_client.http.models import Distance, VectorParams

class VectorStore:
    def __init__(self):
        self.host = os.getenv("QDRANT_HOST", "localhost")
        self.port = int(os.getenv("QDRANT_PORT", 6333))
        self.api_key = os.getenv("QDRANT_API_KEY")
        self._client = None
        self.collection_name = "architectures"

    @property
    def client(self):
        if self._client is None:
            # If host is a full URL, use it directly as 'url'
            if self.host.startswith("http"):
                self._client = AsyncQdrantClient(
                    url=self.host,
                    api_key=self.api_key,
                    check_compatibility=False
                )
            else:
                self._client = AsyncQdrantClient(
                    host=self.host, 
                    port=self.port,
                    api_key=self.api_key,
                    check_compatibility=False
                )
        return self._client
        
    async def init_collection(self):
        try:
            print(f"📡 Attempting to connect to Qdrant at {self.host}...")
            # Check if collection exists first
            collections = await self.client.get_collections()
            exists = any(c.name == self.collection_name for c in collections.collections)
            
            if not exists:
                print(f"Creating new collection: {self.collection_name}")
                await self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=3072, distance=Distance.COSINE),
                )
            print(f"✅ Qdrant connection verified. Collection '{self.collection_name}' is ready.")
        except Exception as e:
            print(f"❌ FATAL: Could not connect to Qdrant. Vector search will FAIL.")
            print(f"Error details: {e}")
            raise e

    async def upsert_architecture(self, arch_id: str, vector: list, payload: dict):
        try:
            await self.client.upsert(
                collection_name=self.collection_name,
                points=[
                    {
                        "id": arch_id,
                        "vector": vector,
                        "payload": payload
                    }
                ]
            )
        except Exception as e:
            print(f"Error saving to Qdrant: {e}")

    async def search_similar(self, vector: list, limit: int = 3):
        try:
            results = await self.client.query_points(
                collection_name=self.collection_name,
                query=vector,
                limit=limit
            )
            return results.points
        except Exception as e:
            print(f"Error searching Qdrant: {e}")
            return []
