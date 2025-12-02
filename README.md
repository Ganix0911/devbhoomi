# Devbhoomi — Uttarakhand Cinematic Experience

A scroll-driven, cinematic storytelling website that presents Uttarakhand through immersive visuals, ambient audio, and chapter-based narrative flow.

This project focuses on experience-first design using React, TypeScript, and WebGL-enhanced effects — without relying on heavy animation libraries.

---

## What This Project Is

This site is an interactive, scroll-controlled narrative experience.

It uses “scenes” and “chapters” to guide users through:
- Landscapes
- Temples
- Valleys
- Forests
- High-altitude life

Every visual and audio shift is controlled by scroll position, making the page behave more like a film timeline than a traditional website.

---

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS (custom styles)
- OGL (WebGL effects)
- Lucide React (icons)

No frameworks like Tailwind, GSAP, Framer Motion, or Three.js are used for core animation logic.

---

## Features

- Scroll-based cinematic scenes
- Smooth scroll interpolation
- Camera-like zoom and pan effects
- Ambient audio system with crossfades
- Chapter and scene overlay system
- Cursor-based parallax motion
- Preloaded and lazy-loaded image assets
- Lightweight WebGL atmospheric effects

---

## How It Works

The experience is driven by two main concepts:

### Scenes
Each scene contains:
- Background and foreground imagery
- Titles and narrative text
- A camera animation mode (zoom/pan)
- An audio mood

Scenes are defined as structured data in `constants.ts`.

### Chapters
Chapters group scenes and drive the narrative pacing. Chapter transitions are triggered based on scroll position.

---

## Project Structure

src/
├── components/
│ ├── Scene.tsx
│ ├── SceneEffects.tsx
│ ├── CinematicOverlay.tsx
│ ├── Navigation.tsx
│ └── CircularGallery.tsx
│
├── hooks/
│ ├── useSmoothScroll.ts
│ ├── useAmbientAudio.ts
│ └── useSmoothMouse.ts
│
├── constants.ts
├── types.ts
├── App.tsx
└── index.tsx


---

## Setup & Run

### 1. Install dependencies
npm install

## 2. Start development server
npm run dev

### 3. Build for production
npm run build

### 4. Preview production build
npm run preview
