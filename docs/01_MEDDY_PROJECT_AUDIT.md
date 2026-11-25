# Meddy Oil & Gas: project audit against Geoplex and your brief

Audited: `Meddy_Oil_and_Gas_Website.zip` (Next.js 15, Tailwind 4, 12 routes, 10 images).
Compared with: the live Geoplex site (read from its Vercel build, because geoplex.com itself renders client side), plus your brief, `AGENTS.md`, and the oilrig reference.

**Verdict:** the structure follows Geoplex loosely and the copy is original (no sentences copied). But the build does not yet match the brief in five areas: wrong-company text inside images, services that only half match Geoplex, the email address, the animation system (none of it is built), and several rules the project's own `AGENTS.md` bans.

---

## 1. Structure: Geoplex vs the project

| Geoplex has | Project has | Match |
|---|---|---|
| Home: hero video, stats row, Mission, Our Services (6 cards), Facilities gallery, Clients and Partners, Find Us | Hero, capabilities strip, About, Services list, QHSE banner, Careers banner, Contact | Partial. No Mission block. No gallery (correct, no facilities supplied). No clients (correct). |
| About Us, Leadership and Management | About page. Leadership omitted | Match (omission is correct until real people are supplied) |
| Service 1: **Well Construction Services** | Well Construction & Completions | Match |
| Service 2: **Oil Field Services**, split into Electric Wireline, Slickline and Well Testing; Drilling and Engineering; Pressure Pumping and Completion | Wireline & Well Intervention; Drilling Support; Engineering & Technical | Partial. Pressure Pumping and Completion has no page. |
| Service 3: **Integrated Services** | Missing | **Gap** |
| Service 4: **FPSO & Vessel Services** | Missing (but a vessel image is used under Well Construction) | **Gap** |
| Service 5: **Power** | Missing | **Gap** |
| Service 6: Petroleum Resources (Geoplex's own subsidiary) | Not applicable to Meddy | Correct to omit |
| Not on Geoplex as a service page | **Procurement & Supply Chain**, **Pipeline & Facilities Support** | Invented lines, not sourced from the reference |
| Policies: Safety, Quality, Environmental, Community, Sustainability, Policy Statement | One QHSE page | Partial. Split into anchored sections to mirror Geoplex. |
| Career, Blog | Careers. No Blog | Blog is a gap (optional) |
| Contact: map, email, phone, social links | Contact form, address, email | Missing social slots (hidden until supplied is fine) |

**Net:** about 3 of the 6 service lines correspond to Geoplex. Three Geoplex lines are missing and two project lines are not in the reference. Decide which set the client actually offers. If you want to follow Geoplex strictly, use: Well Construction, Oil Field Services (three sub-lines), Integrated Services, FPSO and Vessel Services, Power.

**Copy overlap check:** I searched the project for Geoplex phrases ("full stream", their Mission line, "fastest", "Sub-Saharan"). No matches. Copy is original. Good.

---

## 2. Blockers (fix first)

1. **Wrong company printed inside images.** `service-marine.webp` shows "MEDDY GLOBAL SOLUTIONS LTD" on a vessel hull, and `service-pipeline.webp` shows the same text on a pipe. Your `AGENTS.md` says this is not Meddy Global Solutions. Regenerate both.
2. **Text burnt into service images.** Five images carry baked-in "MEDDY OIL & GAS" badges and captions. Captions do not match the pictures: the "Wireline & Well Testing" image is an AutoCAD screenshot, "EPC & Offshore Facilities" is a woman at an electronics bench, "Offshore Marine Logistics" is a service that does not exist on the site. Text in images cannot be translated, cannot be read by screen readers, and goes stale. Remove all text from images.
3. **Images do not show the service they sit under.** Drilling shows a welder. Well Construction shows a ship. Wireline shows a CAD drawing. Engineering shows an electronics lab. Procurement shows a generic warehouse with yellow boxes. None looks like Nigerian oil and gas.
4. **Logo on the hero model is in the wrong place.** The icon sits on her forehead, below the hard hat brim, and her chest patch is blank. It should be on the hard hat front and the left chest. The About engineer has a small chest logo but nothing on the hard hat.
5. **Email.** `data.ts` has `meddyoilandgas@gmail.com`. You asked for a domain email (`info@`). `AGENTS.md` also says `info@[DOMAIN]`. The code and the rules disagree. Put the email in one environment variable and default to `info@[DOMAIN]` until the domain is confirmed.
6. **Contact form is simulated.** `ContactSection.tsx` has a "Simulate API call" comment. Nothing is sent. Needs a real server route and mail provider.

---

## 3. Motion: almost none of the requested animation exists

| Requested | Found in code |
|---|---|
| Text reveal | None. GSAP is installed but **no file imports it**. |
| Scroll reveal | None. No IntersectionObserver, no ScrollTrigger. |
| Parallax | None |
| Page transitions | None |
| Opening intro | A CSS timer sequence in `Preloader.tsx`. Not tied to real loading (fixed `setTimeout`s at 150, 1000, 1600ms). It also **skips itself for HeadlessChrome and Lighthouse**, which hides real performance numbers and makes audits look better than a real visitor's experience. Remove that branch. |
| Smooth scroll | Lenis runs on its own `requestAnimationFrame`, not synced with a scroll engine. `scroll-behavior: smooth` in `globals.css` also fights Lenis. Remove it. |
| Hamburger menu | Icon swaps between `Menu` and `X` with no morph. The drawer mounts and unmounts instantly with no exit animation, no focus trap, no scroll lock, no Escape key. |
| Reduced motion | No `prefers-reduced-motion` handling anywhere |
| Entry classes | `animate-in fade-in zoom-in-95` are used, but `tailwindcss-animate` or `tw-animate-css` is not in `package.json`, so these classes likely do nothing in Tailwind 4 |

---

## 4. Rules your own AGENTS.md bans, found in the code

* **Pill buttons everywhere** (`rounded-full`). The reference and the spec call for near square buttons (2px radius). The fidelity report still says "100% Match". It is not.
* **Glow effects:** orange box-shadow glows on buttons, a radial glow on the preloader, a drop-shadow glow on the preloader logo. About 19 hits.
* **Idle pulse:** `animate-pulse` on the hero eyebrow dot.
* **Backdrop blur** on the hero secondary button, the search modal, and the mobile menu. AGENTS.md says header blur and glass are off.
* **Banned word:** "empowered" in `qhse/page.tsx` line 18.
* **Fidelity report** claims 100% on every row without measured evidence. Treat it as unverified.

---

## 5. Claims on the live pages that need client sign-off

These are written as fact, but nothing supplied backs them:

* "API-certified equipment" and "Every item is verified for certification and material trace" (procurement)
* "Deep domain competency in Nigerian Niger Delta and Gulf of Guinea basins"
* "Rapid logistical mobilization across Nigeria"
* Stop Work Authority practice, NUPRC and Petroleum Industry Act compliance statements
* All six service coverage lists (they read as a capabilities statement)

Either get the client's confirmation or soften to scope language ("we can support") and flag them as draft.

---

## 6. Housekeeping

* Delete unused or stray files: `about-engineer.jpg` (188 by 253), `about-tank.jpg` (240 by 156), `hero-reference.jpg`, duplicate `favicon-512x512.png` and `icon-512.png`, the root-level `8246...jpg`, `Meddy Oil And Gas Logo.png` (kept in `/assets`), both master prompt copies in the root, the `.vercel` folder, and `qa/screenshots`.
* Image formats are mixed (PNG, JPG, WebP). Standardise to AVIF with WebP fallback. Several PNGs are 450 to 650 KB.
* Add `.env.example` (referenced in the docs, not in the zip).

---

## 7. Fix order

1. Regenerate all images from `02_MEDDY_IMAGE_PROMPTS.md` and delete the old ones.
2. Decide the service set (Geoplex-strict or the project's six), then fix routes, data, and images together.
3. Replace the email with an env var and wire a real contact route.
4. Run `03_MEDDY_APPLE_MOTION_PROMPT.md` to build the motion system and the hamburger menu.
5. Strip the banned effects and restore square buttons.
6. Re-audit against the reference at 1440 and 390.
