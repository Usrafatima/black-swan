'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, BarChart3 } from 'lucide-react';

interface Metric {
  label: string;
  current: string | number;
  optimized: string | number;
  trend: 'up' | 'down' | 'neutral';
  impact: string;
}

interface IntelligenceComparisonProps {
  metrics: Metric[];
}

const IntelligenceComparison = ({ metrics }: IntelligenceComparisonProps) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black border-b border-white/5 pb-2">
        <BarChart3 size={14} />
        Survivability_Delta_Comparison
      </div>

      <div className="bg-black/40 border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-[11px] font-mono border-collapse">
          <thead>
            <tr className="bg-white/2 border-b border-white/5">
              <th className="px-4 py-3 text-left text-slate-500 font-bold uppercase tracking-widest">Metric</th>
              <th className="px-4 py-3 text-left text-red-500 font-bold uppercase tracking-widest">Base</th>
              <th className="px-4 py-3 text-left text-cyan-400 font-bold uppercase tracking-widest">Optimized</th>
              <th className="px-4 py-3 text-center text-slate-500 font-bold uppercase tracking-widest">Delta</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <motion.tr 
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-white/2 hover:bg-white/2 transition-colors group"
              >
                <td className="px-4 py-3 text-slate-300 font-bold uppercase tracking-tighter italic">{m.label}</td>
                <td className="px-4 py-3 text-red-400/60 font-black">{m.current}</td>
                <td className="px-4 py-3 text-cyan-200 font-black relative">
                   {m.optimized}
                   <div className="absolute left-0 bottom-0 h-0.5 bg-cyan-500/30 w-0 group-hover:w-full transition-all duration-700" />
                </td>
                <td className="px-4 py-3">
                   <div className="flex items-center justify-center gap-1">
                      {m.trend === 'up' && <ArrowUp size={10} className="text-green-500" />}
                      {m.trend === 'down' && <ArrowDown size={10} className="text-red-500" />}
                      <span className={`text-[9px] font-black ${m.trend === 'up' ? 'text-green-500' : m.trend === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
                        {m.impact}
                      </span>
                   </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-cyan-950/10 border border-cyan-500/10 rounded-sm">
         <div className="flex gap-3">
            <div className="w-1 h-auto bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <p className="text-[10px] text-cyan-100 font-medium leading-relaxed italic uppercase tracking-tight">
               AI_SUMMARY: Optimized pattern eliminates shared-database bottlenecks and implements circuit-breaking for external API failures.
            </p>
         </div>
      </div>
    </div>
  );
};

export default IntelligenceComparison;
