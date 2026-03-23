import React from 'react';

const AudioVisualizer = ({ isPlaying }) => {
  return (
    <div className="flex items-end gap-1 h-5 w-6 overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i}
          className={`w-1 rounded-full mix-blend-multiply ${isPlaying ? 'bg-orange-400 animate-music-bar' : 'bg-stone-300 h-1.5 transition-all duration-500'}`}
          style={isPlaying ? { animationDelay: `${i * 0.15}s`, animationDuration: `${0.6 + (i * 0.1)}s` } : {}}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
