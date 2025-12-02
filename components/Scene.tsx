import React from 'react';
import { SceneData } from '../types';
import StoryText from './StoryText';
import SceneEffects from './SceneEffects';

interface SceneProps {
  data: SceneData;
  index: number;
  globalProgress: number;
  mousePos: { x: number; y: number };
}

const Scene: React.FC<SceneProps> = ({ data, index, globalProgress, mousePos }) => {
  const progress = globalProgress - index;
  const absProgress = Math.abs(progress);
  
  // Detect mobile to disable heavy effects
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Adjusted visibility logic:
  // We want to ensure the final scene stays visible if clamped.
  const isVisible = progress > -1 && progress < 1;
  
  // --- OPACITY LOGIC ---
  
  // 1. Background Opacity: Stays visible longer to provide atmosphere
  // Fades out from 0.2 to 0.8
  let bgOpacity = 0;
  if (absProgress < 0.2) {
      bgOpacity = 1;
  } else {
      bgOpacity = 1 - ((absProgress - 0.2) / 0.6);
  }
  const clampedBgOpacity = Math.max(0, Math.min(1, bgOpacity));

  // 2. Text Opacity: Fades out FAST to make room for Chapter Titles
  // Fades out from 0.2 to 0.35. STRICTLY GONE by 0.35.
  let textOpacity = 0;
  if (absProgress < 0.2) {
      textOpacity = 1;
  } else {
      textOpacity = 1 - ((absProgress - 0.2) / 0.15);
  }
  const clampedTextOpacity = Math.max(0, Math.min(1, textOpacity));


  // Displacement / Distortion Logic (Desktop Only)
  const distortionAmount = Math.pow(absProgress, 2) * 150; 
  const filterId = `disp-${data.id}`;

  const getTransforms = () => {
    const baseScale = 1.1;
    let scale = baseScale;
    let x = 0;
    
    // Base scroll animations
    switch (data.cameraEffect) {
      case 'zoom-in':
        scale = baseScale + (progress + 1) * 0.2; 
        break;
      case 'zoom-out':
         scale = baseScale + 0.4 - ((progress + 1) * 0.2);
         break;
      case 'pan-right':
         scale = 1.2; 
         x = (progress) * -150;
         break;
      case 'pan-left':
         scale = 1.2;
         x = (progress) * 150;
         break;
      default:
         break;
    }

    // Add Parallax Hover Effect (Disabled/Reduced on Mobile via mousePos logic or simple check)
    // "Background images to move in the direction of the hover"
    const hoverX = isMobile ? 0 : mousePos.x * 12;
    const hoverY = isMobile ? 0 : mousePos.y * 12;

    return `scale3d(${scale}, ${scale}, 1) translate3d(${x + hoverX}px, ${hoverY}px, 0)`;
  };

  const getFgTransforms = () => {
      const y = progress * -200; 
      // Foreground moves slightly differently to create depth
      const hoverX = isMobile ? 0 : mousePos.x * 20; 
      const hoverY = isMobile ? 0 : mousePos.y * 20;
      return `translate3d(${hoverX}px, ${y + hoverY}px, 0)`;
  };

  if (!isVisible && clampedBgOpacity <= 0.01) return null;

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-black"
      style={{
        // Removed dynamic z-index. 
        // We rely on natural DOM order (stacking) and opacity for smooth crossfades.
        opacity: clampedBgOpacity,
        willChange: 'opacity' // Removed filter from will-change for mobile optimization
      }}
    >
        {/* SVG Displacement Filter Definition - DISABLED ON MOBILE FOR PERFORMANCE */}
        {!isMobile && (
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="0.015" 
                            numOctaves="3" 
                            result="noise" 
                        />
                        <feDisplacementMap 
                            in="SourceGraphic" 
                            in2="noise" 
                            scale={distortionAmount} 
                            xChannelSelector="R" 
                            yChannelSelector="G" 
                        />
                    </filter>
                </defs>
            </svg>
        )}

        {/* Background Layer with Filter */}
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundColor: '#1a1a1a',
                backgroundImage: `url(${data.imageBg})`,
                transform: getTransforms(),
                willChange: 'transform',
                // Combine brightness fade with displacement distortion (Desktop Only)
                // Mobile gets simple brightness
                filter: isMobile 
                    ? `brightness(${0.4 + clampedBgOpacity * 0.4})` 
                    : `brightness(${0.4 + clampedBgOpacity * 0.4}) url(#${filterId})` 
            }}
        />

        {/* Atmospheric Effects (Mist, Fireflies, etc.) */}
        <SceneEffects mood={data.audioMood} isVisible={clampedBgOpacity > 0.1} />

        {/* Foreground Parallax Layer */}
        {data.imageFg && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                    className="w-3/4 md:w-1/2 h-1/2 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${data.imageFg})`,
                        transform: getFgTransforms(),
                        willChange: 'transform',
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))'
                    }}
                />
             </div>
        )}

        {/* Scene Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Text Layer 
            Now uses the stricter textOpacity to clear space for Chapter Titles 
        */}
        <StoryText 
            title={data.title} 
            subtitle={data.subtitle} 
            description={data.description} 
            isActive={absProgress < 0.25} 
            opacity={clampedTextOpacity}
        />
        
        {/* Decorative Elements */}
        <div className="absolute bottom-10 right-10 text-white/30 font-mono text-xs tracking-widest z-40 pointer-events-none hidden md:block">
            SCENE 0{index + 1} // {data.cameraEffect.toUpperCase()} // REC
        </div>
    </div>
  );
};

export default Scene;