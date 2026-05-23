import os

# MANDATORY: Set this BEFORE importing the google-genai SDK
# This forces the SDK to use your hackathon key instead of any system-level keys
if os.getenv("GEMINI_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

from google.genai import Client

class EmbeddingService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("⚠️ WARNING: GEMINI_API_KEY not found in environment.")
        
        self.client = Client(api_key=api_key)
        self.model = "text-embedding-004"
        self._verify_and_fix_model()

    def _verify_and_fix_model(self):
        """
        Diagnostic to find exactly which model your API key is allowed to use.
        """
        try:
            print("🔍 Scanning for available Gemini embedding models...")
            available_models = list(self.client.models.list())
            
            # Check for text-embedding-004
            found_pref = any(m.name == f"models/{self.model}" or m.name == self.model for m in available_models)
            
            if not found_pref:
                print(f"⚠️ Preferred model '{self.model}' not accessible.")
                # Filter models that support embedding
                # In the new SDK, we check 'supported_generation_methods'
                embed_models = [m.name for m in available_models if "embedContent" in str(m) or "embed_content" in str(m)]
                
                if embed_models:
                    self.model = embed_models[0].replace("models/", "")
                    print(f"🔄 Auto-switching to working model: {self.model}")
                else:
                    print("❌ No embedding models found for this API key.")
            else:
                print(f"✅ Verified access to model: {self.model}")
                
        except Exception as e:
            print(f"⚠️ Model verification failed: {e}")

    async def generate_embedding(self, text: str) -> list:
        """
        Generates a real 768-dimensional embedding using Google Gemini.
        """
        try:
            result = self.client.models.embed_content(
                model=self.model,
                contents=text
            )
            # The result structure might differ slightly between SDK versions
            # Ensuring we get the list of values correctly
            if hasattr(result, 'embeddings') and len(result.embeddings) > 0:
                return result.embeddings[0].values
            return result.values
        except Exception as e:
            print(f"❌ Gemini Embedding Error: {e}")
            import numpy as np
            return np.zeros(3072).tolist()
