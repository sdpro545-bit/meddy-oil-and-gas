# MEDDY OIL & GAS LIMITED: MASTER BUILD PROMPT FOR ANTIGRAVITY

Paste everything below the line into Antigravity as the first message of a new project.
Before you paste, put these four uploads in the project:

1. `Antigravity_Premium_Web_Playbook.md` (goes to `/docs/playbook.md`)
2. The logo file (goes to `/assets/logo/meddy-logo-source.png`)
3. The oilrig reference screenshot (goes to `/references/oilrig-home.png`)
4. Nothing else is needed. The agent reads geoplex.com live.

---

## 0. ROLE AND STANDARD

You are a senior product designer, design systems engineer, and creative developer working as one team. You are building the corporate website for **Meddy Oil & Gas Limited**, a Nigerian oil and gas services company in Lekki, Lagos.

The standard is the best corporate energy sites in the world: Figma-grade spacing discipline, a real design system with tokens, production-grade responsive behaviour, and film-quality motion that stays quiet and exact.

Follow `/docs/playbook.md` and `AGENTS.md` in full. Where this prompt is more specific than the playbook, this prompt wins. Where they conflict on a fact, the playbook's truth rules win.

Load these skills when their descriptions match: `reference-decomposer`, `brand-guardian`, `motion-director`, `humanized-copy`, `provenance-and-facts`, `anti-slop-auditor`, `visual-qa`. If they do not exist yet, create them in Phase 0.

---

## 1. FIXED FACTS (the only facts you may state as true)

| Item | Value |
|---|---|
| Company | Meddy Oil & Gas Limited |
| Short name | Meddy |
| Address | 8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1, Lagos, Nigeria |
| Email | info@[DOMAIN] (the client domain is not supplied yet, use the placeholder `[DOMAIN]` and log it) |
| Sector | Oil and gas services, Nigeria |

Everything else is a placeholder until the client supplies it. This includes phone numbers, WhatsApp, socials, RC number, certifications, years in business, number of staff, number of projects, client names, partner names, equipment lists, and rig or vessel counts.

The reference screenshot shows numbers such as "4,20,000+", "57+ Active fields", and "2500+ Employees". Those belong to the template company. **Never reuse them.** Build the stat components, bind them to `/data/stats.json`, and ship them hidden (`"enabled": false`) until the client supplies real figures.

---

## 2. INPUTS

### 2.1 Design reference: `/references/oilrig-home.png`
This is the layout and motion reference. Replicate its structure, proportions, density, and feel. Do not copy its brand, its template name ("OilRigPro"), or its numbers.

What the screenshot shows, which you must measure and reproduce:

* Header: transparent over the hero, slate tint, logo left, five nav items with chevrons (Home, Pages, Services, Portfolio, Blog), circular search button, solid orange rectangular "Get In Touch" button right.
* Hero: full-bleed offshore photograph with a person in PPE on the right and an offshore platform in the distance. Left-aligned content: small orange eyebrow, very large condensed bold white headline on two lines, square orange button below.
* Bottom right of hero: a stacked three-word list (Safety, Reliability, Performance) with the middle word in orange, over a very large translucent ghost figure.
* Below the hero: a five-cell strip with hairline dividers between cells.
* About block on a near-white surface: small orange label, large dark condensed headline, a short paragraph, a heading with an orange underline rule, three checklist rows with small orange icons, a rating or employee badge, one large stat, and an orange button. Two staggered images flank the text, one lower left (a storage tank), one upper right (a worker with a tablet), with different heights so the layout feels editorial, not gridded.
* Palette feel: dark slate and white with one strong orange accent.
* Shapes: near-square corners (radius 0 to 4px), hairline borders, no soft shadows.

### 2.2 Brand: the uploaded logo
The logo is an icon only: a gold to orange flame, a teal to deep blue wave, and an orange droplet. It sits on a wide white canvas (2576 by 1080 px) and has no wordmark.

Phase 0 logo tasks:
1. Crop tightly to the icon with 12% clear space on all sides. Export `logo-icon.svg` only if you can trace it losslessly. Otherwise export `logo-icon.png` at 1024px and 512px with a transparent background (remove only the white canvas, never touch the artwork). Also export 192, 180, 32, and 16px favicon sizes.
2. Sample the real colours from the pixels with `sharp` and write them to `/design-tokens/tokens.json`. Expect roughly: gold `#F5B83D`, amber `#E8A12C`, orange `#F39C2B`, burnt orange `#C0661A`, teal `#4FA9B5`, mid blue `#2E7BA6`, deep blue `#17487F`. Use the sampled values, not these guesses.
3. Build roles from those samples: `--brand-orange`, `--brand-gold`, `--brand-blue`, `--brand-navy`, `--brand-teal`, plus neutrals tinted toward the blue (slate, never pure grey, never `#000` on `#fff`).
4. **Never redraw, recolour, outline, stretch, or add effects to the logo.** Use only the exported files.
5. Wordmark: the logo has none. Set "Meddy" with a small "OIL & GAS" line beneath it in the display face as live text next to the icon. This is a typeset lockup, not a redrawn logo. Log it in `open-questions.md` for client approval.
6. Contrast on dark: the deep blue part of the icon loses contrast on a dark slate header. Place the icon on a small white tile (radius 4px, 8px padding) when the header sits over the hero photo, and on plain white or light surfaces everywhere else. Log a request for a reversed (white) logo version from the client. Do not make one yourself.

Colour usage rule: **orange is the single action accent** (buttons, eyebrows on dark, active states, rules). Blue and navy carry structure (header on scroll, footer, dark sections). Gold and teal appear only through the logo and at most one small supporting detail per page. No other accent colours.

Accessibility: orange text on white fails WCAG AA at small sizes. For text on light surfaces use a darkened orange token derived from the logo orange, tuned until it passes 4.5:1, and log the derivation. Use the bright orange only for fills, large text, and on dark surfaces.

### 2.3 Content reference: https://www.geoplex.com
The site renders client side, so a plain fetch returns an empty page. Open it with Playwright, wait for network idle, scroll the full page to trigger lazy content, then extract every section heading, nav label, service name, and paragraph into `/docs/content-inventory.md`.

Use it for **structure and subject matter only**: which sections an oilfield services company shows, what its service lines are called, what a safety and quality page covers, how its contact page is organised.

Hard rules for this source:
* Do not paste any Geoplex sentence. Rewrite everything from scratch for Meddy.
* Do not use their tagline, their people, their rig and vessel counts, their client names, their partners, their quality policy text, their news, their addresses, their phone numbers, or their certifications.
* Service lines you take as a starting structure are **DRAFT COPY, needs client approval**. Geoplex works in wireline, slickline, directional drilling, MWD and LWD, gyro survey, and riser and vessel services. Meddy may not offer all of these. Draft them as the proposed service pages, mark each one, and list them in `open-questions.md`.
* Do not claim Meddy owns equipment, holds any certification, or has operated anywhere.

---

## 3. PHASE 0: PROJECT SETUP (do this first, no design yet)

1. Create the folder structure from playbook Section 0.
2. Copy the uploaded playbook to `/docs/playbook.md`.
3. Write `AGENTS.md` using playbook Section 16, then append the **Meddy rules** in Section 14 of this prompt.
4. Create the seven skills from playbook Section 12 under `.agents/skills/`.
5. Stack: **Next.js (App Router, latest stable), TypeScript, Tailwind CSS driven entirely by custom tokens (no default palette), GSAP with ScrollTrigger and SplitText, Lenis, Lucide icons.** Fonts self-hosted through `@fontsource`. Check every package version before install. Verify the SplitText API against the installed GSAP version.
6. Install QA tools: `playwright`, `@axe-core/playwright`, `lighthouse`, `pixelmatch`, `pngjs`, `sharp`, `eslint`, `stylelint`.
7. Run the logo tasks from Section 2.2.
8. Create `provenance.md` and `open-questions.md`.

---

## 4. PHASE 1: ANALYSE (then stop for my approval)

Run `reference-decomposer` and `brand-guardian`. Produce:

* `/docs/reference-spec.md`: measured from the screenshot. Section order, section heights in viewport units, grid, gutters, margins, header height, button size, type sizes, weights, line heights, tracking, sampled colours, surfaces, image crops, and a motion timeline guessed from the template's category (mark every motion value as an assumption, because a still image has no motion).
* `/docs/content-inventory.md` from Geoplex.
* `/design-tokens/tokens.json` and `tokens.css`.
* A gap list: mobile, tablet, hover, focus, error, empty, 404, and loading states, each with a decision.
* Font identification. The reference headline is a heavy condensed grotesque. Identify the closest match by structure, mark `CANNOT VERIFY` on the exact font, and propose a pairing. Starting proposal: **Barlow Condensed** (600 and 700) for display, **DM Sans** (400, 500, 600) for text. Avoid Inter, Roboto, and Arial.

**Stop here and show me the spec, the tokens, the gap list, and the open questions. Wait for approval.** (Delete this line if you want the build to run straight through.)

---

## 5. DESIGN SYSTEM (non negotiable values)

Build these as tokens first. Components may only use tokens.

### 5.1 Grid and layout
* Base unit: 8px. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
* Container max width: 1320px. Inline padding: `clamp(20px, 4.5vw, 72px)`.
* 12 column grid, 24px gutter below 1024px, 32px from 1024px.
* Section vertical padding: `clamp(72px, 9vw, 128px)`. Adjacent sections on the same surface use half of that.
* Header height: 80px desktop, 64px below 768px.
* Layout rule: every element aligns to the 8px grid, with optical corrections only where the eye needs them (large type side bearings, icon alignment). Log each optical correction.

### 5.2 Type scale (fluid, `clamp()` between 390px and 1440px)

| Role | Size | Line height | Weight | Tracking | Notes |
|---|---|---|---|---|---|
| Display (hero H1) | `clamp(44px, 6.4vw, 92px)` | 0.98 | 700 | -0.01em | Barlow Condensed, sentence case, balanced |
| H2 | `clamp(34px, 4.4vw, 64px)` | 1.02 | 700 | -0.005em | |
| H3 | `clamp(22px, 2.1vw, 30px)` | 1.2 | 600 | 0 | |
| H4 | 18px to 20px | 1.3 | 600 | 0 | DM Sans |
| Eyebrow | 14px | 1.2 | 600 | 0.04em | orange, sentence case |
| Lead | `clamp(17px, 1.4vw, 20px)` | 1.6 | 400 | 0 | max 62ch |
| Body | 16px to 18px | 1.65 | 400 | 0 | max 68ch |
| Small | 14px | 1.5 | 400 | 0.01em | |
| Button | 15px | 1 | 600 | 0.02em | |
| Ghost figure | `clamp(96px, 16vw, 240px)` | 0.9 | 700 | 0 | translucent, decorative, `aria-hidden` |

Weight contrast must be visible: headings 600 to 700, body 400, labels 600. Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs. No orphans, widows, or ragged headline breaks at any width. Check every headline at 390, 768, 1024, 1440, and 1920.

### 5.3 Components (all states required: default, hover, focus-visible, active, disabled)
* **Button primary**: orange fill, dark text or white text chosen by contrast, height 52px desktop and 48px mobile, padding-inline 28px, radius 2px, optional trailing arrow icon (20px, Lucide). Hover: fill shifts one step darker and the arrow moves 4px. Active: scale 0.98. Min touch target 44 by 44.
* **Button secondary**: 1px border, transparent, same dimensions.
* **Link with underline draw**: underline scales from left on hover, 200ms.
* **Header**: transparent over hero (slate tint scrim), becomes solid navy after 80px of scroll with a 1px bottom hairline. Hides on scroll down, returns on scroll up. The hide and return use `transform` only, 320ms, out curve.
* **Mega or dropdown menu for Services**: 280ms, out curve, lists the service pages with one line each.
* **Mobile menu**: full height panel, links reveal as masked lines with 60ms stagger, focus trapped, `Esc` closes, scroll locked, 44px minimum targets.
* **Card (service)**: near square, 1px hairline, image on top with 4:3 crop, title, one line, arrow link. Hover scales the image 1.00 to 1.04 over 640ms inside an `overflow: hidden` frame. No shadows.
* **Checklist row**: small orange Lucide check icon, 16px gap, 1px divider.
* **Stat block**: large number in display face, label in small. Count-up only when real figures exist.
* **Form fields**: 56px height, 1px border, visible label above, focus ring 2px orange offset 2px, inline error text in danger token, success state.
* **Footer**: navy surface, logo tile, address, email, nav columns, hairline rules, copyright line.

### 5.4 Icons
One family: **Lucide**, 1.5px stroke, sizes 16, 20, 24, rounded joins. No emoji. No icon in a coloured circle above each feature. Vary how features are presented.

### 5.5 Surfaces
Light sections: near white tinted toward blue. Dark sections: deep navy to slate. Hairline borders at low opacity. Selection colour set to brand orange with readable text. Custom scrollbar styling kept subtle. Cursor stays native.

---

## 6. PAGES AND SECTION MAP

Pages: Home, About, Services (hub), five service detail pages (draft, pending approval), Safety and Quality, Contact, Privacy, 404. All share the header, footer, transitions, and tokens.

### 6.1 Home (follow the reference order)

1. **Hero** (100svh, min 640px, max 1000px at large screens). Full-bleed offshore photograph, Nigerian engineer in branded PPE on the right third, platform on the horizon. Left column spans 6 of 12 columns. Content:
   * Eyebrow: `Powering Nigeria's Energy Infrastructure` (DRAFT COPY)
   * H1 on two lines: `Engineering the Energy Future`
   * Button: `Request Consultation` (links to Contact)
   * Bottom right: stacked list `Safety`, `Reliability`, `Performance`, middle word orange, over the ghost figure. The reference shows a number here. Use the word `MEDDY` as the ghost text at the same size and opacity until real stats exist.
   * Scrim: one linear gradient from navy at 70% opacity on the left to transparent by 60% width, for legibility only.
2. **Capabilities strip** (replaces the client logo strip). Five cells with hairline dividers, each a plain text label of a service line in the display face. No fake client logos. On mobile it becomes a two column grid with the fifth cell spanning both.
3. **About block** (near white). Asymmetric two image layout exactly like the reference. Use the draft copy in Section 8. Stat slot hidden until real data exists, the employee badge slot likewise.
4. **Services** (dark navy section). Left: H2 and short intro, sticky on desktop. Right: stacked service rows, each a full width link row with index number, title, one line, and an arrow. Hover shifts the row 8px and reveals the image preview. This avoids the three identical cards pattern.
5. **How we work** (light). Four steps: Plan, Mobilise, Deliver, Review. Horizontal timeline on desktop with a line that draws as you scroll, vertical on mobile.
6. **Safety and quality** (full bleed photo with navy scrim, pinned briefly if it adds to the story). Large statement line, three short commitments as a checklist.
7. **Contact band**. Left: headline and the address block. Right: compact form (name, email, phone, company, message). Submit button: `Send message`.
8. **Footer**.

### 6.2 Other pages
* **About**: story in draft, values as a list with varied layout, a team section that stays as a labelled placeholder until real people are supplied, no stock "team" faces.
* **Services hub**: same rows as Home with fuller copy.
* **Service detail**: hero with breadcrumb, an overview, a "what we do" list, a "where it applies" list, an inline enquiry button, next service link.
* **Safety and Quality**: policy structure only. No certification names or numbers until supplied.
* **Contact**: form, address block, email, a "Open in Google Maps" text link built from the address string (no invented coordinates, no embed that loads third party scripts).
* **404**: branded, a single button home, with the same page transition.

---

## 7. IMAGERY: NIGERIAN MODELS WITH THE BRANDED LOGO ON THEIR CLOTHING

The client wants Nigerian models in correct oil and gas PPE with the real Meddy icon on the clothing. Do this in a way that keeps the logo exact.

### 7.1 Sourcing
* Preferred: licensed photography of Nigerian oilfield and offshore professionals. Record licence and source in `provenance.md`.
* Otherwise generate with the image model available in this workspace using the prompts in 7.4, then review each result. Mark every generated image `AI GENERATED, replace with real Meddy staff photography when available` in `provenance.md`.
* Never present generated people as named staff, executives, or clients. Captions stay generic or empty.

### 7.2 Logo on clothing (the logo is composited, never generated)
Image generators distort logos. So:
1. Generate or source the person wearing **plain** PPE: coverall in navy with orange reflective stripes, white or orange hard hat, and a clear blank chest panel.
2. Composite the exported `logo-icon.png` onto the left chest (about 7 to 9% of torso width) and the front of the hard hat (about 40% of hat width) using `sharp` plus a perspective and displacement pass so it follows fabric folds, lighting, and curvature. Add a faint fabric texture multiply at 10 to 15% so it reads as embroidered or printed, not pasted.
3. The icon must keep its exact shape and colours. Check at 200% zoom that edges are clean and nothing is warped beyond natural curvature.
4. Where the icon would sit on a dark navy coverall, place it on a small white or light patch (as real workwear does) so the deep blue stays visible. Embroidered patches are accurate to real PPE.
5. Do not add a wordmark to clothing unless the client approves the lockup.

### 7.3 Accuracy rules (PPE and setting)
* Hard hat with chin strap, safety glasses, hearing protection where noise is shown, gloves, steel toe boots, flame resistant coverall with reflective tape. Offshore shots add a life jacket.
* Skin tones, features, and hair must read as Nigerian and varied (men and women, different ages and builds). No tokenism poses, no thumbs up, no staged laughing at tablets.
* Real work context: Gulf of Guinea or Niger Delta style coastal horizon, a platform or jack up rig in the distance, tank farm, pipework, deck rails. No snow, no Texas desert, no North Sea weather.
* Hands, teeth, eyes, text on gear, and rail geometry must be clean. Reject any image with warped fingers, extra limbs, or gibberish text.
* Consistent lighting direction, colour grade, and crop logic across all images. Grade toward the brand: cool blue shadows, warm orange highlights, slightly desaturated.

### 7.4 Generation prompts (use one per image, 4K, then downscale)

**Hero, 16:9, subject on the right third:**
"Photorealistic documentary photograph of a Nigerian woman offshore engineer in her thirties, calm confident expression, wearing a navy flame resistant coverall with orange reflective stripes and a plain blank chest patch, white hard hat with chin strap, orange ear defenders around her neck, clear safety glasses pushed up, handheld radio clipped to the chest. Standing at a yellow deck railing, a Gulf of Guinea style offshore platform on the horizon, overcast soft light with warm orange edge light, shallow depth of field, 85mm lens, natural skin texture, correct hands, no text, no logos."

**About, portrait 4:5:**
"Photorealistic photograph of a bearded Nigerian man in his forties, orange and navy coverall with a plain blank chest patch, orange hard hat, holding a tablet and reviewing data beside oilfield towers, late afternoon light, natural expression, 50mm lens, correct hands, no text, no logos."

**About, landscape 4:3:**
"Photorealistic photograph of a cylindrical steel storage tank with a yellow safety staircase and railings against a blue sky, clean industrial setting in coastal West Africa, wide angle, no people, no text."

**Safety band, 21:9:**
"Photorealistic wide shot of two Nigerian technicians, one man and one woman, in navy coveralls and white hard hats performing a pre job safety check on pipework at a tank farm at golden hour, backs partly turned, plain blank chest patches, no text."

**Services previews, 4:3 each:** produce one image per service line, no people required, industrial equipment close ups, consistent grade.

Negative prompt for all: "extra fingers, deformed hands, warped face, uneven teeth, cartoon, 3D render look, stock photo smile, watermark, garbled text, logo, brand names."

### 7.5 Delivery
Export AVIF and WebP at 640, 1024, 1600, 2400 widths with `sharp`. Hero uses `priority` and `fetchpriority="high"`. Everything else lazy. Every image has accurate alt text. Reserve aspect ratios so CLS stays under 0.1.

---

## 8. COPY DECK (human voice, all DRAFT COPY pending client approval)

Follow `humanized-copy`: no em dashes or en dashes anywhere, plain words, specific over vague, one idea per line, buttons name the next action. Banned words from playbook Section 10 apply to all visible text. Write every line from scratch. Where a reference heading is generic and carries no facts, it is kept as supplied.

**Header nav:** Home, About, Services, Safety and Quality, Contact. Header button: `Get In Touch`.

**Hero:** as in Section 6.1.

**About block**
* Eyebrow: `About Us`
* H2: `Safe, reliable field work, planned properly`
* Paragraph: `Meddy Oil & Gas Limited is a Nigerian oil and gas services company based in Lekki, Lagos. We support operators with oilfield services, and we plan every job around safety, clear communication, and quality control.`
* Sub heading with orange rule: `Dedicated to Excellence in Oil and Gas Service`
* Checklist: `Safety is at the core of everything we do` / `Our team of skilled engineers and technicians` / `We adhere to rigorous quality control`
* Button: `Explore Our Capabilities`

**Services intro:** `Pick a service to see what we do, where it applies, and how to book a site visit.`

**Service one line descriptions (draft, each needs client sign off):**
* Wireline Services: `Electric wireline work for open hole and cased hole wells.`
* Slickline Services: `Mechanical well intervention and well maintenance.`
* Directional Drilling: `Planning and steering wells to the target.`
* MWD and LWD: `Measurement and logging while the well is being drilled.`
* Gyro Survey: `Accurate well position data.`

**How we work**
* Plan: `We agree the scope, the risks, and the schedule before anyone mobilises.`
* Mobilise: `Crew, equipment, and permits are checked and signed off.`
* Deliver: `The job runs to the plan, with safety briefings at every shift.`
* Review: `We share the results and note what to change next time.`

**Safety band:** `Nobody starts work until the job is safe to start.`

**Contact band**
* H2: `Tell us what you need`
* Body: `Send the scope, the location, and your timeline. We reply the same working day.` (DRAFT, confirm the reply promise with the client.)
* Address block: `8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1, Lagos, Nigeria`
* Email: `info@[DOMAIN]`
* Phone: `[PHONE]` (hidden until supplied)

**Footer line:** `Meddy Oil & Gas Limited. All rights reserved.` plus the year.

For every other page, write the copy under the same rules and list each new draft block in `open-questions.md`.

---

## 9. MOTION SYSTEM (follow playbook Section 7, with these exact choices)

### 9.1 Tokens
* `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` for entrances
* `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` for transitions
* Durations: fast 160ms, base 320ms, slow 640ms, scene 1100ms
* Animate `transform` and `opacity` only. Remove `will-change` after each animation.
* One scroll clock: Lenis (`lerp: 0.1`) synced to GSAP ScrollTrigger through `gsap.ticker`, `lagSmoothing(0)`.

### 9.2 Opening intro (once per session, total about 2.4s on a warm cache, skippable)
Tie it to real loading: wait for `document.fonts.ready`, the hero image decode, and the logo asset. Minimum visible time 1.2s so it never flashes. No fake counter.

Timeline:
* **0.00s to 0.15s** Navy full screen panel is already in place (rendered in the first HTML so there is no flash of content). Logo icon sits centred at 96px (80px on mobile).
* **0.15s to 0.95s** The icon reveals with a `clip-path` wipe rising from the bottom edge, like liquid filling a droplet, 800ms, out curve. This reveals the **supplied** artwork. It does not redraw it.
* **0.95s to 1.25s** Hold. "Meddy" and "Oil & Gas" lines rise in from masks beside the icon, 60ms stagger.
* **1.25s to 1.95s** The navy panel lifts upward with `translateY(-100%)`, 700ms, in-out curve. The icon and text fade 120ms before the lift.
* **1.55s onward (overlaps the lift)** Hero photograph settles from `scale(1.12)` to `1` over 1600ms, out curve. Header slides down 24px with fade, 640ms. Hero eyebrow, then H1 lines (masked line reveal, `yPercent: 110` to 0, 1000ms, `expo.out`, 80ms stagger), then the button, then the stacked three words, 70ms stagger, then the ghost figure fades to its resting opacity over 900ms.
* The hero headline starts while the panel is still lifting, never after.
* Skip: any click or key press jumps the timeline to its end over 300ms.
* Repeat visits in the same session: a 450ms hero reveal only.
* Reduced motion: no panel, no scale, a 300ms fade of the hero.
* LCP target under 2.5s. Verify the intro does not push it over.

### 9.3 Text reveal
* Headlines: split into lines with a mask, lines rise 100% of line height, 900 to 1100ms, `expo.out`, stagger 60 to 90ms. Trigger at 85% of viewport.
* Short phrases (eyebrows, labels): fade and rise 16px, 600ms.
* Paragraphs: one block fade and rise 24px, 800ms. Do not split long body text.
* Keep real text in the DOM. Use `autoSplit` so lines re-split on resize. Add `aria-label` to the parent only if the split breaks reading order.
* Reveal once. No replay on scroll up.

### 9.4 Scroll reveals (vary by role, never one effect for everything)
* Images: unmask with `clip-path: inset(0 0 100% 0)` to `inset(0)` while the image scales `1.08` to `1`, 1100ms, out curve.
* Service rows: rise 32px, 90ms stagger, total spread under 600ms.
* Rules and lines (orange underline, timeline): scale from left, 900ms.
* Checklist rows: rise 16px, 70ms stagger.
* Stat numbers (only when enabled): count up over 1400ms with tabular numerals.
* Stagger groups are choreographed as one unit per section.

### 9.5 Parallax (hero and two image blocks only)
* Hero background `yPercent` 0 to 12 with `scrub: 0.6`. Container `overflow: hidden`.
* About images move at 6% and 12% for depth, opposite directions.
* Never on text. Disabled below 768px and for reduced motion.

### 9.6 Scroll linked moments (maximum two)
1. Hero: the content block fades and rises slightly as you leave the hero (opacity 1 to 0, y 0 to -40px).
2. Safety band: brief pin (about 100vh of scroll) while its statement line reveals word by word. Must end visibly and never trap the user.

### 9.7 Header behaviour
Solid after 80px, hides on scroll down, shows on scroll up. All transitions on `transform` and background colour changes at 320ms. No blur effect unless I ask for one later.

### 9.8 Page transitions (all pages)
A brand-shaped curtain: a navy panel with the logo icon centred, no white flash, no blank wait.
1. Click an internal link: panel rises from the bottom to cover the screen in 480ms (in-out curve), the icon fades in at 120ms.
2. Route change occurs behind the panel. Scroll resets to top. Lenis is reset.
3. Panel lifts away upward in 520ms while the new page's hero text reveal starts at 200ms into the lift.
Total under 1.1s. Keep back and forward buttons working. Skip the panel for same-page anchors and for reduced motion (use a 250ms cross fade).
Build it as a `TransitionLink` plus a layout level overlay, and test on App Router navigation, back, forward, and refresh.

### 9.9 Hover and focus
Hover 120 to 200ms. Buttons: colour step plus 4px arrow move. Links: underline draw. Cards: image scale 1.04. Focus: 2px orange ring, 2px offset, always visible on keyboard. No cursor followers, no magnetic buttons, no idle floating or pulsing, no glow.

### 9.10 Reduced motion and fallback
Wrap everything in `gsap.matchMedia`. Reduced motion users get instant state or a simple fade. If JavaScript fails, all content is visible and readable.

---

## 10. RESPONSIVE SPECIFICATION

Design each breakpoint. Do not shrink the desktop.

| Width | Behaviour |
|---|---|
| 320 | Single column, 20px side padding, H1 minimum 40px, nothing clipped |
| 390 | Primary mobile design target |
| 768 | Two column where it helps, tablet header with menu button |
| 1024 | Full desktop nav appears, 12 column grid |
| 1440 | Reference match target (compare against the screenshot) |
| 1920 | Container stays at 1320px, hero image keeps its crop, no stretched type |
| 2560 | Same container, larger side margins, no layout drift |

Specific rules:
* Hero below 768px: full bleed image, subject crop via `object-position` so the face and logo stay visible, bottom scrim, text stacked at the bottom, H1 at 40 to 44px on two or three balanced lines, button full width.
* The stacked Safety, Reliability, Performance list moves below the button on mobile and the ghost figure shrinks and sits behind it.
* About block on mobile: text first, then the two images stacked with the staggered offset reduced to 24px.
* Services rows collapse to title, one line, and arrow. The hover image preview is replaced by a static thumbnail.
* How we work becomes a vertical timeline with the line drawing on scroll.
* Forms: single column, 56px fields, correct `inputmode`, `autocomplete`, and `type` attributes.
* Use `svh` and `dvh` units so mobile browser bars never cut the hero. No horizontal scroll at any width.
* Touch targets 44px or larger. Hover effects gated behind `@media (hover: hover)`.
* Test with browser zoom 200%, and with large system fonts.

---

## 11. FUNCTIONALITY

* Contact form: client side validation, server route that sends to `info@[DOMAIN]` through a transactional email provider configured with environment variables (`RESEND_API_KEY` or equivalent, plus `CONTACT_TO_EMAIL`). Add a honeypot field and basic rate limiting. Never hardcode keys. Success and error states designed.
* A `mailto:` fallback link under the form.
* SEO: unique title and meta description per page, canonical URLs, Open Graph and Twitter images (1200 by 630, built from the logo icon on navy), `sitemap.xml`, `robots.txt`, JSON-LD `Organization` with the exact address, favicon set from the logo icon, `lang="en-NG"`.
* Analytics: none until the client approves.
* Deployment target: Vercel. Include `.env.example` and a README with the deploy steps and the domain connection steps.

---

## 12. PROCESS (follow in order)

1. Phase 0: setup (Section 3).
2. Phase 1: analyse and write the spec, then **stop for approval** (Section 4).
3. Phase 2: faithful pass. Build to the reference with the brand tokens, no additions.
4. Phase 3: screenshot at 390, 768, 1024, 1440, and 1920. Diff the 1440 hero and About block against the reference. Write `fidelity-report.md`, fix, repeat until the layout is visually indistinguishable in structure, spacing, and type scale.
5. Phase 4: motion. Implement Section 9. Record the intro, scroll, and a page transition with Playwright. Compare timings to Section 9 within 50ms.
6. Phase 5: one signature moment, max. Candidate: the droplet fill reveal reused as the section divider on the Safety band. Log it in `creative-additions.md` so it can be removed in one step.
7. Phase 6: copy pass with the dash and banned word grep across the whole build.
8. Phase 7: run `anti-slop-auditor` and `visual-qa`. Show scores, evidence, and remaining issues.

Never claim done without screenshots and recordings as evidence.

---

## 13. ACCEPTANCE CRITERIA (all must pass)

* Layout, spacing, type scale, and colour match the reference at 1440 within normal viewing tolerance, and the gaps are listed.
* Every spacing value sits on the 8px scale. No raw hex, no raw pixel values in components.
* Headings and body use the specified weights and sizes. No orphans or ragged headline breaks at any tested width.
* Responsive at 320, 390, 768, 1024, 1440, 1920, 2560 with no overflow, clipping, or overlapping.
* Intro, text reveal, scroll reveal, parallax, header, and page transitions behave exactly as Section 9. Intro skippable, once per session, under about 2.4s warm.
* Reduced motion fully honoured. Site usable with JavaScript disabled.
* The logo appears only as exported from the supplied file, on the header, footer, favicon, intro, transition, and model clothing, with no distortion or recolouring.
* Model images: Nigerian subjects, accurate PPE, clean hands and faces, logo composited correctly, all logged as AI generated or licensed.
* No invented facts, numbers, names, certifications, or client logos. All placeholders logged.
* No em dashes, no en dashes, no banned words in visible copy.
* WCAG AA contrast, visible focus, semantic landmarks, alt text, keyboard path through the menu and form.
* Lighthouse on a throttled mobile profile: LCP under 2.5s, CLS under 0.1, INP under 200ms, accessibility 95 or higher.
* No console errors, broken links, or leftover debug UI.
* Score 90 or higher on the playbook rubric with zero blockers.

---

## 14. MEDDY RULES (append to `AGENTS.md`)

```markdown
## Meddy Oil & Gas rules
* Company is Meddy Oil & Gas Limited. Not Meddy Global Solutions. Do not reuse that project's navy and cyan palette or effects. Use only the logo palette.
* Fixed facts are the company name, the Lekki address, and info@[DOMAIN]. Everything else is a placeholder.
* Reference numbers (4,20,000+, 57+, 2500+) are template data. Never use them.
* Geoplex is a structure and subject reference only. Never copy its sentences, tagline, names, numbers, or certifications.
* Logo is used only from exported files. Never redraw, recolour, or regenerate it. Composite it onto clothing, never generate it.
* Orange is the only action accent. Gold and teal appear through the logo only.
* Header blur and glass effects are off unless the client asks.
* Generated people are never presented as named staff or clients.
* No client logo strip with invented logos. Use the text capabilities strip.
```

---

## 15. END OF RUN REPORT (required)

When finished, output:
1. Fidelity report summary with before and after screenshots.
2. Motion recordings and timing table.
3. Lighthouse and axe results.
4. Score against the rubric.
5. `open-questions.md` as a short list for me.
6. A list of everything marked `CANNOT VERIFY`.

---

## 16. OPEN QUESTIONS TO SEND ME AT THE END OF PHASE 1

1. The domain name for `info@` and the live site.
2. Phone, WhatsApp, and social links.
3. Which service lines Meddy actually offers.
4. Real figures for the stat block (years, projects, staff), or confirm to leave hidden.
5. Any certifications or registrations to display.
6. A reversed (white) version of the logo, if one exists.
7. Approval of the "Meddy / OIL & GAS" typeset lockup beside the icon.
8. Real photography of staff and sites, if available, to replace generated images.
9. Whether the "same working day" reply promise is accurate.
