import React, { useEffect, useRef } from 'react';
import { AudioMood } from '../types';

interface SceneEffectsProps {
  mood: AudioMood;
  isVisible: boolean;
}

const ForestParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      phase: number;
    }> = [];

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles
    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Gentle horizontal drift
        vy: (Math.random() - 0.5) * 0.3 - 0.1, // Slight upward bias
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.03;

        // Wrap around logic
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Twinkle effect
        const currentAlpha = p.alpha + Math.sin(p.phase) * 0.15;
        
        // Draw Dust Mote / Firefly
        ctx.fillStyle = `rgba(255, 253, 208, ${Math.max(0, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasional Glow (Firefly effect)
        // Skip glow on mobile to save fill rate
        if (!isMobile && p.size > 1.8 && Math.sin(p.phase) > 0.8) {
             const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
             gradient.addColorStop(0, `rgba(255, 255, 100, ${currentAlpha * 0.4})`);
             gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
             ctx.fillStyle = gradient;
             ctx.beginPath();
             ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
             ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-30 mix-blend-screen opacity-80" 
    />
  );
};

const WaterMist: React.FC = () => {
    // Simplified mist for mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {/* Layer 1: Fast moving thin mist */}
            <div 
                className="absolute bottom-0 left-0 w-[200%] h-[40vh] bg-gradient-to-t from-white/30 via-white/5 to-transparent animate-mist-flow opacity-40 blur-xl" 
                style={{ transform: 'translate3d(0,0,0)' }} 
            />
             {/* Layer 2: Slow moving deeper fog - Disabled on mobile to reduce overdraw */}
             {!isMobile && (
                <div 
                    className="absolute bottom-[-10%] left-[-50%] w-[200%] h-[60vh] bg-gradient-to-t from-blue-100/20 via-white/10 to-transparent animate-mist-flow-slow opacity-30 blur-2xl" 
                />
             )}
        </div>
    );
}

const SceneEffects: React.FC<SceneEffectsProps> = ({ mood, isVisible }) => {
  if (!isVisible) return null;

  if (mood === 'forest') {
    return <ForestParticles />;
  }
  
  if (mood === 'water') {
      return <WaterMist />;
  }

  // Optional: Subtle particles for wind too?
  if (mood === 'wind') {
      // Maybe implement snow later, but for now forest/water are the requests
      return null;
  }

  return null;
};

export default SceneEffects;