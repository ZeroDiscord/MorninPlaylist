import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const VideoPlayer = ({ currentVideo, isPlaying, setIsPlaying, handleNext, handlePrev }) => {
  const playerRef = useRef(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1, // Force autoplay on load and next video
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
    <div className="flex flex-col h-full gap-4 animate-slide-up">
      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl shadow-stone-200/30 border border-white/80 overflow-hidden min-h-0 bg-gradient-to-b from-white to-transparent">
        
        {/* Video Frame */}
        <div className="relative w-full aspect-video bg-black shrink-0 group z-10">
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
        
        {/* Under Video Information / Controls */}
        <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-y-auto hide-scrollbar z-0">
          <div className="flex justify-between items-start mb-3 md:mb-4 gap-4">
            <div>
              <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-800 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest inline-block mb-2 shadow-sm border border-white">
                {currentVideo.type}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-stone-800 leading-tight">
                {currentVideo.title}
              </h2>
            </div>
            <div className="shrink-0 text-right bg-white rounded-xl md:rounded-2xl border border-stone-100 py-1.5 px-3 md:py-2 md:px-4 shadow-sm">
              <p className="text-stone-400 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-0.5">Duration</p>
              <p className="text-sm md:text-lg font-mono text-stone-600 font-bold">{currentVideo.duration}</p>
            </div>
          </div>
          
          <p className="text-stone-500 text-sm md:text-base leading-relaxed font-medium flex-1">
            {currentVideo.description}
          </p>
          
          <div className="mt-4 md:mt-6 flex items-center justify-center gap-3 border-t border-stone-200/60 pt-4 md:pt-6">
            <button 
              onClick={handlePrev}
              className="p-3 md:p-4 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 text-stone-500 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              title="Previous Session"
            >
              <SkipBack size={20} />
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
              className="p-3 md:p-4 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 text-stone-500 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              title="Next Session"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
