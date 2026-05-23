'use client';

import React, { useState } from 'react';
import { Node as FlowNode, Edge as FlowEdge } from 'reactflow';
import InputForm from '../../components/InputForm';
import GraphCanvas from '../../components/GraphCanvas';
import SimulationControls from '../../components/SimulationControls';
import SimilarityPanel from '../../components/SimilarityPanel';
import StoryPanel from '../../components/StoryPanel';
import { analyzeArchitecture, simulateLoad, searchSimilar } from '../../services/api';
import { AnalysisResult } from '../../types';
import { AlertTriangle, Info, Zap, ShieldAlert, Search, Layout, Terminal as TerminalIcon, GitBranch, Activity, Network } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [similarResults, setSimilarResults] = useState<AnalysisResult[]>([]);
  const [story, setStory] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setRawText(text);
    setError(null);
    setStory(null);
    try {
      const data = await analyzeArchitecture(text);
      setResult(data);
      renderGraph(data.nodes, data.edges);
    } catch (err) {
      setError('ANALYSIS_FAILURE: Failed to parse topology.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!result || !rawText) return;
    setIsSearching(true);
    try {
      const data = await searchSimilar(result.id, rawText, 3);
      setSimilarResults(data);
    } catch (err) {
      setError('VECTOR_SEARCH_ERROR: Failed to fetch similar patterns.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSimilar = (selected: AnalysisResult) => {
    renderGraph(selected.nodes, selected.edges);
  };

  const renderGraph = (nodesData: any[], edgesData: any[]) => {
    const flowNodes: FlowNode[] = nodesData.map((node, index) => ({
      id: node.id,
      type: 'serviceNode',
      position: { x: 250 * index, y: 150 + 100 * (index % 2) },
      data: { label: node.label, type: node.type, status: node.status || 'healthy' },
    }));

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
        <header className="flex justify-between items-center px-8 py-4 border-b border-white/5 backdrop-blur-md bg-black/40">
           <Link href="/" className="flex items-center gap-4 group">
             <div className="w-8 h-8 border-2 border-white flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform duration-300">
               <Zap className="text-white -rotate-45" size={16} fill="white" />
             </div>
             <div className="flex flex-col">
               <span className="text-xl font-black tracking-tighter uppercase italic leading-none">Black Swan</span>
               <span className="text-[8px] font-mono text-cyan-600 uppercase tracking-[0.5em] font-bold">Mission_Control_v0.1.0</span>
             </div>
           </Link>

           <div className="flex items-center gap-8 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isLoading || isSimulating ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                ENGINE_STATUS: {isLoading ? 'ANALYZING' : isSimulating ? 'SIMULATING' : 'IDLE'}
              </div>
              <div className="flex items-center gap-2">
                 <GitBranch size={12} className="text-cyan-800" />
                 SIG_VERIFIED: 0x8891
              </div>
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar */}
          <aside className="w-[400px] border-r border-white/5 bg-[#010101]/60 backdrop-blur-xl overflow-y-auto custom-scrollbar p-6 space-y-8">
            
            {/* Input Panel */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                <TerminalIcon size={14} />
                Infrastructure_Input
              </div>
              <div className="p-5 bg-white/2 border border-white/5 rounded-sm">
                <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </section>

            {/* Simulation Panel */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-red-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                <Activity size={14} />
                Failure_Simulation
              </div>
              <div className="p-5 bg-red-950/5 border border-red-900/10 rounded-sm">
                <SimulationControls 
                  onSimulate={handleSimulate} 
                  onReset={handleReset} 
                  isLoading={isSimulating} 
                  hasResult={!!result} 
                />
              </div>
            </section>

            {/* Live Insights (Story) */}
            <StoryPanel story={story} />

            {/* Risk Report */}
            {result && !story && (
              <section className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-3 text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                  <ShieldAlert size={14} />
                  Risk_Analysis_Report
                </div>
                <div className="space-y-3">
                  {result.risks.map((risk) => (
                    <div key={risk.id} className="p-4 bg-amber-950/10 border border-amber-900/20 rounded-sm border-l-4 border-l-amber-500 group hover:bg-amber-950/20 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-600">{risk.category}</span>
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-amber-900/30 rounded-full text-amber-400">{risk.severity}</span>
                      </div>
                      <div className="text-sm font-black italic uppercase tracking-tight text-slate-200 mb-2">{risk.description}</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed font-medium pl-3 border-l border-white/5">
                        <span className="text-amber-700 font-bold uppercase mr-2 text-[9px]">Mitigation:</span>
                        {risk.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Search Panel */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                <Search size={14} />
                Intelligence_Search
              </div>
              <div className="p-5 bg-blue-950/5 border border-blue-900/10 rounded-sm">
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !result}
                  className="w-full relative py-3 px-4 bg-transparent border border-blue-900/30 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-500 hover:text-white disabled:opacity-30 transition-all rounded-sm group overflow-hidden"
                >
                   <div className="relative z-10 flex items-center justify-center gap-2">
                     {isSearching ? <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <Search size={14} />}
                     FETCH_SIMILAR_PATTERNS
                   </div>
                   <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <div className="mt-5">
                  <SimilarityPanel 
                    results={similarResults} 
                    onSelect={handleSelectSimilar} 
                    isLoading={isSearching} 
                  />
                </div>
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-950/30 border border-red-500/50 rounded-sm text-red-500 text-[10px] font-mono uppercase tracking-widest flex items-start gap-3 animate-pulse">
                <AlertTriangle className="flex-shrink-0" size={14} />
                {error}
              </div>
            )}
          </aside>

          {/* Main Canvas Area */}
          <main className="flex-1 flex flex-col bg-black relative">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0ea5e903_0%,transparent_100%)]" />
            
            <div className="flex-1 relative z-10">
              <GraphCanvas nodes={nodes} edges={edges} />
              
              {/* Canvas HUD */}
              <div className="absolute top-6 left-6 p-4 border border-white/5 bg-black/40 backdrop-blur-md rounded-sm font-mono text-[9px] text-slate-500 space-y-2 uppercase tracking-widest pointer-events-none">
                 <div className="flex items-center gap-4">
                    <span className="text-cyan-700 font-bold">Viewport:</span> 
                    <span>X: {nodes.length > 0 ? 'LOCKED' : 'NULL'} | Y: {nodes.length > 0 ? 'LOCKED' : 'NULL'}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-cyan-700 font-bold">Nodes:</span> 
                    <span>{nodes.length} Elements Detected</span>
                 </div>
              </div>

              {nodes.length === 0 && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 border border-white/5 bg-white/2 rounded-full flex items-center justify-center mx-auto animate-pulse">
                       <Layout size={32} className="text-slate-800" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Awaiting Topology Input</h3>
                      <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-900 mt-2">Initialize core analyze to begin</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-8 py-3 border-t border-white/5 bg-[#010101] flex justify-between items-center relative z-20">
              <div className="flex items-center gap-8 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                 <div className="flex items-center gap-2">
                    <Activity size={12} className={isSimulating ? 'text-red-500 animate-pulse' : 'text-cyan-900'} />
                    LIVE_LOGS: {isSimulating ? 'CASCADE_PROPAGATION_ACTIVE' : 'READY_FOR_COMMAND'}
                 </div>
                 <div className="flex items-center gap-2">
                    <Network size={12} className="text-cyan-900" />
                    TOPOLOGY: {nodes.length > 0 ? 'MAPPED' : 'EMPTY'}
                 </div>
              </div>
              <div className="text-[9px] font-mono text-slate-800 font-bold uppercase tracking-[0.4em]">
                 Black_Swan_Strategic_Infrastructure_OS_v0.1
              </div>
            </div>
          </main>
        </div>
      </div>

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
