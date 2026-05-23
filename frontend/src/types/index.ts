export type NodeType = 'frontend' | 'backend' | 'database' | 'cache' | 'queue' | 'storage' | 'gateway' | 'other';
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';
export type RiskCategory = 'scalability' | 'reliability' | 'bottleneck' | 'security';

export interface Node {
  id: string;
  label: string;
  type: NodeType;
  properties?: Record<string, any>;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Risk {
  id: string;
  severity: RiskSeverity;
  category: RiskCategory;
  description: string;
  mitigation: string;
}

export interface AnalysisResult {
  id: string;
  name?: string;
  score?: string;
  confidence?: string;
  nodes: Node[];
  edges: Edge[];
  risks: Risk[];
  bottlenecks: string[];
  recommendations: string[];
  technical_explanation?: string;
  why_matches?: string[];
  real_world_usage?: string[];
  analogy?: string;
  survivability?: number;
  complexity?: number;
  category?: string;
}

export interface SimulationResult {
  failed_nodes: string[];
  bottlenecks: string[];
  failure_propagation: Record<string, any>[];
}
