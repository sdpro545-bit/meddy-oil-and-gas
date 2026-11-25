# Verification & Visual Fidelity Report: Meddy Oil & Gas Limited

Generated from measured Phase D, Phase D3, and Phase E verification runs (`qa/phase-e-results.json`, `qa/nav-report-dev.json`, `qa/nav-report-prod.json`, `qa/verify-phase-d.mjs`).

---

## 1. Build, Lint, Image QA & Navigation Smoke

| Check | Command | Measured Result |
|---|---|---|
| Production Build | `npm run build` | **PASS** — 0 errors, 0 type errors, 18/18 static & dynamic routes built, search index generated (`20` documents in `src/lib/search-index.json`) |
| ESLint | `npm run lint` | **PASS** — 0 errors; 4 `@next/next/no-img-element` warnings on brand mark `<img>` elements (`Header.tsx`, `Footer.tsx`, `Preloader.tsx`, `PageTransition.tsx`) |
| Image QA | `npm run qa:images` | **PASS** — 84 files checked, 0 errors |
| Navigation Smoke (Dev) | `TEST_MODE=dev node scripts/nav-smoke.mjs` | **PASS** — 40/40 passed (`0` failed) across direct loads, home header, dropdown, deep `/about` header, and mobile menu |
| Navigation Smoke (Prod) | `TEST_MODE=prod node scripts/nav-smoke.mjs` | **PASS** — 40/40 passed (`0` failed) |
| Phase D & D3 Suite | `node qa/verify-phase-d.mjs` | **PASS** — 5 permanent `308` legacy redirects, `/api/contact` (`503` unconfigured, `200` honeypot, `400` validation), `/sitemap.xml`, Search Palette (lazy load, popular 6, 5 queries, fuzzy match, no-results, keyboard nav, `390x844` mobile sheet), 13 routes (`200`, 1 `h1`, 0 broken images, 0 overflow, 0 banned words/dashes) |

---

## 2. Hidden Content Check (Fresh Load, Curtain Nav, Browser Back)

Tested across all 13 routes after waiting 6 seconds post-load/navigation for `[data-reveal]` elements with `visibility: hidden`, `opacity: 0`, or off-container transforms:

- **Fresh Load (13 routes):** `0` stuck elements (`/` 18 reveals, `/about` 6, `/services` 3, 5 service detail pages 4 each, `/projects` 3, `/qhse` 4, `/careers` 4, `/contact` 1, `/privacy` 0 — all visible).
- **Curtain Navigation (6 routes):** `0` stuck elements (`/about`, `/services`, `/services/oil-field-services`, `/qhse`, `/careers`, `/contact`).
- **Browser Back (3 routes):** `0` stuck elements (`/careers`, `/qhse`, `/services/oil-field-services`).

---

## 3. 20-Navigation Leak Check

Navigated across site routes 20 consecutive times and recorded `ScrollTrigger.getAll().length` and GSAP active tween counts:

| Step | Route | ScrollTriggers | GSAP Tweens |
|---|---|---|---|
| 0 (Baseline) | `/` | 32 | 42 |
| 5 | `/projects` | 5 | 6 |
| 10 | `/services/integrated-services` | 6 | 6 |
| 15 | `/qhse` | 6 | 7 |
| 20 (End) | `/` | **17** | **27** |

End counts (`17` triggers, `27` tweens) remain below baseline (`32` triggers, `42` tweens) with zero leaked triggers.

---

## 4. Recordings & Timing Table

Six Playwright `.webm` recordings captured in `qa/videos/`:
- `01-intro-slow3g.webm`
- `02-warm-cache.webm`
- `03-hero-parallax-scroll.webm`
- `04-page-transition.webm`
- `05-hamburger-mobile.webm`
- `06-reduced-motion.webm`

| Scenario / Metric | Spec Reference | Measured Value | Notes |
|---|---|---|---|
| **Intro (Slow 3G)** — Preloader mounted | B5 | `3036 ms` | SSR preloader visible while JS bundles download |
| **Intro (Slow 3G)** — Elapsed to lift (`gateOpenedMs - preloaderMountedMs`) | B5 (4000ms JS cap) | `10291 ms` (`gateOpenedMs: 13327 ms`) | Includes ~6.3s Slow 3G JS download/hydration before `useEffect` starts the `4000 ms` `capTimer` in `Preloader.tsx` |
| **Intro (Slow 3G)** — Lift animation | B5 | `574 ms` | `preloaderGoneMs: 13901 ms` |
| **Warm Cache** (`meddy_intro_v2` / `skip_intro`) | B5 | `data-intro="skip"`, `h1Opacity: 1` | Wall time `4453 ms` (includes post-load settle wait) |
| **Hero Entrance** — Background settle | C3 | `1210 ms` | Smooth scale/opacity entrance |
| **Hero Entrance** — Eyebrow / expose done | C3 | `825 ms` | Reveal gate open + first text layer |
| **Hero Entrance** — H1 masked line reveal | C3 | `995 ms` | SplitText masked line reveal |
| **Hero Entrance** — Ghost word (`MEDDY`) | C3 | `1489 ms` | Translucent background wordmark |
| **Hero Entrance** — Scroll cue | C3 | `1939 ms` | Bottom center scroll indicator |
| **Pointer Parallax** — `bgDeltaX` | C4 (`±24px` max) | `-19.2 px` | Moves opposite cursor |
| **Pointer Parallax** — `contentDeltaX` | C4 (`±8px` max) | `6.4 px` | Subtle foreground depth |
| **Pointer Parallax** — `ghostDeltaX` | C4 (`±20px` max) | `16 px` | Mid-depth layer |
| **Home Scroll** — Header hide on down / show on up | Header spec | `matrix(1,0,0,1,0,-80)` / `matrix(1,0,0,1,0,0)` | Scrolled height `9300 px` |
| **Page Transition** — URL changed | Curtain spec | `1083 ms` | Curtain covers before route swap |
| **Page Transition** — Gate reopened / settled | Curtain spec | `1534 ms` / `2197 ms` | Reveal gate opens after curtain lift |
| **Hamburger (Mobile)** — X cross alignment | Header spec | `barDeltaY: 0`, `barDeltaX: 0` | Exact center cross; `mainInert: true`, `vis: visible` |
| **Hamburger (Mobile)** — Close & rapid double-tap | Header spec | Close `724 ms`; double-tap `expanded: "false"`, `vis: "hidden"`, `mainInert: false` | No stuck overlay or inert state |
| **Reduced Motion** (`reducedMotion: "reduce"`) | Accessibility | `gateOpen: true`, `h1Vis: "visible"`, `h1Opacity: "1"`, `hiddenReveals: 0`, `rmMenuVis: "visible"` | Preloader skipped; all content immediately visible |

---

## 5. Multi-Viewport Screenshots & 1440px Hero Diff

Screenshots captured in `qa/screenshots/phase-e/` (`hero-320.png` through `hero-2560.png`):

| Viewport | `scrollW` / `innerW` | Overflow | Header Height | H1 `fontSize` / `lineHeight` | H1 `textTransform` | H1 Top / Bottom |
|---|---|---|---|---|---|---|
| `320 px` | `320 / 320` | `false` | `64 px` | `42px` / `40.32px` | `none` | `159 px` / `240 px` |
| `390 px` | `390 / 390` | `false` | `64 px` | `42px` / `40.32px` | `none` | `296 px` / `377 px` |
| `768 px` | `768 / 768` | `false` | `64 px` | `60px` / `57.6px` | `none` | `393 px` / `509 px` |
| `1024 px` | `1024 / 1024` | `false` | `80 px` | `82px` / `78.72px` | `none` | `285 px` / `442 px` |
| `1440 px` | `1440 / 1440` | `false` | `80 px` | `82px` / `78.72px` | `none` | `285 px` / `442 px` |
| `1920 px` | `1920 / 1920` | `false` | `80 px` | `82px` / `78.72px` | `none` | `285 px` / `442 px` |
| `2560 px` | `2560 / 2560` | `false` | `80 px` | `82px` / `78.72px` | `none` | `285 px` / `442 px` |

### 1440px Hero Comparison vs OilRig Reference (`hero-1440.png`)
- **Matches:** Left-aligned eyebrow (`OIL AND GAS SERVICES FROM LAGOS`), 2-line condensed grotesque sentence-case H1 (`Engineering the Energy Future`), no box behind hero text, directional dark scrim on the left, solid amber primary CTA (`REQUEST CONSULTATION ->`) + outlined secondary CTA (`VIEW CAPABILITIES`), bottom-center `SCROLL` cue, right-side stacked values (`SAFETY`, `RELIABILITY`, `PERFORMANCE`), and offshore engineer in right third with Meddy hard-hat and coverall branding.
- **Measured Differences from Reference:**
  1. **Header Background:** Uses solid dark navy (`bg-[#0B1E36]/85`) at `y = 0` rather than fully transparent, to maintain WCAG AA contrast on white navigation links over the bright sky area of the hero photo.
  2. **Right-Side Ghost Element:** Displays translucent `"MEDDY"` wordmark behind the stacked values instead of template numeric counters (per truth-compliance rules).
  3. **Capabilities Strip & Service Set:** Five Geoplex-aligned service lines (`Well Construction`, `Oil Field Services`, `Integrated Services`, `FPSO & Vessel`, `Power`) instead of client logos or the removed six-line set.

---

## 6. Accessibility (`@axe-core/playwright`) & Lighthouse (Mobile Throttled)

### Axe-Core Audit
- `/careers`: **0 violations**
- `/contact`: **0 violations**
- `/`: **1 rule** (`color-contrast`, serious, 41 nodes)
- `/about`: **1 rule** (`color-contrast`, serious, 31 nodes)
- `/services`: **1 rule** (`color-contrast`, serious, 5 nodes)
- `/services/oil-field-services`: **1 rule** (`color-contrast`, serious, 5 nodes)
- `/qhse`: **1 rule** (`color-contrast`, serious, 15 nodes)
- *Resolved during Phase E:* Fixed `select-name` on the service dropdown (`id="contact-service"` + `htmlFor`) and `aria-prohibited-attr` on SplitText `<p>` elements (`aria: "none"`). Remaining `color-contrast` nodes are light/muted text over dark hero overlays and footer surfaces.

### Mobile Throttled Lighthouse (`/`)
| Run Mode | Performance | Accessibility | Best Practices | SEO | LCP | FCP | CLS | TBT | Speed Index |
|---|---|---|---|---|---|---|---|---|---|
| With Intro (`/`) | **66** | **96** | **100** | **100** | `1181 ms` | `1181 ms` | `0.0004` | `1952 ms` | `6343 ms` |
| Skip Intro (`/?skip_intro=1`) | **56** | **96** | **100** | **100** | `4487 ms` | `916 ms` | `0` | `1906 ms` | `2519 ms` |

---

## 7. `CANNOT VERIFY` List

1. **Live Resend Email Delivery:** `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, and `CONTACT_FROM_EMAIL` are unset in the local environment. `/api/contact` was verified for `503` unconfigured, `400` validation, and `200` honeypot responses; live SMTP/Resend delivery requires production credentials.
2. **Client-Supplied Company Facts & Service Scope:** `NEXT_PUBLIC_SITE_EMAIL`, domain name, phone number, CAC/RC number, certifications, client/project metrics, and final confirmation of `Power` and `FPSO & Vessel Services` cannot be verified from the repository and remain logged in `docs/open-questions.md` (service pages carry `DRAFT COPY` badges).
3. **Physical Mobile Device Frame Rate:** Mobile throttled Lighthouse and headless Chromium Playwright recordings were measured on Windows desktop; real-device 60fps scroll performance on iOS/Android hardware was not tested.
4. **Optional Hero Cutout & Video Layers:** No separate `[data-hero-subject]` transparency cutout or ambient hero video file was provided; static responsive AVIF/WebP imagery with `[data-p-drift]` ambient drift is used instead.
