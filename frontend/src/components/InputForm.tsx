'use client';

import React, { useState } from 'react';
import { Send, Loader2, Workflow } from 'lucide-react';

interface InputFormProps {
  onAnalyze: (text: string) => Promise<void>;
  isLoading: boolean;
}

const InputForm = ({ onAnalyze, isLoading }: InputFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await onAnalyze(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Next.js app with a Python backend and a shared Postgres DB..."
          className="w-full h-40 p-5 bg-black/40 border border-white/5 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500/50 outline-none resize-none transition-all text-sm leading-relaxed"
          disabled={isLoading}
        />
        <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none group-focus-within:opacity-100 transition-opacity">
           <Workflow size={14} className="text-cyan-500" />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="relative py-4 px-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 transition-all rounded-sm group overflow-hidden"
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              ANALYZING_CORE...
            </>
          ) : (
            <>
              <Send size={16} />
              EXECUTE_ANALYSIS
            </>
          )}
        </div>
        {!isLoading && (
          <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        )}
      </button>
    </form>
  );
};

export default InputForm;
