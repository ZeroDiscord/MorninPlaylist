import React from 'react';
import { Play, Sun, Heart, Sparkles } from 'lucide-react';

const PlaylistSidebar = ({ playlist, currentDayIndex, selectVideo }) => {
  return (
    <aside className="space-y-6 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl md:rounded-[2rem] shadow-2xl shadow-stone-200/40 border border-white/60">
        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3 font-display text-stone-800">
          <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
            <Sun size={24} />
          </div>
          Morning Flow
        </h3>
        
        <div className="space-y-3 md:space-y-4">
          {playlist.map((item, index) => (
            <button
              key={item.id}
              onClick={() => selectVideo(index)}
              className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300 border flex gap-4 md:gap-5 items-center group relative overflow-hidden ${
                currentDayIndex === index 
                ? 'bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200 shadow-sm shadow-orange-100/50 scale-[1.02]' 
                : 'bg-white/50 border-stone-100 hover:border-orange-200 hover:bg-white hover:shadow-md hover:scale-[1.01]'
              }`}
            >
              {currentDayIndex === index && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-rose-400 rounded-l-2xl"></div>
              )}
              
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner ${
                currentDayIndex === index 
                  ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-orange-300/50' 
                  : 'bg-stone-50 text-stone-400 border border-stone-100 group-hover:text-orange-500 group-hover:border-orange-200'
              }`}>
                {currentDayIndex === index ? <Play size={20} fill="white" className="ml-1" /> : <span className="text-sm font-bold font-display">{index + 1}</span>}
              </div>
              
              <div className="overflow-hidden flex-1">
                <h4 className={`font-bold text-base md:text-lg leading-tight truncate transition-colors duration-300 font-display ${
                  currentDayIndex === index ? 'text-orange-950' : 'text-stone-700 group-hover:text-stone-900'
                }`}>
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    currentDayIndex === index ? 'bg-orange-200/50 text-orange-800' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">• {item.duration}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 p-8 md:p-10 rounded-3xl md:rounded-[2rem] text-white shadow-2xl shadow-rose-500/30 relative overflow-hidden group hover:shadow-rose-500/40 transition-shadow duration-500">
        <Heart className="absolute -right-8 -bottom-8 text-white/10 w-40 h-40 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <Sparkles className="absolute top-6 right-6 text-white/40 w-8 h-8 animate-pulse" />
        
        <h3 className="text-2xl md:text-3xl font-bold mb-3 relative z-10 font-display tracking-tight">Namaste, Priyanka</h3>
        <p className="text-white/90 leading-relaxed relative z-10 text-sm md:text-base font-medium">
          We've prepared this seamless sequence for your peace and health. Close your eyes, and let the journey unfold.
        </p>
      </div>
    </aside>
  );
};

export default PlaylistSidebar;
