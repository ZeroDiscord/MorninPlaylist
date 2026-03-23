import React from 'react';
import { Play, Sun, Heart } from 'lucide-react';

const PlaylistSidebar = ({ playlist, currentDayIndex, selectVideo }) => {
  return (
    <aside className="space-y-6 w-full">
      <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
        <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
          <Sun className="text-orange-400" size={20} />
          Morning Flow
        </h3>
        
        <div className="space-y-2 md:space-y-3">
          {playlist.map((item, index) => (
            <button
              key={item.id}
              onClick={() => selectVideo(index)}
              className={`w-full text-left p-3 md:p-4 rounded-xl md:rounded-2xl transition-all border flex gap-3 md:gap-4 items-center group ${
                currentDayIndex === index 
                ? 'bg-orange-50 border-orange-200 ring-2 ring-orange-100 ring-offset-1' 
                : 'bg-white border-stone-100 hover:border-stone-300'
              }`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                currentDayIndex === index ? 'bg-orange-600 text-white shadow-md shadow-orange-200' : 'bg-stone-100 text-stone-400'
              }`}>
                {currentDayIndex === index ? <Play size={18} fill="white" /> : <span className="text-xs md:text-sm font-bold">{index + 1}</span>}
              </div>
              <div className="overflow-hidden">
                <h4 className={`font-bold text-sm md:text-base leading-tight truncate ${currentDayIndex === index ? 'text-orange-900' : 'text-stone-800'}`}>
                  {item.title}
                </h4>
                <p className="text-[10px] md:text-xs text-stone-400 mt-1 uppercase tracking-tighter truncate">{item.type} • {item.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-6 md:p-8 rounded-2xl md:rounded-3xl text-white shadow-xl shadow-orange-200/50 relative overflow-hidden">
        <Heart className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24 md:w-32 md:h-32" />
        <h3 className="text-lg md:text-xl font-bold mb-2 relative z-10">Namaste, Priyanka</h3>
        <p className="text-white/90 leading-relaxed relative z-10 text-xs md:text-sm">
          We've prepared this sequence for your peace and health. The player will automatically move to the next session once the current one ends.
        </p>
      </div>
    </aside>
  );
};

export default PlaylistSidebar;
