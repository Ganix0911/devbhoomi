export type AudioMood = 'wind' | 'water' | 'forest' | 'temple';

export interface SceneData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageBg: string;
  imageFg?: string; // Optional foreground element for parallax
  color: string;
  cameraEffect: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'static';
  audioMood: AudioMood;
}

export interface Chapter {
  id: string;
  roman: string;
  title: string;
  triggerIndex: number;
}

export interface ScrollState {
  scrollY: number;
  progress: number; // 0 to totalScenes
  velocity: number;
}

export interface AnimationConfig {
  speed: number;
  direction: number;
}