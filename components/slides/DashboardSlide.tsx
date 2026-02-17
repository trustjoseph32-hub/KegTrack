import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp, Package, Truck, Users, Activity, MapPin, Clock, ArrowUpRight, ArrowDownLeft, Wallet, AlertCircle } from 'lucide-react';

const DashboardSlide: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Chart Data
  const chartData = [
    { id: 'base', label: 'На Складе', value: 40, color: '#f4f4f5', icon: Package }, // zinc-100
    { id: 'transit', label: 'В Пути', value: 20, color: '#10b981', icon: Truck }, // emerald-500
    { id: 'clients', label: 'У Клиентов', value: 40, color: '#3f3f46', icon: Users }, // zinc-700
  ];

  // Chart Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  const chartSegments = chartData.map((item) => {
    const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += (item.value / 100) * circumference;
    return { ...item, strokeDasharray, strokeDashoffset };
  });

  // Table Data
  const transactions = [
    { id: 'TJ-9901', driver: 'Али Р.', action: 'Доставка', loc: 'Бар "Ватан"', time: '10:42', status: 'success' },
    { id: 'TJ-8821', driver: 'Зафар', action: 'Погрузка', loc: 'Склад А', time: '10:40', status: 'process' },
    { id: 'TJ-1102', driver: 'Али Р.', action: 'Возврат', loc: 'Маг. №4', time: '10:35', status: 'warning' },
    { id: 'TJ-3392', driver: 'Фарход', action: 'Доставка', loc: 'Рест. "Душанбе"', time: '10:28', status: 'success' },
    { id: 'TJ-4401', driver: 'Система', action: 'Аудит', loc: 'Авто-Проверка', time: '10:15', status: 'neutral' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start sm:justify-center gap-4 sm:gap-6 p-2 overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-4 mb-2 shrink-0">
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest"
        >
          <LayoutDashboard size={14} />
          CRM Центр Управления
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Полный контроль <br />
          <span className="text-emerald-500">из любой точки мира.</span>
        </h1>
        <p className="text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed hidden sm:block">
           Ваша админ-панель — это центр управления активами. Каждое движение кеги фиксируется в базе за доли секунды.
        </p>
      </div>

      {/* 
         MOBILE SCALING LOGIC:
         1. transform scale-[0.65] to fit desktop-like layout on phone.
         2. w-[154%] compensates for the scale down (100 / 0.65 ~= 153.8).
         3. flex-row items-stretch forces side-by-side layout.
      */}
      <div className="w-full relative grow sm:grow-0">
        <div className="origin-top-left transform scale-[0.65] sm:scale-100 w-[154%] sm:w-full flex flex-row items-stretch gap-2 sm:gap-6 h-[600px] sm:h-[450px]">
           
           {/* LEFT COLUMN: Asset Distribution (25%) */}
           <div className="w-[25%] bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-800 p-2 sm:p-6 flex flex-col shadow-xl">
              <h3 className="text-[9px] sm:text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 sm:mb-6 flex items-center gap-1 sm:gap-2 truncate">
                 <Package size={12} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Статус</span> Активов
              </h3>
              
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
                 <svg className="w-full h-auto max-h-[160px] transform -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r={radius} fill="none" stroke="#27272a" strokeWidth="16" />
                    {chartSegments.map((segment) => (
                      <motion.circle
                         key={segment.id}
                         cx="100"
                         cy="100"
                         r={radius}
                         fill="none"
                         stroke={segment.color}
                         strokeWidth="16"
                         strokeDasharray={segment.strokeDasharray}
                         strokeDashoffset={segment.strokeDashoffset}
                         strokeLinecap="butt"
                         initial={{ strokeDasharray: `0 ${circumference}` }}
                         animate={{ strokeDasharray: segment.strokeDasharray }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         onMouseEnter={() => setHoveredSegment(segment.id)}
                         onMouseLeave={() => setHoveredSegment(null)}
                         className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                 </svg>
                 {/* Center Label */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-xl sm:text-3xl font-bold text-white">
                       {hoveredSegment ? chartData.find(d => d.id === hoveredSegment)?.value : '100'}%
                    </div>
                 </div>
              </div>

              {/* Legend */}
              <div className="mt-2 sm:mt-6 space-y-1 sm:space-y-2">
                 {chartData.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-[8px] sm:text-xs">
                       <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-zinc-300 truncate max-w-[50px] sm:max-w-none">{item.label}</span>
                       </div>
                       <span className="font-mono text-zinc-500">{item.value}%</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* CENTER COLUMN: Live Transactions (50%) */}
           <div className="w-[50%] bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-800 p-0 flex flex-col shadow-xl overflow-hidden">
              <div className="p-2 sm:p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/30">
                 <h3 className="text-[9px] sm:text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 sm:gap-2">
                    <Activity size={12} className="text-emerald-500 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Лента</span> Событий
                 </h3>
                 <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                 </div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                 <table className="w-full text-left">
                    <thead className="bg-zinc-950/50 text-zinc-500 font-mono text-[8px] sm:text-xs uppercase sticky top-0">
                       <tr>
                          <th className="px-1 py-2 sm:px-6 sm:py-3 font-medium">ID</th>
                          <th className="px-1 py-2 sm:px-6 sm:py-3 font-medium">Кто</th>
                          <th className="px-1 py-2 sm:px-6 sm:py-3 font-medium">Что</th>
                          <th className="px-1 py-2 sm:px-6 sm:py-3 font-medium text-right">Время</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-[9px] sm:text-sm">
                       {transactions.map((tx, i) => (
                          <motion.tr 
                             key={tx.id}
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.1 }}
                             className="group hover:bg-zinc-800/50 transition-colors"
                          >
                             <td className="px-1 py-2 sm:px-6 sm:py-4 font-mono font-medium text-zinc-300 truncate max-w-[40px] sm:max-w-none">{tx.id}</td>
                             <td className="px-1 py-2 sm:px-6 sm:py-4 text-zinc-400 truncate max-w-[50px] sm:max-w-none">
                                {tx.driver}
                             </td>
                             <td className="px-1 py-2 sm:px-6 sm:py-4">
                                {tx.status === 'success' && (
                                   <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] sm:text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-900/50">
                                      <ArrowUpRight size={8} className="sm:w-2.5 sm:h-2.5" /> {tx.action}
                                   </span>
                                )}
                                {tx.status === 'process' && (
                                   <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] sm:text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-900/50">
                                      <Clock size={8} className="sm:w-2.5 sm:h-2.5" /> {tx.action}
                                   </span>
                                )}
                                {tx.status === 'warning' && (
                                   <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] sm:text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-900/50">
                                      <ArrowDownLeft size={8} className="sm:w-2.5 sm:h-2.5" /> {tx.action}
                                   </span>
                                )}
                                {tx.status === 'neutral' && (
                                   <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] sm:text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                                      <AlertCircle size={8} className="sm:w-2.5 sm:h-2.5" /> {tx.action}
                                   </span>
                                )}
                             </td>
                             <td className="px-1 py-2 sm:px-6 sm:py-4 text-right font-mono text-zinc-500 text-[8px] sm:text-xs">
                                {tx.time}
                             </td>
                          </motion.tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* RIGHT COLUMN: KPIs (25%) */}
           <div className="w-[25%] flex flex-col gap-2 sm:gap-4">
              
              {/* KPI 1: Turnover */}
              <div className="flex-1 bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-800 p-2 sm:p-5 flex flex-col justify-center relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="text-zinc-500 text-[8px] sm:text-xs font-bold uppercase tracking-wider mb-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
                       <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5" /> Оборот
                    </div>
                    <div className="text-lg sm:text-3xl font-bold text-white mb-1 leading-tight">12 <span className="text-[10px] sm:text-lg text-zinc-500">Дн</span></div>
                    <div className="text-[8px] sm:text-xs text-emerald-500 flex items-center gap-0.5 sm:gap-1 bg-emerald-500/10 w-max px-1.5 py-0.5 rounded">
                       <ArrowDownLeft size={8} className="sm:w-2.5 sm:h-2.5" /> -35%
                    </div>
                 </div>
              </div>

              {/* KPI 2: Zero Loss */}
              <div className="flex-1 bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-800 p-2 sm:p-5 flex flex-col justify-center relative overflow-hidden">
                 <div className="relative z-10">
                     <div className="text-zinc-500 text-[8px] sm:text-xs font-bold uppercase tracking-wider mb-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
                       <AlertCircle size={12} className="sm:w-3.5 sm:h-3.5" /> Потери
                    </div>
                    <div className="text-lg sm:text-3xl font-bold text-emerald-400 mb-1 leading-tight">0</div>
                    <div className="text-[8px] sm:text-xs text-zinc-500 truncate">
                       Было: 12
                    </div>
                 </div>
              </div>

              {/* KPI 3: Savings */}
              <div className="flex-1 bg-emerald-900/10 rounded-xl sm:rounded-2xl border border-emerald-500/20 p-2 sm:p-5 flex flex-col justify-center relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="text-emerald-300/70 text-[8px] sm:text-xs font-bold uppercase tracking-wider mb-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
                       <Wallet size={12} className="sm:w-3.5 sm:h-3.5" /> TJS
                    </div>
                    <div className="text-lg sm:text-3xl font-bold text-white mb-1 leading-tight text-[10px] sm:text-3xl">+15k</div>
                    <div className="text-[8px] sm:text-xs text-emerald-400 truncate">
                       Год: 180k
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardSlide;