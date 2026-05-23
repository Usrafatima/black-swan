'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node as FlowNode, 
  Edge as FlowEdge,
  NodeTypes,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import ServiceNode from './nodes/ServiceNode';

const GraphCanvas = ({ nodes, edges, isTransforming }: GraphCanvasProps) => {
  const nodeTypes = React.useMemo(() => ({
    serviceNode: ServiceNode,
  }), []);

  const [log, setLog] = React.useState<string[]>([]);
  const transformationSteps = [
    "> ANALYZING TOPOLOGY DNA...",
    "> MATCHING RESILIENT PATTERNS...",
    "> TRANSFORMING INFRASTRUCTURE...",
    "> INJECTING REDUNDANCY LAYERS...",
    "> STATUS: SYSTEM_OPTIMIZED_0x8891"
  ];

  React.useEffect(() => {
    if (isTransforming) {
      setLog([]);
      transformationSteps.forEach((step, i) => {
        setTimeout(() => {
          setLog(prev => [...prev, step]);
        }, i * 800);
      });
    }
  }, [isTransforming]);

  return (
    <div className="h-full w-full bg-black border border-white/5 rounded-sm overflow-hidden shadow-2xl relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-black"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={30} 
          size={1} 
          color="#1e293b" 
          className="opacity-40" 
        />
        <Controls 
          className="bg-black/80 border border-white/10 fill-white rounded-sm shadow-xl"
          showInteractive={false}
        />
      </ReactFlow>
      
      {/* Transformation Log Overlay */}
      {isTransforming && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
           <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 p-10 max-w-md w-full animate-in zoom-in duration-500">
              <div className="flex items-center gap-3 mb-6 text-cyan-500">
                 <Sparkles className="animate-spin-slow" size={20} />
                 <span className="font-mono font-black uppercase tracking-[0.4em] text-sm text-white">Neural_Transformation_Init</span>
              </div>
              <div className="space-y-3 font-mono text-[10px] uppercase tracking-widest text-cyan-500/80">
                 {log.map((line, i) => (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     key={i}
                     className={i === log.length - 1 ? 'text-white font-bold' : ''}
                   >
                     {line}
                   </motion.div>
                 ))}
                 <div className="w-full h-1 bg-white/5 mt-6 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '100%' }} 
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute inset-0 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" 
                    />
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* HUD overlay elements */}
      <div className="absolute top-0 right-0 p-6 pointer-events-none">
         <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </div>
  );
};

export default GraphCanvas;
