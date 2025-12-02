import React from 'react';
import { CHAPTERS } from '../constants';

interface ChapterTitleProps {
  currentProgress: number;
}

const ChapterTitle: React.FC<ChapterTitleProps> = ({ currentProgress }) => {
  // Config for duration logic
  const DURATION = 0.3; // Fits perfectly in the 0.35 to 0.65 gap

  // Find active chapter based on progress range
  const activeChapter = CHAPTERS.find(chapter => {
    const start = chapter.triggerIndex;
    const end = start + DURATION;
    return currentProgress >= start && currentProgress < end;
  });

  if (!activeChapter) return null;

  // Calculate local progress within the chapter display window (0 to 1)
  const start = activeChapter.triggerIndex;
  const localProgress = (currentProgress - start) / DURATION;
  
  // Opacity Curve: Smoother Sine/Trapezoid
  let opacity = 0;
  if (localProgress < 0.2) {
      // Smooth step up
      const t = localProgress / 0.2;
      opacity = t * t * (3 - 2 * t);
  } else if (localProgress > 0.8) {
      // Smooth step down
      const t = (localProgress - 0.8) / 0.2;
      opacity = 1 - (t * t * (3 - 2 * t));
  } else {
      opacity = 1;
  }

  // Transform Animation
  const scale = 0.95 + (localProgress * 0.1);
  const blur = (1 - opacity) * 10; // Blur out as it fades

  return (
    <div 
        className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
        style={{ 
            opacity, 
            backdropFilter: `blur(${blur}px)`,
            willChange: 'opacity, backdrop-filter'
        }}
    >
      {/* Radial gradient backdrop for legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] transition-opacity duration-300" />

      <div className="text-center relative z-10 px-4">
        <h2 
            className="font-cinematic text-sm md:text-2xl text-amber-200/90 mb-4 md:mb-6 tracking-[0.4em] uppercase"
            style={{
                transform: `translateY(${(1 - opacity) * -20}px)`,
                willChange: 'transform'
            }}
        >
            Chapter {activeChapter.roman}
        </h2>
        
        <h1 
            className="font-cinematic text-3xl sm:text-5xl md:text-8xl text-white font-bold uppercase drop-shadow-2xl"
            style={{ 
                transform: `scale3d(${scale}, ${scale}, 1)`,
                letterSpacing: '0.1em', // Fixed tracking for stability
                willChange: 'transform',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
        >
            {activeChapter.title}
        </h1>
        
        <div 
            className="w-20 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-200/50 to-transparent mt-6 md:mt-8 mx-auto"
            style={{
                transform: `scaleX(${opacity})`,
                transition: 'transform 0.1s linear'
            }} 
        />
      </div>
    </div>
  );
};

export default ChapterTitle;