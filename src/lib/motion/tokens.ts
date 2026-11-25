export const EASE = {
  out: "expo.out",       // entrances, reveals   (cubic-bezier(0.16, 1, 0.3, 1))
  inOut: "power3.inOut", // panels, transitions  (cubic-bezier(0.65, 0, 0.35, 1))
} as const;

export const DUR = {
  fast: 0.16,
  base: 0.32,
  slow: 0.64,
  scene: 1.1,
  line: 1.0,
} as const;

export const STAGGER = {
  line: 0.08,
  row: 0.09,
  word: 0.04,
  item: 0.06,
} as const;

export const HERO_AMBIENT = true;
export const HERO_VIDEO_ENABLED = false; // Set true once /public/videos/hero-loop.{webm,mp4} exist

