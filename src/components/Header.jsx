import React from 'react';
import { Wind, Calendar } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

const Header = ({ isPlaying }) => {
  const getDayName = () => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date());
  };

  return (
    <nav className="px-5 py-3 flex justify-between items-center bg-white/80 backdrop-blur-2xl border-b border-white shadow-sm sticky top-0 z-50 w-full shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-400 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/20 transform hover:scale-105 transition-transform duration-300">
          <Wind size={20} strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-[1.35rem] font-bold tracking-tight text-stone-800 font-display">
            Morning Serenity
          </h1>
          <div className="hidden sm:block">
            <AudioVisualizer isPlaying={isPlaying} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 font-semibold">
        <span className="hidden md:flex items-center gap-2 bg-white text-stone-600 px-4 py-1.5 rounded-full border border-stone-200 text-sm shadow-sm">
          <Calendar size={14} className="text-stone-400" /> {getDayName()}
        </span>
        <span className="flex items-center gap-2 text-rose-600 bg-rose-50 px-5 py-1.5 rounded-full border border-rose-100 italic text-sm shadow-sm tracking-wide">
          For&nbsp;&nbsp;&nbsp;&nbsp;Priyanka
        </span>
      </div>
    </nav>
  );
};

export default Header;
