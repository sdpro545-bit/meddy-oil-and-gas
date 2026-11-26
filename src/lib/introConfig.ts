import manifest from "@/lib/frames-manifest.json";

export const INTRO_CONFIG = {
  /** Total scroll height of #intro in vh (tune so scrubbing feels natural) */
  scrollHeightVh: 400,
  /** Smoothing lerp factor in rAF (0.1 - 0.15 recommended) */
  lerpFactor: 0.12,
  /** Total extracted frames */
  frameCount: manifest.frameCount,
  /** Normalized scroll progress (0-1) where the last frame holds and hero reveals */
  revealPoint: 0.92,
  /** Edge background color of frame 1 */
  firstFrameBg: manifest.firstFrameBg,
  /** Edge background color of final frame */
  lastFrameBg: manifest.lastFrameBg,
} as const;

export const HERO_COPY = {
  eyebrow: "Meddy Oil & Gas Limited",
  headline: "Powering Energy. Delivering Excellence.",
  subtext:
    "Integrated well construction, oil field services, FPSO and vessel support, and power delivery across Nigeria.",
  primaryCta: { label: "Our Services", href: "/services" },
  secondaryCta: { label: "Contact Us", href: "/contact" },
} as const;
