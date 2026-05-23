from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.search import SearchService
from ..services.explainer import SystemExplainer
from uuid import uuid4
from typing import Optional, List

router = APIRouter()
search_service = SearchService()
explainer = SystemExplainer()

class SearchRequest(BaseModel):
    architecture_id: str
    text: str # Passing text for embedding in MVP
    limit: int = 3

class RecommendationRequest(BaseModel):
    text: str
    focus_area: str # e.g., 'scalability', 'security', 'fault_tolerance'
    traffic: Optional[str] = "unknown"
    budget: Optional[str] = "unknown"
    industry: Optional[str] = "general"

@router.post("/search-similar")
async def search_similar(request: SearchRequest):
    # In a real scenario, we'd fetch the text from a DB using architecture_id
    # or use the vector stored in Qdrant. For MVP, we use the text directly.
    hits = await search_service.find_similar(request.text, request.limit)
    print(f"DEBUG: SearchService returned {len(hits)} hits")
    
    # Enrich each hit with high-signal architectural analysis
    enriched_hits = []
    for i, hit in enumerate(hits):
        print(f"DEBUG: Enriching hit {i+1}: {hit.get('name')}")
        # Generate a structured report using the AI Architecture Analyst persona
        # We pass the hit itself as the pattern dict
        report = await explainer.generate_similarity_report(
            rank=i + 1,
            pattern=hit,
            score=hit.get("score", 0.98 - i * 0.05) # Fallback score if not present
        )
        
        # Merge the report fields into the hit
        enriched_hit = {**hit, **report}
        enriched_hits.append(enriched_hit)
    
    print(f"DEBUG: Returning {len(enriched_hits)} enriched hits to frontend")
    return enriched_hits

@router.post("/recommend-evolution")
async def recommend_evolution(request: RecommendationRequest):
    """
    Returns architectures that represent a 'Step Up' from the current design.
    """
    hits = await search_service.recommend_better(
        current_text=request.text, 
        requirement=request.focus_area,
        traffic=request.traffic,
        budget=request.budget,
        industry=request.industry
    )
    
    enriched_hits = []
    for i, hit in enumerate(hits):
        report = await explainer.generate_similarity_report(
            rank=i + 1,
            pattern=hit,
            score=hit.get("score", 0.0)
        )
        # Highlight why this is a 'Step Up'
        report["evolution_note"] = f"Optimized for {request.focus_area.upper()} in {request.industry.upper()}"
        enriched_hits.append({**hit, **report})
        
    return enriched_hits
