'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  useEffect(() => {
    // Play sound effect when loading screen appears
    const playSound = () => {
      try {
        const audio = new Audio('/sounds/loading.mp3');
        audio.volume = 0.3; // Set volume to 30% to not be too loud
        audio.play().catch((error) => {
          // Handle autoplay restrictions in some browsers
          console.log('Audio autoplay was prevented:', error);
        });
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    };

    playSound();
  }, []);

  return (
    <div className="fixed inset-0 bg-[#00B8A9] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Main Logo */}
        <Image
          src="/assets/logo.svg"
          alt="Loading..."
          width={300}
          height={120}
          className="w-64 h-auto animate-bounce-scale"
          priority
        />
        
        {/* Powered By Logo - Slides in from bottom after delay */}
        <Image
          src="/assets/powerdBy.svg"
          alt="Powered by"
          width={200}
          height={50}
          className="w-48 h-auto opacity-0 animate-slide-up-delayed"
          priority
        />
      </div>
    </div>
  );
}
