'use client';

import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { AnalysisResult } from '../types';

interface EvolutionPlannerProps {
  recommendations: any[];
  onSelect: (pattern: any) => void;
  isLoading: boolean;
  onRefresh: (focus: string, traffic: string, budget: string, industry: string) => void;
}

const EvolutionPlanner = ({ recommendations, onSelect, isLoading, onRefresh }: EvolutionPlannerProps) => {
  const [traffic, setTraffic] = React.useState('medium');
  const [budget, setBudget] = React.useState('optimized');
  const [industry, setIndustry] = React.useState('fintech');
  const [currentFocus, setCurrentFocus] = React.useState('scalability');

  const focusAreas = [
    { id: 'scalability', label: 'Scale-Up', icon: TrendingUp, color: 'text-amber-500' },
    { id: 'fault_tolerance', label: 'Resilience', icon: Zap, color: 'text-green-500' },
    { id: 'security', label: 'Hardening', icon: ShieldCheck, color: 'text-blue-500' },
  ];

  const handleRefresh = (focus: string) => {
    setCurrentFocus(focus);
    onRefresh(focus, traffic, budget, industry);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 text-white font-mono text-[11px] uppercase tracking-widest font-black">
        <Sparkles size={14} className="text-amber-500" />
        Strategic_Evolution_Path
      </div>

      {/* Constraints Grid */}
      <div className="grid grid-cols-1 gap-2 p-3 bg-white/2 border border-white/5 rounded-lg">
         <div className="space-y-1">
            <label className="text-[8px] font-mono text-slate-600 uppercase font-black">Traffic_Volume</label>
            <select 
              value={traffic} 
              onChange={(e) => setTraffic(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-1 text-[10px] font-mono text-white outline-none"
            >
               <option value="low">Low (&lt;1k RPS)</option>
               <option value="medium">Medium (10k-50k RPS)</option>
               <option value="high">Enterprise (100k+ RPS)</option>
               <option value="massive">Hyperscale (1M+ RPS)</option>
            </select>
         </div>
         <div className="space-y-1">
            <label className="text-[8px] font-mono text-slate-600 uppercase font-black">Budget_Tier</label>
            <select 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-1 text-[10px] font-mono text-white outline-none"
            >
               <option value="startup">Startup (Min-Cost)</option>
               <option value="optimized">Balanced (Mid-Tier)</option>
               <option value="premium">Enterprise (Premium-Resilience)</option>
            </select>
         </div>
         <div className="space-y-1">
            <label className="text-[8px] font-mono text-slate-600 uppercase font-black">Industry_Context</label>
            <select 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-1 text-[10px] font-mono text-white outline-none"
            >
               <option value="fintech">Fintech (Security Focus)</option>
               <option value="ecommerce">E-commerce (Scale Focus)</option>
               <option value="streaming">Media/Streaming (Latency Focus)</option>
               <option value="health">Healthcare (Privacy Focus)</option>
            </select>
         </div>
      </div>

      {/* Focus Area Selectors */}
      <div className="grid grid-cols-3 gap-2">
        {focusAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => handleRefresh(area.id)}
            className={`flex flex-col items-center gap-2 p-3 border rounded-lg transition-all group ${currentFocus === area.id ? 'bg-white/10 border-white/30' : 'bg-white/2 border-white/5 hover:bg-white/5'}`}
          >
            <area.icon size={16} className={`${area.color} group-hover:scale-110 transition-transform`} />
            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">{area.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="h-24 flex items-center justify-center border border-white/5 border-dashed rounded-lg">
             <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recommendations.length > 0 ? (
          recommendations.map((rec, i) => (
            <div 
              key={rec.id}
              className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg group hover:bg-amber-500/10 transition-all cursor-pointer relative overflow-hidden"
              onClick={() => onSelect(rec)}
            >
               <div className="absolute top-0 right-0 p-2 opacity-10">
                 <TrendingUp size={40} className="text-amber-500" />
               </div>
               <div className="text-[10px] font-mono text-amber-500 uppercase font-black mb-1">Recommended_Step_Up</div>
               <div className="text-[13px] font-bold text-white uppercase italic tracking-tight mb-2">{rec.name}</div>
               <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                 {rec.technical_explanation}
               </div>
               <div className="mt-3 flex items-center gap-2">
                  <div className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                    {(parseFloat(rec.score) * 100).toFixed(1)}% Match
                  </div>
                  <div className="text-[9px] font-mono text-slate-600 uppercase font-black italic">Click to transform_</div>
               </div>
            </div>
          ))
        ) : (
          <div className="p-4 border border-white/5 rounded-lg text-center">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Select focus area to generate path...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvolutionPlanner;
