import React from 'react';

interface StoryTextProps {
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  opacity: number;
}

const StoryText: React.FC<StoryTextProps> = ({ title, subtitle, description, isActive, opacity }) => {
  // We apply a transform based on opacity to make it drift up/down
  const translateY = (1 - opacity) * 40; 

  return (
    <div 
      className="absolute bottom-[15vh] md:bottom-[20vh] left-[6vw] md:left-[10vw] w-[88vw] md:w-full md:max-w-6xl z-30 text-white"
      style={{
        opacity: Math.max(0, opacity),
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: isActive ? 'auto' : 'none',
        willChange: 'transform, opacity'
      }}
    >
      <div className="overflow-hidden mb-2">
         <h3 
            className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase text-gray-100 font-sans border-l-2 border-red-500 pl-3 mb-2 drop-shadow-md"
            style={{ 
                transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
         >
            {subtitle}
         </h3>
      </div>
      
      {/* 
        Responsive Font Sizes: 
        text-3xl/4xl on mobile for safety with long titles
        text-6xl on tablet
        text-8xl on desktop
      */}
      <div className="overflow-hidden pr-4 md:pr-8 pb-4 -mb-4">
        <h1 
            className="font-cinematic text-3xl sm:text-4xl md:text-8xl mb-4 md:mb-6 leading-[0.95] md:leading-[0.9] tracking-tighter"
            style={{ 
                transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}
        >
            {title}
        </h1>
      </div>

      <div className="overflow-hidden max-w-[95%] md:max-w-xl">
        <p 
            className="font-sans text-sm md:text-xl text-gray-100 leading-relaxed opacity-90 drop-shadow-md"
            style={{ 
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                opacity: isActive ? 1 : 0,
                transition: 'all 1.2s ease-out 0.3s'
            }}
        >
            {description}
        </p>
      </div>
    </div>
  );
};

export default StoryText;