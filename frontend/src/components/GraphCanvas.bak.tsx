'use client';

import React from 'react';
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

const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode,
};

interface GraphCanvasProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

const GraphCanvas = ({ nodes, edges }: GraphCanvasProps) => {
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
      
      {/* HUD overlay elements */}
      <div className="absolute top-0 right-0 p-6 pointer-events-none">
         <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </div>
  );
};

export default GraphCanvas;
