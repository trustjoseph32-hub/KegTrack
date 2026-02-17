import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, ArrowRight, UserCheck } from 'lucide-react';

const DispatchSlide: React.FC = () => {
  const [dispatched, setDispatched] = useState(false);

  const items = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-12">
      <div className="flex-1 text-left space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Ответственность <br />
          <span className="text-indigo-500">персонала.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-lg">
          Каждая кега привязывается к водителю. Вы точно знаете, кто отвечает за груз.
        </p>
        
        <button
          onClick={() => setDispatched(true)}
          disabled={dispatched}
          className={`mt-4 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
            dispatched
              ? 'bg-zinc-800 text-zinc-500'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]'
          }`}
        >
           {dispatched ? 'ОТГРУЖЕНО' : 'ОТГРУЗИТЬ'} <ArrowRight />
        </button>

        {dispatched && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center gap-3 p-4 bg-zinc-900 border border-indigo-500/30 rounded-lg w-max"
           >
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                 <UserCheck size={20} />
              </div>
              <div>
                 <div className="text-sm text-zinc-400">Ответственный</div>
                 <div className="font-bold text-white">Али Рахимов</div>
              </div>
           </motion.div>
        )}
      </div>

      <div className="flex-1 h-[400px] bg-zinc-900/50 rounded-2xl border border-zinc-800 relative overflow-hidden flex items-center justify-center">
         {/* Warehouse Zone */}
         <div className="absolute left-0 top-0 bottom-0 w-1/3 border-r border-zinc-800 bg-zinc-900/80 flex flex-col items-center justify-center gap-4 z-10">
            <span className="text-xs text-zinc-500 font-mono absolute top-4">СКЛАД</span>
            {items.map((i) => (
               <motion.div
                 key={i}
                 className="w-12 h-16 bg-zinc-700 rounded-md border-2 border-zinc-600"
                 animate={dispatched ? { x: 200, opacity: 0 } : { x: 0, opacity: 1 }}
                 transition={{ delay: i * 0.1, duration: 0.5 }}
               />
            ))}
         </div>

         {/* Truck Zone */}
         <div className="absolute right-10 z-20">
            <motion.div 
               animate={dispatched ? { x: [0, -5, 0] } : {}}
               transition={{ repeat: dispatched ? 2 : 0, duration: 0.2, delay: 0.5 }}
            >
               <Truck size={180} className="text-zinc-700" strokeWidth={1} />
               {dispatched && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-indigo-500"
                  >
                     +5
                  </motion.div>
               )}
            </motion.div>
         </div>
      </div>
    </div>
  );
};

export default DispatchSlide;