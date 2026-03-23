import React from 'react';
import { Play, Sun, Heart, Sparkles } from 'lucide-react';

const PlaylistSidebar = ({ playlist, currentDayIndex, selectVideo }) => {
  return (
    <aside className="space-y-6 animate-slide-up w-full" style={{ animationDelay: '100ms' }}>
      <div className="bg-white/80 backdrop-blur-2xl p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-xl shadow-stone-200/30 border border-white/80">
        <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-3 font-display text-stone-800">
          <div className="p-1.5 md:p-2 bg-orange-100 rounded-lg text-orange-500 shadow-sm">
            <Sun size={20} />
          </div>
          Morning Flow
        </h3>
        
        <div className="space-y-3 md:space-y-4">
          {playlist.map((item, index) => (
            <button
              key={item.id}
              onClick={() => selectVideo(index)}
              className={`w-full text-left p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 border flex gap-3 md:gap-4 items-center group relative overflow-hidden ${
                currentDayIndex === index 
                ? 'bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200 shadow-sm shadow-orange-100/50 scale-[1.02]' 
                : 'bg-white/60 border-stone-100 hover:border-orange-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {currentDayIndex === index && (
                <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-orange-400 to-rose-400 rounded-l-xl"></div>
              )}
              
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 shadow-inner ${
                currentDayIndex === index 
                  ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-orange-300/40' 
                  : 'bg-stone-50 text-stone-400 border border-stone-100 group-hover:text-orange-500 group-hover:border-orange-200'
              }`}>
                {currentDayIndex === index ? <Play size={16} fill="white" className="ml-0.5 md:ml-1" /> : <span className="text-sm font-bold font-display">{index + 1}</span>}
              </div>
              
              <div className="overflow-hidden flex-1">
                <h4 className={`font-bold text-sm md:text-base leading-tight truncate transition-colors duration-300 font-display ${
                  currentDayIndex === index ? 'text-orange-950' : 'text-stone-700 group-hover:text-stone-900'
                }`}>
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                    currentDayIndex === index ? 'bg-orange-200/60 text-orange-800' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-[10px] md:text-xs text-stone-400 font-mono">• {item.duration}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-rose-500/20 relative overflow-hidden group hover:shadow-rose-500/30 transition-shadow duration-500">
        <Heart className="absolute -right-6 -bottom-6 text-white/10 w-28 h-28 md:w-36 md:h-36 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out" />
        <Sparkles className="absolute top-4 right-4 md:top-6 md:right-6 text-white/40 w-5 h-5 md:w-8 md:h-8 animate-pulse" />
        
        <h3 className="text-xl md:text-2xl font-bold mb-2 relative z-10 font-display tracking-tight">Namaste, Priyanka</h3>
        <p className="text-white/95 leading-relaxed relative z-10 text-[12px] md:text-[14px] font-medium max-w-[95%]">
          We've prepared this seamless sequence for your peace and health. Close your eyes, and let the journey unfold.
        </p>
      </div>
    </aside>
  );
};

export default PlaylistSidebar;
