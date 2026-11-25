# Content Inventory & Sourcing: Meddy Oil & Gas Limited

## 1. Governance & Truth Boundaries
- **Verified Company Facts Only:** Meddy Oil & Gas Limited, Nigeria (`Plot 3, Block 109, Victoria Arobieke Street, Lekki Phase 1, Lagos, Nigeria`). Unverified domains, emails (`info@...`), phones, RC numbers, founding dates, or regulatory certifications (`ISO`, `API`, `NUPRC`) are strictly excluded.
- **Taxonomy Source:** Structural capability layout adapts the 5-line Geoplex architecture cleanly with original Meddy draft copy (no copied sentences, no Geoplex claims, no invented metrics).
- **Tone & Copy Rules:** Nigerian/British spelling (`organisation`, `programme`, `mobilisation`, `utilised`, `authorisation`), active verbs, zero em dashes, zero en dashes, zero spaced hyphens, zero marketing cliches.

---

## 2. Active 5-Line Service Structure (Draft Copy Pending Client Sign-Off)

Every service page carries a visible `DRAFT COPY` label until confirmed by Meddy Oil & Gas Limited:

1. **Well Construction Services** (`/services/well-construction`)
   * Casing running, wellhead preparation, cementing support, and completion readiness.
2. **Oil Field Services** (`/services/oil-field-services`)
   * **Electric Wireline, Slickline and Well Testing** (`#wireline-slickline-well-testing`): slickline/wireline intervention and surface well testing packages.
   * **Drilling and Engineering** (`#drilling-and-engineering`): rig-floor technical supervision, directional/fluids coordination, and field engineering.
   * **Pressure Pumping and Completion** (`#pressure-pumping-and-completion`): primary and remedial cementing, acidising, and high-pressure pumping support.
3. **Integrated Services** (`/services/integrated-services`)
   * Single-point operational coordination across multi-discipline campaigns, logistics, and offshore/onshore handovers.
4. **FPSO & Vessel Services** (`/services/fpso-and-vessel-services`) *(Client confirmation required prior to launch)*
   * Offshore topside mechanical support, marine deck logistics, and shutdown maintenance coordination.
5. **Power** (`/services/power`) *(Client confirmation required prior to launch)*
   * Gas-to-power support, turbine/generator balance-of-plant readiness, and industrial distribution coordination.

Permanent `308` redirects in `next.config.ts` forward legacy service URLs (`drilling-support`, `wireline-intervention`, `engineering-services`, `procurement-supply`, `pipeline-facilities`) cleanly to their updated destinations.

---

## 3. Site Navigation, Search & Page Architecture

1. **Home (`/`):** Hero (`Engineering the Energy Future`), Capabilities Strip (`05`), Our Mission (`MissionSection`, `DRAFT COPY`), About preview (`about-tank-master`, `05` capability lines), Services alternating list, QHSE banner, Contact section.
2. **About (`/about`):** Lekki Phase 1 Lagos overview, `about-engineer-branded`, Core Values, Operations callout.
3. **Services (`/services` + 5 detail routes):** Hub overview + anchored deep-dives (`#wireline-testing`, `#drilling-engineering`, `#pressure-pumping`).
4. **QHSE (`/qhse`):** Operational Safety (`#safety`), Quality Assurance (`#quality`), Environmental Protection (`#environment`), Host Community (`#community`).
5. **Projects (`/projects`):** 3 placeholder capability briefs marked `DEV SHELL // DRAFT COPY`.
6. **Careers (`/careers`):** `careers-banner` hero, open pathways empty state routing to `/contact`.
7. **Contact (`/contact`):** `?service=` query pre-fill, Lekki Phase 1 Lagos address, optional `NEXT_PUBLIC_SITE_EMAIL` display, Resend-backed `/api/contact` with honest `503` unconfigured handling and 5000 char cap.
8. **Privacy (`/privacy`) & Sitemap (`/sitemap.xml`):** NDPA statement and dynamic XML sitemap covering all routes.
9. **Search (`SearchPalette` + `scripts/build-search-index.mjs`):** Lazy-loaded MiniSearch client palette indexing 20 documents across services, service sub-sections, pages, and QHSE anchors.
