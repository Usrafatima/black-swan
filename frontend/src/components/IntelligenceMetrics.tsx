'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Activity } from 'lucide-react';

interface ReliabilityScores {
  fault_tolerance: number;
  scalability: number;
  security: number;
  operational_complexity: number;
}

interface IntelligenceMetricsProps {
  scores: ReliabilityScores;
}

const IntelligenceMetrics = ({ scores }: IntelligenceMetricsProps) => {
  const metrics = [
    { label: 'Fault Tolerance', value: scores.fault_tolerance, icon: Shield, color: 'text-green-500', bar: 'bg-green-500' },
    { label: 'Scalability', value: scores.scalability, icon: Zap, color: 'text-amber-500', bar: 'bg-amber-500' },
    { label: 'Security Integrity', value: scores.security, icon: Target, color: 'text-blue-500', bar: 'bg-blue-500' },
    { label: 'Operational Complexity', value: scores.operational_complexity, icon: Activity, color: 'text-purple-500', bar: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 text-cyan-500 font-mono text-[11px] uppercase tracking-widest font-black border-b border-white/5 pb-2">
        <Activity size={14} />
        Production_Readiness_Scorecard
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metrics.map((m, i) => (
          <div key={m.label} className="p-4 bg-white/2 border border-white/5 rounded-lg group hover:bg-white/5 transition-all">
            <div className="flex justify-between items-center mb-3">
               <div className="flex items-center gap-3">
                 <m.icon size={16} className={`${m.color} group-hover:scale-110 transition-transform`} />
                 <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{m.label}</span>
               </div>
               <span className={`text-lg font-black font-mono ${m.color}`}>{m.value.toFixed(1)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${m.value}%` }}
                 transition={{ duration: 1, delay: i * 0.1 }}
                 className={`h-full ${m.bar} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-cyan-900/5 border border-cyan-500/10 rounded-lg relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-50" />
         <div className="flex flex-col gap-2">
            <div className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest font-black">Strategic_Recommendation</div>
            <p className="text-[12px] text-cyan-100 font-medium leading-relaxed italic">
               {scores.fault_tolerance < 70 
                 ? "CRITICAL: System exhibits high SPOF density. Redundancy tiers required for persistence layers." 
                 : scores.scalability < 70
                 ? "SCALING_ALERT: Synchronous blocking detected. Decouple services via Event Bus."
                 : "OPTIMAL: Topology aligns with standard Cloud-Native resilience patterns."}
            </p>
         </div>
      </div>
    </div>
  );
};

export default IntelligenceMetrics;
