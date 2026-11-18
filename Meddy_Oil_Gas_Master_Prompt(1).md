# MEDDY OIL & GAS LIMITED: MASTER BUILD PROMPT (ANTIGRAVITY)

Paste this whole file into Antigravity at the start of the build. Keep `/docs/playbook.md` (Antigravity_Premium_Web_Playbook.md) and `AGENTS.md` in the project. Where this prompt is more specific than the playbook, this prompt wins. Where the two conflict on facts or invented content, the playbook's Prime Directives win.

---

## 0. READ FIRST

You are a senior product designer and senior front end engineer working as one. Build the complete marketing website for **Meddy Oil & Gas Limited** to the standard of the best corporate energy sites. Load these skills when their descriptions match: reference-decomposer, brand-guardian, motion-director, humanized-copy, provenance-and-facts, anti-slop-auditor, visual-qa, frontend-design.

### 0.1 File mapping (the upload names are confusing, use this table)

| File | What it is | How to use it |
|---|---|---|
| `Gemini_Generated_Image_s00onss00onss00o.jfif` | The **Meddy logo**: a droplet made of a gold flame swoosh, a blue and teal wave, and an amber drop | The only source for logo and colour scheme. Copy to `/assets/logo/` |
| `1795025256179_image.png` | The **design reference** (an "oilrig" website template, 1200x960 screenshot) | Layout, spacing rhythm, type character, section order, hero composition. Decompose per playbook Section 5 |
| `Antigravity_Premium_Web_Playbook.md` | Working standard | Save to `/docs/playbook.md`. Obey it |
| `https://www.geoplex.com` | **Content source** for structure and information | Crawl, then rewrite for Meddy (Section 7). Never copy verbatim |

### 0.2 Project facts (supplied by the client, safe to use)

* Company name: **Meddy Oil & Gas Limited** (short form in UI: **Meddy Oil & Gas**)
* Address: **8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1, Lagos, Nigeria**
* Email: **info@[DOMAIN]** (use the company domain. The domain was not supplied, so use the placeholder `[DOMAIN]` and log it in `/docs/open-questions.md`)
* Phone, WhatsApp, social links, registration numbers, certifications, client names, project counts, headcount, founding year: **NOT supplied. Placeholders only.**

### 0.3 Conflicts resolved in advance (do not ask again)

1. **Reference vs brand:** the reference wins for layout, spacing and motion feel. The logo wins for colour. The reference's orange-on-dark-photo look is kept, but its orange and teal-blue are replaced by the logo's amber, gold and blue.
2. **Reference numbers and logos are template filler.** "4.20.000+", "57+ Active Fields", "2500+ Employees", and the logos kotona, Square, xfinity, Fusion, Sysco are NOT Meddy facts. Never display them. Build the components, feed them from `/content/stats.json` with `null` values, hide the stat in production while null, and show a visible dev-only tag `[STAT_PLACEHOLDER]`.
3. **Geoplex facts are not Meddy facts.** Do not carry over Geoplex's founding year (2002), its rig purchases, Port Harcourt address, Ghana or Cameroon work, executive names, headcount, awards, interviews or news. Take structure and service vocabulary only.
4. **Playbook addendum "Meddy Global Solutions Ltd" is a different brief** (navy and cyan, scroll zoom hero, glass blur on all pages). Do NOT import its palette or effects. Only the header surface may blur on scroll (Section 9.6).
5. **"Never redraw the logo" vs "put the logo on the models' clothing":** both are satisfied by compositing the supplied logo file onto garments (Section 8). Never ask an image model to draw the logo from scratch.
6. **Copy rules:** the playbook bans em dashes, en dashes and a banned-word list in visible copy. This applies to all site text, alt text and meta descriptions. Reference headings that are kept verbatim ("Engineering the Energy Future", "Projects Completed & Field Professionals") contain none, so they stay.

---

## 1. BRAND SYSTEM (extract from the logo, write to `/design-tokens/`)

Sampled from the supplied logo file. Re-sample with `sharp` or PIL to confirm and log differences over 3 units in `provenance.md`.

```css
:root {
  /* Logo-derived brand colours */
  --brand-gold-300:   #F9DD6F; /* flame highlight */
  --brand-amber-400:  #F2C043; /* drop highlight */
  --brand-amber-500:  #FCB424; /* drop core, PRIMARY ACCENT */
  --brand-orange-500: #F59A27; /* flame body */
  --brand-orange-700: #BF6612; /* flame / drop shadow side */
  --brand-teal-400:   #5FB8BC; /* wave highlight */
  --brand-blue-600:   #1C5B91; /* wave body */
  --brand-blue-800:   #164982; /* wave deep, PRIMARY DARK */

  /* Neutrals derived from brand blue (no pure black or white pairs) */
  --ink-950: #0B1E36;   /* darkest surface, hero scrim base */
  --ink-900: #102A47;   /* header solid, footer */
  --ink-700: #2B4260;   /* body text on light */
  --ink-500: #5B6E86;   /* muted text on light, check AA */
  --paper-50:  #F6F8FB; /* page background, as in the reference's light sections */
  --paper-100: #EAEFF5; /* hairlines, surfaces */
  --white: #FFFFFF;

  /* Roles */
  --bg: var(--paper-50);
  --bg-dark: var(--ink-950);
  --surface: var(--white);
  --text: var(--ink-950);
  --text-muted: var(--ink-700);
  --accent: var(--brand-amber-500);
  --accent-hover: var(--brand-orange-500);
  --accent-press: var(--brand-orange-700);
  --link-on-light: var(--brand-blue-600);
  --focus-ring: var(--brand-teal-400);
  --success: #2E7D4F; --warning: var(--brand-orange-700); --danger: #B3261E;
}
```

**Contrast rules (AA is mandatory):**
* Amber and orange buttons carry **dark text (`--ink-950`)**, never white. White on amber fails AA.
* On dark surfaces, headings are `--white`, eyebrows are `--brand-amber-500`.
* Blue wave colours are for large graphics, dividers and links on light backgrounds only after you measure contrast.
* One accent family on the page: amber/orange. Teal is a rare supporting tone (focus ring, tiny rules). No gradients except one: a **flat directional scrim** (`rgba(11,30,54,.55)` to transparent, linear, left to right) over hero photography so text stays readable. Log it as a legibility scrim, not decoration.

---

## 2. TYPOGRAPHY (match the reference's character)

The reference uses a heavy condensed grotesque for display headings and a clean geometric sans for text. Exact fonts are **CANNOT VERIFY**. Use the closest structural match and log it:

* Display: **Barlow Condensed** (`@fontsource/barlow-condensed`, weights 600, 700)
* Text: **Manrope** variable (`@fontsource-variable/manrope`, weights 400, 500, 600, 700)
* Self host, `font-display: swap`, preload the two critical files, size-adjust fallbacks to prevent CLS. No Inter, Roboto or Arial.

| Role | Font | Weight | Size (fluid) | Line height | Tracking | Case |
|---|---|---|---|---|---|---|
| H1 hero | Barlow Condensed | 700 | `clamp(48px, 7.2vw, 104px)` | 0.96 | -0.01em | Title case, `text-wrap: balance` |
| H2 section | Barlow Condensed | 700 | `clamp(38px, 4.8vw, 68px)` | 1.0 | -0.005em | Title case |
| H3 card or block | Barlow Condensed | 600 | `clamp(26px, 2.4vw, 34px)` | 1.1 | 0 | Title case |
| H4 | Manrope | 700 | 18px | 1.3 | 0 | Sentence case |
| Eyebrow | Manrope | 600 | 14px | 1.2 | 0.04em | Sentence case, amber |
| Body L (lead) | Manrope | 400 | `clamp(17px, 1.3vw, 20px)` | 1.65 | 0 | max 62ch |
| Body | Manrope | 400 | 16 to 17px | 1.65 | 0 | max 68ch, `text-wrap: pretty` |
| Nav | Manrope | 500 | 15px | 1 | 0.01em | Sentence case |
| Button | Manrope | 600 | 15px | 1 | 0.01em | Sentence case |
| Stat number | Barlow Condensed | 700 | `clamp(44px, 5vw, 72px)` | 1 | 0 | tabular numerals |
| Ghost display text (hero) | Barlow Condensed | 700 | `clamp(96px, 14vw, 220px)` | 0.9 | 0 | white at 28% opacity |
| Caption, legal | Manrope | 500 | 13px | 1.5 | 0.01em | |

---

## 3. SPACING, GRID, LAYOUT

* **8pt base**, tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. No arbitrary pixel values in components.
* Container: `max-width: 1280px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 64px)`.
* Grid: 12 columns desktop (gutter 32px), 8 columns tablet (gutter 24px), 4 columns mobile (gutter 16px).
* Section vertical padding: `clamp(72px, 10vw, 128px)`. Inside a section: eyebrow to H2 gap 16px, H2 to paragraph 24px, paragraph to CTA 32px.
* Radius: buttons 4px (the reference is square-edged), cards 4px, images 0 to 4px. One radius logic only.
* Header height: 80px desktop, 64px mobile. Hero: `min-height: 100svh` with a floor of 640px, content vertically centred slightly above middle as in the reference.
* Breakpoints to design and test: **390, 768, 1024, 1440, 1920**. Also check 360, 820, 1280, 2560 for overflow.
* Touch targets 44px minimum. No horizontal scroll at any width. Wide tables and code scroll inside their own container.

---

## 4. SITE MAP

1. **Home** (reference replica, Section 5)
2. **About** (company, mission, values, leadership placeholders)
3. **Services** (overview) and **service detail pages**, one per service line (Section 7.2)
4. **Projects** (case study shell, placeholders until the client supplies real projects)
5. **Quality, Health, Safety and Environment**
6. **Careers** (open roles shell, empty state designed)
7. **News** (shell with empty state)
8. **Contact** (form, map link, address, email)
9. **404**, **Privacy**, **Terms**

Header nav (as in the reference): Home, Company (dropdown: About, Quality HSE, Careers), Services (dropdown: all service lines), Projects, News, search icon button (opens a simple site search overlay), and an amber **Get in Touch** button (links to Contact). Mobile: full-screen menu with masked line reveal, accordion sub-menus.

---

## 5. HOME PAGE: EXACT SECTION SPEC (follow the reference)

Decompose the reference first (`reference-spec.md`), then build. Order and layout below come from it.

### 5.1 Header
Logo mark + wordmark left, nav centre, search and **Get in Touch** right. Transparent over the hero, white text. On scroll past 80px it becomes solid `--ink-900` with a subtle `backdrop-filter: blur(12px)` (header only), height shrinks from 80 to 72px. Active nav item is amber.

Wordmark: no wordmark file was supplied. Typeset **MEDDY** (Barlow Condensed 700, white or ink depending on surface) with **OIL & GAS** beneath in 11px Manrope 600, tracking 0.12em, and log this in `provenance.md` as "wordmark typeset by agent, pending client approval". The mark is the supplied artwork, untouched.

### 5.2 Hero (full viewport)
* Full-bleed photography of a Nigerian oil and gas professional (Section 8, Shot 1), subject right of centre, open sea and offshore rig behind, just as the reference composes it. Flat scrim on the left for text.
* Eyebrow (amber, 14px): `Oil and gas services from Lagos`
* H1, two lines, exact: **Engineering the Energy Future**
* Button (amber, dark text): **Request Consultation**
* Right-bottom stat cluster as in the reference: three stacked words **Safety / Reliability / Performance** (middle word amber) over a very large ghost number. The number is a stat placeholder: while `null`, replace the ghost number with the ghost word **Meddy** at the same size and 28% opacity. Never show invented figures.
* Hero ends with a bottom strip (Section 5.3) sitting directly under it.

### 5.3 Capability strip (replaces the reference's client logo row)
Five equal cells with hairline dividers, exactly where the reference has client logos. We have no client names, so show five service-line names as text in Barlow Condensed 600, 28px, `--ink-500`, turning `--ink-950` on hover. Items: `Drilling Support`, `Well Construction`, `Wireline`, `Engineering`, `Procurement` (DRAFT COPY, confirm in Section 7.2). Mobile: horizontal snap scroller with edge hints.

### 5.4 About block (two images, text centre, exactly as the reference)
* Eyebrow: `About Us`
* H2, exact: **Projects Completed & Field Professionals**
* Left image: industrial storage tank with yellow stair and rail (Section 8, Shot 2). Bottom-left, bleeds below the text baseline like the reference.
* Right image: Nigerian field engineer reading a tablet, rig behind (Shot 3). Portrait, upper right.
* Centre-right text column:
  * Paragraph (DRAFT COPY): `Meddy Oil & Gas Limited is an oil and gas services company based in Lagos. We support exploration, drilling, pipeline construction and operational management for operators who need safe, steady delivery.`
  * Subheading with amber underline rule: **Dedicated to Excellence in Oil and Gas Service**
  * Checklist, exact (icons from one family, amber): `Safety is at the core of everything we do` / `Our team of skilled engineers and technical specialists` / `We adhere to rigorous quality control`
  * Stat row: avatar stack with 5 stars and label `[STAT] Employees` plus big number block `[STAT]+ Active Fields` (both placeholder driven, hidden in production while null)
  * Button (amber): **Explore Our Capabilities**

### 5.5 Remaining home sections (derived from Geoplex structure, styled in the reference's language)
Light and dark sections alternate. All must reuse the same grid, type scale and reveal system.

1. **Services** (dark `--ink-950`): H2 `What We Do`. Six service lines as a numbered list with large Barlow numerals, one image revealing on hover (desktop) per line, stacked rows on mobile. Each row: title, one sentence, arrow link to the detail page. Avoid three identical rounded cards.
2. **Why Meddy** (light): split layout, sticky left heading, right side four statements with hairline separators: Safety, Quality, Technical depth, Local presence in Lagos. One idea per statement, no icons in coloured circles.
3. **Quality, Health, Safety and Environment** (full-bleed photo, Shot 4, scrim): one H2, one paragraph, button `Read Our HSE Policy`.
4. **Projects** (light): three project cards as a horizontal scroller with large imagery. All three are clearly marked placeholder case study shells in dev, hidden in production until the client supplies real ones. If hidden, the section collapses cleanly.
5. **Careers band** (amber background `--brand-amber-500`, ink text): H2 `Build your career with Meddy`, button `View Open Roles` (dark button).
6. **Contact CTA + form** (dark): left: H2 `Tell us what you need`, address block, `info@[DOMAIN]`; right: form (name, company, email, phone, service interest select, message, consent checkbox), amber submit `Send Message`.
7. **Footer** (`--ink-900`): logo, short company line, quick links, services links, address, email, legal row. Social icons only if links are supplied.

---

## 6. COPY RULES (non-negotiable)

* Follow playbook Section 10: no em dashes, no en dashes, no spaced hyphen pauses, no banned words (seamless, elevate, unlock, unleash, empower, leverage, harness, streamline, robust, cutting edge, state of the art, next level, game changing, revolutionize, journey, holistic, synergy, world class, best in class, effortless, supercharge, "look no further", "whether you are X or Y").
* Geoplex uses its own tagline and slogan style. Do not reuse its slogan or any sentence of its text.
* Plain, specific, one idea per line. Buttons state the next action (`Request Consultation`, `Send Message`, `View Open Roles`).
* No invented facts, numbers, certifications (no ISO claims), client names, awards or testimonials. Write `DRAFT COPY, needs client approval` markers in `/content` and list each in `open-questions.md`. Strip markers from the production render but keep them in the content files.
* Use Nigerian English spelling conventions (British: organisation, programme) consistently, and naira symbol only if prices appear (none expected).

---

## 7. CONTENT SOURCING FROM GEOPLEX

My own fetch of geoplex.com returned only the page shell because the site renders its text with JavaScript. So you must read it yourself.

### 7.1 Crawl protocol
1. Open `https://www.geoplex.com` in the Antigravity browser (Playwright). Wait for network idle.
2. Capture full-page screenshots at 1440 and 390, and save the DOM text of every route linked from the nav and footer (Home, Services and all sub-services, Company, Quality policy, Careers, Contact, News).
3. Write `/docs/geoplex-structure.md`: page tree, section order, headings, and the *ideas* each section communicates (service line names, what each service does, HSE and quality commitments, careers process, contact fields).
4. Do NOT store or republish their sentences. Rewrite every line in Meddy's voice from the ideas, shorter and plainer.
5. Remove anything that is a Geoplex fact (see 0.3 item 3).

### 7.2 Service lines for Meddy (DRAFT, confirm with client)
Public information shows Geoplex organising oilfield services into groups such as drilling and engineering, well construction, wireline, directional and measurement services, mud logging, tubular running and coiled tubing. Map to Meddy as six service lines unless the client says otherwise:

1. **Drilling Support Services**: drilling programme support, rig-site coordination, mud logging support
2. **Well Construction**: casing and tubular running support, completions support
3. **Wireline and Well Intervention**: electric line, slickline, coiled tubing support
4. **Engineering Services**: design, inspection, maintenance planning, project engineering
5. **Procurement and Supply**: sourcing and delivery of equipment, spares and consumables
6. **Pipeline and Facilities Support**: construction support, maintenance, operations support

For every line write: a one-sentence summary (card), a 60 to 90 word overview, and 4 to 6 "What this covers" items. Every statement must describe a service, never a capability claim ("we have X rigs", "we hold Y certification" are forbidden until supplied). Log all six in `open-questions.md` as "service scope awaiting approval".

### 7.3 Other pages
* **About:** who we are, what we do, where we work (Lagos base), values (Safety, Integrity, Quality, Teamwork as ideas only), leadership section as an empty-state shell: `Leadership profiles will appear here.` hidden in production if empty.
* **QHSE:** policy page structure from Geoplex's quality statement idea (commitments, continuous improvement, training, compliance with applicable regulations) rewritten without any certification claims.
* **Careers:** how to apply, `careers@[DOMAIN]` placeholder only if the client confirms, otherwise route to `info@[DOMAIN]`. Empty state: `No open roles right now. Send us your CV at info@[DOMAIN].`
* **Contact:** form, address (Section 0.2), email, map link built from the address string (no embedded tracking map, a styled static block with an "Open in Maps" link).

---

## 8. IMAGERY: NIGERIAN MODELS WITH THE MEDDY MARK

### 8.1 Rules
* Every person shown is **Nigerian**: realistic, varied dark skin tones, natural hair, ages 28 to 55, women and men, genuine working expressions, not stock-photo grins.
* No real person's likeness, no celebrities. These are AI-generated placeholders: log in `provenance.md` as `AI-generated, replace with client photography when available`.
* PPE must be **accurate and consistent with the oil and gas industry**: hard hat with chin strap, safety glasses, hearing protection near rigs, flame-resistant coverall fully zipped with sleeves down, steel-toe boots, gloves when handling equipment, hi-vis reflective strips, gas detector or radio clipped on the chest, harness and lanyard when working at height. Do not show people in unsafe situations. No smoking, no open-flare closeups.
* Reject any output with distorted hands or teeth, garbled text on gear, floating objects, duplicated limbs, wrong helmet geometry, or inconsistent lighting. Regenerate.
* Consistent look across all images: natural daylight, overcast Gulf of Guinea sky, slightly desaturated with warm highlights, shallow depth of field, same grade. Mixed styles break trust.

### 8.2 Uniform design (so the brand reads on every model)
* Coverall: deep brand blue (`#164982`) with amber (`#F59A27`) reflective strips on shoulders, arms and legs.
* Hard hats: white (or amber for supervisors).
* **Logo placement:**
  * Left chest: the Meddy **icon only** (no wordmark) on a **white woven patch with 4px rounded corners**. The white patch is essential: the blue wave would disappear on a blue coverall. Patch width about 22% of the shoulder width, set 12 to 15% below the collar line.
  * Hard hat front centre: icon at about 28% of the helmet's front panel width.
  * Optional: hi-vis vest back, large icon centred between shoulder blades.
* Where the supervisor wears an amber hard hat, the icon sits on a white round decal.

### 8.3 How to produce accurate logo placement (mandatory workflow)
1. Prepare the logo asset: crop the supplied file to the mark's bounding box, remove the white background to a transparent PNG at 2048px tall, keep original pixels. Do not trace or redraw. Save to `/assets/logo/meddy-mark.png`. Produce `meddy-mark-on-white-patch.png` for garments.
2. Generate each model image with the garment areas **blank** (plain chest, plain helmet front). Use the best available image model in Antigravity.
3. Composite the real logo files with OpenCV or PIL: perspective warp to the fabric plane, multiply or soft-light blend for fabric texture and shading, slight edge softness, matched colour temperature. For the hard hat, wrap to the curvature.
4. Verify at 100% zoom: the logo's three shapes and colours match the original within a visible-match tolerance, nothing is redrawn, nothing is clipped.
5. Save finals in `/assets/images/` as AVIF and WebP with JPEG fallback, plus original PNG in `/assets/images/source/`. Alt text describes the scene in plain words, no keyword stuffing.

### 8.4 Shot list

| # | Use | Aspect, size | Subject and composition |
|---|---|---|---|
| 1 | Hero | 16:9, 2880x1620, subject in right 45%, left 50% calm sea and sky for text | Nigerian woman engineer, mid 30s, white hard hat, hearing protection, blue coverall with amber strips and the Meddy patch on the left chest, handheld radio, standing at a yellow-railed platform walkway, offshore rig in the haze behind, calm sea. Confident, still, looking just past camera |
| 2 | About left | 4:3, 1600x1200 | Cylindrical steel storage tank with yellow stairway and handrail, overcast sky, no people. Optional small Meddy icon on a signage plate at the base (composited) |
| 3 | About right | 4:5, 1200x1500 | Nigerian man, early 40s, short beard, amber hard hat with Meddy decal, blue coverall with chest patch, reading a tablet, rig lattice behind, shallow depth of field |
| 4 | QHSE band | 16:9, 2400x1350 | Four Nigerian crew members in a toolbox talk at a worksite, hard hats and coveralls with consistent logo patches, one pointing at a safety board, warm late-afternoon light |
| 5 | Services hover set | 3:2 each, 1200x800, six images | Wireline unit operator, drilling floor view with crew in PPE (no brand on equipment), engineer with drawings, procurement yard with pipes and a worker with a clipboard, pipeline right-of-way inspection, workshop maintenance. All crew Nigerian, logo patches present |
| 6 | Careers and contact | 16:9, 2400x1350 | Young Nigerian technician team, men and women, smiling naturally, outside a Lagos facility, hard hats and logo patches |

Generate each image with a short written prompt saved in `/assets/images/prompts.md` so the client can reproduce them. Never use real company or competitor logos on equipment.

---

## 9. MOTION AND INTERACTION (world-class, restrained)

Libraries: GSAP (ScrollTrigger, SplitText, Flip), Lenis. One scroll clock (playbook 7.4). **Two easing tokens only:**
* `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (entrances, reveals)
* `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (transitions, panels)

Animate `transform` and `opacity` only. Every animation has a `prefers-reduced-motion` fallback through `gsap.matchMedia()`. All content is readable if JS fails (progressive enhancement: `.no-js` shows everything).

### 9.1 Opening intro (once per session, under 3 seconds, tied to real loading)
Gate on real readiness: `document.fonts.ready` and the hero image `decode()`. Minimum on-screen time 1.2s so the brand beat is felt, maximum 3.0s then force exit.

| Time | Event | Duration | Ease |
|---|---|---|---|
| 0.00s | Full-screen `--ink-950` panel. Meddy mark scales 0.92 to 1 and fades in at screen centre | 600ms | out |
| 0.20s | Mark unmasks bottom to top with a clip-path wipe (the supplied artwork, revealed, never redrawn) | 800ms | in-out |
| 0.50s | `MEDDY` wordmark rises line by line out of a mask, then `OIL & GAS` | 700ms, stagger 80ms | out |
| 1.20s | Hold until readiness passes | 0 to variable | none |
| 1.30s | Panel lifts away: `translateY(0 to -100%)`. The mark shrinks to the header logo position (Flip shared element, falls back to a fade) | 800ms | in-out |
| 1.50s | **Hero starts while the panel is still leaving:** background photo `scale(1.12 to 1)` over 1400ms (out); eyebrow, then H1 lines rise out of masks (900 to 1100ms, stagger 80ms); button and stat cluster rise 40px and fade (700ms, stagger 80ms); header slides down 24px and fades (600ms) | | out |
| about 2.6s | Intro complete, scroll unlocked (Lenis stopped until now) | | |

* Skip on click, key press or scroll intent. Skipping jumps to the end state in 300ms.
* Repeat visits in the same session and every internal navigation: no intro, just a 500ms hero reveal.
* `prefers-reduced-motion`: 300ms cross-fade, no movement.
* No fake percentage counter. If you show any progress cue it is the mark's wipe tied to real readiness.
* LCP must stay under 2.5s. The hero image is preloaded with `fetchpriority="high"` and has a dominant-colour placeholder.

### 9.2 Text reveal (perfect, per playbook 7.6)
* Headlines (H1, H2): split by **lines**, each line in an `overflow: hidden` mask, lines rise `yPercent: 110 to 0`, `1000ms`, `--ease-out`, stagger `80ms`. Trigger H2s when 85% into view, once.
* Paragraphs and short phrases: split by lines (not words), `translateY(24px)` and opacity 0 to 1, 800ms, stagger 60ms.
* Eyebrows: fade and slide 12px, 500ms.
* Keep the original text in the DOM, `aria-label` on the split parent when needed, **re-split on resize** (`autoSplit: true`) and after fonts load so line breaks stay correct. Wait for fonts before splitting.
* No character-by-character animation except ghost display text if it helps.

### 9.3 Scroll reveals (vary by role, reveal once)

| Element | Reveal | Detail |
|---|---|---|
| Images | Unmask + scale | clip-path `inset(0 0 100% 0)` to `inset(0)`, inner image `scale(1.08 to 1)`, 1000ms, out |
| Checklist items, list rows | Rise | 32px, 700ms, stagger 70ms |
| Rules and underlines | Draw | `scaleX(0 to 1)` from left, 700ms, out |
| Stat numbers | Count up | Only when real values exist. 1200ms, out. Tabular numerals |
| Capability strip cells | Fade-rise | 24px, stagger 60ms |
| Service rows | Line draw + text rise | divider draws, number and title rise |
| Footer | Single fade | 600ms |

Start at about 85% of the viewport. Group siblings as one choreographed unit. Never use one identical fade-up on everything.

### 9.4 Parallax
Hero background `yPercent` 0 to 12 scrubbed (0.6 smoothing). About images: the two photos move at slightly different rates, 6% and 10%. Never on text. Disabled below 768px and with reduced motion. Containers use `overflow: hidden`.

### 9.5 Page transitions (all pages, never a blank flash)
Use a brand-shaped wipe: on link click, a `--ink-950` panel sweeps up from the bottom (500ms, in-out) with the mark centred at 100% opacity; the route changes behind it; the panel exits upward (500ms, in-out) as the new page's hero or H1 lines begin their reveal. Total about 1.0 to 1.2s. Back and forward buttons work natively. Anchor links scroll smoothly via Lenis without a wipe. Reduced motion: 200ms cross-fade.

### 9.6 Header, hover and states
* Header: transparent to solid on scroll (Section 5.1). Hides on scroll down, returns on scroll up after 120px.
* Nav links: amber underline draws left to right, 200ms.
* Buttons: hover lifts colour from `--accent` to `--accent-hover` and the arrow slides 4px (160ms); active scales 0.98 (100ms). Include default, hover, focus-visible (2px `--focus-ring`, 2px offset), active, disabled and loading states.
* Cards and service rows: image zooms 1.04 over 600ms, title colour shift 200ms.
* Form fields: label rises on focus, error text slides in 200ms with `aria-live="polite"`.
* Custom cursor: none. No magnetic effects.
* No idle floating, pulsing or glow. No scroll hijacking. Pinned sections: max 1 (the services list on desktop), and it must have a visible end.

---

## 10. RESPONSIVE RULES (designed, not shrunk)

| Width | Layout |
|---|---|
| 390 (mobile) | Single column. Header 64px, burger menu opening a full-screen panel with masked line reveal. Hero: photo full-bleed with scrim, H1 centre-left, 2 to 3 lines, button full width. Stat cluster stacks under the button. Capability strip becomes a snap scroller. About: text first, images stacked (tank 4:3, then portrait 4:5), checklist full width. Service rows stacked with image above title. Parallax off |
| 768 (tablet) | 8-col grid. Hero keeps photo with model right, H1 up to 3 lines. About images side by side below text. Services two-up where content allows |
| 1024 | Full nav appears. About switches to the reference's three-zone arrangement |
| 1440 (design baseline) | The reference layout exactly |
| 1920 and up | Container stays 1280px wide, hero photo remains full-bleed with `object-position` tuned so the model is never cropped. Type tops out at its clamp max. Test 2560 for stretching |

Verify there is no clipped text, no overlapping elements, no layout shift as fonts load, and that the model's face is never cropped at any hero aspect ratio (set per-breakpoint `object-position`, and supply two crops: landscape and portrait).

---

## 11. TECH STACK AND STRUCTURE

* Next.js (App Router) + TypeScript + Tailwind CSS configured **only** with the brand tokens (no default palette). Verify package versions before installing.
* GSAP + ScrollTrigger + SplitText + Flip, Lenis, `lucide-react` (one icon family, 1.75 stroke, sizes 16, 20, 24).
* Fonts via `@fontsource`. Images via `next/image` with AVIF/WebP, correct `sizes`.
* Contact form: server route handler, validation (zod), honeypot, rate limit, delivery to `info@[DOMAIN]` via an email provider configured through environment variables (`CONTACT_TO`, `CONTACT_FROM`, provider key). Document setup in `/docs/deploy.md`. Show success and failure states.
* SEO: unique title and meta description per page, Open Graph image built from the hero, `Organization` JSON-LD using only supplied facts (name, address, email), sitemap, robots, favicon from the mark (crop to square, 32, 180, 512), 404 page.
* Content lives in `/content/*.json` or MDX so the client can edit without touching components.

```
/app  /components  /lib/motion (tokens, intro, reveal, transitions)
/content  /assets  /design-tokens  /docs  /qa  /artifacts
```

Deployment target: Vercel (or the client's choice). Provide environment variable list and domain setup notes.

---

## 12. PROCESS (follow the playbook loop, with gates)

1. **Analyst:** write `reference-spec.md` (measured from the 1200x960 reference, scale to 1440), `tokens`, and `geoplex-structure.md`. Show me the spec, the gap list and the draft service lines. **Stop for approval.**
2. **Designer:** build the faithful home page first (header, hero, strip, about). Screenshot at 390, 768, 1024, 1440, 1920, diff against the reference, write `fidelity-report.md`, fix, repeat.
3. **Imagery:** produce the Section 8 shots with composited logos. Show a contact sheet for approval.
4. **Motion director:** implement intro, text reveal, scroll reveals, transitions. Record the intro and one full scroll, compare timings to Section 9.
5. Build remaining sections and pages in the same system.
6. **Copywriter:** finalise copy, run the dash and banned-word check across the whole build.
7. **Auditor:** run `anti-slop-auditor` and `visual-qa`. Score with the playbook rubric. Pass mark 90 plus zero blockers.
8. Final report: what matches, what is placeholder, every `CANNOT VERIFY`, everything in `open-questions.md`.

Creative pass: at most **one** on-brand signature moment per page, logged in `creative-additions.md`. Suggested for Home: the capability strip numbers as large outlined Barlow numerals that fill with amber on hover. Do not add effects beyond that.

---

## 13. ACCEPTANCE CHECKLIST

* [ ] Home page matches the reference's structure, spacing and hierarchy at 1440
* [ ] Logo used from the supplied file only, never redrawn; colours match the logo
* [ ] No Geoplex facts, no reference-template facts, no invented numbers, clients or certifications
* [ ] All models Nigerian, PPE correct, logo composited accurately on chest and hard hat
* [ ] No em or en dashes, no banned words anywhere visible
* [ ] Intro under 3s, skippable, once per session, reduced-motion safe, tied to real loading
* [ ] Headline reveals use masked lines and re-split on resize; fonts load before splitting
* [ ] Scroll reveals vary by element role and fire once
* [ ] Page transitions on every route change, no blank flash, back button works
* [ ] No horizontal overflow, clipped text or layout shift at 390, 768, 1024, 1440, 1920 (and 360, 820, 1280, 2560)
* [ ] Every interactive element has default, hover, focus, active, disabled states; targets at least 44px
* [ ] WCAG AA contrast (dark text on amber), alt text, semantic landmarks, keyboard order
* [ ] LCP under 2.5s, CLS under 0.1, INP under 200ms on a throttled profile
* [ ] Contact form tested end to end to `info@[DOMAIN]`
* [ ] `provenance.md` and `open-questions.md` complete

---

## 14. OPEN QUESTIONS TO LOG AT THE START

1. Company domain for `info@[DOMAIN]` and the website URL
2. Phone and WhatsApp number, social links
3. Final wordmark and tagline (a wordmark file does not exist yet)
4. Approved service lines and scope (Section 7.2)
5. Real stats: employees, active fields, projects, years in operation
6. Real client names and logos with permission
7. Leadership names, photos and bios
8. Certifications and policies the company actually holds
9. Replace AI placeholder photography with real photos when available

Report anything you were unsure about at the end. Say `CANNOT VERIFY` instead of guessing.
