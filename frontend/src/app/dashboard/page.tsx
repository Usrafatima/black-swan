'use client';

import React, { useState } from 'react';
import { Node as FlowNode, Edge as FlowEdge } from 'reactflow';
import InputForm from '../../components/InputForm';
import GraphCanvas from '../../components/GraphCanvas';
import SimulationControls from '../../components/SimulationControls';
import SimilarityPanel from '../../components/SimilarityPanel';
import StoryPanel from '../../components/StoryPanel';
import PatternDetailModal from '../../components/PatternDetailModal';
import ArchitectureQuadrant from '../../components/ArchitectureQuadrant';
import IntelligenceMetrics from '../../components/IntelligenceMetrics';
import EvolutionPlanner from '../../components/EvolutionPlanner';
import { analyzeArchitecture, simulateLoad, searchSimilar, recommendEvolution } from '../../services/api';
import { AnalysisResult } from '../../types';
import { AlertTriangle, Info, Zap, ShieldAlert, Search, Layout, Terminal as TerminalIcon, GitBranch, Activity, Network, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [similarResults, setSimilarResults] = useState<AnalysisResult[]>([]);
  const [recommendations, setRecommendations] = useState<AnalysisResult[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<any | null>(null);
  const [detailPattern, setDetailPattern] = useState<AnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [story, setStory] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');

  // ... rest of the state logic

  const handleRefreshEvolution = async (focus: string, traffic: string, budget: string, industry: string) => {
    if (!rawText) return;
    setIsRecommending(true);
    try {
      const data = await recommendEvolution(rawText, focus, traffic, budget, industry);
      setRecommendations(data);
    } catch (err) {
      console.error('EVOLUTION_ENGINE_FAILURE');
    } finally {
      setIsRecommending(false);
    }
  };

  // Mock pattern data for Quadrant (Real data will come from Qdrant later)
  const patternMatches = [
    { id: 'current', name: 'Current System', similarity: 100, survivability: 12, complexity: 85, category: 'Draft', isCurrent: true },
    ...(similarResults.map((res, i) => ({
      id: res.id,
      name: res.name || `Matched_Topology_#0${i+1}`,
      similarity: 95 - i * 5,
      survivability: res.survivability || 88 + i * 2,
      complexity: res.complexity || 40 + i * 5,
      category: res.category || 'Resilient Pattern'
    })))
  ];

  // Mock comparison metrics
  const comparisonMetrics: any[] = [
    { label: 'Failure Propagation', current: '85%', optimized: '4%', trend: 'down', impact: '-81%' },
    { label: 'Recovery Path', current: 'Manual', optimized: 'Self-Healing', trend: 'up', impact: 'AUTO' },
    { label: 'Saturation Limit', current: '250 r/s', optimized: '12k r/s', trend: 'up', impact: '48x' },
    { label: 'SPOF Count', current: '3', optimized: '0', trend: 'down', impact: 'MINIMAL' },
  ];

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setRawText(text);
    setError(null);
    setStory(null);
    setSelectedPattern(null);
    setIsTransforming(false);
    try {
      const data = await analyzeArchitecture(text);
      setResult(data);
      renderGraph(data.nodes, data.edges);
      
      // Auto-trigger similarity search for intelligence
      handleSearch(data.id, text);
    } catch (err) {
      setError('ANALYSIS_FAILURE: Failed to parse topology.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (id: string, text: string) => {
    setIsSearching(true);
    try {
      console.log(`> INITIATING_VECTOR_SEARCH: collections: architectures, id: ${id}`);
      const data = await searchSimilar(id, text, 3);
      setSimilarResults(data);
      console.log(`> SEARCH_SUCCESS: found ${data.length} matches.`);
    } catch (err) {
      console.error('SEARCH_ENGINE_OFFLINE: Verify backend is running at http://localhost:8000');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPattern = (pattern: any) => {
    if (pattern.isCurrent || isTransforming) return;
    
    // Begin Cinematic Transformation
    setIsTransforming(true);
    setSelectedPattern(pattern);
    
    // Delay the actual graph update to sync with Narration Log
    setTimeout(() => {
      const matched = similarResults.find(r => r.id === pattern.id);
      if (matched) {
        renderGraph(matched.nodes, matched.edges);
      }
      
      // End transformation overlay after a few more seconds
      setTimeout(() => {
        setIsTransforming(false);
      }, 1000);
    }, 4000);
  };

  const renderGraph = (nodesData: any[], edgesData: any[]) => {
    const typeOrder = { 'frontend': 0, 'gateway': 0, 'backend': 1, 'queue': 2, 'cache': 2, 'database': 3, 'storage': 3, 'other': 4 };
    
    const flowNodes: FlowNode[] = nodesData.map((node, index) => {
      const row = typeOrder[node.type as keyof typeof typeOrder] ?? 2;
      const nodesInRow = nodesData.filter(n => (typeOrder[n.type as keyof typeof typeOrder] ?? 2) === row);
      const colIndex = nodesInRow.indexOf(node);
      
      return {
        id: node.id,
        type: 'serviceNode',
        // Layered layout: Y based on type, X based on position in row
        position: { 
          x: 100 + (colIndex * 250) - (nodesInRow.length * 125) + 400, 
          y: 100 + (row * 180) 
        },
        data: { label: node.label, type: node.type, status: node.status || 'healthy' },
      };
    });

    const flowEdges: FlowEdge[] = edgesData.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: true,
      style: edge.style || { stroke: '#06b6d4', strokeWidth: 2 },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  };

  const handleSimulate = async (scenario: string) => {
    if (!result) return;
    setIsSimulating(true);
    try {
      const simData: any = await simulateLoad(result.id, scenario, result.nodes, result.edges);
      setStory(simData.story);
      
      // Update node statuses
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          status: simData.failed_nodes.includes(node.id) ? 'failed' : 'healthy'
        }
      }));

      // Update edge styles for failure
      const updatedEdges = edges.map(edge => ({
        ...edge,
        animated: !simData.failed_nodes.includes(edge.target),
        style: simData.failed_nodes.includes(edge.target) 
          ? { stroke: '#ef4444', strokeWidth: 3, opacity: 1 } 
          : { stroke: '#06b6d4', strokeWidth: 2, opacity: 0.8 }
      }));

      setNodes(updatedNodes);
      setEdges(updatedEdges);
    } catch (err) {
      setError('SIMULATION_ENGINE_CRASH: Cascade logic failed.');
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    if (result) {
      setStory(null);
      renderGraph(result.nodes, result.edges);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-hidden font-sans relative">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        
        {/* Nav / Header */}
        <header className="flex justify-between items-center px-10 py-5 border-b border-white/5 backdrop-blur-md bg-black/40">
           <Link href="/" className="flex items-center gap-5 group">
             <div className="w-10 h-10 border-2 border-white flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform duration-300">
               <Zap className="text-white -rotate-45" size={20} fill="white" />
             </div>
             <div className="flex flex-col">
               <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Black Swan</span>
               <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-[0.4em] font-bold">Strategic_Mission_Control_v0.1</span>
             </div>
           </Link>

           <div className="flex items-center gap-10 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              <Link href="/developer" className="hover:text-white transition-colors">
                 DEVELOPER
              </Link>
              <div className="flex items-center gap-3 border-l border-white/10 pl-10">
                <span className={`w-2 h-2 rounded-full ${isLoading || isSimulating ? 'bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'}`} />
                STATUS: {isLoading ? 'ANALYZING_TOPOLOGY' : isSimulating ? 'PROPAGATING_FAILURE' : 'SYSTEM_IDLE'}
              </div>
              <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-10">
                 <GitBranch size={14} className="text-cyan-800" />
                 OS_VERIFIED: 0x8891
              </div>
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          
          {/* Column 1: Config (Left) */}
          <aside className="w-[320px] border-r border-white/5 bg-[#010101]/60 backdrop-blur-xl overflow-y-auto custom-scrollbar p-5 space-y-6">
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-500 font-mono text-[11px] uppercase tracking-widest font-black">
                <TerminalIcon size={14} />
                System_Input
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </section>

            {result && (
               <section className="space-y-3">
                 <EvolutionPlanner 
                    recommendations={recommendations}
                    onSelect={handleSelectPattern}
                    isLoading={isRecommending}
                    onRefresh={handleRefreshEvolution}
                 />
               </section>
            )}

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-red-500 font-mono text-[11px] uppercase tracking-widest font-black">
                <Activity size={14} />
                Simulation_Deck
              </div>
              <div className="p-4 bg-red-950/5 border border-red-900/10 rounded-lg">
                <SimulationControls 
                  onSimulate={handleSimulate} 
                  onReset={handleReset} 
                  isLoading={isSimulating} 
                  hasResult={!!result} 
                />
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-950/30 border border-red-500/50 rounded-lg text-red-200 text-xs font-bold uppercase tracking-tight flex items-start gap-3 animate-pulse">
                <AlertTriangle className="flex-shrink-0" size={16} />
                {error}
              </div>
            )}
          </aside>

          {/* Column 2: Graph (Center) */}
          <main className="flex-1 flex flex-col bg-black relative border-r border-white/5">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0ea5e903_0%,transparent_100%)]" />
            
            <div className="flex-1 relative z-10">
              <GraphCanvas nodes={nodes} edges={edges} isTransforming={isTransforming} />
              
              {/* Canvas HUD */}
              <div className="absolute top-5 left-5 p-3 border border-white/5 bg-black/60 backdrop-blur-md rounded-lg font-mono text-[10px] text-slate-400 space-y-1 uppercase tracking-widest pointer-events-none">
                 <div className="flex items-center gap-3">
                    <span className="text-cyan-600 font-bold">Topology:</span> 
                    <span className="text-white">{nodes.length} Elements</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-cyan-600 font-bold">Sync:</span> 
                    <span className="text-green-500">Active</span>
                 </div>
              </div>

              {nodes.length === 0 && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border border-white/10 bg-white/5 rounded-full flex items-center justify-center mx-auto animate-pulse">
                       <Layout size={28} className="text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-400">System Ready</h3>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mt-1">Input architecture to begin simulation</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Mini Logs */}
            <div className="px-6 py-2 border-t border-white/5 bg-[#010101] flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase tracking-widest relative z-20">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <Activity size={10} className={isSimulating ? 'text-red-500 animate-pulse' : 'text-cyan-900'} />
                    {isSimulating ? 'CASCADE_SEQ_ACTIVE' : 'IDLE'}
                 </div>
                 <div className="flex items-center gap-2">
                    <Network size={10} className="text-cyan-900" />
                    SIG: 0x8891
                 </div>
              </div>
              <div className="text-slate-800 font-bold">BS_STRATEGIC_OS_v0.1</div>
            </div>
          </main>

          {/* Column 3: Intelligence (Right) */}
          <aside className="w-[400px] bg-[#020202] overflow-y-auto custom-scrollbar p-6 space-y-8">
            
            {/* Live Insights (Story) */}
            {story ? (
              <StoryPanel story={story} />
            ) : result ? (
              <>
                <ArchitectureQuadrant 
                  matches={patternMatches} 
                  onSelect={handleSelectPattern} 
                />
                
                <SimilarityPanel 
                  results={similarResults} 
                  isLoading={isSearching} 
                  onSelect={(res) => {
                    setDetailPattern(res);
                    setIsModalOpen(true);
                    
                    const pattern = patternMatches.find(p => p.id === res.id);
                    if (pattern) handleSelectPattern(pattern);
                  }}
                />
              </>
            ) : (
              <div className="h-48 border border-white/5 border-dashed rounded-lg flex items-center justify-center text-center p-8">
                <p className="text-xs text-slate-600 font-mono uppercase tracking-widest leading-relaxed">
                  Awaiting Architecture Input...<br/>Analyze system to map strategic quadrant.
                </p>
              </div>
            )}

            {/* Production Readiness Scorecard */}
            {result && result.reliability_scores && !story && (
               <IntelligenceMetrics scores={result.reliability_scores as any} />
            )}

            {/* Risk Report */}
            {result && !story && (
              <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="flex items-center gap-3 text-amber-500 font-mono text-[11px] uppercase tracking-widest font-black border-b border-white/5 pb-2">
                  <ShieldAlert size={14} />
                  Risk_Analysis_Report
                </div>
                <div className="space-y-3">
                  {result.risks.map((risk) => (
                    <div key={risk.id} className="p-4 bg-white/2 border border-white/5 rounded-lg border-l-4 border-l-amber-600 group hover:bg-white/5 transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600/80">{risk.category}</span>
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-amber-900/20 rounded-full text-amber-500">{risk.severity}</span>
                      </div>
                      <div className="text-[15px] font-bold text-white mb-2 leading-tight uppercase italic">{risk.description}</div>
                      <div className="text-[12px] text-slate-400 leading-relaxed font-medium">
                        <span className="text-amber-500/60 font-bold uppercase mr-2 text-[10px]">Fix:</span>
                        {risk.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!result && (
              <div className="text-center py-20">
                 <Search size={32} className="text-slate-900 mx-auto mb-4" />
                 <p className="text-[10px] font-mono text-slate-800 uppercase tracking-widest">Intelligence Layer Offline</p>
              </div>
            )}
          </aside>
        </div>
      </div>

      <PatternDetailModal 
        pattern={detailPattern} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #222;
        }
      `}</style>
    </main>
  );
}
