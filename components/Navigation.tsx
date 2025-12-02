import React from 'react';
import { TOTAL_SCENES } from '../constants';

interface NavigationProps {
  currentProgress: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentProgress }) => {
  const activeIndex = Math.round(currentProgress);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: TOTAL_SCENES }).map((_, idx) => (
        <div 
            key={idx}
            className={`w-1 transition-all duration-300 rounded-full ${activeIndex === idx ? 'h-8 bg-white box-shadow-[0_0_10px_white]' : 'h-1 bg-white/20'}`}
        />
      ))}
    </div>
  );
};

export default Navigation;
