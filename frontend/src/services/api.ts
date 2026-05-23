import { AnalysisResult, SimulationResult } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const analyzeArchitecture = async (text: string): Promise<AnalysisResult> => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to analyze architecture');
  }
  return response.json();
};

export const simulateLoad = async (
  architectureId: string, 
  loadScenario: string,
  nodes: any[],
  edges: any[]
): Promise<SimulationResult> => {
  const response = await fetch(`${API_BASE_URL}/simulate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ architecture_id: architectureId, load_scenario: loadScenario, nodes, edges }),
  });
  if (!response.ok) {
    throw new Error('Failed to simulate failure');
  }
  return response.json();
};

export const searchSimilar = async (architectureId: string, text: string, limit: int = 3): Promise<AnalysisResult[]> => {
  const response = await fetch(`${API_BASE_URL}/search-similar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ architecture_id: architectureId, text, limit }),
  });
  if (!response.ok) {
    throw new Error('Failed to search similar architectures');
  }
  return response.json();
};

export const recommendEvolution = async (
  text: string, 
  focusArea: string,
  traffic: string = "unknown",
  budget: string = "unknown",
  industry: string = "general"
): Promise<AnalysisResult[]> => {
  const response = await fetch(`${API_BASE_URL}/recommend-evolution`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      text, 
      focus_area: focusArea,
      traffic,
      budget,
      industry
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }
  return response.json();
};
