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
  industry?: string;
  architecture_type?: string;
  description?: string;
  score?: string | number;
  confidence?: string;
  display_title?: string;
  industry_label?: string;
  score_formatted?: string;
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
  failure_type?: string;
  trigger_event?: string;
  cascade_flow?: string[];
  impacted_services?: string[];
  failed_nodes: string[];
  metrics?: {
    latency_increase: string;
    throughput_drop: string;
    survivability_change: string;
    blast_radius: string;
  };
  severity?: string;
  recovery_estimate?: string;
  mitigation_strategies?: string[];
  visualization_hint?: {
    pattern: string;
    root_cause: string[];
    propagation_direction: string;
  };
  survivability?: number;
  status?: string;
  story?: any;
}
