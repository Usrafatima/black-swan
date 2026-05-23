from pydantic import BaseModel, Field
from typing import List, Optional, Union
from uuid import UUID, uuid4
from enum import Enum
from datetime import datetime

class NodeType(str, Enum):
    FRONTEND = "frontend"
    BACKEND = "backend"
    DATABASE = "database"
    CACHE = "cache"
    QUEUE = "queue"
    STORAGE = "storage"
    GATEWAY = "gateway"
    OTHER = "other"

class RiskSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class RiskCategory(str, Enum):
    SCALABILITY = "scalability"
    RELIABILITY = "reliability"
    BOTTLENECK = "bottleneck"
    SECURITY = "security"

class Node(BaseModel):
    id: str
    label: str
    type: NodeType = NodeType.OTHER
    properties: Optional[dict] = None

class Edge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None

class Risk(BaseModel):
    id: Union[UUID, str] = Field(default_factory=uuid4)
    severity: RiskSeverity
    category: RiskCategory
    description: str
    mitigation: str

class Architecture(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: Optional[str] = None
    raw_input: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    nodes: List[Node]
    edges: List[Edge]
    risks: List[Risk]

class AnalysisResult(BaseModel):
    id: UUID
    nodes: List[Node]
    edges: List[Edge]
    risks: List[Risk]
    bottlenecks: List[str]
    recommendations: List[str]
    reliability_scores: Optional[dict] = None
    metadata: Optional[dict] = Field(default_factory=lambda: {
        "archetype": "distributed-system",
        "cloud_provider": "multi-cloud",
        "database_type": "polyglot",
        "messaging": "sync-rest",
        "scaling_model": "horizontal",
        "failover_strategy": "manual",
        "security_level": "standard",
        "operational_cost": "variable",
        "latency_profile": "millisecond",
        "traffic_capacity": "scalable"
    })
