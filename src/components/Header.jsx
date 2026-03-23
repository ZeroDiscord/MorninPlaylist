import React from 'react';
import { Wind, Calendar } from 'lucide-react';

const Header = () => {
  const getDayName = () => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  };

  return (
    <nav className="px-6 py-4 flex justify-between items-center bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-sm sticky top-0 z-50 w-full transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transform hover:scale-105 transition-transform duration-300">
          <Wind size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-600 font-display">
          Morning Serenity
        </h1>
      </div>
      <div className="flex items-center gap-4 md:gap-8 text-stone-500 text-xs md:text-sm uppercase tracking-widest font-semibold">
        <span className="hidden md:flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-white"><Calendar size={16} className="text-orange-500" /> {getDayName()}</span>
        <span className="flex items-center gap-2 text-rose-500 font-bold tracking-tighter italic bg-rose-50/50 px-4 py-2 rounded-full border border-rose-100">
          For Priyanka
        </span>
      </div>
    </nav>
  );
};

export default Header;
