import fs from "node:fs";
import path from "node:path";
import { COMPANY_FACTS, SERVICES_DATA } from "../src/lib/data.ts";
import { PAGES_INDEX } from "../src/lib/pages-index.ts";

const SYNONYM_RULES = [
  {
    match: /wireline|cable/i,
    add: "wireline cable cased hole electric line logging perforation",
  },
  {
    match: /slickline|intervention/i,
    add: "slickline well intervention downhole mechanical valve bailer",
  },
  {
    match: /testing|production/i,
    add: "well testing production testing separator choke manifold flare",
  },
  {
    match: /drilling/i,
    add: "drilling directional engineering mud casing rig well planning",
  },
  {
    match: /pressure|pumping|stimulation|cement/i,
    add: "pressure pumping cementing acidizing stimulation coil tubing",
  },
  {
    match: /fpso|vessel|marine|offshore/i,
    add: "fpso floating production marine vessel topsides offloading turret",
  },
  {
    match: /power|electricity|gas/i,
    add: "power electricity gas power generation compression turbine substation",
  },
  {
    match: /safety|qhse|hse/i,
    add: "safety hse qhse risk hazard protection environment quality",
  },
  {
    match: /career|job|vacanc/i,
    add: "careers jobs vacancies employment hiring graduate engineer",
  },
  {
    match: /contact|address|lagos|location/i,
    add: "contact address phone email location lagos lekki victoria arobieke",
  },
];

function expandSynonyms(text) {
  const extras = [];
  for (const rule of SYNONYM_RULES) {
    if (rule.match.test(text)) extras.push(rule.add);
  }
  return extras.join(" ");
}

const docs = [];

for (const srv of SERVICES_DATA) {
  const baseText = [
    srv.title,
    srv.shortSummary,
    srv.fullOverview,
    ...(srv.whatWeDo || []),
    ...(srv.whereItApplies || []),
  ].join(" ");

  docs.push({
    id: `service-${srv.slug}`,
    group: "Services",
    title: srv.title,
    url: `/services/${srv.slug}`,
    summary: srv.shortSummary,
    keywords: [srv.stripLabel, srv.slug.replace(/-/g, " "), expandSynonyms(baseText)].join(" "),
    body: [srv.fullOverview, ...(srv.whatWeDo || []), ...(srv.whereItApplies || [])].join(" "),
  });

  if (Array.isArray(srv.sections)) {
    for (const sec of srv.sections) {
      const secText = [
        sec.title,
        sec.summary,
        ...(sec.whatWeDo || []),
        ...(sec.whereItApplies || []),
      ].join(" ");

      docs.push({
        id: `service-section-${srv.slug}-${sec.anchor}`,
        group: "Services",
        title: `${srv.title}: ${sec.title}`,
        url: `/services/${srv.slug}#${sec.anchor}`,
        summary: sec.summary,
        keywords: [sec.title, srv.title, expandSynonyms(secText)].join(" "),
        body: [...(sec.whatWeDo || []), ...(sec.whereItApplies || [])].join(" "),
      });
    }
  }
}

for (const page of PAGES_INDEX) {
  let body = page.body;
  let keywords = page.keywords;

  if (page.url === "/contact") {
    const emailPart = COMPANY_FACTS.email ? ` Email: ${COMPANY_FACTS.email}.` : "";
    body = `${COMPANY_FACTS.name}. ${COMPANY_FACTS.address}.${emailPart} ${body}`;
    keywords = `${keywords} ${COMPANY_FACTS.address} ${COMPANY_FACTS.email || ""}`.trim();
  }

  docs.push({
    id: `page-${page.url.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`,
    group: page.group,
    title: page.title,
    url: page.url,
    summary: page.summary,
    keywords: `${keywords} ${expandSynonyms(`${page.title} ${keywords} ${body}`)}`.trim(),
    body,
  });
}

const outPath = path.join(process.cwd(), "src", "lib", "search-index.json");
fs.writeFileSync(outPath, JSON.stringify(docs, null, 2) + "\n", "utf8");
console.log(`Built search index: ${docs.length} documents -> ${outPath}`);
