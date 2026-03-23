import React from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const PlayerControls = ({ isPlaying, togglePlay, handleNext, handlePrev }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <button 
        onClick={handlePrev}
        className="p-3 md:p-4 rounded-full bg-stone-50 border border-stone-200 hover:border-orange-300 hover:bg-white hover:text-orange-600 transition-all duration-300 text-stone-500 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        title="Previous Session"
      >
        <SkipBack size={20} className="fill-current text-stone-400 group-hover:text-orange-500" />
      </button>
      <button 
        onClick={togglePlay}
        className="w-full max-w-[14rem] md:max-w-xs bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 active:scale-95 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-xs md:text-sm group"
      >
        {isPlaying 
          ? <><Pause fill="white" size={18} className="group-hover:scale-110 transition-transform" /> <span className="drop-shadow-sm">Pause</span></> 
          : <><Play fill="white" size={18} className="group-hover:scale-110 transition-transform" /> <span className="drop-shadow-sm">Start</span></>
        }
      </button>
      <button 
        onClick={handleNext}
        className="p-3 md:p-4 rounded-full bg-stone-50 border border-stone-200 hover:border-orange-300 hover:bg-white hover:text-orange-600 transition-all duration-300 text-stone-500 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        title="Next Session"
      >
        <SkipForward size={20} className="fill-current text-stone-400 group-hover:text-orange-500" />
      </button>
    </div>
  );
};

export default PlayerControls;
