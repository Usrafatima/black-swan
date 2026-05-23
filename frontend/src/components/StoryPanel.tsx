'use client';

import React from 'react';
import { Terminal, ShieldCheck, Activity } from 'lucide-react';

interface Story {
  human_explanation: string;
  timeline: string[];
  cto_insight: {
    breaking: string;
    why: string;
    fix: string;
  };
}

export default function StoryPanel({ story }: { story: Story | null }) {
  if (!story) return null;

  return (
    <div className="bg-[#030303]/80 border border-white/5 rounded-sm p-6 backdrop-blur-xl animate-in fade-in zoom-in duration-500 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
         <Activity size={80} className="text-cyan-500" />
      </div>

      <div className="flex items-center gap-3 mb-5 text-cyan-500">
        <Terminal size={18} />
        <h2 className="font-mono font-black tracking-widest uppercase text-xs">Live_System_Narrative</h2>
      </div>

      <section className="mb-8 relative z-10">
        <p className="text-xl text-white font-black italic tracking-tight uppercase leading-snug">
          "{story.human_explanation}"
        </p>
      </section>

      <section className="mb-8 font-mono text-[11px] space-y-2 border-l border-white/5 pl-4">
        {story.timeline.map((line: string, i: number) => (
          <div key={i} className="text-slate-400 hover:text-cyan-400 transition-colors cursor-default">
            <span className="text-cyan-800 font-bold mr-2 tracking-tighter">{line.split(']')[0]}]</span>
            {line.split(']')[1]}
          </div>
        ))}
      </section>

      <section className="bg-cyan-950/10 border border-cyan-500/10 p-6 rounded-lg relative group overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400">
            <ShieldCheck size={14} />
            AI_CTO_STRATEGIC_INTEL
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">Failure_Point</span>
              <p className="text-sm text-red-500 font-black italic uppercase tracking-tight">{story.cto_insight.breaking}</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">Remediation_Path</span>
              <p className="text-sm text-cyan-100 font-medium leading-relaxed">{story.cto_insight.fix}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
