'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
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
  Terminal,
  Layers,
  Box,
  Radio,
  ArrowRight,
  Code2,
  Lock,
  Cpu as Processor,
  Workflow,
  Target,
  FlaskConical,
  GitBranch,
  Cloud,
  Server,
  ZapOff,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

// --- Animated Components ---

const Ticker = () => {
  const [items] = useState([
    "INITIALIZING_NEURAL_ENGINE...", 
    "MAPPING_DISTRIBUTED_TOPOLOGY...", 
    "SCANNING_FOR_SPOF...", 
    "READY_FOR_SIMULATION", 
    "VECTORS_LOADED_65536",
    "QDRANT_CONNECTED_STABLE",
    "LLM_PARSER_ACTIVE_V2",
    "LATENCY_MODELS_READY",
    "CASCADE_LOGIC_INIT_SUCCESS"
  ]);
  return (
    <div className="bg-black border-y border-white/5 py-2 overflow-hidden whitespace-nowrap sticky top-0 z-[60] backdrop-blur-md">
      <motion.div 
        animate={{ x: [0, -1200] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex gap-20"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Scanlines = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none" />
  </div>
);

const TerminalSimulation = () => {
  const [text, setText] = useState("");
  const fullText = "Analyzing: Next.js + FastAPI + Qdrant\n> Extracting topology...\n> Identified: Ingress (frontend)\n> Identified: Logic (backend)\n> Identified: Memory (qdrant)\n> Checking SPOF status...\n> ! FATAL: Single DB node in region-1\n> Initiating failure model... [OK]";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#020202] border border-white/10 rounded-lg p-6 font-mono text-[11px] leading-relaxed text-cyan-500/80 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
        <Terminal size={16} />
      </div>
      <div className="flex gap-2 mb-4 border-b border-white/5 pb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-950 border border-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-950 border border-green-500/50" />
      </div>
      <pre className="whitespace-pre-wrap">{text}<span className="animate-pulse">_</span></pre>
    </div>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <Scanlines />
      <Ticker />

      {/* Background FX */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1000px] bg-cyan-900/5 blur-[200px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto border-x border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-white flex items-center justify-center relative overflow-hidden group rotate-45 hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Zap className="text-white group-hover:text-black transition-colors z-10 -rotate-45" size={20} />
          </div>
          <div className="flex flex-col">
             <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Black Swan</span>
             <span className="text-[8px] font-mono text-cyan-600 uppercase tracking-[0.5em] mt-1 font-bold">Strategic Infrastructure Engine</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">
          <a href="#intel" className="hover:text-white transition-colors relative group">
            INTELLIGENCE
            <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-cyan-500 group-hover:w-full transition-all" />
          </a>
          <a href="#scenarios" className="hover:text-white transition-colors relative group">
            SCENARIOS
            <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-cyan-500 group-hover:w-full transition-all" />
          </a>
          <a href="#comparison" className="hover:text-white transition-colors relative group">
            MANIFESTO
            <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-cyan-500 group-hover:w-full transition-all" />
          </a>
          <Link href="/developer" className="hover:text-white transition-colors relative group">
            DEVELOPER
            <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-cyan-500 group-hover:w-full transition-all" />
          </Link>
        </div>
        <Link href="/dashboard">
          <button className="relative px-6 py-3 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] hover:bg-cyan-400 transition-all rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] group overflow-hidden">
             <span className="relative z-10 flex items-center gap-2">
               Execute Simulator <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </span>
             <div className="absolute inset-0 bg-cyan-400 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </Link>
      </nav>

      <main className="relative z-10 border-x border-white/5 max-w-[1440px] mx-auto bg-black/50">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-20 py-32 border-b border-white/5 overflow-hidden">
          <div className="max-w-[1440px] w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-5 text-cyan-500 font-mono text-[12px] uppercase tracking-[0.6em] mb-12">
                <Radio size={16} className="animate-pulse text-cyan-400" />
                NEURAL_TOPOLOGY_CORE_ONLINE_V1
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-40 items-center">
                <div className="space-y-12">
                  <h1 className="text-7xl md:text-[100px] xl:text-[120px] font-black tracking-tighter leading-[0.85] uppercase italic">
                    Simulate<br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>The Crash</span>
                  </h1>
                  <p className="text-slate-400 text-xl leading-relaxed border-l-8 border-cyan-500 pl-10 font-light italic max-w-xl">
                    Static diagrams are hallucinations. Black Swan is the truth. The only AI that breaks your system before your customers do.
                  </p>
                  <div className="flex flex-row gap-6 pt-6">
                    <Link href="/dashboard">
                      <button className="group relative px-12 py-6 bg-cyan-700 text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-cyan-500 transition-all overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <span className="relative z-10">Launch Mission Control</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>
                    </Link>
                    <button className="px-12 py-6 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white/5 transition-all">
                      Architecture Logs
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-10 bg-cyan-500/10 blur-[80px] animate-pulse pointer-events-none" />
                  <TerminalSimulation />
                  <div className="absolute -bottom-10 -right-10 p-8 bg-black border border-white/10 rounded-sm font-mono text-[10px] text-slate-600 uppercase tracking-widest leading-loose hidden xl:block backdrop-blur-2xl shadow-2xl">
                    system_status: <span className="text-green-500">READY</span><br/>
                    latency_model: <span className="text-cyan-500">ASYNC</span><br/>
                    vector_db: <span className="text-purple-500">QDRANT_v1</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] text-[40vw] font-black italic select-none">
            FAIL
          </div>
        </section>

        {/* HUD STATS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5 bg-[#010101]">
          {[
            { label: "AI Extraction Rate", val: "99.9%", sub: "Zero-shot topology mapping" },
            { label: "Vector Search", val: "0.2ms", sub: "Qdrant sub-second latency" },
            { label: "Design Patterns", val: "128k+", sub: "Trained on massive scales" },
            { label: "Risk Prediction", val: "Lvl 5", sub: "Deep catastrophic reasoning" },
          ].map((stat, i) => (
            <div key={i} className="p-20 border-r border-white/5 last:border-0 hover:bg-white/5 transition-all group relative">
              <div className="text-6xl font-black italic tracking-tighter mb-4 text-white group-hover:text-cyan-400 transition-colors uppercase">{stat.val}</div>
              <div className="text-[12px] font-mono text-cyan-700 uppercase tracking-[0.4em] mb-6 font-bold">{stat.label}</div>
              <div className="text-[11px] text-slate-600 uppercase tracking-widest font-mono group-hover:text-slate-400 transition-colors">{stat.sub}</div>
              <div className="absolute bottom-0 right-0 p-8 opacity-[0.05] group-hover:opacity-30 transition-opacity">
                 <Activity size={40} className="text-cyan-500" />
              </div>
            </div>
          ))}
        </section>

        {/* ECOSYSTEM / INTEGRATIONS */}
        <section className="py-24 px-16 border-b border-white/5 bg-black overflow-hidden">
           <div className="flex items-center gap-12 text-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] flex-shrink-0 whitespace-nowrap">Neural Ecosystem Support:</span>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="flex gap-16 animate-pulse opacity-40 hover:opacity-100 transition-opacity">
                <Cloud size={32} />
                <Database size={32} />
                <Server size={32} />
                <Layers size={32} />
                <Globe size={32} />
                <Network size={32} />
              </div>
              <div className="w-full h-[1px] bg-white/5" />
           </div>
        </section>

        {/* THE MANIFESTO: COMPARISON GRID */}
        <section id="comparison" className="py-40 px-16 bg-[#020202] border-b border-white/5">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
              <div className="space-y-12">
                 <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">The Era of<br/>Static Diagrams<br/><span className="text-red-600 underline">Is Over.</span></h2>
                 <p className="text-slate-500 text-xl leading-relaxed">Most engineering teams rely on static PDFs and whiteboard drawings. These tools are dead. Black Swan brings your architecture to life, turning symbols into live mathematical actors in a high-stakes simulation.</p>
                 <div className="space-y-8">
                    <div className="flex gap-8 items-start p-8 bg-white/5 rounded-sm border border-white/5 group hover:border-cyan-500/30 transition-all">
                       <ZapOff className="text-red-500 mt-1" size={24} />
                       <div>
                          <h4 className="text-white font-bold uppercase italic text-lg mb-2">Static Design Risk</h4>
                          <p className="text-slate-600 text-sm">Traditional tools can't predict "Cache Storms" or "Cascading Deadlocks". They only show what's there, not what's breaking.</p>
                       </div>
                    </div>
                    <div className="flex gap-8 items-start p-8 bg-cyan-900/10 rounded-sm border border-cyan-500/20 group">
                       <Zap className="text-cyan-500 mt-1 animate-pulse" size={24} />
                       <div>
                          <h4 className="text-cyan-400 font-bold uppercase italic text-lg mb-2">Neural Engine Solution</h4>
                          <p className="text-cyan-900/60 text-sm font-medium">Black Swan uses probabilistic models to simulate data flow. See saturation levels and latency spikes in realtime.</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="relative group">
                 <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full group-hover:bg-cyan-500/10 transition-all duration-1000" />
                 <div className="relative bg-black border border-white/10 rounded-sm p-12 overflow-hidden h-full">
                    <div className="mb-12 flex justify-between items-center">
                       <span className="text-[10px] font-mono text-cyan-500 tracking-[0.4em] uppercase font-black">Simulation_Metrics.log</span>
                       <BarChart3 className="text-white/20" size={20} />
                    </div>
                    <div className="space-y-10">
                       {[
                         { label: "Request Ingress", val: 88, color: "cyan" },
                         { label: "DB Saturation", val: 95, color: "red" },
                         { label: "Cache Hit Rate", val: 12, color: "red" },
                         { label: "Node Failover", val: 45, color: "amber" },
                       ].map((m, i) => (
                         <div key={i} className="space-y-3">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                               <span className="text-slate-400 italic">{m.label}</span>
                               <span className={`text-${m.color}-500 font-bold`}>{m.val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: `${m.val}%` }}
                                 transition={{ duration: 1.5, delay: i * 0.2 }}
                                 className={`h-full bg-${m.color}-500 shadow-[0_0_10px_rgba(255,255,255,0.2)]`} 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-20 p-6 border border-red-900/30 bg-red-950/10 rounded-sm">
                       <p className="text-xs text-red-500 font-mono italic">// CRITICAL_ALERT: Database SPOF reached saturation limit in region-A. Cascade expected in T-minus 4s.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* DETAILED BATTLE-TESTED SCENARIOS */}
        <section id="scenarios" className="py-40 px-16 border-b border-white/5">
           <div className="max-w-4xl mb-32">
              <span className="text-cyan-500 font-mono text-[12px] uppercase tracking-[0.6em] mb-6 block font-black underline underline-offset-8">Simulation Repository v1</span>
              <h2 className="text-8xl font-black italic uppercase tracking-tighter mb-10 leading-none">
                Predict<br/>The Disaster.
              </h2>
              <p className="text-slate-500 text-2xl font-light leading-relaxed">We trained our models on the largest outages in cloud history. Now, you can run them against your own stack with one click.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "DDoS Saturation", 
                  desc: "Malicious L7 flooding across multiple edge locations. See if your WAF and ALB configuration holds the line.",
                  icon: ShieldAlert, color: "red", code: "SIM_ERR_403"
                },
                { 
                  title: "Cache Storm", 
                  desc: "The 'Thundering Herd' effect. Witness massive DB spikes when the memory layer expires under peak traffic.",
                  icon: Activity, color: "cyan", code: "LAT_SPIKE_900"
                },
                { 
                  title: "Region Blackout", 
                  desc: "Simulate us-east-1 going dark. Test if your multi-region failover actually works as planned.",
                  icon: Globe, color: "blue", code: "DR_EVENT_500"
                },
                { 
                  title: "API Deadlock", 
                  desc: "Visualize circular dependencies between microservices causing permanent request blocking.",
                  icon: Lock, color: "purple", code: "THREAD_LOCKED"
                }
              ].map((item, i) => (
                <div key={i} className="p-12 border border-white/5 bg-[#030303] hover:border-cyan-500/50 transition-all group relative h-[500px] flex flex-col justify-between overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-slate-800 tracking-[0.3em] font-black group-hover:text-cyan-900 transition-colors">
                      {item.code}
                   </div>
                   <div className="relative z-10">
                      <div className={`w-16 h-16 bg-white/5 flex items-center justify-center mb-12 group-hover:bg-${item.color}-500/10 border border-white/5 transition-all`}>
                        <item.icon size={32} className={`text-slate-400 group-hover:text-${item.color}-400 transition-colors`} />
                      </div>
                      <h4 className="text-3xl font-black italic uppercase mb-6 tracking-tighter group-hover:text-white transition-colors">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{item.desc}</p>
                   </div>
                   <div className="relative z-10 pt-10 border-t border-white/5">
                      <button className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-600 group-hover:text-cyan-400 transition-colors font-black">
                         Deploy Scenario <ArrowRight size={14} />
                      </button>
                   </div>
                   <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                      <item.icon size={200} />
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* INTEL: VECTOR INTELLIGENCE SECTION */}
        <section id="intel" className="py-40 px-16 bg-[#020202] border-b border-white/5 relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 blur-[200px] pointer-events-none" />
          <div className="flex flex-col lg:flex-row gap-40 items-center">
            <div className="lg:w-1/2">
              <div className="p-2 bg-white/5 border border-white/10 rounded-lg inline-flex mb-10">
                <Layers className="text-cyan-500" size={20} />
              </div>
              <h2 className="text-8xl font-black italic uppercase tracking-tighter mb-12 leading-[0.8]">
                Vector-Store<br/>Intelligence
              </h2>
              <div className="space-y-16">
                <div>
                  <h5 className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.5em] mb-6 font-black flex items-center gap-4">
                     <span className="w-10 h-[1px] bg-cyan-500" /> Powered by Qdrant
                  </h5>
                  <p className="text-slate-400 text-xl leading-relaxed italic">
                    Every design analyzed by Black Swan is converted into a 1536-dimensional vector. We use this "Architecture DNA" to map your system against a database of 65,000+ audited patterns.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="p-8 border-l-4 border-white/5 hover:border-cyan-500 transition-colors bg-white/2">
                    <h6 className="text-white font-black text-lg mb-3 uppercase italic tracking-tighter">Similarity Score</h6>
                    <p className="text-slate-600 text-sm font-mono leading-relaxed uppercase tracking-wider">Quantify how close your design is to "best-in-class" systems from AWS, Netflix, and Uber.</p>
                  </div>
                  <div className="p-8 border-l-4 border-white/5 hover:border-cyan-500 transition-colors bg-white/2">
                    <h6 className="text-white font-black text-lg mb-3 uppercase italic tracking-tighter">Graph-RAG</h6>
                    <p className="text-slate-600 text-sm font-mono leading-relaxed uppercase tracking-wider">Improve AI risk accuracy by feeding real architectural context into LLM reasoning layers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square border-2 border-white/5 flex flex-col items-center justify-center group relative overflow-hidden bg-black shadow-2xl"
                    >
                       <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                       <Workflow className="text-slate-800 group-hover:text-cyan-500 transition-colors mb-6" size={60} />
                       <span className="text-[10px] font-mono text-slate-800 group-hover:text-cyan-800 transition-colors tracking-[0.4em] uppercase font-black">Pattern_Match_0{i}</span>
                    </motion.div>
                  ))}
               </div>
               <div className="absolute -top-10 -left-10 p-10 bg-cyan-600 rounded-sm rotate-12 shadow-[0_0_50px_rgba(6,182,212,0.4)] hidden xl:block">
                  <span className="text-black font-black uppercase italic tracking-tighter text-2xl italic">AI_DRIVEN</span>
               </div>
            </div>
          </div>
        </section>

        {/* THE MISSION CONTROL: TECHNICAL ROADMAP */}
        <section id="roadmap" className="py-40 px-16 border-b border-white/5">
          <div className="text-center mb-40">
            <span className="text-cyan-500 font-mono text-[12px] uppercase tracking-[0.8em] mb-6 block font-black">THE_PATH_TO_RESILIENCE</span>
            <h2 className="text-9xl font-black italic uppercase tracking-tighter italic leading-none">The Roadmap.</h2>
          </div>

          <div className="space-y-6 max-w-6xl mx-auto">
            {[
              { phase: "v0.1.0", title: "Neural Core Release", desc: "Real-time AI Parsing, React Flow visualization engine, and core failure logic.", status: "DEPLOYED", color: "cyan" },
              { phase: "v0.2.0", title: "Auto-Remediation", desc: "Automated architecture fixes suggested by the AI CTO to eliminate bottlenecks.", status: "IN_PRODUCTION", color: "amber" },
              { phase: "v0.3.0", title: "IaC Export Bridge", desc: "One-click export of resilient architecture to Terraform, Pulumi, or AWS CloudFormation.", status: "STAGING", color: "slate" },
              { phase: "v0.4.0", title: "Live Metric Sync", desc: "Deep integration with Datadog and Prometheus to drive the simulator with real traffic.", status: "PLANNING", color: "slate" }
            ].map((item, i) => (
              <div key={i} className="p-16 bg-[#040404] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 group hover:bg-white/5 hover:border-white/10 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-white/10 group-hover:bg-cyan-500 transition-colors" />
                <div className="flex gap-16 items-center">
                  <div className="text-4xl font-black font-mono text-slate-800 group-hover:text-cyan-900 transition-colors uppercase italic">{item.phase}</div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-slate-600 text-lg max-w-lg leading-relaxed group-hover:text-slate-400 transition-colors">{item.desc}</p>
                  </div>
                </div>
                <div className={`px-10 py-3 border border-${item.color}-900/50 rounded-full text-[10px] font-mono text-${item.color}-500 tracking-[0.4em] uppercase group-hover:bg-${item.color}-500/10 transition-all font-black`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL EXECUTION: THE CALL */}
        <section className="py-32 text-center relative px-6 overflow-hidden bg-black border-t border-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0ea5e908,transparent_60%)]" />
           <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
           >
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-tight">
                End System<br/>
                <span className="text-cyan-500 underline underline-offset-[12px]">Guesswork.</span>
              </h2>
              <div className="flex flex-col items-center gap-10">
                <Link href="/dashboard">
                  <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-lg hover:bg-cyan-400 transition-all rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.1)] group relative overflow-hidden active:scale-95">
                    <span className="relative z-10">Initialize Mission Control</span>
                    <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </Link>
                <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.5em] flex items-center gap-4 font-bold">
                  <GitBranch size={14} className="text-cyan-700" /> SYSTEM_SIGNATURE: VERIFIED_0x8891
                </p>
              </div>
           </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-24 px-12 bg-black border-x border-white/5 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
          <div className="max-w-md">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 border-2 border-white flex items-center justify-center rotate-45 group">
                  <Zap size={20} fill="white" className="-rotate-45 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase">Black Swan</span>
             </div>
             <p className="text-slate-600 text-sm leading-relaxed uppercase tracking-wider font-mono mb-8 italic border-l-2 border-white/5 pl-6">
               "Engineered for failure. Optimized for resilience."<br/>The next-generation strategic topology engine.
             </p>
             <div className="flex gap-8 text-slate-500">
                <Link href="#" className="hover:text-cyan-500 transition-colors"><Globe size={18} /></Link>
                <Link href="#" className="hover:text-cyan-500 transition-colors"><Code2 size={18} /></Link>
                <Link href="#" className="hover:text-cyan-500 transition-colors"><ShieldAlert size={18} /></Link>
                <Link href="#" className="hover:text-cyan-500 transition-colors"><Database size={18} /></Link>
             </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">
             <div className="flex flex-col gap-6">
                <span className="text-white font-mono tracking-[0.6em] text-[9px] font-bold border-b border-white/10 pb-3">CORE_SYSTEM</span>
                <a href="#intel" className="hover:text-cyan-500 transition-colors">Topology_v1</a>
                <a href="#scenarios" className="hover:text-cyan-500 transition-colors">Scenario_Lib</a>
                <a href="#roadmap" className="hover:text-cyan-500 transition-colors">Neural_Map</a>
             </div>
             <div className="flex flex-col gap-6">
                <span className="text-white font-mono tracking-[0.6em] text-[9px] font-bold border-b border-white/10 pb-3">TERMINAL_INTEL</span>
                <a href="#" className="hover:text-cyan-500 transition-colors">API_Reference</a>
                <a href="#" className="hover:text-cyan-500 transition-colors">Design_Log</a>
                <a href="#" className="hover:text-cyan-500 transition-colors">Benchmarks</a>
             </div>
             <div className="flex flex-col gap-6">
                <span className="text-white font-mono tracking-[0.6em] text-[9px] font-bold border-b border-white/10 pb-3">OPERATIONS</span>
                <a href="#" className="hover:text-cyan-500 transition-colors">Manifesto</a>
                <a href="#" className="hover:text-cyan-500 transition-colors">Privacy_v2</a>
                <a href="/dashboard" className="hover:text-cyan-500 transition-colors font-black text-white italic underline underline-offset-4 decoration-cyan-500">INITIATE_SESSION</a>
             </div>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-slate-800 uppercase tracking-[0.6em] gap-8">
           <div className="flex gap-12">
             <span>© 2026 BLACK_SWAN_PROTOCOLS</span>
             <span className="text-slate-900 hidden md:inline">|</span>
             <span className="text-cyan-900/40">ENCRYPTED_SIGNAL_STABLE</span>
           </div>
           <div className="flex gap-4 items-center">
              <span className="w-1.5 h-1.5 bg-green-900 rounded-full animate-pulse" />
              STATUS: MISSION_OPERATIONAL
           </div>
        </div>
      </footer>
    </div>
  );
}
