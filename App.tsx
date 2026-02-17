import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Slides
import HookSlide from './components/slides/HookSlide';
import WarehouseSlide from './components/slides/WarehouseSlide';
import ScanSlide from './components/slides/ScanSlide';
import DispatchSlide from './components/slides/DispatchSlide';
import MapSlide from './components/slides/MapSlide';
import GpsShieldSlide from './components/slides/GpsShieldSlide';
import ReturnLoopSlide from './components/slides/ReturnLoopSlide';
import DashboardSlide from './components/slides/DashboardSlide';
import FinalAuditSlide from './components/slides/FinalAuditSlide';
import CtaSlide from './components/slides/CtaSlide';

const TOTAL_SLIDES = 10;

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slides = [
    <HookSlide key="hook" />,
    <WarehouseSlide key="warehouse" />,
    <ScanSlide key="scan" />,
    <DispatchSlide key="dispatch" />,
    <MapSlide key="map" />,
    <GpsShieldSlide key="gps" />,
    <ReturnLoopSlide key="return" />,
    <DashboardSlide key="dashboard" />,
    <FinalAuditSlide key="audit" />,
    <CtaSlide key="cta" />,
  ];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center font-bold text-zinc-950">K</div>
          <span className="text-xl font-bold tracking-tighter">KEG<span className="text-emerald-500">TRACK</span> <span className="text-xs font-mono text-zinc-500 ml-2">TJ EDITION</span></span>
        </div>
        
        {/* Progress Bar */}
        <div className="hidden md:flex items-center gap-1">
          {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx <= currentSlide ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
              style={{ width: idx === currentSlide ? '24px' : '12px' }}
            />
          ))}
        </div>

        <div className="text-xs font-mono text-zinc-500">ВЕРСИЯ 3.0 // ДУШАНБЕ</div>
      </header>

      {/* Main Slide Area */}
      <main className="w-full h-full flex items-center justify-center relative z-10 p-4 md:p-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-6xl h-full flex flex-col items-center justify-center"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 w-full flex justify-between items-end px-8 z-50 pointer-events-none">
        <div className="text-zinc-500 text-xs font-mono pointer-events-auto">
          СЛАЙД {currentSlide + 1} / {TOTAL_SLIDES}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-4 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            className="p-4 rounded-full border border-emerald-500/50 bg-emerald-900/20 backdrop-blur-md hover:bg-emerald-900/40 text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;