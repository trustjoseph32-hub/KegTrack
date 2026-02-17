import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Server, MapPin, Zap, FileText } from 'lucide-react';

const MapSlide: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const handleScan = () => {
    if (status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('done');
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-12">
      {/* Text Content */}
      <div className="flex-1 text-left space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Скан = <br />
          <span className="text-emerald-500">Мгновенный факт.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
          Отчетность происходит сама собой в момент физического действия. Больше никаких бумаг вечером.
        </p>
        
        <div className="pt-4">
           {status === 'idle' && (
              <button 
                onClick={handleScan}
                className="px-8 py-4 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-emerald-500/50 text-white rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg active:scale-95 group"
              >
                <Smartphone className="group-hover:text-emerald-500 transition-colors" /> СКАНИРОВАТЬ QR
              </button>
           )}

           {status === 'sending' && (
              <div className="text-emerald-500 font-mono animate-pulse flex items-center gap-2">
                 <Zap size={18} /> СИНХРОНИЗАЦИЯ...
              </div>
           )}

           <AnimatePresence>
             {status === 'done' && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-zinc-900 border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-2xl max-w-md"
                >
                   <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-1">
                      <span>21:45:03</span> • <span>ЛОГ СОБЫТИЙ</span>
                   </div>
                   <div className="text-zinc-100 font-medium">
                      Кега <span className="text-emerald-400 font-mono">#TJ-001</span> передана клиенту "Хмельной Хаб".
                   </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Visual */}
      <div className="flex-1 flex justify-center items-center relative">
        <div className="relative w-full max-w-md aspect-[4/3] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
           
           {/* Dark Map Background */}
           <div className="absolute inset-0 opacity-30" 
                style={{
                  backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)', 
                  backgroundSize: '20px 20px'
                }} 
           />
           
           {/* Map Paths */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 50 300 Q 150 200 250 150 T 350 100" fill="none" stroke="#27272a" strokeWidth="2" />
           </svg>

           {/* Store Point (Target) */}
           <div className="absolute top-[100px] right-[50px] transform -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                 animate={status === 'done' ? { scale: [1, 1.5, 1], boxShadow: "0 0 20px #10b981" } : { scale: 1 }}
                 className={`w-4 h-4 rounded-full border-2 ${status === 'done' ? 'bg-emerald-500 border-emerald-400' : 'bg-zinc-950 border-zinc-600'}`}
              />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 whitespace-nowrap font-mono bg-zinc-950/80 px-2 py-0.5 rounded">
                 ТОЧКА: KH-HUB
              </div>
           </div>

           {/* Other Points */}
           <div className="absolute top-[200px] left-[100px] w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600 animate-pulse" />
           <div className="absolute bottom-[80px] right-[120px] w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600" />

           {/* Phone (Source) */}
           <div className="absolute bottom-8 left-8">
              <div className="w-12 h-20 bg-zinc-800 rounded-lg border border-zinc-600 flex items-center justify-center shadow-lg z-10 relative">
                 <Smartphone size={24} className={status === 'sending' ? 'text-emerald-400' : 'text-zinc-500'} />
              </div>
           </div>

           {/* Impulse Animation */}
           {status === 'sending' && (
              <motion.div 
                 className="absolute w-4 h-4 bg-emerald-400 rounded-full blur-[2px] z-20 shadow-[0_0_15px_rgba(52,211,153,1)]"
                 initial={{ left: '50px', bottom: '50px', opacity: 1 }}
                 animate={{ left: 'calc(100% - 60px)', bottom: 'calc(100% - 110px)' }}
                 transition={{ duration: 1.2, ease: "easeInOut" }}
                 onAnimationComplete={() => setStatus('done')}
              />
           )}
           
           {/* Connection Line Animation */}
           {status === 'sending' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <motion.line 
                    x1="60" y1="340" 
                    x2="350" y2="100" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeDasharray="10 10"
                    initial={{ pathLength: 0, opacity: 0.5 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2 }}
                  />
              </svg>
           )}

        </div>
      </div>
    </div>
  );
};

export default MapSlide;