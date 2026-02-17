import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Smartphone, ScanLine, DollarSign } from 'lucide-react';

const RoiSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Экономия на старте. <br />
          <span className="text-emerald-500">Прибыль с первого дня.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Old Way Column */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-zinc-900/50 border border-red-900/30 rounded-2xl p-8 flex flex-col gap-6"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <X size={100} className="text-red-500" />
          </div>
          
          <h3 className="text-2xl font-bold text-red-500 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-sm">VS</span>
            Старый метод
          </h3>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <ScanLine className="text-red-500 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-zinc-200">Дорогие сканеры</strong>
                <span className="text-zinc-500 text-sm">~45 000 ₽ за устройство. Часто ломаются.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="text-red-500 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-zinc-200">Скрытые расходы</strong>
                <span className="text-zinc-500 text-sm">Обучение персонала, ремонт, ПО.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <X className="text-red-500 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-zinc-200">Человеческий фактор</strong>
                <span className="text-zinc-500 text-sm">Ошибки ручного ввода и "потерянные" бумаги.</span>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Our Way Column */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative bg-gradient-to-br from-emerald-900/20 to-zinc-900 border border-emerald-500/50 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Check size={100} className="text-emerald-500" />
          </div>

          <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm">PRO</span>
            KegTrack
          </h3>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Smartphone className="text-emerald-500 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-white">Личный смартфон</strong>
                <span className="text-emerald-100/70 text-sm">0 ₽ затрат на оборудование. Водители уже умеют пользоваться.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-emerald-500 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-white">Telegram Интеграция</strong>
                <span className="text-emerald-100/70 text-sm">Уведомления и отчеты там, где вы общаетесь.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-emerald-500 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-white">100% Точность</strong>
                <span className="text-emerald-100/70 text-sm">GPS-валидация и QR-коды исключают обман.</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default RoiSlide;