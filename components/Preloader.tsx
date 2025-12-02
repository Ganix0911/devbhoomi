import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fading out at 2.2 seconds
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 2200);

    // Completely remove from DOM at 3.0 seconds
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none transition-opacity duration-800 ease-in-out"
        style={{ opacity, transitionDuration: '800ms' }}
    >
        <div className="relative overflow-hidden p-4">
             {/* Main Title with Tracking Animation - Adjusted for Mobile */}
             <h1 className="font-cinematic text-4xl sm:text-5xl md:text-7xl text-white tracking-[0.2em] animate-tracking-in whitespace-nowrap drop-shadow-2xl">
                DEV BHOOMI
             </h1>
             
             {/* Subtext appearing slightly later */}
             <div 
                className="absolute bottom-0 left-0 right-0 text-center transition-opacity duration-700 delay-500"
                style={{ opacity: opacity === 1 ? 1 : 0 }}
             >
                <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] text-amber-200/60">
                    The Land of Gods
                </span>
             </div>
        </div>

        {/* Decorative Line */}
        <div 
            className="w-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/40 to-transparent mt-6 md:mt-8 transition-all duration-1000 delay-300 ease-out"
            style={{ width: opacity === 1 ? '150px' : '0px' }} 
        />
    </div>
  );
};

export default Preloader;