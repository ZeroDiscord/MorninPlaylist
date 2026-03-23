import React, { useState } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import PlaylistSidebar from './components/PlaylistSidebar';
import { Heart } from 'lucide-react';

const App = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Video list
  const playlist = [
    {
      id: '081bLdQKX-Q',
      title: 'Namami Shamishan',
      description: 'A soulful chant to begin with spiritual resonance.',
      duration: '5:25',
      type: 'Stotra'
    },
    {
      id: 'xJ3vatsNQDU',
      title: 'Shree Hanuman Chalisa',
      description: 'Super fast rendition for strength and focus.',
      duration: '4:18',
      type: 'Bhakti'
    },
    {
      id: 'NymJqtzVB7U',
      title: 'Shiv Tandav Stotram',
      description: 'Energetic verses by Ashutosh Rana.',
      duration: '3:05',
      type: 'Power'
    },
    {
      id: 'JoDKbXEUrvQ',
      title: '15 Mins Pranayama',
      description: 'Deep breathing exercises for daily vitality.',
      duration: '15:33',
      type: 'Yoga'
    },
    {
      id: 'A4WW9ezwazc',
      title: 'Bhor Bhayi Din Chad Gaya',
      description: 'A beautiful Ambe Maa Aarti to conclude.',
      duration: '4:18',
      type: 'Aarti'
    }
  ];

  const currentVideo = playlist[currentDayIndex];

  const handleNext = () => {
    setCurrentDayIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentDayIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const selectVideo = (index) => {
    setCurrentDayIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col relative overflow-x-hidden lg:overflow-hidden bg-[#fcf9f5] font-sans selection:bg-rose-200">
      {/* Background ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[45%] h-[45%] rounded-full bg-orange-300/15 blur-[100px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-rose-300/15 blur-[120px] mix-blend-multiply" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-[20%] left-[15%] w-[55%] h-[55%] rounded-full bg-pink-300/15 blur-[120px] mix-blend-multiply"></div>
      </div>

      <Header isPlaying={isPlaying} />

      <main className="flex-1 min-h-0 w-full max-w-[95rem] mx-auto p-4 md:p-5 lg:p-6 flex flex-col lg:flex-row gap-5 lg:gap-6 relative z-10 w-full">
        {/* Left Side: Video Player. On mobile takes exact height, on desktop takes full remaining height */}
        <section className="w-full lg:w-[68%] xl:w-[72%] lg:h-full flex flex-col min-h-0">
          <VideoPlayer 
            currentVideo={currentVideo} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </section>

        {/* Right Side: Playlist Sidebar. On desktop fits exactly, scrollable. On mobile takes normal height */}
        <section className="w-full lg:w-[32%] xl:w-[28%] lg:h-full flex flex-col min-h-0 mt-2 lg:mt-0">
          <PlaylistSidebar 
            playlist={playlist} 
            currentDayIndex={currentDayIndex} 
            selectVideo={selectVideo} 
          />
        </section>
      </main>

      <footer className="shrink-0 text-center py-4 bg-white/40 backdrop-blur-md border-t border-stone-200/50 relative z-10">
        <p className="font-semibold text-stone-500 text-xs tracking-wide">© 2026 Morning Serenity</p>
      </footer>
    </div>
  );
};

export default App;
