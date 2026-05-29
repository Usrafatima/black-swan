'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Terminal, 
  Layers, 
  Server, 
  Database, 
  Code2, 
  ArrowRight,
  ExternalLink,
  Globe,
  Mail,
  Cpu,
  ArrowLeft,
  Activity,
  User,
  Search,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

const TechBadge = ({ name, icon: Icon }: { name: string, icon: any }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/2 border border-white/10 rounded-sm hover:border-cyan-500/50 transition-all group">
    <Icon size={12} className="text-cyan-900 group-hover:text-cyan-500 transition-colors" />
    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{name}</span>
  </div>
);

const WorkflowStep = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="p-8 bg-white/2 border border-white/5 rounded-sm relative group flex flex-col gap-4">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
       <Icon size={60} />
    </div>
    <div className="flex items-center gap-3">
       <span className="text-cyan-600 font-mono text-[10px] font-black uppercase tracking-widest border-b border-cyan-600">Step {number}</span>
    </div>
    <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">{title}</h3>
    <p className="text-[11px] leading-relaxed text-slate-500 font-mono uppercase tracking-tight">{desc}</p>
  </div>
);

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans relative">
      
      {/* Cinematic Background - Consistent with Project Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Global HUD Overlay */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent z-[60]" />

      <div className="relative z-10 max-w-[1200px] mx-auto min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="px-10 py-8 flex justify-between items-center">
           <Link href="/" className="flex items-center gap-4 group">
             <div className="w-10 h-10 border-2 border-white flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               <Zap className="text-white group-hover:text-black -rotate-45 z-10" size={20} fill="currentColor" />
             </div>
             <div className="flex flex-col">
               <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Black Swan</span>
               <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-[0.4em] font-bold">Project_Intelligence_Portal</span>
             </div>
           </Link>

           <Link href="/" className="px-6 py-2 border border-white/10 hover:border-cyan-500/50 hover:text-white transition-all rounded-sm flex items-center gap-3 text-[9px] font-mono font-black uppercase tracking-widest">
              <ArrowLeft size={14} />
              RETURN_TO_SYSTEM
           </Link>
        </header>

        <main className="flex-1 p-10 space-y-24">
          
          {/* 2. HOW IT WORKS SECTION */}
          <section className="space-y-12">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5" />
                <span className="text-[11px] font-mono text-slate-600 uppercase tracking-[0.4em] font-black px-4">Operating_Protocol</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <WorkflowStep 
                  number="01" 
                  title="Topology Ingest" 
                  desc="Users input raw natural language architecture descriptions. The system parses these into a high-fidelity system graph."
                  icon={Terminal}
                />
                <WorkflowStep 
                  number="02" 
                  title="Vector Matching" 
                  desc="Qdrant searches 3072-dimensional space to identify similar vetted architectures and production-grade patterns."
                  icon={Search}
                />
                <WorkflowStep 
                  number="03" 
                  title="Chaos Inference" 
                  desc="The failure simulator stress-tests the graph, predicting cascading bottlenecks and systemic survivability."
                  icon={AlertTriangle}
                />
             </div>
          </section>

          {/* 3. TECH STACK SECTION */}
          <section className="space-y-12">
             <div className="text-center space-y-4">
                <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">Technological Arsenal</h2>
                <div className="h-px w-20 bg-cyan-600 mx-auto" />
             </div>

             <div className="flex flex-wrap gap-4 justify-center">
                <TechBadge name="Next.js" icon={Layers} />
                <TechBadge name="FastAPI" icon={Server} />
                <TechBadge name="Qdrant Vector DB" icon={Database} />
                <TechBadge name="Python" icon={Cpu} />
                <TechBadge name="Tailwind CSS" icon={Code2} />
                <TechBadge name="Gemini Embeddings" icon={Zap} />
             </div>
          </section>

          {/* 4. DEVELOPER INFO SECTION */}
          <section className="flex justify-center pb-20">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="p-1 w-full max-w-md bg-gradient-to-br from-white/10 to-transparent rounded-sm"
             >
                <div className="bg-[#020202] p-10 flex flex-col items-center gap-8 text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <User size={100} className="text-white" />
                   </div>
                   
                   <div className="w-20 h-20 bg-slate-900 border border-white/10 flex items-center justify-center rounded-full">
                      <User size={32} className="text-cyan-500" />
                   </div>

                   <div className="space-y-2">
                      <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">YUSRA FATIMA</h4>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Lead Systems Architect // Black Swan Protocols</p>
                   </div>

                   <div className="flex gap-4">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all flex items-center gap-3 group">
                         <Mail size={14} className="text-slate-500 group-hover:text-white" />
                         <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-500 group-hover:text-white">GitHub</span>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all flex items-center gap-3 group">
                         <Globe size={14} className="text-slate-500 group-hover:text-white" />
                         <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-500 group-hover:text-white">LinkedIn</span>
                      </a>
                   </div>
                </div>
             </motion.div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="p-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em] gap-8">
           <span>© 2026 BLACK_SWAN_SYSTEMS</span>
           <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-900 animate-pulse" />
              IDENTITY_VERIFIED: ARCHITECT_CORE
           </div>
        </footer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #222;
        }
      `}</style>
    </div>
  );
}
