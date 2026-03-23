import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack, Sparkles } from 'lucide-react';

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
    // YT.PlayerState.ENDED = 0, PLAYING = 1, PAUSED = 2
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
    <div className="space-y-6 animate-slide-up">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-[2rem] shadow-2xl shadow-orange-900/5 border border-white overflow-hidden transition-all duration-500 hover:shadow-orange-900/10">
        <div className="relative aspect-video bg-stone-900 w-full group">
          <YouTube 
            videoId={currentVideo.id} 
            opts={opts} 
            onReady={onReady}
            onStateChange={onStateChange}
            className="absolute top-0 left-0 w-full h-full"
            iframeClassName="w-full h-full border-0"
          />
          {/* Subtle glow effect behind the player on desktop */}
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>
        
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 md:gap-0">
            <div>
              <span className="px-4 py-1.5 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-800 text-xs font-extrabold rounded-full uppercase tracking-widest inline-block mb-4 shadow-sm border border-white">
                {currentVideo.type}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 leading-tight">
                {currentVideo.title}
              </h2>
            </div>
            <div className="text-left md:text-right bg-stone-50/80 px-4 py-2 rounded-2xl border border-stone-100">
              <p className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-1">Duration</p>
              <p className="text-xl font-mono text-stone-700 font-bold">{currentVideo.duration}</p>
            </div>
          </div>
          <p className="text-stone-600 text-lg leading-relaxed font-medium">
            {currentVideo.description}
          </p>
          
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-4 md:gap-6 border-t border-stone-100/80 pt-8">
            <button 
              onClick={handlePrev}
              className="p-4 md:p-5 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 text-stone-500 shadow-sm hover:shadow-md hover:-translate-y-1"
              title="Previous Session"
            >
              <SkipBack size={24} />
            </button>
            <button 
              onClick={togglePlay}
              className="flex-1 max-w-sm bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 active:scale-95 text-white font-bold py-4 md:py-5 rounded-2xl md:rounded-3xl shadow-xl shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-sm md:text-lg group"
            >
              {isPlaying 
                ? <><Pause fill="white" size={24} className="group-hover:scale-110 transition-transform" /> <span className="drop-shadow-sm">Pause</span></> 
                : <><Play fill="white" size={24} className="group-hover:scale-110 transition-transform" /> <span className="drop-shadow-sm">Start Session</span></>
              }
            </button>
            <button 
              onClick={handleNext}
              className="p-4 md:p-5 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 text-stone-500 shadow-sm hover:shadow-md hover:-translate-y-1"
              title="Next Session"
            >
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
