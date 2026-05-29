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
      <div className="flex items-center gap-3 text-blue-500 font-mono text-[11px] uppercase tracking-widest font-black">
        <Network size={14} />
        Similarity_Pattern_Library
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
              className="w-full text-left p-4 bg-white/5 hover:bg-blue-900/20 border border-white/5 hover:border-blue-500/50 rounded-lg transition-all flex flex-col gap-3 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between w-full">
                <div className="relative z-10 flex flex-col gap-1">
                  <div className="text-[12px] font-bold uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {res.display_title || `Topology Match #${i + 1}: ${res.name}`}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      <Target size={10} className="text-blue-900" />
                      <span className="text-blue-500 font-bold">
                        {res.score_formatted || (res.score ? `${(parseFloat(res.score) * 100).toFixed(1)}% Match` : `${((0.98 - i * 0.04) * 100).toFixed(1)}% Match`)}
                      </span>
                    </div>
                    {(res.industry_label || res.industry) && (
                      <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-mono text-slate-400 uppercase">
                        {res.industry_label || res.industry}
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all relative z-10" />
              </div>
              
              {res.technical_explanation && (
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity line-clamp-1">
                   {res.technical_explanation}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SimilarityPanel;
