'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Activity, 
  Network, 
  Search, 
  Zap, 
  ChevronRight, 
  Database, 
  Cpu, 
  Globe,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// --- UI Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 group ${className}`}>
    {children}
  </div>
);

const NeonButton = ({ children, primary = false }: { children: React.ReactNode, primary?: boolean }) => (
  <button className={`
    relative px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300
    ${primary 
      ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]' 
      : 'bg-transparent border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-400'}
  `}>
    {children}
  </button>
);

const FeatureIcon = ({ icon: Icon, color = "cyan" }: { icon: any, color?: string }) => (
  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${color}-500/10 border border-${color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
    <Icon className={`text-${color}-400`} size={24} />
  </div>
);

// --- Sections ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Background Grid & Ambient Glow */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0ea5e922,transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1e293b11_1px,transparent_1px),linear-gradient(to_bottom,#1e293b11_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Zap className="text-black -rotate-45" size={16} fill="black" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Black Swan</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Infrastructure</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">Simulation</a>
          <a href="#search" className="hover:text-cyan-400 transition-colors">Semantic Intelligence</a>
        </div>
        <Link href="/dashboard">
          <button className="text-[10px] uppercase font-bold tracking-widest px-6 py-2 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-all">
            Launch Engine
          </button>
        </Link>
      </nav>

      <main className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Intelligence Platform v0.1.0 Live
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent uppercase italic">
              Black Swan
            </h1>
            <p className="text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase mb-8">
              Vector-Powered Infrastructure Intelligence
            </p>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Transform system topologies into <span className="text-white">strategic intelligence.</span> Detect SPOFs, score production-readiness, and evolve your architecture using neural vector search in Qdrant.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <NeonButton primary>Enter Intelligence Dashboard</NeonButton>
              </Link>
              <NeonButton>View Technical Spec</NeonButton>
            </div>
          </motion.div>
        </section>

        {/* 2. HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Topology Analysis", desc: "Convert natural language into high-fidelity system graphs with automated risk detection.", icon: Network },
              { title: "Strategic Scoring", desc: "Generate multi-dimensional reliability scores: Fault Tolerance, Scalability, and Recovery.", icon: Activity },
              { title: "Vector Evolution", desc: "Discover optimized architecture patterns from our Qdrant-powered strategic pattern library.", icon: Search }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard className="h-full group hover:bg-slate-900/60">
                  <div className="text-6xl font-black text-slate-800 mb-4 group-hover:text-cyan-900/30 transition-colors">0{i+1}</div>
                  <FeatureIcon icon={step.icon} />
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. FEATURES BENTO GRID */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">Distributed Systems Intelligence</h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Beyond basic simulation: Real Architectural Reasoning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
              <div>
                <FeatureIcon icon={Network} />
                <h3 className="text-2xl font-bold mb-4">Neural Graph Mapping</h3>
                <p className="text-slate-400">Our LLM parser extracts complex service relationships from unstructured text, mapping them to a production-ready system graph.</p>
              </div>
              <div className="mt-8 p-4 bg-black/40 rounded-xl border border-slate-800 font-mono text-[10px] text-cyan-500/60">
                // Intelligence.Engine.v1<br/>
                identifying_spofs... [DETECTED]<br/>
                calculating_survivability... 88.4%
              </div>
            </GlassCard>

            <GlassCard className="md:col-span-2">
              <FeatureIcon icon={ShieldAlert} color="red" />
              <h3 className="text-xl font-bold mb-2">High-Fidelity Risk Engine</h3>
              <p className="text-slate-400 text-sm">Detect cascading failure risks, resource saturation bottlenecks, and insecure direct-to-DB exposure patterns.</p>
            </GlassCard>

            <GlassCard className="md:col-span-2">
              <FeatureIcon icon={Search} color="blue" />
              <h3 className="text-xl font-bold mb-2">Vector Pattern Library</h3>
              <p className="text-slate-400 text-sm">Every architecture is vectorized into Qdrant. Search similar designs or find 'Step Up' versions for specific scale requirements.</p>
            </GlassCard>

            <GlassCard className="md:col-span-1">
              <FeatureIcon icon={Cpu} color="purple" />
              <h3 className="text-lg font-bold mb-2">Cascade Analysis</h3>
              <p className="text-slate-400 text-xs">Analyze how failure in one node propagates through your specific topology.</p>
            </GlassCard>

            <GlassCard className="md:col-span-1">
              <FeatureIcon icon={Globe} color="green" />
              <h3 className="text-lg font-bold mb-2">Strategic Planning</h3>
              <p className="text-slate-400 text-xs">Evolve your system from Startup to Hyperscale with data-driven path recommendations.</p>
            </GlassCard>
          </div>
        </section>

        {/* 4. LIVE PREVIEW MOCK */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/20 p-4 md:p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
            
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">The Control Room View</h2>
              <p className="text-slate-400">See your system come alive before it breaks.</p>
            </div>

            {/* Mock Graph UI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="flex justify-center items-center h-[300px] bg-black/40 rounded-2xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#06b6d4_0%,transparent_70%)]"></div>
                
                {/* Node Mock */}
                <div className="relative flex gap-12">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Globe className="text-cyan-400" size={24} />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <Database className="text-red-400" size={24} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[8px] font-bold">!</div>
                  </div>
                </div>
                {/* Animated Edge */}
                <div className="absolute top-1/2 left-[calc(50%-48px)] w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-red-500 animate-shimmer overflow-hidden">
                   <div className="w-full h-full bg-white/40 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-red-950/20 border-l-4 border-red-600 rounded-r-lg">
                  <h4 className="text-red-400 font-bold uppercase text-xs tracking-widest mb-1">Alert Detected</h4>
                  <p className="text-sm text-slate-300">Database node entering critical saturation. Response time: {'>'} 2000ms.</p>
                </div>
                <div className="p-4 bg-cyan-950/20 border-l-4 border-cyan-600 rounded-r-lg opacity-60">
                  <h4 className="text-cyan-400 font-bold uppercase text-xs tracking-widest mb-1">Engine Logic</h4>
                  <p className="text-sm text-slate-300 italic">"The system is under heavy pressure. Users will experience errors because the memory layer is choking."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FINAL CTA */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">Stop guessing system performance.<br/><span className="text-cyan-500">Simulate it.</span></h2>
            <Link href="/dashboard">
              <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-lg hover:bg-cyan-400 transition-all rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Launch Black Swan
              </button>
            </Link>
            <p className="mt-8 text-slate-500 font-mono text-[10px] uppercase tracking-widest">Free Prototype Tier • No Cloud Config Required</p>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-6 h-6 bg-slate-500 rounded-sm rotate-45 flex items-center justify-center">
              <Zap className="text-black -rotate-45" size={12} fill="black" />
            </div>
            <span className="text-sm font-black tracking-tighter uppercase italic">Black Swan</span>
          </div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © 2026 AI Architecture Systems • Engineered for failure.
          </div>
        </div>
      </footer>
    </div>
  );
}
