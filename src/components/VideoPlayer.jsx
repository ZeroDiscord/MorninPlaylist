import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import PlayerControls from './PlayerControls';

const VideoPlayer = ({ currentVideo, isPlaying, setIsPlaying, handleNext, handlePrev }) => {
  const playerRef = useRef(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: isPlaying ? 1 : 0, 
      rel: 0,
      modestbranding: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onStateChange = (event) => {
    if (event.data === 0) {
      handleNext();
    } else if (event.data === 1 && !isPlaying) {
      setIsPlaying(true);
    } else if (event.data === 2 && isPlaying) {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  return (
    <div className="animate-slide-up w-full rounded-2xl md:rounded-3xl shadow-xl shadow-stone-200/30 border border-white/80 overflow-hidden bg-white/80 backdrop-blur-xl">
      
      {/* PERFECT Aspect Ratio Video - Eliminates Black Bars */}
      <div className="relative w-full aspect-video bg-black z-10 group">
        <YouTube 
          videoId={currentVideo.id} 
          opts={opts} 
          onReady={onReady}
          onStateChange={onStateChange}
          className="absolute top-0 left-0 w-full h-full"
          iframeClassName="w-full h-full border-0"
        />
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-rose-500/10 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
      </div>
      
      {/* Information and Controls */}
      <div className="p-5 md:p-8 lg:p-10 z-0 bg-gradient-to-b from-white to-stone-50/50">
        <div className="flex justify-between items-start mb-4 md:mb-6 gap-4">
          <div>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-800 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest inline-block mb-3 shadow-sm border border-white">
              {currentVideo.type}
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-stone-800 leading-tight">
              {currentVideo.title}
            </h2>
          </div>
          <div className="shrink-0 text-right bg-white rounded-xl border border-stone-200 py-2 px-3 md:py-3 md:px-5 shadow-sm">
            <p className="text-stone-400 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-1">Duration</p>
            <p className="text-sm md:text-xl font-mono text-stone-600 font-bold">{currentVideo.duration}</p>
          </div>
        </div>
        
        <p className="text-stone-500 text-sm md:text-base leading-relaxed font-medium mb-6 md:mb-8">
          {currentVideo.description}
        </p>
        
        <div className="pt-6 md:pt-8 border-t border-stone-200/60 w-full">
          <PlayerControls 
            isPlaying={isPlaying} 
            togglePlay={togglePlay} 
            handleNext={handleNext} 
            handlePrev={handlePrev} 
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
