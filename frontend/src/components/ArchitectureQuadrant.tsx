'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

interface PatternMatch {
  id: string;
  name: string;
  similarity: number;
  survivability: number;
  complexity: number; // 0-100
  category: string;
  isCurrent?: boolean;
}

interface ArchitectureQuadrantProps {
  matches: PatternMatch[];
  onSelect: (pattern: PatternMatch) => void;
}

const ArchitectureQuadrant = ({ matches, onSelect }: ArchitectureQuadrantProps) => {
  // Constants for coordinate mapping
  const PADDING = 40;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
        <Target size={14} />
        Strategic_Intelligence_Quadrant
      </div>

      <div className="relative aspect-square w-full bg-black border border-white/5 rounded-sm overflow-hidden group">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:25px_25px] animate-pulse" />
        </div>

        {/* Axes Labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-700 uppercase tracking-widest z-20">Complexity</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-700 uppercase tracking-widest z-20">Scalability</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-mono text-slate-700 uppercase tracking-widest z-20">Fragility</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[8px] font-mono text-slate-700 uppercase tracking-widest z-20">Resilience</div>

        {/* Central Axes Lines */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-white/5 z-10" />
        <div className="absolute left-0 top-1/2 w-full h-px bg-white/5 z-10" />

        {/* Legend Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Current_System</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">AI_Recommended</span>
           </div>
        </div>

        {/* Dynamic Nodes */}
        {matches.map((arch) => {
          // Calculate positions (X: Fragility -> Resilience, Y: Scalability -> Complexity)
          // X: Resilience (0 -> 100)
          // Y: Complexity (0 -> 100)
          const left = arch.isCurrent ? 20 : (arch.survivability * 0.7) + 15;
          const top = arch.isCurrent ? 70 : 85 - (arch.complexity * 0.7);

          return (
            <motion.div
              key={arch.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              style={{ left: `${left}%`, top: `${top}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
              onClick={() => onSelect(arch)}
            >
              <div className="relative group/node">
                {/* Glow Effect */}
                <div className={`absolute inset-0 blur-xl opacity-40 transition-opacity group-hover/node:opacity-80 ${
                  arch.isCurrent ? 'bg-red-500' : 'bg-cyan-500'
                }`} />
                
                {/* Node Dot */}
                <div className={`w-3 h-3 rounded-full border-2 border-white/20 relative z-10 transition-all ${
                  arch.isCurrent ? 'bg-red-600 scale-125' : 'bg-cyan-600'
                }`}>
                  {arch.isCurrent && (
                    <div className="absolute inset-0 animate-ping bg-red-500 rounded-full opacity-75" />
                  )}
                </div>

                {/* Floating Card (Shows on Hover) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all pointer-events-none translate-y-2 group-hover/node:translate-y-0 w-40 z-[60]">
                   <div className="bg-black/95 border border-white/10 backdrop-blur-md p-3 rounded-sm shadow-2xl">
                      <div className="text-[9px] font-black uppercase tracking-tight text-white mb-2 truncate border-b border-white/10 pb-1">{arch.name}</div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-mono">
                           <span className="text-slate-500 uppercase">Survivability</span>
                           <span className={arch.survivability > 80 ? 'text-green-400' : arch.survivability > 50 ? 'text-amber-400' : 'text-red-400'}>{arch.survivability}%</span>
                        </div>
                        <div className="flex justify-between items-center text-[7px] font-mono">
                           <span className="text-slate-500 uppercase">Complexity</span>
                           <span className={arch.complexity < 40 ? 'text-green-400' : arch.complexity < 75 ? 'text-amber-400' : 'text-red-400'}>{arch.complexity}%</span>
                        </div>
                        <div className="flex justify-between items-center text-[7px] font-mono">
                           <span className="text-slate-500 uppercase">Category</span>
                           <span className="text-cyan-500">{arch.category}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[6px] font-mono text-cyan-700 font-bold uppercase tracking-widest">
                         <span>Analyze Details</span>
                         <TrendingUp size={8} />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest italic text-center">
        * Mapping system DNA against 65,000+ audited resilient patterns
      </p>
    </div>
  );
};

export default ArchitectureQuadrant;
