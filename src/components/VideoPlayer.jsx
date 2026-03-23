import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack, Sun } from 'lucide-react';

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

  // Keep state synced directly with prop
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
    <div className="space-y-6">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100">
        <div className="relative aspect-video bg-stone-900 w-full">
          <YouTube 
            videoId={currentVideo.id} 
            opts={opts} 
            onReady={onReady}
            onStateChange={onStateChange}
            className="absolute top-0 left-0 w-full h-full"
            iframeClassName="w-full h-full border-0"
          />
        </div>
        
        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2 md:gap-0">
            <div>
              <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider inline-block mb-2">
                {currentVideo.type}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 leading-tight">{currentVideo.title}</h2>
            </div>
            <div className="text-left md:text-right">
              <p className="text-stone-400 text-xs md:text-sm uppercase tracking-widest hidden md:block">Duration</p>
              <p className="text-lg md:text-xl font-mono text-stone-500 md:text-stone-800">{currentVideo.duration}</p>
            </div>
          </div>
          <p className="text-stone-600 text-base md:text-lg leading-relaxed">
            {currentVideo.description}
          </p>
          
          <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 border-t border-stone-100 pt-6 md:pt-8">
            <button 
              onClick={handlePrev}
              className="p-3 md:p-4 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600"
              title="Previous Session"
            >
              <SkipBack size={24} />
            </button>
            <button 
              onClick={togglePlay}
              className="flex-1 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 md:gap-3 uppercase tracking-widest text-sm md:text-base"
            >
              {isPlaying ? <><Pause fill="white" size={20} /> Pause</> : <><Play fill="white" size={20} /> Start Session</>}
            </button>
            <button 
              onClick={handleNext}
              className="p-3 md:p-4 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600"
              title="Next Session"
            >
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-amber-50 rounded-xl md:rounded-2xl border border-amber-100 flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600 shrink-0">
          <Sun size={20} />
        </div>
        <div>
          <p className="text-amber-900 font-bold text-xs md:text-sm uppercase tracking-wide">Player Tip</p>
          <p className="text-amber-800 text-xs md:text-sm mt-1 leading-relaxed">
            If the video doesn't start automatically, please click the <strong>Start Session</strong> button above. The playlist will naturally continue to the next session when ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
