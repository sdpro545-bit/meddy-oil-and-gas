export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortSummary: string;
  fullOverview: string;
  coverage: string[];
  image: string;
}

export const COMPANY_FACTS = {
  name: "Meddy Oil & Gas Limited",
  shortName: "Meddy Oil & Gas",
  tagline: "Engineering the Energy Future",
  eyebrow: "Oil and gas services from Lagos",
  address: "8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1, Lagos, Nigeria",
  email: "info@[DOMAIN]",
  phone: "[PHONE_PLACEHOLDER]",
  jurisdiction: "Lekki, Lagos State, Nigeria",
};

export const SITE_STATS = {
  employees: null, // Client to confirm
  activeFields: null, // Client to confirm
  projectsCompleted: null, // Client to confirm
  isDev: process.env.NODE_ENV !== "production",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    slug: "drilling-support",
    number: "01",
    title: "Drilling Support Services",
    shortSummary: "Operational coordination and rig-site technical support for safe drilling programmes.",
    fullOverview: "Meddy Oil & Gas delivers specialised support for drilling operations across onshore and offshore environments. Our team coordinates rig-site operations, drilling fluids logistics, and equipment readiness to maintain continuous uptime and adhere strictly to operator safety standards.",
    coverage: [
      "Drilling programme coordination and site planning",
      "Rig-site mud logging and fluids monitoring support",
      "Well control contingency and equipment verification",
      "Daily drilling reporting and technical logging",
    ],
    image: "/images/service-drilling.webp",
  },
  {
    id: "02",
    slug: "well-construction",
    number: "02",
    title: "Well Construction & Completions",
    shortSummary: "Tubular running, casing support, and completion equipment installation.",
    fullOverview: "We support operators during critical well construction phases. From casing handling to completion hardware installation, our technicians ensure mechanical integrity and tight adherence to well design tolerances.",
    coverage: [
      "Casing and tubing running support",
      "Liner hanger installation supervision",
      "Wellhead and Christmas tree assembly support",
      "Downhole completion tool handling",
    ],
    image: "/images/service-marine.webp",
  },
  {
    id: "03",
    slug: "wireline-intervention",
    number: "03",
    title: "Wireline & Well Intervention",
    shortSummary: "Electric line, slickline, and mechanical intervention for production optimization.",
    fullOverview: "We provide intervention support for both cased hole and open hole environments. Our focus is on diagnostic logging, mechanical repairs, and zone isolation to safeguard reservoir performance.",
    coverage: [
      "Slickline mechanical operations and valve servicing",
      "Cased hole logging and perforation support",
      "Tubing punch and plug setting services",
      "Pressure control equipment setup and testing",
    ],
    image: "/images/service-wireline.webp",
  },
  {
    id: "04",
    slug: "engineering-services",
    number: "04",
    title: "Engineering & Technical Services",
    shortSummary: "Field design, maintenance planning, asset integrity, and inspection.",
    fullOverview: "Meddy provides multi-disciplinary engineering support to assist asset operators. We help plan preventative maintenance, inspect structural assets, and provide technical evaluations to extend production lifespan.",
    coverage: [
      "Structural and piping integrity inspection",
      "Preventative maintenance scheduling",
      "Process engineering reviews",
      "As-built documentation and regulatory reporting",
    ],
    image: "/images/service-engineering.webp",
  },
  {
    id: "05",
    slug: "procurement-supply",
    number: "05",
    title: "Procurement & Supply Chain",
    shortSummary: "Sourcing, testing, and delivery of API-certified equipment and consumables.",
    fullOverview: "We manage the procurement and logistics chain for oilfield tools, pipework, valves, and specialized consumables. Every item is verified for certification and material trace before delivery to the field.",
    coverage: [
      "OCTG tubulars and casing accessories",
      "High-pressure valves, flanges, and fittings",
      "Rig consumables and safety gear",
      "Expedited customs and local logistics coordination",
    ],
    image: "/images/service-procurement.webp",
  },
  {
    id: "06",
    slug: "pipeline-facilities",
    number: "06",
    title: "Pipeline & Facilities Support",
    shortSummary: "Construction monitoring, pipeline inspection, and station maintenance.",
    fullOverview: "We support operators in maintaining pipeline corridors and surface processing facilities. Our technicians assist with non-destructive testing, corrosion monitoring, and routine mechanical maintenance.",
    coverage: [
      "Pipeline right-of-way surveillance and inspection",
      "Non-destructive testing (NDT) and wall thickness checks",
      "Surface facility valve and pump maintenance",
      "Flange torqueing and hydrostatic testing support",
    ],
    image: "/images/service-pipeline.webp",
  },
];

export const WHY_MEDDY_POINTS = [
  {
    title: "Safety as Core Priority",
    description: "Every operation operates under strict Stop Work Authority. We never compromise field personnel or environment for operational expediency.",
  },
  {
    title: "Strict Quality Control",
    description: "Systematic checks on every tool, joint, valve, and certificate before mobilization to offshore or onshore wellheads.",
  },
  {
    title: "Technical Field Depth",
    description: "Specialized engineering teams with deep domain competency in Nigerian Niger Delta and Gulf of Guinea basins.",
  },
  {
    title: "Local Presence in Lagos",
    description: "Centrally coordinated from Lekki Phase 1, enabling rapid logistical mobilization and active operator liaison across Nigeria.",
  },
];

export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Plan",
    description: "We agree the scope, the risks, and the schedule before anyone mobilises.",
  },
  {
    step: "02",
    title: "Mobilise",
    description: "Crew, equipment, and permits are checked and signed off.",
  },
  {
    step: "03",
    title: "Deliver",
    description: "The job runs to the plan, with safety briefings at every shift.",
  },
  {
    step: "04",
    title: "Review",
    description: "We share the results and note what to change next time.",
  },
];
