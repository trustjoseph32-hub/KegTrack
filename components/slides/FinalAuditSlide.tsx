import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Warehouse, Truck, CheckCircle2 } from 'lucide-react';

const FinalAuditSlide: React.FC = () => {
  const [arrived, setArrived] = useState(false);
  
  // Spring animation for number
  const count = useSpring(430, { stiffness: 50, damping: 15 });
  const displayCount = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const timer = setTimeout(() => {
        setArrived(true);
        count.set(450);
    }, 1500);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8">
       <h1 className="text-4xl md:text-6xl font-bold text-center">
         Идеальная <span className="text-emerald-500">инвентаризация.</span>
       </h1>

       <div className="relative w-full max-w-2xl h-80 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center overflow-hidden">
          
          {/* Warehouse BG */}
          <Warehouse className="absolute text-zinc-800 w-96 h-96 -bottom-10 -right-20 opacity-20" />

          <div className="relative z-10 flex items-center gap-12">
             <div className="text-center">
                <div className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Всего кег на базе</div>
                <motion.div className="text-8xl font-bold font-mono text-white">
                   {displayCount}
                </motion.div>
             </div>

             {arrived && (
                <motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="flex items-center gap-2 text-emerald-500 bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/50"
                >
                   <CheckCircle2 size={20} />
                   <span className="font-bold">СИНХР. OK</span>
                </motion.div>
             )}
          </div>

          {/* Truck Animation */}
          <motion.div 
             className="absolute bottom-4 left-0"
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: arrived ? 100 : 350, opacity: arrived ? 0 : 1 }}
             transition={{ duration: 1.2, ease: "circOut" }}
          >
             <Truck size={64} className="text-zinc-600" />
          </motion.div>
       </div>
       
       <p className="text-zinc-400 max-w-lg text-center">
          Система автоматически обновляет остатки при въезде машины на территорию завода.
       </p>
    </div>
  );
};

export default FinalAuditSlide;