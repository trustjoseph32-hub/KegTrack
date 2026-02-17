import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShieldCheck, Ban, Camera, Navigation, RefreshCw } from 'lucide-react';

const GpsShieldSlide: React.FC = () => {
  const [state, setState] = useState<'idle' | 'error' | 'moving' | 'success'>('idle');

  const startDemo = () => {
    setState('error');
    // Sequence
    setTimeout(() => {
       setState('moving');
       setTimeout(() => {
          setState('success');
       }, 2000); // Driving time
    }, 2500); // Time to read error
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-12">
      {/* Text Content */}
      <div className="flex-1 text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          GPS-Защита <br />
          <span className="text-emerald-500">(Слой Правды).</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-lg">
          Мы обосновываем «неубиваемость» системы. Она честнее любого самого верного сотрудника.
        </p>

        {state === 'idle' && (
          <button 
             onClick={startDemo}
             className="mt-4 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg border border-zinc-600 transition-all flex items-center gap-2"
          >
             <Navigation size={18} /> СИМУЛЯЦИЯ: ПОПЫТКА ОБМАНА
          </button>
        )}

        <div className="space-y-3 mt-8">
           <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${state === 'error' ? 'bg-red-900/20 border-red-900 text-red-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500'}`}>
              <Ban size={20} /> 
              <span>Блокировка: >50м от точки</span>
           </div>
           <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${state === 'success' ? 'bg-emerald-900/20 border-emerald-900 text-emerald-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500'}`}>
              <ShieldCheck size={20} /> 
              <span>Разрешение: Координаты верны</span>
           </div>
        </div>
      </div>

       {/* Visual: Camera Interface */}
      <div className="flex-1 flex justify-center items-center">
         <motion.div 
            className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
            animate={state === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
         >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-start pt-8 bg-gradient-to-b from-black/80 to-transparent">
               <span className="text-white/80 text-xs font-mono">CAM-01</span>
               <div className="flex gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <div className="w-4 h-2 bg-white rounded-[1px] border border-white/30"></div>
               </div>
            </div>

            {/* Viewfinder Content */}
            <div className="relative flex-1 bg-zinc-900 overflow-hidden">
               {/* Background Simulation */}
               <motion.div 
                  className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"
                  animate={state === 'moving' ? { backgroundPosition: ["0px 0px", "0px 1000px"] } : {}}
                  transition={{ duration: 2, ease: "linear" }}
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 text-white/50">+</div>
                  </div>
               </div>

               {/* Overlay Alerts */}
               <AnimatePresence mode="wait">
                  {state === 'error' && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
                     >
                        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                           <Ban size={40} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">ОШИБКА</h2>
                        <p className="text-white font-mono text-sm">ВЫ ДАЛЕКО ОТ ТОЧКИ</p>
                        <div className="mt-4 px-3 py-1 bg-black/40 rounded text-red-200 font-mono text-xs">
                           GPS ОТКЛОНЕНИЕ: 2.1 KM
                        </div>
                     </motion.div>
                  )}

                  {state === 'moving' && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-700 flex items-center gap-2"
                     >
                        <RefreshCw size={14} className="animate-spin text-emerald-500" />
                        <span className="text-xs text-white font-mono">ОБНОВЛЕНИЕ ГЕОПОЗИЦИИ...</span>
                     </motion.div>
                  )}

                  {state === 'success' && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 border-[6px] border-emerald-500 shadow-[inset_0_0_50px_rgba(16,185,129,0.5)] flex flex-col items-center justify-end pb-32"
                     >
                        <div className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                           <ShieldCheck size={18} /> GPS ПОДТВЕРЖДЕН
                        </div>
                        <div className="mt-2 text-[10px] font-mono text-emerald-400">
                           ТОЧНОСТЬ: 3 МЕТРА
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="h-24 bg-black flex items-center justify-center relative z-20">
               <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-colors ${state === 'success' ? 'border-emerald-500 bg-emerald-500/20' : 'border-white bg-transparent'}`}>
                  <div className={`w-14 h-14 rounded-full transition-all ${state === 'success' ? 'bg-emerald-500 scale-90' : 'bg-white scale-90'}`} />
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
};

export default GpsShieldSlide;