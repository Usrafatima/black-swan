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
          className="w-full bg-black/40 border border-white/10 rounded-sm p-4 text-[11px] font-mono uppercase tracking-widest text-slate-300 focus:border-red-500/50 outline-none appearance-none cursor-pointer transition-all"
          disabled={isLoading || !hasResult}
        >
          <option value="2m users load spike">2M_LOAD_SPIKE</option>
          <option value="api gateway timeout">API_TIMEOUT_ERR</option>
          <option value="cache expiration storm">CACHE_STORM_v2</option>
          <option value="regional database outage">REGION_DATABASE_FAIL</option>
          <option value="security ddos attack">SECURITY_DDOS_L7</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-red-500/50 group-hover:text-red-500 transition-colors">
           <AlertTriangle size={14} />
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => onSimulate(scenario)}
          disabled={isLoading || !hasResult}
          className="flex-[3] relative py-3 px-4 bg-red-700 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black uppercase text-[10px] tracking-[0.3em] transition-all rounded-sm overflow-hidden group shadow-lg shadow-red-900/10"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} />}
            INITIATE_FAILURE
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
