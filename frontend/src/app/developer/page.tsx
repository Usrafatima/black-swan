'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  ExternalLink, 
  Mail, 
  Cpu, 
  Globe, 
  Zap, 
  Shield, 
  Code2, 
  Sparkles,
  ArrowLeft,
  Target,
  User,
  Activity,
  Terminal,
  Server,
  Network,
  Database,
  Search,
  Layout,
  Lock
} from 'lucide-react';
import Link from 'next/link';

const TechTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-cyan-950/20 border border-cyan-500/10 rounded-sm text-[9px] font-mono text-cyan-500 uppercase tracking-widest font-bold hover:border-cyan-500/50 transition-colors cursor-default">
    {children}
  </span>
);

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex flex-col gap-1 mb-8">
    <div className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
      <Icon size={14} />
      {title}
    </div>
    <div className="h-px w-full bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent mt-2" />
    <div className="text-[10px] text-slate-600 font-mono uppercase tracking-widest italic">{subtitle}</div>
  </div>
);

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans relative">
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#0ea5e908_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#0ea5e905_0%,transparent_50%)]" />
      </div>

      {/* Global HUD Overlay */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent z-[60]" />
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent z-[60]" />

      <div className="relative z-10 max-w-[1600px] mx-auto min-h-screen flex flex-col">
        
        {/* TOP COMMAND BAR */}
        <header className="px-10 py-6 border-b border-white/5 backdrop-blur-md bg-black/40 flex justify-between items-center">
           <Link href="/" className="flex items-center gap-4 group">
             <div className="w-10 h-10 border-2 border-white flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               <Zap className="text-white group-hover:text-black -rotate-45 z-10" size={20} fill="currentColor" />
             </div>
             <div className="flex flex-col">
               <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Black Swan</span>
               <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-[0.4em] font-bold">Strategic_Architect_Terminal</span>
             </div>
           </Link>

           <div className="flex items-center gap-12 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-3">
                 <Activity size={14} className="text-green-500 animate-pulse" />
                 CORE_VITALS: OPTIMAL
              </div>
              <div className="hidden lg:flex items-center gap-3 border-l border-white/10 pl-12">
                 <GitBranch size={14} className="text-cyan-800" />
                 OS_VERIFIED: 0x8891
              </div>
              <Link href="/" className="px-6 py-2 border border-white/10 hover:border-cyan-500/50 hover:text-white transition-all rounded-sm flex items-center gap-3 group">
                 <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                 CLOSE_TERMINAL
              </Link>
           </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT SIDEBAR: THE ARCHITECT */}
          <aside className="lg:w-[450px] border-r border-white/5 bg-[#010101]/60 backdrop-blur-xl p-10 flex flex-col gap-12 overflow-y-auto custom-scrollbar">
            
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
               <div className="relative w-full aspect-square bg-slate-900 border border-white/10 rounded-sm overflow-hidden mb-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-[120px] font-black text-white/5 italic select-none">Y</span>
                     <User size={140} className="text-white opacity-10" />
                  </div>
                  {/* Scanning Effect */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-px bg-cyan-500 shadow-[0_0_15px_cyan] z-20 opacity-50"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                     <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-1">Yusra</h1>
                     <div className="text-[10px] font-mono text-cyan-500 font-black uppercase tracking-[0.4em]">Class: Lead_AI_Architect</div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="p-6 bg-white/2 border border-white/5 rounded-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Sparkles size={14} className="text-cyan-500" />
                     </div>
                     <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/30 pl-5">
                       "Architecting systems that don't just process data, but understand infrastructure failure as a first-class citizen."
                     </p>
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { label: 'Uptime', val: '99.98%', icon: Activity },
                       { label: 'Latency', val: '12ms', icon: Cpu },
                       { label: 'Security', val: 'Lvl 5', icon: Shield },
                       { label: 'Cognition', val: 'Agentic', icon: BrainCircuit }
                     ].map((vital, i) => (
                       <div key={i} className="p-4 bg-white/2 border border-white/5 flex flex-col gap-2 rounded-sm group hover:bg-cyan-500/5 transition-all">
                          <div className="flex justify-between items-center text-slate-600">
                             <span className="text-[8px] font-mono uppercase tracking-widest font-black">{vital.label}</span>
                             <vital.icon size={10} className="group-hover:text-cyan-500 transition-colors" />
                          </div>
                          <div className="text-lg font-black font-mono italic uppercase text-slate-200">{vital.val}</div>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>

            {/* Neural Specializations (Skills) */}
            <div className="space-y-6">
               <div className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.4em] font-black border-b border-white/5 pb-2">Neural_Specializations</div>
               <div className="space-y-3">
                  {[
                    { label: 'Agentic AI', val: 94 },
                    { label: 'Distributed Systems', val: 88 },
                    { label: 'Vector Search', val: 92 },
                    { label: 'Cybernetic UI', val: 96 }
                  ].map((skill, i) => (
                    <div key={i} className="space-y-1.5">
                       <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest text-slate-500">
                          <span>{skill.label}</span>
                          <span className="text-cyan-500">{skill.val}%</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.val}%` }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className="h-full bg-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Mission Log: Professional Timeline */}
            <div className="space-y-4">
               <div className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.4em] font-black border-b border-white/5 pb-2">Mission_Timeline</div>
               <div className="space-y-4 font-mono">
                  {[
                    { year: '2026', task: 'Strategic_Architecture_OS', status: 'COMPLETED' },
                    { year: '2025', task: 'Agentic_Infra_Automation', status: 'DEPLOYED' },
                    { year: '2024', task: 'Vector_Neural_Search_v2', status: 'OPTIMIZED' }
                  ].map((m, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                       <div className="text-[9px] text-cyan-900 font-bold group-hover:text-cyan-500 transition-colors">{m.year}</div>
                       <div className="flex flex-col gap-1">
                          <div className="text-[10px] text-slate-400 group-hover:text-white transition-colors">[{m.task}]</div>
                          <div className="text-[7px] text-slate-600 uppercase tracking-widest">{m.status}</div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* AI Terminal: Developer Quotes */}
            <div className="mt-auto pt-10">
               <div className="bg-black/60 border border-cyan-500/20 p-5 rounded-sm relative group overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-3 text-cyan-500 font-mono text-[9px] font-black">
                     <Terminal size={12} />
                     LOGS://USER_IDENTITY
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono leading-relaxed italic animate-pulse">
                    "Obsessed with turning theoretical AI into practical infrastructure steel."
                  </p>
               </div>
            </div>

          </aside>

          {/* RIGHT CONTENT: KNOWLEDGE BASE */}
          <main className="flex-1 bg-[#020202] overflow-y-auto custom-scrollbar p-12 lg:p-20 space-y-24">
            
            {/* HERO INTRODUCTION */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
               <h2 className="text-6xl lg:text-[100px] font-black italic uppercase tracking-tighter leading-none mb-12">
                 Neural<br/>
                 <span className="text-cyan-500 underline underline-offset-[16px]">Architecture.</span>
               </h2>
               <p className="max-w-3xl text-2xl text-slate-400 font-light leading-relaxed italic border-l-8 border-cyan-700 pl-12 py-4">
                 Designing the next generation of resilient infrastructure through the lens of Agentic Intelligence and Vector-Search topologies.
               </p>
            </motion.section>

            {/* BLACK SWAN DEEP DIVE */}
            <section>
               <SectionHeader 
                 icon={Code2} 
                 title="Flagship_Project_Intelligence" 
                 subtitle="Analyzing the Black Swan Engine"
               />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { 
                      title: 'Topology DNA Parser', 
                      desc: 'Translating complex human intent into high-fidelity system graphs using zero-shot neural extraction.',
                      tags: ['LangChain', 'NLP', 'Graph-Theory'],
                      icon: Globe
                    },
                    { 
                      title: 'Chaos-Sim v1.0', 
                      desc: 'A probabilistic failure propagation engine that predicts cascading bottlenecks before deployment.',
                      tags: ['Probabilistic-Math', 'FastAPI'],
                      icon: Zap
                    },
                    { 
                      title: 'Resilient Pattern Store', 
                      desc: 'Leveraging Qdrant for 1536-dimensional architecture DNA matching and remediation logic.',
                      tags: ['Vector-Search', 'Qdrant'],
                      icon: Target
                    },
                    { 
                      title: 'Mission Narrative', 
                      desc: 'Real-time event storytelling that humanizes complex infrastructure disaster logs.',
                      tags: ['AI-Agents', 'Observability'],
                      icon: Shield
                    },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="p-8 bg-white/2 border border-white/5 rounded-sm group hover:border-cyan-500/30 transition-all relative overflow-hidden"
                    >
                       <div className="absolute bottom-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                          <item.icon size={120} className="text-cyan-500" />
                       </div>
                       <item.icon size={24} className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
                       <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-4">{item.title}</h3>
                       <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8 max-w-xs">{item.desc}</p>
                       <div className="flex flex-wrap gap-2">
                          {item.tags.map(t => <TechTag key={t}>{t}</TechTag>)}
                       </div>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* RESEARCH & DEVELOPMENT */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-12">
                  <SectionHeader 
                    icon={Terminal} 
                    title="Active_Research_Focus" 
                    subtitle="Pushing the boundaries of Agentic Systems"
                  />
                  <div className="space-y-8">
                     <div className="p-8 bg-cyan-950/10 border-l-4 border-cyan-500 rounded-sm relative group">
                        <div className="absolute inset-0 bg-cyan-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                        <h4 className="text-lg font-black uppercase italic text-cyan-400 mb-4 flex items-center gap-3">
                           <Activity size={18} />
                           Autonomous Self-Healing
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium relative z-10">
                          Researching the integration of AI Agents into CI/CD pipelines to automatically rewrite IaC (Terraform) when topological weaknesses are detected.
                        </p>
                     </div>
                     <div className="p-8 bg-blue-950/10 border-l-4 border-blue-500 rounded-sm group">
                        <h4 className="text-lg font-black uppercase italic text-blue-400 mb-4 flex items-center gap-3">
                           <Network size={18} />
                           Multi-Modal Topology
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                          Exploring the use of vision models to parse architectural whiteboard drawings directly into simulator-ready JSON objects.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] animate-pulse" />
                  <div className="relative bg-black border border-white/10 p-1 rounded-lg overflow-hidden shadow-2xl">
                     <div className="bg-slate-900 aspect-video flex items-center justify-center group overflow-hidden">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                          transition={{ duration: 10, repeat: Infinity }}
                          className="relative"
                        >
                           <Cpu size={100} className="text-cyan-500/20" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles size={40} className="text-cyan-500 animate-pulse" />
                           </div>
                        </motion.div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 p-6 bg-black border border-white/5 rounded-sm font-mono text-[9px] text-cyan-900 uppercase tracking-widest leading-loose backdrop-blur-xl">
                     RESEARCH_ID: 0x9928_BETA<br/>
                     STATUS: IN_PROGRESS<br/>
                     TAG: HEALING_CORE
                  </div>
               </div>
            </section>

            {/* TECH ARSENAL */}
            <section>
               <SectionHeader 
                 icon={Cpu} 
                 title="Technological_Arsenal" 
                 subtitle="Production-grade tools and frameworks"
               />
               <div className="flex flex-wrap gap-4">
                  {[
                    'Next.js 14+', 'FastAPI', 'Qdrant Vector DB', 'React Flow', 'Framer Motion', 
                    'Tailwind CSS', 'Gemini AI', 'OpenAI SDK', 'Python 3.12', 'TypeScript',
                    'PostgreSQL', 'Docker', 'AWS', 'Kubernetes', 'Redis', 'Kafka'
                  ].map((tech) => (
                    <div key={tech} className="px-8 py-4 bg-white/2 border border-white/5 rounded-sm hover:border-cyan-500 transition-all cursor-default">
                       <span className="text-[11px] font-mono text-slate-400 font-black uppercase tracking-widest">{tech}</span>
                    </div>
                  ))}
               </div>
            </section>

            {/* FINAL MISSION FOOTER */}
            <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-slate-800 uppercase tracking-[0.6em] gap-8">
               <div className="flex gap-12">
                 <span>© 2026 BLACK_SWAN_PROTOCOLS</span>
                 <span className="text-slate-900 hidden md:inline">|</span>
                 <span className="text-cyan-900/40">ENCRYPTED_SIGNAL_STABLE</span>
               </div>
               <div className="flex gap-4 items-center">
                  <span className="w-1.5 h-1.5 bg-green-900 rounded-full animate-pulse" />
                  IDENTITY_VERIFIED: YUSRA
               </div>
            </footer>

          </main>
        </div>
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

// Missing Lucide import for BrainCircuit? Let's check common alternatives if unavailable
const BrainCircuit = ({ size, className }: { size?: number, className?: string }) => (
  <Activity size={size} className={className} />
);
