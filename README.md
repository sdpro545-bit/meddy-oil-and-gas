# Meddy Oil & Gas Website

Next.js (App Router) + TypeScript + Tailwind CSS + GSAP (`ScrollTrigger`) + Lenis smooth-scroll site for Meddy Oil & Gas Limited, featuring a scroll-driven brand-reveal intro sequence.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Swapping the Brand-Reveal Video & Regenerating Frames

1. Replace the source MP4 in `assets/Meddy_Oil_Gas_brand_reveal_a16e9c74_1080p.mp4` (or update `videoPath` in `scripts/extract-frames.mjs`).
2. Run:
   ```bash
   npm run frames
   ```
   This inspects the video with `ffprobe`, extracts `60–120` WebP frames (`q=75`) into:
   - `public/frames/frame_0001.webp` ... (1920px wide for desktop)
   - `public/frames-sm/frame_0001.webp` ... (960px wide for screens `< 768px`)
   and updates `src/lib/frames-manifest.json`.

## Tuning the Scroll Intro

Edit `src/lib/introConfig.ts`:

| Constant | Default | Purpose |
| --- | --- | --- |
| `scrollHeightVh` | `400` | Height of `#intro` in `vh`; controls how much scroll distance maps to the animation. |
| `lerpFactor` | `0.12` | Smoothing factor (`0.1–0.15`) inside `requestAnimationFrame` when interpolating toward the target frame. |
| `frameCount` | `94` | Auto-populated from `src/lib/frames-manifest.json`. |
| `revealPoint` | `0.92` | Normalized scroll progress (`0–1`) where the final frame holds and `#intro` cross-fades into `#hero`. |

Hero headline, subtext, and CTAs are also editable in `HERO_COPY` in `src/lib/introConfig.ts`.
