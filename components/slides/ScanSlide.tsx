import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle, Zap, ScanBarcode, Smartphone, X, Send } from 'lucide-react';

const ScanSlide: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (scanned || scanning) return;
    setScanning(true);
    setTimeout(() => {
        setScanning(false);
        setScanned(true);
    }, 1000); // 1 second scan
  }

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full gap-8">
      {/* Visuals: Comparison */}
      <div className="flex-1 flex justify-center items-center gap-4 md:gap-8 relative">
        
        {/* Old Way - Faded Background */}
        <motion.div 
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="absolute left-0 -z-10 scale-75 blur-[1px] opacity-40 md:relative md:scale-100 md:blur-0 md:opacity-50 md:z-0 flex flex-col items-center"
        >
           <div className="w-40 h-64 bg-zinc-800 rounded-xl border border-zinc-700 flex flex-col items-center justify-center relative">
              <ScanBarcode size={64} className="text-zinc-600" />
              <div className="mt-4 font-mono text-zinc-500 line-through decoration-red-500 decoration-2">4 500 TJS</div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <X size={100} className="text-red-500/50" />
              </div>
           </div>
           <span className="mt-2 text-xs font-mono text-red-500">УСТАРЕЛО</span>
        </motion.div>

        {/* New Way - Interactive Phone */}
        <motion.div 
          className="relative w-[280px] h-[560px] bg-zinc-900 rounded-[2.5rem] border-8 border-zinc-800 shadow-2xl overflow-hidden cursor-pointer z-10"
          onClick={handleScan}
          whileHover={{ scale: 1.02, rotate: -2 }}
          transition={{ type: "spring" }}
        >
          {/* Badge: 0 TJS */}
          <div className="absolute -right-4 top-8 bg-emerald-500 text-zinc-950 font-bold px-8 py-1 rotate-45 z-30 shadow-lg">
             0 TJS
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-950 rounded-b-xl z-20"></div>

          {/* Screen Content */}
          <div className="w-full h-full bg-zinc-950 relative flex flex-col">
            {/* Header */}
            <div className="pt-10 pb-4 px-6 flex justify-between items-center border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                 <Send size={12} className="text-blue-400" /> TELEGRAM BOT
              </span>
              <div className={`w-2 h-2 rounded-full ${scanning ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            </div>

            {/* Viewfinder */}
            <div className="flex-1 relative flex items-center justify-center p-6">
              <div className="relative w-full aspect-square border-2 border-zinc-700 rounded-lg p-4 flex items-center justify-center overflow-hidden">
                <QrCode size={100} className={`text-zinc-600 transition-opacity duration-300 ${scanned ? 'opacity-20' : 'opacity-100'}`} />
                
                {scanning && (
                  <motion.div 
                    className="absolute left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                )}
                
                {scanned && (
                   <motion.div 
                    initial={{ top: '50%', height: 2, opacity: 1 }}
                    animate={{ height: '100%', top: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 w-full bg-emerald-500/50"
                  />
                )}

                {scanned && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm rounded-lg"
                  >
                    <CheckCircle size={50} className="text-emerald-500 mb-2" />
                    <span className="text-emerald-400 font-bold">TJ-9901</span>
                    <span className="text-zinc-400 text-[10px] font-mono uppercase">ПРИНЯТО В TELEGRAM</span>
                  </motion.div>
                )}
              </div>
              
              {!scanned && !scanning && (
                  <div className="absolute bottom-20 text-xs text-zinc-500 animate-pulse">Нажмите для скана</div>
              )}
            </div>

            {/* Bottom Action */}
            <div className="p-6 bg-zinc-900 border-t border-zinc-800">
               <div className={`w-full h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold tracking-wide shadow-lg transition-colors ${scanned ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                  {scanned ? 'ОТПРАВЛЕНО В ЧАТ' : 'ОТКРЫТЬ СКАНЕР'}
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="flex-1 text-left space-y-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-900/50 text-emerald-400 font-mono text-xs uppercase tracking-widest">
          <Zap size={14} />
          Революция для водителей
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Скан за <br />
          <span className="text-emerald-500">1 секунду.</span>
        </h1>

        <p className="text-lg text-zinc-300 max-w-lg leading-relaxed border-l-4 border-emerald-500 pl-4 bg-emerald-900/10 py-2">
          Колоссальная экономия: не нужно покупать ТСД (терминал сбора данных).
          <span className="block font-bold text-white mt-1 flex items-center gap-2">
             <Send size={16} className="text-blue-400" /> Telegram — всё, что нужно.
          </span>
        </p>

        <div className="grid grid-cols-2 gap-4">
             <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-1">Оборудование</div>
                <div className="text-xl font-bold text-emerald-500">0 TJS</div>
             </div>
             <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-1">Обучение персонала</div>
                <div className="text-xl font-bold text-emerald-500">5 мин</div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ScanSlide;