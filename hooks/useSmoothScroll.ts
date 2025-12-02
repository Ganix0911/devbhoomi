import { useEffect, useRef, useState } from 'react';
import { SCROLL_HEIGHT_PER_SCENE, TOTAL_SCENES } from '../constants';

export const useSmoothScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const update = () => {
      // Linear interpolation (Lerp) for smooth weight
      // Current = Current + (Target - Current) * factor
      const diff = targetScrollRef.current - scrollRef.current;
      const ease = 0.08; // Lower = heavier/smoother, Higher = snappier

      if (Math.abs(diff) > 0.1) {
        scrollRef.current += diff * ease;
        
        // Calculate progress based on total height
        // 0 to TOTAL_SCENES
        const totalHeight = (TOTAL_SCENES) * SCROLL_HEIGHT_PER_SCENE;
        // Normalize
        const progress = Math.max(0, scrollRef.current / SCROLL_HEIGHT_PER_SCENE);
        
        setScrollProgress(progress);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return scrollProgress;
};
