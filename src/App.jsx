import React, { useState } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import PlaylistSidebar from './components/PlaylistSidebar';
import { Heart } from 'lucide-react';

const App = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Default to true for autoplay

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
    <div className="min-h-screen text-stone-800 font-sans selection:bg-rose-200 flex flex-col relative overflow-hidden bg-[#fdfaf6]">
      {/* Background ambient blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-300/20 blur-[100px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-300/20 blur-[120px] mix-blend-multiply" style={{ animationDuration: '7s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-300/20 blur-[150px] mix-blend-multiply"></div>
      </div>

      <Header />

      <main className="flex-grow w-full max-w-[90rem] mx-auto p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        <section className="w-full lg:w-[65%] xl:w-[70%]">
          <VideoPlayer 
            currentVideo={currentVideo} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </section>

        <section className="w-full lg:w-[35%] xl:w-[30%]">
          <PlaylistSidebar 
            playlist={playlist} 
            currentDayIndex={currentDayIndex} 
            selectVideo={selectVideo} 
          />
        </section>
      </main>

      <footer className="text-center p-8 md:p-12 text-stone-500 text-xs md:text-sm mt-auto relative z-10 border-t border-stone-200/50 bg-white/30 backdrop-blur-md">
        <p className="font-semibold tracking-wide">© 2026 Morning Serenity Meditation Portal</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 italic text-stone-400">
          Made with <Heart size={14} className="text-rose-400 fill-rose-400 animate-pulse" /> for Mom
        </p>
      </footer>
    </div>
  );
};

export default App;
