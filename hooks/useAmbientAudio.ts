import { useEffect, useRef } from 'react';
import { SCENES, AUDIO_SOURCES } from '../constants';
import { AudioMood } from '../types';

export const useAmbientAudio = (scrollProgress: number, isMuted: boolean) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const rafRef = useRef<number | null>(null);

  // Initialize Audio Objects
  useEffect(() => {
    Object.entries(AUDIO_SOURCES).forEach(([mood, url]) => {
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = 0;
      audio.preload = 'auto';
      audioRefs.current[mood] = audio;
    });

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
        audio.pause();
        audio.src = '';
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle Mute/Unmute interactions
  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
      if (!isMuted) {
        // Try to play if not already playing (and volume is > 0 or intended to be)
        // We rely on the fading logic to actually set volume, but we must ensure play() is called
        // after a user interaction (which toggling mute implies).
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Audio autoplay prevented:', error);
          });
        }
      } else {
        audio.pause();
      }
    });
  }, [isMuted]);

  // Logic to determine active mood and fade volumes
  useEffect(() => {
    const updateVolumes = () => {
      if (isMuted) return;

      // Determine current active mood based on scene index
      const sceneIndex = Math.round(scrollProgress);
      // Clamp index to be safe
      const safeIndex = Math.max(0, Math.min(sceneIndex, SCENES.length - 1));
      const targetMood: AudioMood = SCENES[safeIndex].audioMood;

      const FADE_SPEED = 0.02; // Increment per frame

      Object.entries(audioRefs.current).forEach(([mood, audio]: [string, HTMLAudioElement]) => {
        if (mood === targetMood) {
          // Fade In
          if (audio.volume < 1) {
            audio.volume = Math.min(1, audio.volume + FADE_SPEED);
          }
          // Ensure it's playing if volume is up
          if (audio.paused && audio.volume > 0) {
             const playPromise = audio.play();
             if (playPromise) playPromise.catch(() => {});
          }
        } else {
          // Fade Out
          if (audio.volume > 0) {
            audio.volume = Math.max(0, audio.volume - FADE_SPEED);
          }
          // Pause if volume hits 0 to save resources
          if (audio.volume === 0 && !audio.paused) {
            audio.pause();
          }
        }
      });

      rafRef.current = requestAnimationFrame(updateVolumes);
    };

    if (!isMuted) {
      rafRef.current = requestAnimationFrame(updateVolumes);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollProgress, isMuted]);
};