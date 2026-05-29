'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Loader2, AlertTriangle } from 'lucide-react';

interface SimulationControlsProps {
  onSimulate: (scenario: string) => Promise<void>;
  onReset: () => void;
  isLoading: boolean;
  hasResult: boolean;
}

const SimulationControls = ({ onSimulate, onReset, isLoading, hasResult }: SimulationControlsProps) => {
  const [scenario, setScenario] = useState('2m users load spike');

  return (
    <div className="flex flex-col gap-5">
      <div className="relative group">
        <select
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm font-bold uppercase tracking-widest text-slate-300 focus:border-red-500/50 outline-none appearance-none cursor-pointer transition-all"
          disabled={isLoading || !hasResult}
        >
          <optgroup label="Traffic & Ingress" className="bg-black text-slate-500 text-[10px]">
            <option value="2m users load spike">2M Load Spike</option>
            <option value="api gateway failure">API Gateway Failure</option>
            <option value="load balancer misrouting">LB Misrouting</option>
            <option value="dns resolution failure">DNS Failure</option>
          </optgroup>
          
          <optgroup label="Infrastructure & Mesh" className="bg-black text-slate-500 text-[10px]">
            <option value="service mesh failure">Service Mesh Collapse</option>
            <option value="regional database outage">DB Regional Failure</option>
            <option value="kafka broker down">Messaging Quorum Loss</option>
            <option value="region isolation split">Region Isolation</option>
          </optgroup>

          <optgroup label="Compute & Storage" className="bg-black text-slate-500 text-[10px]">
            <option value="resource exhaustion spike">CPU/RAM Exhaustion</option>
            <option value="disk io saturation">Disk I/O Saturation</option>
            <option value="cache stampede storm">Cache Storm</option>
          </optgroup>

          <optgroup label="App & Security" className="bg-black text-slate-500 text-[10px]">
            <option value="auth service down">Authentication Failure</option>
            <option value="deployment rollback crash">Deployment Failure</option>
            <option value="security ddos attack">Security: DDoS Attack</option>
          </optgroup>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-red-500/50 group-hover:text-red-500 transition-colors">
           <AlertTriangle size={16} />
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => onSimulate(scenario)}
          disabled={isLoading || !hasResult}
          className="flex-[3] relative py-4 px-4 bg-red-700 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black uppercase text-[11px] tracking-[0.2em] transition-all rounded-lg overflow-hidden group shadow-lg shadow-red-900/10"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            INITIATE_SIMULATION
          </div>
          <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
        
        <button
          onClick={onReset}
          disabled={isLoading || !hasResult}
          className="flex-1 flex items-center justify-center p-3 border border-white/10 text-slate-500 hover:text-white hover:border-white/30 disabled:opacity-30 rounded-sm transition-all bg-black/20"
          title="Reset Topology"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};

export default SimulationControls;
