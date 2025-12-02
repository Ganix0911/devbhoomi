import React from 'react';

const CinematicOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full">
      {/* Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(120%) brightness(120%)',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* Cinematic Letterbox (Aspect Ratio 2.35:1 simulation) */}
      <div className="absolute top-0 left-0 right-0 h-[10vh] bg-black transition-transform duration-1000 ease-out translate-y-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black transition-transform duration-1000 ease-out translate-y-0" />
      
      {/* Scanline / Subtle Flicker (Optional, very low opacity) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-[0.02] bg-[length:100%_4px] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default CinematicOverlay;
