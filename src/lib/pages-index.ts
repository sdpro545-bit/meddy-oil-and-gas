export type SearchGroup = "Services" | "Pages" | "Safety and Quality";

export interface SearchDoc {
  id: string;
  group: SearchGroup;
  title: string;
  url: string;
  summary: string;
  keywords: string;
  body: string;
}

export const PAGES_INDEX: Omit<SearchDoc, "id">[] = [
  {
    group: "Pages",
    title: "Home",
    url: "/",
    summary: "Meddy Oil & Gas Limited overview, field capabilities, safety commitment, and mission.",
    keywords: "meddy oil gas engineering energy future nigeria upstream lagos home",
    body: "Engineering services for oil, gas, and power across Nigeria. Well Construction, Oil Field Services, Integrated Services, FPSO and Vessel Services, and Power.",
  },
  {
    group: "Pages",
    title: "About Meddy Oil & Gas",
    url: "/about",
    summary: "Indigenous Nigerian energy services company headquartered in Lekki Phase 1, Lagos.",
    keywords: "about company indigenous nigeria lagos lekki history leadership mission team",
    body: "Meddy Oil & Gas Limited delivers structured upstream field execution, engineering management, and local capacity across Nigeria.",
  },
  {
    group: "Pages",
    title: "All Capabilities & Services",
    url: "/services",
    summary: "Five integrated capability lines across well construction, oil field services, FPSO vessels, and power.",
    keywords: "services capabilities overview well construction wireline testing drilling pressure pumping integrated fpso power",
    body: "Explore five capability pillars: Well Construction Services, Oil Field Services, Integrated Services, FPSO and Vessel Services, and Power.",
  },
  {
    group: "Safety and Quality",
    title: "Safety & Quality Overview (QHSE)",
    url: "/qhse",
    summary: "Health, safety, environmental care, and quality procedures governing field and facility operations.",
    keywords: "safety qhse hse quality health environment risk protection incident prevention",
    body: "Structured hazard identification, work verification, environmental safeguards, and host community engagement across Nigerian operations.",
  },
  {
    group: "Safety and Quality",
    title: "Workplace & Operational Safety",
    url: "/qhse#safety",
    summary: "Pre-task hazard reviews, safe system of work controls, and crew readiness on site.",
    keywords: "safety hse qhse occupational hazard risk ppe permit to work crew readiness",
    body: "Field personnel complete structured pre-job safety briefings, personal protective checks, and equipment inspections prior to execution.",
  },
  {
    group: "Safety and Quality",
    title: "Quality Assurance & Work Verification",
    url: "/qhse#quality",
    summary: "Documented inspection gates, calibration discipline, and technical sign-off procedures.",
    keywords: "quality qa qc inspection testing verification documentation standards",
    body: "Every service programme follows written work instructions, calibrated tooling records, and supervisor sign-off.",
  },
  {
    group: "Safety and Quality",
    title: "Environmental Protection",
    url: "/qhse#environment",
    summary: "Spill prevention, containment controls, and responsible waste handling at work sites.",
    keywords: "environment sustainability spill containment waste management emissions",
    body: "Operations apply secondary containment, controlled disposal, and site restoration checks to limit environmental impact.",
  },
  {
    group: "Safety and Quality",
    title: "Host Community & Local Content",
    url: "/qhse#community",
    summary: "Respectful coordination with host communities and Nigerian technical workforce development.",
    keywords: "community stakeholder niger delta local content nigerian personnel",
    body: "We work alongside Nigerian host communities, local suppliers, and engineering graduates to build lasting operational capacity.",
  },
  {
    group: "Pages",
    title: "Projects & Operational Briefs",
    url: "/projects",
    summary: "Representative field scopes across well construction, testing, and asset support.",
    keywords: "projects case studies briefs track record execution upstream field work",
    body: "Review structured project briefs illustrating well delivery support, surface testing packages, and offshore asset maintenance scopes.",
  },
  {
    group: "Pages",
    title: "Careers at Meddy Oil & Gas",
    url: "/careers",
    summary: "Engineering, field operations, and graduate opportunities across Nigerian energy hubs.",
    keywords: "careers jobs vacancies recruitment hiring employment graduate programme engineer technician",
    body: "Explore open career pathways and submit speculative CVs for wireline, testing, drilling, project engineering, and HSE roles.",
  },
  {
    group: "Pages",
    title: "Contact & Office Location",
    url: "/contact",
    summary: "Reach our Lekki Phase 1, Lagos office for technical scoping and commercial enquiries.",
    keywords: "contact address phone email location lagos lekki victoria arobieke enquiry scope quotation",
    body: "Plot 3, Block 109, Victoria Arobieke Street, Lekki Phase 1, Lagos, Nigeria. Submit technical scopes and mobilisation enquiries online.",
  },
  {
    group: "Pages",
    title: "Privacy & Data Confidentiality",
    url: "/privacy",
    summary: "Nigeria Data Protection Act (NDPA) handling and non-disclosure standards for client records.",
    keywords: "privacy policy ndpa confidentiality non disclosure legal data protection",
    body: "How Meddy Oil & Gas Limited handles contact form submissions, career enquiries, and client well programme information.",
  },
];
