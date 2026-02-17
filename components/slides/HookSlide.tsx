import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Ban } from 'lucide-react';

const HookSlide: React.FC = () => {
  const [isLeaking, setIsLeaking] = useState(true);

  // Generate random drops for animation
  const drops = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 2,
    x: Math.random() * 40 - 20,
  }));

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-12">
      {/* Text Content */}
      <div className="flex-1 text-left space-y-6">
        <AnimatePresence mode="wait">
          {isLeaking ? (
            <motion.div 
              key="warning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/20 border border-red-900/50 text-red-500 font-mono text-xs uppercase tracking-widest"
            >
              <AlertTriangle size={14} />
              КРИТИЧЕСКАЯ ПОТЕРЯ
            </motion.div>
          ) : (
            <motion.div 
              key="secure"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-900/50 text-emerald-500 font-mono text-xs uppercase tracking-widest"
            >
              <ShieldCheck size={14} />
              ПОД ЗАЩИТОЙ
            </motion.div>
          )}
        </AnimatePresence>
        
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Где исчезает <br />
          <span className={`transition-colors duration-500 ${isLeaking ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600' : 'text-emerald-500'}`}>
            ваша прибыль?
          </span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
          Каждая потерянная кега — это <span className="text-zinc-100 font-bold border-b border-zinc-700">700 TJS убытка</span>. 
          Вы теряете активы прямо сейчас.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLeaking(!isLeaking)}
          className={`mt-8 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg ${
            isLeaking 
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/20' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
          }`}
        >
          {isLeaking ? (
            <>
              <Ban size={20} /> ОСТАНОВИТЬ УТЕЧКУ
            </>
          ) : (
             <>
              <ShieldCheck size={20} /> УТЕЧКА УСТРАНЕНА
            </>
          )}
        </motion.button>
      </div>

      {/* Visual - The Leaking Keg */}
      <div className="flex-1 flex justify-center items-center relative h-[400px]">
        {/* Keg Body */}
        <motion.div 
          className="relative w-48 h-64 bg-zinc-800 rounded-xl border-4 border-zinc-700 shadow-2xl flex flex-col justify-between overflow-hidden z-10"
          style={{
            background: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Ribs */}
          <div className="w-full h-4 bg-zinc-900/50 mt-4 border-y border-zinc-700/50"></div>
          <div className="w-full h-4 bg-zinc-900/50 border-y border-zinc-700/50"></div>
          <div className="w-full h-4 bg-zinc-900/50 mb-4 border-y border-zinc-700/50"></div>
          
          {/* Status Light */}
          <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${isLeaking ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
          
          {/* Shield Overlay */}
          <AnimatePresence>
            {!isLeaking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-emerald-900/40 backdrop-blur-[2px] flex items-center justify-center z-20"
              >
                <ShieldCheck size={64} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Leaking Animation */}
        <AnimatePresence>
          {isLeaking && (
            <div className="absolute top-[280px] left-1/2 -translate-x-1/2 w-full flex justify-center z-0">
              {drops.map((drop) => (
                <motion.div
                    key={drop.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ 
                      y: [0, 150],
                      opacity: [1, 0],
                      x: drop.x 
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: drop.delay,
                      ease: "easeIn"
                    }}
                    className="absolute text-red-500 font-bold text-xs"
                >
                  -700
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
        
        {/* Puddle */}
        {isLeaking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-0 w-32 h-8 bg-red-900/40 blur-xl rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default HookSlide;