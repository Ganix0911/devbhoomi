import { useEffect, useRef, useState } from 'react';

export const useSmoothMouse = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    // NOTE: Touch move handlers for parallax on mobile have been removed.
    // Parallax on touch devices while scrolling causes significant frame drops.
    // We prioritize 60fps scrolling over subtle tilt effects on mobile.

    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      // Lerp factor: lower = smoother/slower, higher = snappier
      // 0.05 provides a very "liquid" feeling suitable for cinematic backgrounds
      const ease = 0.05; 
      
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      // Update if difference is significant to avoid unnecessary renders
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        currentRef.current.x += dx * ease;
        currentRef.current.y += dy * ease;
        
        setMousePos({ 
            x: currentRef.current.x, 
            y: currentRef.current.y 
        });
      }

      rafRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mousePos;
};