import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const CtaSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center gap-8 relative">
      {/* Background Pulse Effect */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl -z-10"
      />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircle2 size={120} className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
      </motion.div>

      <div className="space-y-4 max-w-3xl">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Готовы взять <br />
          <span className="text-emerald-500">бизнес под контроль?</span>
        </motion.h1>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-6 text-zinc-300"
        >
           <span className="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">Своя CRM</span>
           <span className="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">Телеграм Бот</span>
           <span className="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800 text-emerald-400 font-bold">0 TJS Оборудование</span>
           <span className="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">Окупаемость: 1 Мес</span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 w-full max-w-md"
      >
        <button className="w-full group bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xl font-bold py-6 px-8 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] transition-all transform active:scale-95 flex items-center justify-center gap-4">
          ЗАПРОСИТЬ ПИЛОТНЫЙ ЗАПУСК
          <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </button>
      </motion.div>
    </div>
  );
};

export default CtaSlide;