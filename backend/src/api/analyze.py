from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..models.architecture import AnalysisResult, NodeType
from ..services.parser import ArchitectureParser
from ..services.analyzer import ArchitectureAnalyzer
from ..services.embeddings import EmbeddingService
from ..vector_store.qdrant_client import VectorStore
from uuid import uuid4

router = APIRouter()
parser = ArchitectureParser()
analyzer = ArchitectureAnalyzer()
embeddings = EmbeddingService()
v_store = VectorStore()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_architecture(request: AnalyzeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text input is required")
        
    nodes, edges = await parser.parse_text(request.text)
    if not nodes:
        raise HTTPException(status_code=400, detail="Could not identify any components in the provided text")
        
    # 1. Advanced Risk Analysis
    risks = await analyzer.analyze_risks(nodes, edges)
    bottlenecks = await analyzer.identify_bottlenecks(nodes, edges)
    
    # 2. Reliability Scoring
    scores = await analyzer.calculate_reliability_scores(nodes, edges)
    
    # 3. Dynamic Recommendations based on risks
    recommendations = []
    if any(r.category == "reliability" for r in risks):
        recommendations.append("Apply Active-Active replication for critical storage layers.")
    if any(r.category == "bottleneck" for r in risks):
        recommendations.append("Introduce an asynchronous messaging layer (Kafka/SQS) to decouple high-load nodes.")
    if not recommendations:
        recommendations = ["Consider multi-region deployment for 99.99% availability.", "Optimize database indexing for frequent query paths."]

    # 4. Derive Metadata
    type_counts = {}
    for n in nodes: type_counts[n.type] = type_counts.get(n.type, 0) + 1
    
    metadata = {
        "archetype": "microservices" if len(nodes) > 5 else "monolith-split",
        "cloud_provider": "aws-preferred" if any("aws" in n.label.lower() for n in nodes) else "agnostic",
        "database_type": "distributed" if type_counts.get(NodeType.DATABASE, 0) > 1 else "standalone",
        "messaging": "event-driven" if NodeType.QUEUE in type_counts else "synchronous-rest",
        "scaling_model": "horizontal-autoscaling",
        "failover_strategy": "automated-multi-az" if type_counts.get(NodeType.GATEWAY, 0) > 1 else "manual-recovery",
        "security_level": "hardened" if scores.get("security", 100) > 80 else "standard",
        "operational_cost": "high-performance" if len(nodes) > 10 else "optimized-low",
        "latency_profile": "low-latency-edge" if NodeType.CACHE in type_counts else "standard-cloud",
        "traffic_capacity": "100k+ RPS" if NodeType.QUEUE in type_counts else "10k RPS"
    }

    result = AnalysisResult(
        id=uuid4(),
        nodes=nodes,
        edges=edges,
        risks=risks,
        bottlenecks=bottlenecks,
        recommendations=recommendations,
        reliability_scores=scores,
        metadata=metadata
    )

    # Store in Qdrant for future similarity searches
    try:
        vector = await embeddings.generate_embedding(request.text)
        # Convert UUID to string for Qdrant payload serialization
        payload = result.dict()
        payload['id'] = str(payload['id'])
        for risk in payload['risks']:
            risk['id'] = str(risk['id'])
        
        # Add additional searchable fields to payload
        payload['name'] = f"Analyzed_Topology_{str(result.id)[:8]}"
        payload['description'] = request.text
        payload['survivability'] = scores.get('fault_tolerance', 0)
        payload['complexity'] = scores.get('operational_complexity', 0)

        await v_store.upsert_architecture(
            arch_id=str(result.id),
            vector=vector,
            payload=payload
        )
    except Exception as e:
        print(f"Warning: Failed to save to Qdrant: {e}")
    
    return result
