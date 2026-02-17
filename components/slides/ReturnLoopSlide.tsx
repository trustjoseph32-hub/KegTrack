import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Minus, Plus } from 'lucide-react';

const Counter = ({ label, value, onChange, color }: any) => (
  <div className="flex flex-col items-center gap-4 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full">
     <span className="text-zinc-500 uppercase tracking-widest text-sm">{label}</span>
     <div className={`text-6xl font-bold font-mono ${color}`}>
        {value}
     </div>
     <div className="flex gap-4">
        <button onClick={() => onChange(-1)} className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
           <Minus size={20} />
        </button>
        <button onClick={() => onChange(1)} className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
           <Plus size={20} />
        </button>
     </div>
  </div>
);

const ReturnLoopSlide: React.FC = () => {
  const [full, setFull] = useState(5);
  const [empty, setEmpty] = useState(5);

  const handleChange = (setter: any, val: number) => {
     setter((prev: number) => Math.max(0, prev + val));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-12">
       <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-400 mb-2">
             <RefreshCw className="animate-spin-slow" />
             <span>Умный обмен</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
             Замкнутый цикл <span className="text-purple-500">учета.</span>
          </h1>
          <p className="text-zinc-400">Водитель фиксирует обмен в одном окне.</p>
       </div>

       <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <Counter 
             label="Сдано полных" 
             value={full} 
             color="text-emerald-500" 
             onChange={(v: number) => handleChange(setFull, v)} 
          />
          <div className="hidden md:flex items-center justify-center text-zinc-600">
             <RefreshCw size={40} />
          </div>
          <Counter 
             label="Забрано пустых" 
             value={empty} 
             color="text-red-500" 
             onChange={(v: number) => handleChange(setEmpty, v)} 
          />
       </div>
    </div>
  );
};

export default ReturnLoopSlide;