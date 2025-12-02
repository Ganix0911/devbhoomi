import React, { useEffect, useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useSmoothMouse } from './hooks/useSmoothMouse';
import Scene from './components/Scene';
import CinematicOverlay from './components/CinematicOverlay';
import Navigation from './components/Navigation';
import InfoSection from './components/InfoSection';
import ChapterTitle from './components/ChapterTitle';
import Preloader from './components/Preloader';
import YouTubeAudio from './components/YouTubeAudio';
import { SCENES, TOTAL_SCENES, SCROLL_HEIGHT_PER_SCENE, REGION_IMAGES, YOUTUBE_AUDIO_ID } from './constants';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const scrollProgress = useSmoothScroll();
  const mousePos = useSmoothMouse();
  
  // Audio State
  const [isMuted, setIsMuted] = useState(true);

  // Preload Images
  useEffect(() => {
    const preloadImage = (src: string) => {
        const img = new Image();
        img.src = src;
    };

    // 1. Immediate Critical Assets (First 4 scenes)
    SCENES.slice(0, 4).forEach(scene => {
        preloadImage(scene.imageBg);
        if (scene.imageFg) preloadImage(scene.imageFg);
    });

    // 2. Region Images (Large assets for InfoSection)
    Object.values(REGION_IMAGES).forEach(preloadImage);

    // 3. Stardust Texture
    preloadImage('https://www.transparenttextures.com/patterns/stardust.png');

    // 4. Defer the rest slightly to prioritize main thread for initial render
    const timeout = setTimeout(() => {
        SCENES.slice(4).forEach(scene => {
            preloadImage(scene.imageBg);
            if (scene.imageFg) preloadImage(scene.imageFg);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Calculate height for the sticky container
  const cinematicHeight = (TOTAL_SCENES) * SCROLL_HEIGHT_PER_SCENE;
  
  // Logic to clamp progress for the scenes
  const visualProgress = Math.min(scrollProgress, TOTAL_SCENES - 0.01);

  // Progress Bar Percentage
  const progressPercent = Math.min(100, (visualProgress / (TOTAL_SCENES - 1)) * 100);

  return (
    <div className="bg-black min-h-screen text-white relative">
      
      {/* PRELOADER */}
      <Preloader />
      
      {/* BACKGROUND AUDIO */}
      <YouTubeAudio videoId={YOUTUBE_AUDIO_ID} isMuted={isMuted} />

      {/* AUDIO TOGGLE BUTTON */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 left-6 z-[60] p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm group"
        aria-label={isMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-amber-200" />}
        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-white/70">
            {isMuted ? "Play Ambience" : "Silence"}
        </span>
      </button>

      {/* 
        CINEMATIC WRAPPER 
        Use 100dvh (dynamic viewport height) to prevent mobile browser address bar jumps.
      */}
      <div style={{ height: `${cinematicHeight}px` }} className="relative z-0">
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
            
            {/* CINEMATIC PROGRESS BAR */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-[60]">
                <div 
                    className="h-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] transition-all duration-100 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Global Effects Layer */}
            <CinematicOverlay />

            {/* Chapter Titles Overlay */}
            <ChapterTitle currentProgress={visualProgress} />

            {/* Scene Composition */}
            <div className="absolute inset-0 w-full h-full">
                {SCENES.map((scene, index) => (
                <Scene 
                    key={scene.id} 
                    data={scene} 
                    index={index} 
                    globalProgress={visualProgress}
                    mousePos={mousePos}
                />
                ))}
            </div>

            {/* UI Layer - Fades out when scrolling past cinematic area */}
            <div 
                className="transition-opacity duration-500"
                style={{ opacity: scrollProgress > TOTAL_SCENES - 0.5 ? 0 : 1 }}
            >
                {/* Hide Navigation dots on mobile to prevent overlap */}
                <div className="hidden md:block">
                  <Navigation currentProgress={visualProgress} />
                </div>
                
                <div className="fixed top-6 left-6 md:top-8 md:left-8 z-50 mix-blend-difference pointer-events-none">
                    <h1 className="font-cinematic text-lg md:text-2xl font-bold tracking-widest text-white">DEVBHOOMI</h1>
                </div>

                <div 
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 opacity-50 mix-blend-difference transition-opacity duration-500"
                    style={{ opacity: visualProgress > 0.2 ? 0 : 1 }}
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </div>
        </div>
      </div>

      {/* 
        INFORMATORY SECTION
        This renders naturally below the sticky container.
      */}
      <InfoSection />

    </div>
  );
};

export default App;