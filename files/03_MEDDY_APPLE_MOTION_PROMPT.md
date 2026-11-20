# Meddy Oil & Gas: Apple-level motion prompt (paste into Antigravity)

Paste everything below the line into the existing Meddy project. Read `AGENTS.md` and `/docs/playbook.md` first. Load the `motion-director` skill.

---

## 0. TASK

Build the full motion system for the existing Next.js 15 project. Today the site has **no scroll reveal, no text reveal, no parallax, no page transition, no reduced-motion handling**. GSAP is installed and imported nowhere. The intro is a timer, and the menu is an instant swap. Replace all of it.

The target is the quality of apple.com product pages: slow, weighted, exact. Large type that rises out of masks. Scroll that tells a story in a few scrubbed moments. Interfaces that respond to touch in 150ms. Nothing bounces, floats, glows, or pulses.

Work in this order and report after each: (1) cleanup, (2) motion foundation, (3) intro, (4) hamburger menu and header, (5) text reveal, (6) scroll choreography, (7) micro interactions, (8) page transitions, (9) QA with recordings.

---

## 1. CLEANUP FIRST (remove what fights the motion system)

* Delete the `HeadlessChrome` and `Lighthouse` skip branch in `Preloader.tsx`. Real audits must see the real intro. Use `?skip_intro` only.
* Remove `scroll-behavior: smooth` from `globals.css` (it fights Lenis).
* Remove every glow: `shadow-[0_4px_..._rgba(246,158,40,...)]`, `drop-shadow` glows, the preloader radial gradient, `animate-pulse` on the hero eyebrow dot.
* Remove `backdrop-blur` on the hero secondary button, the search modal, and the mobile menu. (Apple's nav is translucent, but `AGENTS.md` bans header blur and glass. Keep it off unless the client asks.)
* Restore reference-accurate buttons: `border-radius: 2px`, not `rounded-full`.
* Remove `animate-in fade-in zoom-in-95` classes (no plugin installed). Everything animates through GSAP or CSS tokens.
* Replace the word "empowered" in `qhse/page.tsx`.
* Delete the old `Preloader` timers once the new intro exists.

---

## 2. FOUNDATION

### 2.1 Packages
Check versions before installing. Use the current `gsap` (all plugins including `SplitText` and `ScrollTrigger` ship in the main package from 3.13) and `@gsap/react`. Keep `lenis`. Verify the `SplitText` API against the installed version before use.

### 2.2 Tokens (`src/lib/motion/tokens.ts` and CSS variables)

```ts
export const EASE = {
  out: "expo.out",            // entrances, reveals   (cubic-bezier(0.16, 1, 0.3, 1))
  inOut: "power3.inOut",      // panels, transitions  (cubic-bezier(0.65, 0, 0.35, 1))
};
export const DUR = { fast: 0.16, base: 0.32, slow: 0.64, scene: 1.1, line: 1.0 };
export const STAGGER = { line: 0.08, row: 0.09, word: 0.04, item: 0.06 };
```

Two easings only. Animate `transform` and `opacity` (and `clip-path` for image unmasking). Never animate `width`, `height`, `top`, `left`, `margin`. Remove `will-change` when each tween completes.

### 2.3 One scroll clock (`MotionProvider.tsx`, client, mounted in `layout.tsx`)

```tsx
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: !reduce });
    (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

Expose `useLenis()` for stop and start (menu scroll lock, page transition).

### 2.4 Reduced motion and no-JS
* Wrap all animation in `gsap.matchMedia()`. `(prefers-reduced-motion: no-preference)` gets full motion. `reduce` gets instant states or a 300ms opacity fade.
* Pre-hide elements with CSS only under `html.js-motion` (set by a tiny inline script). If JavaScript fails, everything stays visible.

---

## 3. OPENING INTRO (once per session, about 2.4s, skippable)

### 3.1 Rules
* Markup is in the **server rendered HTML** so there is no flash of the page before the intro. An inline script in `<head>` sets `document.documentElement.dataset.intro = sessionStorage.getItem("meddy_intro") ? "skip" : "play"`. CSS hides the panel when `data-intro="skip"`.
* Tie it to **real loading**: `Promise.all([document.fonts.ready, hero image .decode(), logo decode(), minimumHold(1200)])`. No fake counter.
* Skippable by click, Enter, Space, Escape. Skip jumps to the end over 300ms.
* Return visit in the same session: 450ms hero reveal only.

### 3.2 Timeline

| Time | What happens | Duration | Ease |
|---|---|---|---|
| 0.00s | Navy `#0B1E36` panel already covering the screen. Logo icon centred, 96px (80px mobile), hidden. | none | none |
| 0.15s | Logo icon **fills from the bottom** with `clip-path: inset(100% 0 0 0)` to `inset(0)`. It reveals the supplied artwork, like liquid filling the droplet. | 0.8s | out |
| 0.95s | "MEDDY" and "OIL & GAS LIMITED" rise from masks beside or under the icon | 0.8s, 60ms stagger | out |
| 1.25s | Hold until the real load promise resolves | min 0.3s | none |
| 1.55s | Icon and text fade out | 0.12s | out |
| 1.65s | Panel lifts: `yPercent: 0` to `-100` | 0.7s | inOut |
| 1.80s | **Hero starts while the panel is still lifting**: hero image `scale 1.12 to 1` over 1.6s (out). Header slides in `y -24 to 0` with fade over 0.64s. | | out |
| 1.95s | Eyebrow rises (16px, fade), then H1 lines (masked, `yPercent 110 to 0`, 1.0s, 80ms stagger), then CTA, then the Safety, Reliability, Performance stack (70ms stagger), then the ghost word fades to resting opacity over 0.9s | | out |

Total panel time under 2.4s on a warm cache. If assets load slower, the hold extends, never the animation.

### 3.3 Sketch

```tsx
const ready = Promise.all([
  document.fonts.ready,
  heroImg.decode().catch(() => {}),
  logoImg.decode().catch(() => {}),
  new Promise((r) => setTimeout(r, 1200)),
]);

const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.out } });
tl.fromTo(logo, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.8 }, 0.15)
  .from(wordLines, { yPercent: 110, duration: 0.8, stagger: 0.06 }, 0.95);

await ready;
tl.play();
await tl.then();
// lift panel, start hero timeline at "-=0.55" so it overlaps
```

Store `sessionStorage.setItem("meddy_intro", "1")` **at the start of the lift**, not before, so a refresh mid intro still plays it.

---

## 4. HEADER AND HAMBURGER MENU

### 4.1 Header behaviour
* Transparent over the hero, solid navy `#0B1E36` after 80px with a 1px bottom hairline (`rgba(255,255,255,0.08)`).
* Hides on scroll down, returns on scroll up. `transform: translateY` only, 320ms, out ease. Never hide while the menu is open or while the page is within 80px of the top.
* Desktop nav items: underline draws from the left on hover (200ms). The active page keeps the underline.
* Services dropdown: opens in 280ms (opacity and `y: 8 to 0`), items stagger 40ms. Closes in 160ms. Keyboard and focus accessible. Hover only on `(hover: hover)`.

### 4.2 Hamburger button (below 1024px)

Structure:

```tsx
<button
  type="button"
  className="menu-btn"
  aria-expanded={open}
  aria-controls="mobile-menu"
  aria-label={open ? "Close menu" : "Open menu"}
>
  <span className="menu-btn__bars" aria-hidden="true"><i /><i /></span>
  <span className="menu-btn__label" aria-hidden="true">
    <span>Menu</span><span>Close</span>
  </span>
</button>
```

Specs:
* Hit area 48 by 48px minimum. Two bars, each 22px by 2px, radius 1px, colour white, 8px apart (4px above and below centre).
* Label "Menu" 13px, weight 600, tracking 0.04em. On open it **rolls up** and "Close" rolls in beneath it (a masked 100% yPercent swap, 400ms, out ease). Hide the label below 400px width and show only the bars.
* **Open morph (two stage, like Apple):**
  1. Bars slide to the centre line: `y: ±4 to 0`, 280ms, out.
  2. Bars rotate to a cross: `rotate: 45 and -45`, 420ms, out, starting at 120ms.
* **Close** plays the same timeline in reverse at 1.4 times speed (about 450ms).
* The bars stay white over the navy panel. The orange accent appears only on focus (2px orange ring, 2px offset) and on the CTA inside the menu.
* The button sits **above** the panel (`z-index` higher) so it never disappears. The logo in the header also stays above the panel.
* While animating, ignore extra clicks. Rapid toggling must reverse smoothly from the current progress, never jump (use one reversible timeline, not separate open and close tweens).

### 4.3 Menu panel

Layout: full viewport (`100dvh`), navy `#0B1E36`, 24px side padding, top padding equals header height. A small stacked footer area at the bottom.

Content order:
1. Primary links (Home, About, Services, Safety and Quality, Careers, Contact), each 40 to 56px, Barlow Condensed 700, sentence case, 1.05 line height, with a small index number (01 to 06) at the left in 14px orange. Hairline under each row.
2. "Services" row expands inline (accordion) to show the service names (20px, Manrope 500). The chevron rotates 180 degrees in 320ms. The panel height animates with `gsap.to(el, { height: "auto" })` and the content is not clipped on small phones (panel scrolls).
3. CTA button "Get In Touch" (orange fill, 2px radius, 56px high).
4. Address block and `info@[DOMAIN]` link in 14px, 60% white.

Reveal timeline (open):

```ts
const tl = gsap.timeline({ paused: true });
tl.set(panel, { visibility: "visible" })
  .fromTo(panel, { clipPath: "inset(0% 0% 100% 0%)" },
                 { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: EASE.inOut }, 0)
  .from(linkLines, { yPercent: 110, duration: 0.9, ease: EASE.out, stagger: STAGGER.item }, 0.25)
  .from(indexNumbers, { opacity: 0, y: 8, duration: 0.5, ease: EASE.out, stagger: STAGGER.item }, 0.35)
  .from(rules, { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: EASE.out, stagger: STAGGER.item }, 0.3)
  .from([cta, meta], { opacity: 0, y: 16, duration: 0.6, ease: EASE.out, stagger: 0.05 }, 0.6);
```

Behaviour:
* Open sets `aria-expanded="true"`, sets `inert` on `<main>` and `<footer>`, calls `lenis.stop()`, locks body scroll, moves focus to the first link after 400ms.
* Focus trap inside the panel and button. `Escape` closes. Focus returns to the button on close.
* Closes on route change (start the close at the same time as the page transition curtain).
* Link hover on touch devices is a 120ms opacity change, never a layout move.
* Reduced motion: no clip or roll. The panel fades in over 250ms and links appear instantly.
* Do not add backdrop blur. Do not tint the page behind it.

### 4.4 Close timeline
`tl.timeScale(1.4).reverse()`. On `onReverseComplete`: set `visibility: hidden`, remove `inert`, `lenis.start()`.

---

## 5. TEXT REVEAL

Create reusable components in `src/components/motion/`. Keep the real text in the DOM. Use `SplitText` with `autoSplit: true` so lines re-split on resize and font load. Never split paragraphs longer than three lines by line, use a block fade for those.

### 5.1 `RevealLines` (all headlines H1 to H3)

```tsx
SplitText.create(ref.current, {
  type: "lines",
  mask: "lines",
  autoSplit: true,
  linesClass: "split-line",
  onSplit(self) {
    return gsap.from(self.lines, {
      yPercent: 110,
      duration: DUR.line,
      ease: EASE.out,
      stagger: STAGGER.line,
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  },
});
```

* Hero H1 uses the same effect but is triggered by the intro timeline, not by scroll.
* Reveal once. Do not replay on scroll up.
* Set `text-wrap: balance` on headlines so breaks stay clean after the split.

### 5.2 `RevealWords` (Apple "reading light up", scrubbed)
Use on **two statements only**: the About lead paragraph (desktop) and the QHSE statement.

```tsx
SplitText.create(ref.current, {
  type: "words",
  autoSplit: true,
  onSplit(self) {
    return gsap.fromTo(self.words,
      { opacity: 0.18 },
      { opacity: 1, ease: "none", stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 } });
  },
});
```
Resting colour stays AA contrast at the end state. On mobile and reduced motion the paragraph is simply fully visible.

### 5.3 Small text
* Eyebrows, labels, captions: fade and rise 16px, 600ms, out ease.
* Body paragraphs: one block, fade and rise 24px, 800ms.
* Buttons and form rows: rise 16px with the group stagger (Section 6.6).

### 5.4 Numbers (when real stats exist)
Count up 1.4s on first view with `tabular-nums`. Never animate placeholders.

---

## 6. SCROLL CHOREOGRAPHY (Home, in page order)

Hard limits: **maximum 3 pinned sections per page** (Home uses 1), parallax only on images, parallax speed 5 to 25%, never on text. Below 768px: no parallax and no scrubbed word fill.

### 6.1 Hero (scroll out)
* Hero image `yPercent: 0 to 12` (`scrub: 0.6`). Container `overflow: hidden`.
* Hero content: `opacity 1 to 0`, `y 0 to -40px` between 10% and 60% of hero scroll.
* The ghost word `MEDDY` drifts `yPercent 0 to -10` at a slower rate.

### 6.2 Capabilities strip
Cells rise 24px with 70ms stagger and the hairline dividers draw down (`scaleY` 0 to 1, 700ms) as the strip enters at 85%.

### 6.3 About block
* Lead text: `RevealWords` (desktop). Subheading orange rule draws from the left (900ms).
* Checklist rows rise 16px, 70ms stagger, check icons scale 0.6 to 1 with a 160ms delay each.
* Images **unmask**: `clip-path: inset(0 0 100% 0)` to `inset(0)` plus `scale 1.08 to 1`, 1100ms, out ease. Add 6% and 12% parallax in opposite directions to the two images.

### 6.4 Services section (dark)
* Heading block is sticky on desktop.
* Each row rises 32px with 90ms stagger, total spread under 600ms. Index numbers and arrows follow 100ms later.
* Row hover: title shifts `x: 8px` (200ms), arrow rotates 45 degrees, the preview frame crossfades with a **clip-path wipe** (400ms) rather than a plain fade. No scale pop.
* The preview image changes with `fetchpriority="low"` and preloaded neighbours so there is no flash.

### 6.5 How we work
Vertical hairline (mobile) or horizontal line (desktop) **draws with scroll** (`scrub: 0.5`). Each step's number and text rise as the line reaches it.

### 6.6 QHSE statement (the one pinned moment)
* Pin the section for about `+=100%` of viewport height (`pin: true`, `anticipatePin: 1`, `scrub: 0.6`).
* Background image scales `1.15 to 1` while a navy scrim opacity moves `0.55 to 0.4`.
* The statement fills in word by word (`RevealWords`).
* Three commitments rise in at the end of the pin. The pin releases cleanly. Back button and keyboard scrolling must still work.
* Below 768px: no pin, a standard reveal.

### 6.7 Contact band
Headline lines reveal. The form fields rise with 60ms stagger as one group. The submit button arrives last.

### 6.8 Footer
The footer rises 24px. A large `MEDDY` ghost word slides up from a mask once. Nothing loops.

### 6.9 Inner pages
Every page gets: hero line reveal, one image unmask, row stagger on lists, and the same footer. Service detail pages add a sticky side summary on desktop. Same tokens, same eases. No new effects.

---

## 7. MICRO INTERACTIONS (150 to 320ms)

| Element | Behaviour |
|---|---|
| Primary button | Fill steps one tone darker (160ms). The label **rolls up** (text duplicated in a masked wrapper, `yPercent -100`, 320ms, out). The arrow slides 6px right and a second arrow enters from the left. Active: `scale 0.98`, 120ms. |
| Secondary button | Border brightens (160ms), same text roll |
| Text links | Underline draws from the left (200ms), retracts to the right on leave |
| Nav links | Same underline draw. Active link keeps it. |
| Service cards and images | Image `scale 1 to 1.04` over 640ms inside `overflow: hidden`. No shadow. |
| Cursor | Native. No followers, no magnetic buttons. |
| Form inputs | Label sits above (no floating label). On focus a 2px orange underline draws from the left (240ms). |
| Form validation | Error text rises 8px with fade (200ms). The field border changes colour only. |
| Submit | Button shows a progress state (the arrow becomes a small rotating ring), then a check icon whose stroke draws (500ms) with the success message |
| Checkboxes and toggles | 160ms fill, check stroke draws |
| Focus ring | 2px orange, 2px offset, always visible on keyboard, never on mouse click |
| Back to top | Appears after 1.5 viewports with a 240ms rise |

Gate all hover effects with `@media (hover: hover) and (pointer: fine)`. Touch targets are at least 44 by 44px.

---

## 8. PAGE TRANSITIONS (all routes)

Brand curtain: navy panel with the logo icon, no white flash, no blank wait.

1. Internal link click (not external, not `#anchor`, not same path, no modifier keys): `preventDefault`, start the cover.
2. Cover: panel rises from the bottom over 480ms (inOut). The logo icon fades in at 120ms.
3. Call `router.push(href)`. Wait for the new pathname, then `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()` after fonts and images have measured.
4. Reveal: panel lifts upward over 520ms (inOut). The new page's hero line reveal starts 200ms into the lift.
5. Total under 1.1s. Skip the curtain on reduced motion (250ms cross fade) and for hash links.
6. Back and forward buttons: no curtain, play a quick 300ms page reveal only. History must never break.

Build as `TransitionLink` plus a layout-level `TransitionOverlay`, with a small context exposing `navigate(href)`. Kill all ScrollTriggers (`ScrollTrigger.getAll().forEach(t => t.kill())`) and SplitText instances on route change, then rebuild. No memory leaks after 20 navigations.

---

## 9. PERFORMANCE AND ACCESSIBILITY

* Target 60fps scroll on a mid range Android profile. Chrome DevTools throttling: 4x CPU, Fast 3G.
* LCP under 2.5s with the intro enabled. CLS under 0.1. INP under 200ms.
* `will-change` only during a tween. Lazy load below fold sections. No animation libraries beyond GSAP and Lenis.
* Every effect has a reduced motion fallback. No flashing faster than 3 times per second.
* Content stays readable and usable if JavaScript fails.
* Heading order stays semantic after splitting. Add `aria-label` to the split parent only if screen reader output breaks.

---

## 10. ACCEPTANCE CRITERIA

| Check | Pass condition |
|---|---|
| Cleanup | No glow, no idle pulse, no backdrop blur, no pill buttons, no headless skip |
| Intro | Under 2.4s warm, tied to real loading, skippable, once per session, hero starts while panel lifts |
| Hamburger | Two stage morph, reversible mid animation, label roll, focus trap, Escape, scroll lock, focus return, closes on route change |
| Text reveal | Masked line reveal on every headline, two scrubbed word fills, text stays in DOM |
| Scroll | Image unmasks, row staggers, line draws, one pinned QHSE moment, parallax on images only |
| Page transition | Curtain on every internal link, back and forward safe, no blank flash |
| Micro interactions | All of Section 7 implemented with states |
| Reduced motion | Verified with the OS setting on and in Playwright (`reducedMotion: "reduce"`) |
| Responsive | Verified at 320, 390, 768, 1024, 1440, 1920 with no overflow or clipped text |
| Performance | 60fps scroll, LCP, CLS, INP targets met, no leaks after 20 route changes |

### Evidence required before you say done
1. Playwright recordings of: the intro, a full Home scroll, menu open and close (also rapid double tap), a page transition, and the same with reduced motion.
2. A timing table of each recording against Sections 3, 4, 6, and 8, within 50ms.
3. Lighthouse and axe output.
4. A list of anything marked `CANNOT VERIFY`.

Add every correction I make later as a one line rule in `/docs/ai-rules.md` and `AGENTS.md`.
