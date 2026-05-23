'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, Activity, Globe, Info, Zap, Target, Cpu } from 'lucide-react';
import { AnalysisResult } from '../types';

interface PatternDetailModalProps {
  pattern: AnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
}

const PatternDetailModal = ({ pattern, isOpen, onClose }: PatternDetailModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !pattern) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
          <div className="flex flex-col gap-1">
             <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] font-black">Architecture_Deep_Dive</div>
             <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">{pattern.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all group"
          >
            <X size={16} className="text-slate-500 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
               <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
               <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">Decrypting_Topology_Signals...</div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                    <Target size={10} className="text-blue-500" /> Confidence
                  </div>
                  <div className="text-lg font-black font-mono text-blue-400">
                    {pattern.score ? `${(parseFloat(pattern.score) * 100).toFixed(1)}%` : '98.0%'}
                  </div>
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                    <Shield size={10} className="text-green-500" /> Survivability
                  </div>
                  <div className="text-lg font-black font-mono text-green-400">{pattern.survivability || '88'}%</div>
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col gap-1 hidden md:flex">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                    <Activity size={10} className="text-amber-500" /> Complexity
                  </div>
                  <div className="text-lg font-black font-mono text-amber-400">{pattern.complexity || '45'}</div>
                </div>
              </div>

              {/* 1. Technical Explanation */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-blue-500 font-mono text-[11px] uppercase tracking-widest font-black border-b border-white/5 pb-2">
                  <Cpu size={14} />
                  1. Technical Explanation
                </div>
                <p className="text-[14px] text-slate-300 leading-relaxed font-medium">
                  {pattern.technical_explanation || "No technical breakdown available for this pattern."}
                </p>
                
                {/* Rich Infrastructure Metadata */}
                {(pattern as any).metadata && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase font-black">Archetype</div>
                      <div className="text-xs text-blue-300 font-bold uppercase tracking-tight">{(pattern as any).metadata.archetype}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase font-black">Failover_Strategy</div>
                      <div className="text-xs text-blue-300 font-bold uppercase tracking-tight">{(pattern as any).metadata.failover_strategy}</div>
                    </div>
                  </div>
                )}
              </section>

              {/* Tech Stack Breakdown */}
              {(pattern as any).metadata?.primary_stack && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-500 font-mono text-[11px] uppercase tracking-widest font-black border-b border-white/5 pb-2">
                    <TerminalIcon size={14} />
                    Primary_Infrastructure_Stack
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-[10px] font-mono">
                    <div className="p-2 bg-white/2 border border-white/5 rounded">
                      <div className="text-slate-600 mb-1 uppercase font-black">DB</div>
                      <div className="text-white">{(pattern as any).metadata.primary_stack.database}</div>
                    </div>
                    <div className="p-2 bg-white/2 border border-white/5 rounded">
                      <div className="text-slate-600 mb-1 uppercase font-black">MSG</div>
                      <div className="text-white">{(pattern as any).metadata.primary_stack.messaging}</div>
                    </div>
                    <div className="p-2 bg-white/2 border border-white/5 rounded">
                      <div className="text-slate-600 mb-1 uppercase font-black">CACHE</div>
                      <div className="text-white">{(pattern as any).metadata.primary_stack.caching}</div>
                    </div>
                  </div>
                </section>
              )}

              {/* 2. Why This Match Was Detected */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-blue-500 font-mono text-[11px] uppercase tracking-widest font-black border-b border-white/5 pb-2">
                  <Zap size={14} />
                  2. Why This Match Was Detected
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pattern.why_matches?.map((signal, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/2 border border-white/5 rounded-lg group hover:bg-blue-500/5 hover:border-blue-500/20 transition-all">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                       <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-blue-300 transition-colors">{signal}</span>
                    </div>
                  )) || (
                    <div className="text-[11px] text-slate-500 italic">Structural alignment signals not categorized.</div>
                  )}
                </div>
              </section>

              {/* 3. Real-World Usage */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-blue-500 font-mono text-[11px] uppercase tracking-widest font-black border-b border-white/5 pb-2">
                  <Globe size={14} />
                  3. Real-World Usage
                </div>
                <div className="flex flex-wrap gap-2">
                  {pattern.real_world_usage?.map((usage, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-widest font-black">
                      {usage}
                    </span>
                  )) || (
                    <span className="text-[11px] text-slate-500 italic">General cloud-native context.</span>
                  )}
                </div>
              </section>

              {/* 4. Simplified Analogy */}
              {pattern.analogy && (
                <section className="space-y-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Info size={40} className="text-blue-500" />
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest font-black mb-1">
                    <Info size={12} />
                    4. Simplified Analogy
                  </div>
                  <p className="text-[12px] text-blue-100/70 italic font-medium leading-relaxed relative z-10">
                    "{pattern.analogy}"
                  </p>
                </section>
              )}
            </div>
          )}
        </div>

        {/* Footer / Call to Action */}
        <div className="p-6 border-t border-white/5 bg-white/2 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
           >
             Close_Analysis
           </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #111;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #222;
        }
      `}</style>
    </div>
  );
};

export default PatternDetailModal;
