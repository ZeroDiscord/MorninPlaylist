import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import PlaylistSidebar from './components/PlaylistSidebar';

const App = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif selection:bg-orange-100 flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 md:gap-8">
        <section className="w-full lg:w-2/3 xl:w-3/4">
          <VideoPlayer 
            currentVideo={currentVideo} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </section>

        <section className="w-full lg:w-1/3 xl:w-1/4">
          <PlaylistSidebar 
            playlist={playlist} 
            currentDayIndex={currentDayIndex} 
            selectVideo={selectVideo} 
          />
        </section>
      </main>

      <footer className="text-center p-8 md:p-12 text-stone-400 text-xs md:text-sm mt-auto">
        <p>© 2026 Morning Serenity Meditation Portal</p>
        <p className="mt-1 flex items-center justify-center gap-1 italic">
          Made with love for Mom
        </p>
      </footer>
    </div>
  );
};

export default App;
