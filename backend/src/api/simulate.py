from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..models.architecture import Node, Edge
from ..services.simulator import FailureSimulator
from ..services.explainer import SystemExplainer

router = APIRouter()
simulator = FailureSimulator()
explainer = SystemExplainer()

class SimulateRequest(BaseModel):
    architecture_id: str
    load_scenario: str
    nodes: List[Node] # Passing nodes/edges for simplicity in MVP instead of DB lookup
    edges: List[Edge]

@router.post("/simulate")
async def simulate_failure(request: SimulateRequest):
    sim_result = await simulator.simulate_failure(request.nodes, request.edges, request.load_scenario)
    
    # Generate narrative story with the full simulation context
    narrative = await explainer.generate_narrative({
        "traffic": request.load_scenario,
        "failed_nodes": sim_result["failed_nodes"],
        "metrics": sim_result["metrics"],
        "failure_type": sim_result["failure_type"],
        "severity": sim_result["severity"],
        "trigger": sim_result["trigger_event"],
        "survivability": sim_result["survivability"]
    })
    
    return {
        **sim_result,
        "story": narrative
    }
