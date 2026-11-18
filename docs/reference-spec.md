# Design Reference Specification: Meddy Oil & Gas

## 1. Source Reference Overview
- **Source File:** `8246a944947368d42d8f0ae5faaf3be8.jpg` (`references/oilrig-home.jpg`)
- **Dimensions of Canvas:** 1200 x 960 px
- **Inner Website Frame:** Width 864 px (Left 168 px to Right 1032 px), representing a 1440 px desktop baseline scaled at 60%.
- **Design Archetype:** Heavy industrial corporate energy template ("OilRigPro"), characterized by bold condensed typography, high-contrast imagery, dark slate/navy structure, warm amber/orange single action accent, and hairline grid dividers.

---

## 2. Layout, Grid & Spacing Rhythm (Normalized to 1440px Desktop Baseline)

### Base Grid & Container
- **Grid:** 12 columns, 32px gutters on desktop (24px on tablet, 16px on mobile).
- **Container Max-Width:** 1320px with fluid inline padding `clamp(20px, 4.5vw, 72px)`.
- **Vertical Spacing Scale (8pt):**
  - Section vertical padding: `clamp(72px, 8vw, 128px)`.
  - Eyebrow to H2 gap: 16px.
  - H2 to Lead paragraph: 24px.
  - Paragraph to CTA: 32px.
  - Radii: 2px (buttons), 4px (cards/tiles), 0px (bleed images).

---

## 3. Section-by-Section Visual Breakdown

### 3.1 Header / Top Navigation
- **Height:** 80px on desktop (64px mobile).
- **Behavior:**
  - Initial (over hero): Transparent with dark slate legibility tint; white nav text.
  - Scrolled (> 80px): Solid deep navy (`--ink-900`: `#102A47`) with 1px bottom border (`rgba(255, 255, 255, 0.08)`), height compresses to 72px.
- **Left:** Meddy droplet icon (on a subtle white tile when transparent over busy photo) + Live-typeset wordmark (`MEDDY` in Barlow Condensed 700 + `OIL & GAS` in Manrope 600, 11px, tracking 0.12em).
- **Center:** Navigation items: Home, About, Services (dropdown), Projects, QHSE, Careers, Contact. Active link indicated by amber underline.
- **Right:**
  - Circular Search icon button (40px diameter).
  - Primary CTA button: Solid Orange (`--brand-orange-500`: `#F69E28`), 50px height, text: `Get in Touch`, optional gear/arrow icon.

### 3.2 Hero Section
- **Height:** `min-height: 100svh;` (floor of 640px, capped at 1000px on ultra-wide).
- **Background Photography:** Full-bleed offshore setting. Nigerian woman engineer positioned in right 40%, calm Gulf of Guinea water and rig haze in distance.
- **Legibility Scrim:** Directional linear scrim from left: `rgba(11, 30, 54, 0.70)` to `rgba(11, 30, 54, 0.0)` at 55% width.
- **Left Content Column (6 of 12 cols):**
  - Eyebrow: Orange (`--brand-orange-500`), 14px, 600 weight, tracking 0.04em: `Oil and gas services from Lagos`.
  - H1 Display: 2 lines, Barlow Condensed 700, `clamp(48px, 6.8vw, 96px)`, tracking -0.01em, line-height 0.96:
    **Engineering the**
    **Energy Future**
  - Primary CTA: Solid Orange button, 52px height, dark text (`--ink-950`), `Request Consultation`.
- **Right Floating Stat Cluster:**
  - Stacked 3-line descriptor:
    - `Safety` (white, 16px, 600)
    - `Reliability` (orange, 16px, 700)
    - `Performance` (white, 16px, 600)
  - Ghost Background Typography: Sits behind stacked words. While client stats are null, displays translucent ghost word `MEDDY` in Barlow Condensed 700 at 25% opacity.

### 3.3 Capabilities Strip (Replacing Template Logo Strip)
- **Position:** Directly below hero background.
- **Layout:** 5 equal cells with 1px hairlines (`--paper-100`: `#EAEFF5`).
- **Content:** 5 core service lines as live display text:
  1. `Drilling Support`
  2. `Well Construction`
  3. `Wireline Services`
  4. `Engineering Services`
  5. `Procurement & Supply`
- **Styling:** Barlow Condensed 600, 26px, `--ink-500`, transitions to `--ink-950` with amber fill on hover.

### 3.4 About Us Block (Asymmetrical Editorial 3-Zone Layout)
- **Surface:** Light paper (`--paper-50`: `#F6F8FB`).
- **Zone 1 (Lower Left Image):**
  - Subject: Industrial storage tank with yellow spiral staircase and handrail (Shot 2).
  - Crop: 4:3, offset vertically so its bottom edge bleeds past the text column baseline.
- **Zone 2 (Center-Right Text Column):**
  - Eyebrow: `About Us` in brand orange.
  - H2: `Projects Completed & Field Professionals` (Barlow Condensed 700, 48px).
  - Body: Plain, specific overview of Meddy Oil & Gas services in Lagos.
  - Subhead with Amber Underline Rule: `Dedicated to Excellence in Oil and Gas Service`.
  - Checklist: 3 items with custom amber check icons.
  - Stat Cluster: Avatar badge stack + `[STAT] Employees` and `[STAT]+ Active Fields` (stat placeholders, clean collapse when null).
  - CTA Button: Solid Orange button `Explore Our Capabilities`.
- **Zone 3 (Upper Right Image):**
  - Subject: Nigerian engineer in PPE with amber hard hat reviewing a tablet (Shot 3).
  - Crop: 4:5 portrait, sits higher on the right side.

---

## 4. Typography Matrix

| Role | Font Family | Weight | Size (Fluid) | Line Height | Tracking | Transform |
|---|---|---|---|---|---|---|
| Hero H1 | Barlow Condensed | 700 | `clamp(48px, 6.8vw, 96px)` | 0.96 | -0.01em | Title Case |
| Section H2 | Barlow Condensed | 700 | `clamp(36px, 4.4vw, 64px)` | 1.00 | -0.005em | Title Case |
| Subhead H3 | Barlow Condensed | 600 | `clamp(22px, 2.2vw, 32px)` | 1.15 | 0 | Title Case |
| Block H4 | Manrope | 700 | 18px | 1.30 | 0 | Sentence Case |
| Eyebrow | Manrope | 600 | 14px | 1.20 | 0.04em | Sentence Case |
| Body Lead | Manrope | 400 | `clamp(17px, 1.3vw, 20px)` | 1.65 | 0 | None (max 62ch) |
| Body Regular | Manrope | 400 | 16px | 1.65 | 0 | None (max 68ch) |
| Nav Links | Manrope | 500 | 15px | 1.00 | 0.01em | Sentence Case |
| Button Text | Manrope | 600 | 15px | 1.00 | 0.01em | Sentence Case |
| Ghost Figure | Barlow Condensed | 700 | `clamp(96px, 14vw, 220px)` | 0.90 | 0 | Upper / Title |
