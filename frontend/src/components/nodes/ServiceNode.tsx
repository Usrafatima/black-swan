import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Database, Server, Monitor, HardDrive, Cpu, Activity, AlertCircle, Globe } from 'lucide-react';
import { NodeType } from '../../types';

const iconMap: Record<NodeType, any> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  cache: Activity,
  queue: Cpu,
  storage: HardDrive,
  gateway: Globe,
  other: Activity,
};

const ServiceNode = ({ data }: NodeProps) => {
  const Icon = iconMap[data.type as NodeType] || Activity;
  const isFailed = data.status === 'failed';
  
  return (
    <div className={`px-5 py-3 shadow-2xl rounded-sm backdrop-blur-md transition-all duration-500 min-w-[180px] border-l-4 ${
      isFailed 
        ? 'bg-red-950/20 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]' 
        : 'bg-slate-900/60 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 flex items-center justify-center border transition-all duration-500 ${
          isFailed 
            ? 'bg-red-900/30 border-red-500/50 scale-110' 
            : 'bg-cyan-900/30 border-cyan-500/50'
        }`}>
          <Icon size={20} className={isFailed ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />
        </div>
        
        <div className="flex flex-col">
          <div className="text-[14px] font-black uppercase tracking-tight text-white mb-0.5">{data.label}</div>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-500 ${
            isFailed ? 'text-red-500' : 'text-cyan-600'
          }`}>
            {data.type}
          </div>
        </div>

        {isFailed && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
             <AlertCircle size={12} className="text-white" />
          </div>
        )}
      </div>

      <Handle 
        type="target" 
        position={Position.Top} 
        className={`!w-2 !h-2 !border-none transition-colors duration-500 ${isFailed ? '!bg-red-500' : '!bg-cyan-500'}`} 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`!w-2 !h-2 !border-none transition-colors duration-500 ${isFailed ? '!bg-red-500' : '!bg-cyan-500'}`} 
      />
    </div>
  );
};

export default memo(ServiceNode);
