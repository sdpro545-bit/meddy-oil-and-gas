export interface ServiceSectionItem {
  id: string;
  anchor: string;
  title: string;
  summary: string;
  whatWeDo: string[];
  whereItApplies: string[];
  imageStem: string;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  stripLabel: string;
  shortSummary: string;
  fullOverview: string;
  whatWeDo: string[];
  whereItApplies: string[];
  imageStem: string;
  imageAlt: string;
  sections?: ServiceSectionItem[];
}

export const COMPANY_FACTS = {
  name: "Meddy Oil & Gas Limited",
  shortName: "Meddy Oil & Gas",
  tagline: "Engineering the Energy Future",
  eyebrow: "Oil and gas services from Lagos",
  address: "8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1, Lagos, Nigeria",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "",
  phone: "",
  jurisdiction: "Lekki, Lagos State, Nigeria",
};

export const SITE_STATS = {
  employees: null,
  activeFields: null,
  projectsCompleted: null,
  isDev: process.env.NODE_ENV !== "production",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    slug: "well-construction",
    number: "01",
    title: "Well Construction Services",
    stripLabel: "Well Construction",
    shortSummary: "Tubular handling, casing installation support, and wellhead completion coordination for land and offshore wells.",
    fullOverview:
      "Meddy Oil & Gas works with operators to support critical well construction phases from surface conductor placement through completion hardware assembly. Our field personnel coordinate tubular preparation, casing running sequences, and wellhead flange installation to keep well geometry within operator tolerances.",
    whatWeDo: [
      "Casing and tubing preparation and running coordination",
      "Conductor and surface casing installation support",
      "Wellhead and Christmas tree assembly and pressure checks",
      "Liner hanger and downhole completion hardware handling",
    ],
    whereItApplies: [
      "Onshore development wells across the Niger Delta",
      "Swamp and shallow offshore drilling programmes",
      "Workover and recompletion wellhead upgrades",
    ],
    imageStem: "service-well-construction",
    imageAlt: "Technicians checking flange bolts on a wellhead",
  },
  {
    id: "02",
    slug: "oil-field-services",
    number: "02",
    title: "Oil Field Services",
    stripLabel: "Oil Field Services",
    shortSummary: "Wireline, slickline, well testing, drilling engineering, and pressure pumping support across active well sites.",
    fullOverview:
      "We work with upstream operators across Nigeria to deliver practical field execution across three core disciplines: cased-hole and slickline intervention, rig-site drilling engineering, and high-pressure pumping and completion spreads.",
    whatWeDo: [
      "Electric wireline, slickline, and surface well testing coordination",
      "Drilling programme supervision, fluids monitoring, and rig-site reporting",
      "High-pressure pumping, cementing, and stimulation support",
      "Pre-mobilisation tool inspection and wellsite permit readiness",
    ],
    whereItApplies: [
      "Producing onshore and swamp fields requiring well diagnostics",
      "Active land and offshore drilling locations",
      "New well completions and remedial pressure pumping campaigns",
    ],
    imageStem: "service-oilfield",
    imageAlt: "Crew at a land wellsite with a drilling mast at sunrise",
    sections: [
      {
        id: "02a",
        anchor: "wireline-slickline-well-testing",
        title: "Electric Wireline, Slickline and Well Testing",
        summary:
          "Diagnostic logging, mechanical slickline intervention, and surface flow testing to evaluate well behaviour and maintain safe production.",
        whatWeDo: [
          "Slickline mechanical valve setting, gauge runs, and debris clearance",
          "Electric wireline cased-hole logging and perforation coordination",
          "Surface well testing hook-up, separator monitoring, and flow checks",
          "Pressure control equipment rig-up and pre-job leak verification",
        ],
        whereItApplies: [
          "Routine reservoir pressure and temperature surveys",
          "Zone isolation, plug setting, and gas-lift valve servicing",
          "Post-completion well cleanup and flow evaluation",
        ],
        imageStem: "service-wireline-testing",
        imageAlt: "Wireline equipment rigged up at a wellhead",
      },
      {
        id: "02b",
        anchor: "drilling-and-engineering",
        title: "Drilling and Engineering",
        summary:
          "Rig-floor technical supervision, directional and fluids coordination, and field engineering reviews for drilling programmes.",
        whatWeDo: [
          "Drilling programme planning and daily rig-site technical reporting",
          "Drilling fluids monitoring and mud logistics coordination",
          "Wellbore stability reviews and bottom-hole assembly tracking",
          "Rig readiness checks and well control equipment verification",
        ],
        whereItApplies: [
          "Exploratory and development land drilling rigs",
          "Swamp barge and shallow-water jack-up locations",
          "Operator engineering desks coordinating multi-well campaigns",
        ],
        imageStem: "service-drilling-engineering",
        imageAlt: "Drilling supervisor reviewing rig data on the rig floor",
      },
      {
        id: "02c",
        anchor: "pressure-pumping-and-completion",
        title: "Pressure Pumping and Completion",
        summary:
          "Primary and remedial cementing, acidising, and high-pressure pumping support tailored to well integrity requirements.",
        whatWeDo: [
          "Surface iron rig-up, line pressure testing, and safety barrier setup",
          "Primary casing cementing and remedial squeeze pumping support",
          "Wellbore cleanout, matrix treatment, and stimulation coordination",
          "Real-time pump rate, density, and wellhead pressure monitoring",
        ],
        whereItApplies: [
          "Casing shoe isolation and zonal cement bonding",
          "Near-wellbore cleanouts on mature producing wells",
          "High-pressure completion testing and wellhead commissioning",
        ],
        imageStem: "service-pressure-pumping",
        imageAlt: "Technician monitoring pumping equipment connected to a wellhead",
      },
    ],
  },
  {
    id: "03",
    slug: "integrated-services",
    number: "03",
    title: "Integrated Services",
    stripLabel: "Integrated Services",
    shortSummary: "Single-point coordination across engineering planning, field crews, and multi-discipline well delivery.",
    fullOverview:
      "We can support operators who prefer unified project coordination across planning, field execution, and multi-vendor scheduling. Our Lagos operations desk brings together engineering review, crew scheduling, and field reporting under one structured workflow.",
    whatWeDo: [
      "Integrated project scheduling across drilling and completion phases",
      "Cross-discipline field crew and equipment mobilisation coordination",
      "Daily operational reporting, cost tracking, and interface management",
      "Post-operation technical reviews and lessons-learned handover",
    ],
    whereItApplies: [
      "Multi-well development campaigns requiring unified supervision",
      "Marginal field operators streamlining vendor interfaces",
      "Turnkey field workovers combining wireline, pumping, and wellhead work",
    ],
    imageStem: "service-integrated",
    imageAlt: "Engineers coordinating a project in an operations room",
  },
  {
    id: "04",
    slug: "fpso-and-vessel-services",
    number: "04",
    title: "FPSO & Vessel Services",
    stripLabel: "FPSO & Vessel",
    shortSummary: "Offshore marine logistics support, deck crew coordination, and floating production facility assistance.",
    fullOverview:
      "We work with offshore operators and marine partners to support floating production, storage, and offloading operations along with offshore support vessel coordination in the Gulf of Guinea.",
    whatWeDo: [
      "Offshore support vessel deck coordination and cargo manifest checks",
      "FPSO topsides mechanical and process inspection support",
      "Marine crew transfer planning and offshore safety readiness",
      "Scheduled maintenance support for offshore deck equipment",
    ],
    whereItApplies: [
      "Deepwater and shallow-water FPSO installations",
      "Platform supply and anchor-handling vessel port turnarounds",
      "Offshore cargo base staging from Lagos terminals",
    ],
    imageStem: "service-fpso-vessel",
    imageAlt: "Offshore support vessel alongside a floating production unit",
  },
  {
    id: "05",
    slug: "power",
    number: "05",
    title: "Power",
    stripLabel: "Power",
    shortSummary: "Gas-to-power generation support, plant maintenance planning, and electrical field engineering.",
    fullOverview:
      "Meddy Oil & Gas can support industrial power and gas-fired generation projects across Nigeria through field engineering inspections, preventative maintenance planning, and plant commissioning coordination.",
    whatWeDo: [
      "Gas-fired turbine and generator balance-of-plant inspection support",
      "Preventative maintenance scheduling for industrial power facilities",
      "Electrical switchgear checks and commissioning documentation",
      "Fuel gas conditioning and metering station mechanical support",
    ],
    whereItApplies: [
      "Gas-to-power plants serving industrial and commercial estates",
      "Captive field power generation at oil and gas processing hubs",
      "Plant turnaround inspections and reliability upgrades",
    ],
    imageStem: "service-power",
    imageAlt: "Engineer checking a panel at a gas fired power station",
  },
];

export const WHY_MEDDY_POINTS = [
  {
    title: "Safety as Core Priority",
    description:
      "Every assignment operates under clear pre-job hazard checks and authority to pause work if conditions change. We never put schedule ahead of personnel safety.",
  },
  {
    title: "Strict Quality Control",
    description:
      "Systematic checks on every tool, tubular, valve, and inspection record before mobilisation to offshore or onshore wellheads.",
  },
  {
    title: "Technical Field Depth",
    description:
      "Specialised engineering teams with practical field experience across Nigerian Niger Delta and Gulf of Guinea operating environments.",
  },
  {
    title: "Local Presence in Lagos",
    description:
      "Centrally coordinated from Lekki Phase 1, enabling timely logistical mobilisation and direct operator liaison across Nigeria.",
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
