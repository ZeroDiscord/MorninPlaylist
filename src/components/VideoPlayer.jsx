import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import PlayerControls from './PlayerControls';

const VideoPlayer = ({ currentVideo, isPlaying, setIsPlaying, handleNext, handlePrev }) => {
  const playerRef = useRef(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1, 
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
    <div className="flex flex-col h-full animate-slide-up w-full rounded-2xl md:rounded-3xl shadow-xl shadow-stone-200/30 border border-white/80 overflow-hidden bg-white/80 backdrop-blur-xl">
      
      {/* Dynamic Video Frame - Shrinks to fit, no aspect-video forces */}
      <div className="relative w-full flex-1 bg-black min-h-[40vh] md:min-h-0 z-10 group">
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
      
      {/* STRICT Bottom Controls Block - Never scrolls, fixed height determined by content */}
      <div className="shrink-0 flex flex-col p-4 md:p-6 lg:p-8 z-0 bg-gradient-to-b from-white to-stone-50/50">
        <div className="flex justify-between items-start mb-3 md:mb-4 gap-4">
          <div>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-800 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest inline-block mb-2 shadow-sm border border-white">
              {currentVideo.type}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-stone-800 leading-tight">
              {currentVideo.title}
            </h2>
          </div>
          <div className="shrink-0 text-right bg-white rounded-xl border border-stone-200 py-1.5 px-3 md:py-2 md:px-4 shadow-sm">
            <p className="text-stone-400 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-0.5">Duration</p>
            <p className="text-sm md:text-lg font-mono text-stone-600 font-bold">{currentVideo.duration}</p>
          </div>
        </div>
        
        <p className="text-stone-500 text-sm md:text-base leading-relaxed font-medium mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
          {currentVideo.description}
        </p>
        
        <div className="pt-4 md:pt-6 border-t border-stone-200/60 w-full">
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
