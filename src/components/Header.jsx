import React from 'react';
import { Wind, Calendar } from 'lucide-react';

const Header = () => {
  const getDayName = () => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  };

  return (
    <nav className="p-4 md:p-6 flex justify-between items-center border-b border-stone-200 bg-white/50 backdrop-blur-md sticky top-0 z-10 w-full">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
          <Wind size={24} />
        </div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Morning Serenity</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-6 text-stone-500 text-xs md:text-sm uppercase tracking-widest">
        <span className="hidden md:flex items-center gap-1"><Calendar size={16} /> {getDayName()}</span>
        <span className="flex items-center gap-1 text-orange-600 font-bold tracking-tighter italic">For Priyanka</span>
      </div>
    </nav>
  );
};

export default Header;
