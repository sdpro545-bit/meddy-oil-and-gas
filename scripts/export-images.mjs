import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

const fmts = [
  ["avif", { quality: 55, effort: 6 }],
  ["webp", { quality: 74 }],
];

// Full frame exports
const frames = [
  { src: "masters/hero-desktop.png", name: "hero-desktop", widths: [2560, 1920, 1280, 768] },
  { src: "masters/hero-mobile.png", name: "hero-mobile", widths: [1170, 780] },
  { src: "masters/about-engineer-branded.png", name: "about-engineer", widths: [1200, 800] },
  { src: "masters/about-tank-master.png", name: "about-tank", widths: [1200, 800] },
  { src: "masters/mission-team.png", name: "mission-team", widths: [1920, 1280] },
  { src: "masters/qhse-banner.png", name: "qhse-banner", widths: [2560, 1600] },
  { src: "masters/qhse-banner-mobile.png", name: "qhse-banner-mobile", widths: [1080, 720] },
  { src: "masters/careers-banner.png", name: "careers-banner", widths: [1920, 1280] },
];

for (const f of frames) {
  for (const w of f.widths) {
    for (const [fmt, opts] of fmts) {
      const buf = await sharp(f.src).resize({ width: w }).toFormat(fmt, opts).toBuffer();
      await writeFile(`${OUT}/${f.name}-${w}.${fmt}`, buf);
    }
  }
}

// Service crops from one 4:3 master (Geoplex service set per 02_MEDDY_IMAGE_PROMPTS.md Section 7)
const services = [
  "well-construction",
  "oilfield",
  "wireline-testing",
  "drilling-engineering",
  "pressure-pumping",
  "integrated",
  "fpso-vessel",
  "power",
];
const crops = [
  ["preview", 1200, 1500],
  ["hero", 1600, 900],
  ["thumb", 800, 600],
];

for (const s of services) {
  for (const [suffix, w, h] of crops) {
    for (const [fmt, opts] of fmts) {
      const buf = await sharp(`masters/service-${s}.png`)
        .resize({ width: w, height: h, fit: "cover", position: "centre" })
        .toFormat(fmt, opts)
        .toBuffer();
      await writeFile(`${OUT}/service-${s}-${suffix}.${fmt}`, buf);
    }
  }
}

// Blur placeholders (24px wide, inline data URI)
const placeholders = {};
for (const f of frames) {
  const buf = await sharp(f.src).resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
  placeholders[f.name] = `data:image/webp;base64,${buf.toString("base64")}`;
}
for (const s of services) {
  const buf = await sharp(`masters/service-${s}.png`).resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
  placeholders[`service-${s}`] = `data:image/webp;base64,${buf.toString("base64")}`;
}

await writeFile("src/lib/placeholders.json", JSON.stringify(placeholders, null, 2));
console.log(`Exported ${frames.length} frame sets, ${services.length} service sets, and src/lib/placeholders.json`);
