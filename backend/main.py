import uvicorn
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables IMMEDIATELY before any other imports
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.analyze import router as analyze_router
from src.api.simulate import router as simulate_router
from src.api.search import router as search_router
from src.vector_store.qdrant_client import VectorStore

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    vstore = VectorStore()
    await vstore.init_collection()
    yield
    # Shutdown logic (if any)

app = FastAPI(title="Black Swan API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(simulate_router)
app.include_router(search_router)

@app.get("/")
async def root():
    return {"message": "Black Swan API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
