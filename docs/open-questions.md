# Open Questions & Client Inputs Log: Meddy Oil & Gas Limited

All items listed below require written client confirmation before launch. Until supplied or signed off, unverified facts remain omitted from public copy and draft sections remain clearly tagged (`DRAFT COPY` / `DEV SHELL`).

| # | Item | Status | Current Fallback / Implementation |
|---|---|---|---|
| **1** | **Company Domain, Canonical URL & Public Email** | Awaiting Client | No domain or email is fabricated anywhere. `COMPANY_FACTS.email` reads `process.env.NEXT_PUBLIC_SITE_EMAIL ?? ""`; Footer, Contact, Careers, Header mobile drawer, Search index, and JSON-LD omit email when blank. |
| **2** | **Resend Email Delivery Configuration (`RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`)** | Awaiting Client | Contact API (`src/app/api/contact/route.ts`) calls Resend directly via `fetch` and returns HTTP `503` with an honest fallback message when keys are absent. |
| **3** | **Corporate Phone & Direct Line** | Awaiting Client | Phone fields remain hidden in Footer and Contact blocks (`COMPANY_FACTS.phone = null`). |
| **4** | **RC Number & Incorporation Details** | Awaiting Client | `COMPANY_FACTS.rcNumber = null`; Footer omits RC number until confirmed. |
| **5** | **Confirmation of All 5 Service Lines (Especially Power & FPSO & Vessel Services)** | Awaiting Client Sign-Off | Site implements the 5-line Geoplex taxonomy (`Well Construction Services`, `Oil Field Services`, `Integrated Services`, `FPSO & Vessel Services`, `Power`). Client must confirm whether **Power**, **FPSO & Vessel Services**, and all 3 sub-disciplines under **Oil Field Services** remain active before launch. |
| **6** | **Draft Copy Sign-Off (Mission, Service Scopes, QHSE Pillars, Careers)** | Pending Review | Every service page, Mission section, QHSE breakdown, and Projects shell displays a `DRAFT COPY` label for client review. |
| **7** | **Verified Operational Statistics** | Awaiting Client | Reference numbers omitted cleanly (`05 Active Capability Lines` used only where derived directly from `SERVICES_DATA.length`). Hero ghost word reads `MEDDY`. |
| **8** | **Project Case Briefs** | Awaiting Client | `/projects` displays 3 representative placeholder briefs marked `DEV SHELL // DRAFT COPY`. Replace with client-approved case studies or hide prior to launch. |
| **9** | **Real Field Photography (Quota-Blocked Placeholders)** | Awaiting Client / Quota Reset | 6 real custom masters (`hero-desktop`, `hero-mobile`, `qhse-banner`, `service-well-construction`, `about-engineer-branded`, `about-tank-master`) are live. 10 remaining stems use neutral navy branded placeholders logged in `docs/image-brief.md`. |
| **10** | **Accreditations & Regulatory Registrations (ISO / NUPRC / API / NIPEX)** | Awaiting Client | Zero unverified standards, certificates, or regulatory registrations are claimed in any page copy or metadata. |
| **11** | **Official Wordmark Approval & Executive Profiles** | Pending Review | Wordmark typeset in Barlow Condensed 700 (`MEDDY`) + Manrope 600 (`OIL & GAS`) alongside authentic `meddy-mark.png`. Executive portraits omitted. |
