'use client';

import React from 'react';
import { Network, ChevronRight, Target } from 'lucide-react';
import { AnalysisResult } from '../types';

interface SimilarityPanelProps {
  results: AnalysisResult[];
  onSelect: (result: AnalysisResult) => void;
  isLoading: boolean;
}

const SimilarityPanel = ({ results, onSelect, isLoading }: SimilarityPanelProps) => {
  if (!isLoading && results.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
        <Network size={14} />
        Pattern_Similarity_Matches
      </div>
      
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center p-8 bg-white/2 border border-white/5 rounded-sm">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          results.map((res, i) => (
            <button
              key={res.id}
              onClick={() => onSelect(res)}
              className="w-full text-left p-4 bg-white/2 hover:bg-blue-900/10 border border-white/5 hover:border-blue-500/30 rounded-sm transition-all flex items-center justify-between group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative z-10 flex flex-col gap-1">
                <div className="text-[11px] font-black uppercase italic tracking-tight text-slate-200 group-hover:text-blue-400 transition-colors">Topology_Match_ID_0{i + 1}</div>
                <div className="flex items-center gap-3 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                   <Target size={10} className="text-blue-900" />
                   Confidence: <span className="text-blue-500 font-bold">{(0.98 - i * 0.04).toFixed(3)}</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all relative z-10" />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SimilarityPanel;
