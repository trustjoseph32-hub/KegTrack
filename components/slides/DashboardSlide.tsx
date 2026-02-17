import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="w-full h-full flex flex-col justify-center gap-6 p-2">
      {/* Header */}
      <div className="text-center space-y-4 mb-2">
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs uppercase tracking-widest"
        >
          <LayoutDashboard size={14} />
          CRM Центр Управления
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Полный контроль <br />
          <span className="text-emerald-500">из любой точки мира.</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
           Ваша админ-панель — это центр управления активами. Каждое движение кеги фиксируется в базе за доли секунды.
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[450px]">
         
         {/* LEFT COLUMN: Asset Distribution (3 cols) */}
         <div className="lg:col-span-3 bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex flex-col shadow-xl">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6 flex items-center gap-2">
               <Package size={16} /> Статус Активов
            </h3>
            
            <div className="flex-1 flex flex-col items-center justify-center relative">
               <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
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
                  <div className="text-3xl font-bold text-white">
                     {hoveredSegment ? chartData.find(d => d.id === hoveredSegment)?.value : '100'}%
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase">
                     {hoveredSegment ? chartData.find(d => d.id === hoveredSegment)?.label : 'Всего'}
                  </div>
               </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
               {chartData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-zinc-300">{item.label}</span>
                     </div>
                     <span className="font-mono text-zinc-500">{item.value}%</span>
                  </div>
               ))}
            </div>
         </div>

         {/* CENTER COLUMN: Live Transactions (6 cols) */}
         <div className="lg:col-span-6 bg-zinc-900 rounded-2xl border border-zinc-800 p-0 flex flex-col shadow-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
               <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} className="text-emerald-500" /> Лента Событий
               </h3>
               <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
               </div>
            </div>

            <div className="flex-1 overflow-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950/50 text-zinc-500 font-mono text-xs uppercase sticky top-0">
                     <tr>
                        <th className="px-6 py-3 font-medium">ID Кеги</th>
                        <th className="px-6 py-3 font-medium">Водитель</th>
                        <th className="px-6 py-3 font-medium">Действие</th>
                        <th className="px-6 py-3 font-medium">Локация</th>
                        <th className="px-6 py-3 font-medium text-right">Время</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                     {transactions.map((tx, i) => (
                        <motion.tr 
                           key={tx.id}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.1 }}
                           className="group hover:bg-zinc-800/50 transition-colors"
                        >
                           <td className="px-6 py-4 font-mono font-medium text-zinc-300">{tx.id}</td>
                           <td className="px-6 py-4 text-zinc-400 flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] border border-zinc-700">
                                 {tx.driver.charAt(0)}
                              </div>
                              {tx.driver}
                           </td>
                           <td className="px-6 py-4">
                              {tx.status === 'success' && (
                                 <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-900/50">
                                    <ArrowUpRight size={10} /> {tx.action}
                                 </span>
                              )}
                              {tx.status === 'process' && (
                                 <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-900/50">
                                    <Clock size={10} /> {tx.action}
                                 </span>
                              )}
                              {tx.status === 'warning' && (
                                 <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-900/50">
                                    <ArrowDownLeft size={10} /> {tx.action}
                                 </span>
                              )}
                              {tx.status === 'neutral' && (
                                 <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                                    <AlertCircle size={10} /> {tx.action}
                                 </span>
                              )}
                           </td>
                           <td className="px-6 py-4 text-zinc-400">
                              <div className="flex items-center gap-1.5">
                                 <MapPin size={12} /> {tx.loc}
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right font-mono text-zinc-500 text-xs">
                              {tx.time}
                           </td>
                        </motion.tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* RIGHT COLUMN: KPIs (3 cols) */}
         <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* KPI 1: Turnover */}
            <div className="flex-1 bg-zinc-900 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 transition-colors">
               <div className="relative z-10">
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                     <TrendingUp size={14} /> Оборот Тары
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">12 Дней</div>
                  <div className="text-xs text-emerald-500 flex items-center gap-1 bg-emerald-500/10 w-max px-2 py-0.5 rounded">
                     <ArrowDownLeft size={10} /> -35% быстрее
                  </div>
               </div>
               <TrendingUp className="absolute -bottom-4 -right-4 text-zinc-800 opacity-20" size={80} />
            </div>

            {/* KPI 2: Zero Loss */}
            <div className="flex-1 bg-zinc-900 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 transition-colors">
               <div className="relative z-10">
                   <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                     <AlertCircle size={14} /> Потери (Мес)
                  </div>
                  <div className="text-3xl font-bold text-emerald-400 mb-1">0</div>
                  <div className="text-xs text-zinc-500">
                     Прошлый: 12
                  </div>
               </div>
               <Activity className="absolute -bottom-4 -right-4 text-zinc-800 opacity-20" size={80} />
            </div>

            {/* KPI 3: Savings */}
            <div className="flex-1 bg-emerald-900/10 rounded-2xl border border-emerald-500/20 p-5 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
               <div className="relative z-10">
                  <div className="text-emerald-300/70 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                     <Wallet size={14} /> Экономия (TJS)
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">+15,400</div>
                  <div className="text-xs text-emerald-400">
                     Прогноз на год: 180k
                  </div>
               </div>
               <Wallet className="absolute -bottom-4 -right-4 text-emerald-500 opacity-10" size={80} />
            </div>

         </div>

      </div>
    </div>
  );
};

export default DashboardSlide;