import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Sun, Moon, Wind, Heart, Calendar } from 'lucide-react';

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

  // Set initial video based on current day of week
  useEffect(() => {
    const today = new Date().getDay();
    // Map 7 days to 5 videos (0-4)
    setCurrentDayIndex(today % playlist.length);
  }, []);

  const currentVideo = playlist[currentDayIndex];

  // Helper to generate a playlist string for YouTube
  // To enable "Autoplay Next", we pass the other video IDs in the 'playlist' parameter
  const getPlaylistParams = () => {
    // We create an ordered list starting from the current index and wrapping around
    const orderedIds = [];
    for (let i = 0; i < playlist.length; i++) {
      orderedIds.push(playlist[(currentDayIndex + i) % playlist.length].id);
    }
    // The first ID is used in the main URL, the 'playlist' param needs the rest (or all)
    return orderedIds.join(',');
  };

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

  const getDayName = () => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif selection:bg-orange-100">
      <nav className="p-6 flex justify-between items-center border-b border-stone-200 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <Wind size={24} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Morning Serenity</h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-stone-500 text-sm uppercase tracking-widest">
          <span className="flex items-center gap-1"><Calendar size={16} /> {getDayName()}</span>
          <span className="flex items-center gap-1 text-orange-600 font-bold tracking-tighter italic">For Priyanka</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100">
            <div className="relative aspect-video bg-stone-900">
              {/* FIX FOR ERROR 153:
                - Using youtube-nocookie.com to avoid origin/cookie blocks.
                - Removed origin parameter which often triggers 153 in sandboxed environments.
                - Using the 'playlist' parameter to handle "Autoplay Next" natively.
              */}
              <iframe
                key={`${currentVideo.id}-${isPlaying}`}
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?playlist=${getPlaylistParams()}&autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {currentVideo.type}
                  </span>
                  <h2 className="text-3xl mt-2 font-bold text-stone-900">{currentVideo.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-stone-400 text-sm uppercase tracking-widest">Duration</p>
                  <p className="text-xl font-mono">{currentVideo.duration}</p>
                </div>
              </div>
              <p className="text-stone-600 text-lg leading-relaxed">
                {currentVideo.description}
              </p>
              
              <div className="mt-8 flex items-center gap-4 border-t border-stone-100 pt-8">
                <button 
                  onClick={handlePrev}
                  className="p-4 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600"
                  title="Previous Lesson"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  {isPlaying ? <><Pause fill="white" size={20} /> Pause</> : <><Play fill="white" size={20} /> Start Session</>}
                </button>
                <button 
                  onClick={handleNext}
                  className="p-4 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600"
                  title="Next Lesson"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600">
              <Sun size={20} />
            </div>
            <div>
              <p className="text-amber-900 font-bold text-sm uppercase tracking-wide">Player Tip</p>
              <p className="text-amber-800 text-sm mt-1">
                If the video doesn't start automatically, please click the <strong>Start Session</strong> button above. This website will then play all 5 videos in order.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sun className="text-orange-400" size={20} />
              Morning Flow
            </h3>
            
            <div className="space-y-3">
              {playlist.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => selectVideo(index)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex gap-4 items-center group ${
                    currentDayIndex === index 
                    ? 'bg-orange-50 border-orange-200 ring-2 ring-orange-100' 
                    : 'bg-white border-stone-100 hover:border-stone-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    currentDayIndex === index ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-400'
                  }`}>
                    {currentDayIndex === index ? <Play size={20} fill="white" /> : <span className="text-sm font-bold">{index + 1}</span>}
                  </div>
                  <div>
                    <h4 className={`font-bold leading-tight ${currentDayIndex === index ? 'text-orange-900' : 'text-stone-800'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 uppercase tracking-tighter">{item.type} • {item.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-8 rounded-3xl text-white shadow-xl shadow-orange-100 relative overflow-hidden">
            <Heart className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
            <h3 className="text-xl font-bold mb-2 relative z-10">Namaste, Priyanka</h3>
            <p className="text-white/90 leading-relaxed relative z-10 text-sm">
              We've prepared this sequence for your peace and health. The player will automatically move to the next session once the current one ends.
            </p>
          </div>
        </aside>
      </main>

      <footer className="text-center p-12 text-stone-400 text-sm">
        <p>© 2026 Morning Serenity Meditation Portal</p>
        <p className="mt-1 italic">Made with love for Mom</p>
      </footer>
    </div>
  );
};

export default App;
