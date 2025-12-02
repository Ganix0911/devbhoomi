import React, { useEffect, useRef } from 'react';

interface YouTubeAudioProps {
  videoId: string;
  isMuted: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeAudio: React.FC<YouTubeAudioProps> = ({ videoId, isMuted }) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to track muted state so callbacks always access the latest value
  // regardless of closure staleness.
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    // 1. Load the IFrame Player API code asynchronously.
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // 2. Initialize player when API is ready
    const initPlayer = () => {
      if (playerRef.current) return; // Already created

      // Ensure container is present
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'autoplay': 1,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'loop': 1,
          'modestbranding': 1,
          'playsinline': 1, // Crucial for mobile
          'playlist': videoId, // Required for loop to work
          'rel': 0,
          'showinfo': 0,
          'origin': typeof window !== 'undefined' ? window.location.origin : undefined
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      });
    };

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function onPlayerReady(event: any) {
      // Apply the current ref state, not the captured initial prop
      if (isMutedRef.current) {
        event.target.mute();
      } else {
        event.target.unMute();
      }
      event.target.playVideo();
    }

    function onPlayerStateChange(event: any) {
        // If ended, ensure it loops
        if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo();
        }
        // If paused and we are NOT muted (meaning user wants sound), try to resume.
        // This handles cases where browser background throttling pauses the video.
        if (event.data === window.YT.PlayerState.PAUSED && !isMutedRef.current) {
             // Small timeout to prevent fighting with user-initiated pause actions if we had controls
             setTimeout(() => {
                 if (!isMutedRef.current && playerRef.current?.getPlayerState() !== 1) {
                     playerRef.current.playVideo();
                 }
             }, 1000);
        }
    }

    function onPlayerError(event: any) {
        console.warn('YouTube Player Error:', event.data);
    }

  }, [videoId]);

  // Handle Mute/Unmute prop changes
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        // Force play if not playing
        if (playerRef.current.getPlayerState() !== 1) { 
             playerRef.current.playVideo();
        }
      }
    }
  }, [isMuted]);

  return (
    <div 
        className="fixed left-[-9999px] top-[-9999px] w-1 h-1 overflow-hidden opacity-0 pointer-events-none z-[-1]"
        aria-hidden="true"
    >
        <div ref={containerRef} />
    </div>
  );
};

export default YouTubeAudio;