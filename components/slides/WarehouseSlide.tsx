import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, PackagePlus, Check } from 'lucide-react';

const WarehouseSlide: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  // Generate keg data
  const kegs = Array.from({ length: 7 }).map((_, i) => ({
    id: `TJ-99${i + 10}`,
    type: 'Lager',
    liters: 50,
  }));

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-12">
      <div className="flex-1 text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-900/50 text-blue-400 font-mono text-xs uppercase tracking-widest">
          <ClipboardList size={14} />
          Цифровой паспорт
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Мгновенная <br />
          <span className="text-blue-500">оцифровка склада.</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
          Одна кнопка, чтобы принять партию. Каждая кега получает цифровой ID и статус "На базе".
        </p>

        <button
          onClick={() => setAccepted(true)}
          disabled={accepted}
          className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
            accepted 
              ? 'bg-zinc-800 text-emerald-500 border border-emerald-500/50' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]'
          }`}
        >
          {accepted ? (
            <>
              <Check size={20} /> ПАРТИЯ ПРИНЯТА
            </>
          ) : (
            <>
              <PackagePlus size={20} /> ПРИНЯТЬ НА СКЛАД
            </>
          )}
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
             <span className="font-mono text-zinc-400 text-sm">ПАРТИЯ №2024-10-24</span>
             <span className="text-xs text-zinc-600">
               {accepted ? 'Завершено' : 'Ожидание...'}
             </span>
          </div>
          
          <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
             <AnimatePresence>
               {accepted && kegs.map((keg, index) => (
                 <motion.div
                   key={keg.id}
                   initial={{ x: 50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: index * 0.1, type: "spring" }}
                   className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50"
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-500/20 rounded-md flex items-center justify-center text-blue-400">
                          <PackagePlus size={16} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-zinc-200">{keg.id}</div>
                          <div className="text-xs text-zinc-500">{keg.type} • {keg.liters}Л</div>
                       </div>
                    </div>
                    <Check size={16} className="text-emerald-500" />
                 </motion.div>
               ))}
               {!accepted && (
                 <motion.div 
                   exit={{ opacity: 0 }}
                   className="h-40 flex items-center justify-center text-zinc-600 text-sm italic"
                 >
                    Ожидание сканирования...
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-sm">
             <span className="text-zinc-500">Всего кег:</span>
             <span className="font-mono text-xl text-white">{accepted ? kegs.length : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseSlide;