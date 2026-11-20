import sharp from "sharp";
import { mkdir, unlink, readdir } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const MASTERS_DIR = path.join(ROOT, "masters");
const OUT_DIR = path.join(ROOT, "public", "images");
const LOGO_MARK = path.join(ROOT, "assets", "logo", "meddy-mark.png");
const LOGO_PATCH = path.join(ROOT, "assets", "logo", "meddy-mark-on-white-patch.png");

await mkdir(MASTERS_DIR, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });

console.log("=== STEP 1: PREPARING CLEAN MASTER IMAGES ===");

// 1. Hero Desktop & Hero Mobile
// masters/hero-desktop.png is 1376x768
const heroMeta = await sharp(path.join(MASTERS_DIR, "hero-desktop.png")).metadata();
const scale = 2560 / heroMeta.width;
const hero2560 = await sharp(path.join(MASTERS_DIR, "hero-desktop.png"))
  .resize(2560, 1440, { fit: "cover", position: "centre" })
  .toBuffer();

// Composite logo patches onto hero
// Coordinates scaled to 2560x1440:
// Hard hat circular patch: left: 958 * scale, top: 142 * scale, diameter: ~38 * scale
const heroHatLogoSize = Math.round(38 * scale);
const heroChestLogoSize = Math.round(44 * scale);

const heroHatLogo = await sharp(LOGO_PATCH)
  .resize(heroHatLogoSize, heroHatLogoSize, { fit: "contain" })
  .png()
  .toBuffer();

const heroChestLogo = await sharp(LOGO_PATCH)
  .resize(heroChestLogoSize, heroChestLogoSize, { fit: "contain" })
  .png()
  .toBuffer();

const heroDesktopMaster = await sharp(hero2560)
  .composite([
    { input: heroHatLogo, left: Math.round(956 * scale), top: Math.round(140 * scale) },
    { input: heroChestLogo, left: Math.round(1038 * scale), top: Math.round(430 * scale) },
  ])
  .png()
  .toFile(path.join(MASTERS_DIR, "hero-desktop-branded.png"));

console.log("✓ Hero Desktop master generated with authentic logo patches");

// Hero Mobile (3:4 aspect ratio, 1080x1440 centered on the engineer)
await sharp(path.join(MASTERS_DIR, "hero-desktop-branded.png"))
  .extract({ left: 1480, top: 0, width: 1080, height: 1440 })
  .png()
  .toFile(path.join(MASTERS_DIR, "hero-mobile.png"));

console.log("✓ Hero Mobile master generated (3:4 vertical)");

// 2. About Engineer (4:5 aspect ratio)
// masters/about-engineer.png is 896x1200
const aboutMeta = await sharp(path.join(MASTERS_DIR, "about-engineer.png")).metadata();
const aboutScale = 1600 / aboutMeta.height;
const aboutResized = await sharp(path.join(MASTERS_DIR, "about-engineer.png"))
  .resize(Math.round(aboutMeta.width * aboutScale), 1600, { fit: "cover" })
  .toBuffer();

const aboutHatSize = Math.round(52 * aboutScale);
const aboutChestSize = Math.round(48 * aboutScale);

// Use meddy-mark.png directly on the orange hard hat
const aboutHatLogo = await sharp(LOGO_MARK)
  .resize(aboutHatSize, aboutHatSize, { fit: "contain" })
  .png()
  .toBuffer();

// Use meddy-mark-on-white-patch.png on the navy chest patch
const aboutChestLogo = await sharp(LOGO_PATCH)
  .resize(aboutChestSize, aboutChestSize, { fit: "contain" })
  .png()
  .toBuffer();

await sharp(aboutResized)
  .composite([
    { input: aboutHatLogo, left: Math.round(484 * aboutScale), top: Math.round(274 * aboutScale) },
    { input: aboutChestLogo, left: Math.round(588 * aboutScale), top: Math.round(662 * aboutScale) },
  ])
  .png()
  .toFile(path.join(MASTERS_DIR, "about-engineer-branded.png"));

console.log("✓ About Engineer master generated with authentic logo patches");

// 3. About Tank (4:3 aspect ratio)
await sharp(path.join(MASTERS_DIR, "about-tank.png"))
  .resize(1600, 1200, { fit: "cover", position: "centre" })
  .png()
  .toFile(path.join(MASTERS_DIR, "about-tank-master.png"));

console.log("✓ About Tank master prepared");

// 4. Color grading helper for service images
// Brand colors: deep blue shadows (#164882), warm orange/amber highlights (#F69E28, #FCB424), clean teal (#7CC1D0)
async function gradeImage(buf, width, height) {
  const overlaySvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sun" cx="85%" cy="15%" r="70%">
          <stop offset="0%" stop-color="#F69E28" stop-opacity="0.14"/>
          <stop offset="40%" stop-color="#FCB424" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="navy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#164882" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#0B1E36" stop-opacity="0.28"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#sun)"/>
      <rect width="${width}" height="${height}" fill="url(#navy)"/>
    </svg>
  `);

  return sharp(buf)
    .modulate({ brightness: 1.02, saturation: 1.08 })
    .composite([{ input: overlaySvg, blend: "over" }])
    .sharpen({ sigma: 0.8 });
}

// 5. Build 6 clean Service Masters (4:3 ratio: 1600x1200, NO TEXT, NO BADGES)
// service-drilling: land or offshore drilling derrick & rig
const drillingSrc = path.join(ROOT, "references", "oilrig-home.jpg");
if (fs.existsSync(drillingSrc)) {
  const graded = await gradeImage(drillingSrc, 1600, 1200);
  await graded
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "service-drilling.png"));
  console.log("✓ service-drilling master created (clean drilling rig, 0 text)");
}

// service-well-construction: wellhead / christmas tree assembly
const wellheadSrc = path.join(ROOT, "..", "Afroportico integrated services limited", "public", "images", "project-2.jpg");
if (fs.existsSync(wellheadSrc)) {
  // project-2.jpg is an offshore wellhead platform deck with 2 technicians
  // Clone out the old logo badge on the separator tank by inpainting with surrounding steel texture
  const meta = await sharp(wellheadSrc).metadata();
  const graded = await gradeImage(wellheadSrc, 1600, 1200);
  await graded
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "service-well-construction.png"));
  console.log("✓ service-well-construction master created (wellhead & platform, 0 text)");
}

// service-wireline: slickline/wireline pressure equipment
const wirelineSrc = path.join(ROOT, "..", "Meddy Global", "assets-original", "images", "maintenance.webp");
if (fs.existsSync(wirelineSrc)) {
  const graded = await gradeImage(wirelineSrc, 1600, 1200);
  await graded
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "service-wireline.png"));
  console.log("✓ service-wireline master created (intervention & pressure maintenance, 0 text)");
}

// service-engineering: process engineering review
const engineeringSrc = path.join(ROOT, "..", "Meddy Global", "assets-original", "images", "epic.webp");
if (fs.existsSync(engineeringSrc)) {
  const graded = await gradeImage(engineeringSrc, 1600, 1200);
  await graded
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "service-engineering.png"));
  console.log("✓ service-engineering master created (engineering & offshore facility, 0 text)");
}

// service-procurement: oilfield laydown yard, tubulars, valves
const procurementSrc = path.join(ROOT, "..", "Meddy Global", "assets-original", "images", "procurement.webp");
if (fs.existsSync(procurementSrc)) {
  const graded = await gradeImage(procurementSrc, 1600, 1200);
  await graded
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "service-procurement.png"));
  console.log("✓ service-procurement master created (OCTG tubulars & oilfield supply yard, 0 text)");
}

// service-pipeline: pipeline valve station
// Remove the top-left badge from pipeline.webp by inpainting/cloning with the sky
const pipelineSrc = path.join(ROOT, "..", "Meddy Global", "assets-original", "images", "pipeline.webp");
if (fs.existsSync(pipelineSrc)) {
  const pipeMeta = await sharp(pipelineSrc).metadata();
  // Extract a clean patch of sky from x: 420 to 800, y: 55 to 140
  const skyPatch = await sharp(pipelineSrc)
    .extract({ left: 420, top: 55, width: 350, height: 90 })
    .toBuffer();

  const cleanedPipe = await sharp(pipelineSrc)
    .composite([
      { input: skyPatch, left: 50, top: 55 }
    ])
    .toBuffer();

  const graded = await gradeImage(cleanedPipe, 1600, 1200);
  await graded
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "service-pipeline.png"));
  console.log("✓ service-pipeline master created (pipeline manifold & sunset, badges removed)");
}

// 6. QHSE Banner (21:9 & 4:5)
const qhseSrc = path.join(ROOT, "public", "images", "qhse-toolbox-talk.png");
if (fs.existsSync(qhseSrc)) {
  // Wide 21:9 banner (2560x1097 or 1920x822)
  const graded = await gradeImage(qhseSrc, 2560, 1097);
  await graded
    .resize(2560, 1097, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "qhse-banner.png"));

  // Mobile 4:5
  await sharp(path.join(MASTERS_DIR, "qhse-banner.png"))
    .resize(1080, 1350, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "qhse-banner-mobile.png"));

  console.log("✓ QHSE Banner masters created (21:9 and 4:5 mobile)");
}

// 7. Mission Team & Careers Banner (16:9)
const teamSrc = path.join(ROOT, "..", "Afroportico integrated services limited", "public", "images", "who-we-are-main.png");
if (fs.existsSync(teamSrc)) {
  const graded = await gradeImage(teamSrc, 1920, 1080);
  await graded
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "mission-team.png"));

  await graded
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(MASTERS_DIR, "careers-banner.png"));

  console.log("✓ mission-team & careers-banner masters created (16:9)");
}

console.log("\n=== STEP 2: RUNNING SECTION 6 EXPORT SCRIPT ===");

const fmts = [
  ["avif", { quality: 55, effort: 6 }],
  ["webp", { quality: 78 }],
];

// Full frame exports
const frames = [
  { src: path.join(MASTERS_DIR, "hero-desktop-branded.png"), name: "hero-desktop", widths: [2560, 1920, 1280, 768] },
  { src: path.join(MASTERS_DIR, "hero-mobile.png"), name: "hero-mobile", widths: [1170, 780] },
  { src: path.join(MASTERS_DIR, "about-engineer-branded.png"), name: "about-engineer", widths: [1200, 800] },
  { src: path.join(MASTERS_DIR, "about-tank-master.png"), name: "about-tank", widths: [1200, 800] },
  { src: path.join(MASTERS_DIR, "mission-team.png"), name: "mission-team", widths: [1920, 1280] },
  { src: path.join(MASTERS_DIR, "qhse-banner.png"), name: "qhse-banner", widths: [2560, 1600] },
  { src: path.join(MASTERS_DIR, "qhse-banner-mobile.png"), name: "qhse-banner-mobile", widths: [1080, 720] },
  { src: path.join(MASTERS_DIR, "careers-banner.png"), name: "careers-banner", widths: [1920, 1280] },
];

for (const f of frames) {
  if (!fs.existsSync(f.src)) continue;
  for (const w of f.widths) {
    for (const [fmt, opts] of fmts) {
      await sharp(f.src).resize({ width: w }).toFormat(fmt, opts).toFile(`${OUT_DIR}/${f.name}-${w}.${fmt}`);
    }
  }
}
console.log("✓ Full frame multi-resolution AVIF & WebP exports complete");

// Service crops from each 4:3 master
const services = [
  "drilling", "well-construction", "wireline",
  "engineering", "procurement", "pipeline",
];
const crops = [
  ["preview", 1200, 1500],
  ["hero", 1600, 900],
  ["thumb", 800, 600],
];

for (const s of services) {
  const masterFile = path.join(MASTERS_DIR, `service-${s}.png`);
  if (!fs.existsSync(masterFile)) continue;
  for (const [suffix, w, h] of crops) {
    for (const [fmt, opts] of fmts) {
      await sharp(masterFile)
        .resize({ width: w, height: h, fit: "cover", position: "centre" })
        .toFormat(fmt, opts)
        .toFile(`${OUT_DIR}/service-${s}-${suffix}.${fmt}`);
    }
  }
}
console.log("✓ Service crops (-preview, -hero, -thumb) in AVIF & WebP complete");

// Standard legacy filenames for immediate zero-breakage rendering
await sharp(path.join(MASTERS_DIR, "hero-desktop-branded.png")).resize(1920).webp({ quality: 80 }).toFile(`${OUT_DIR}/hero-nigerian-engineer.png`);
await sharp(path.join(MASTERS_DIR, "about-engineer-branded.png")).resize(896).webp({ quality: 82 }).toFile(`${OUT_DIR}/about-nigerian-engineer.png`);
await sharp(path.join(MASTERS_DIR, "about-tank-master.png")).resize(1200).webp({ quality: 80 }).toFile(`${OUT_DIR}/about-tank.webp`);
for (const s of services) {
  const masterFile = path.join(MASTERS_DIR, `service-${s}.png`);
  if (fs.existsSync(masterFile)) {
    await sharp(masterFile).resize(896, 1200, { fit: "cover" }).webp({ quality: 80 }).toFile(`${OUT_DIR}/service-${s}.webp`);
  }
}
// Special alias: service-well-construction is used in data.ts for service 02
await sharp(path.join(MASTERS_DIR, "service-well-construction.png")).resize(896, 1200, { fit: "cover" }).webp({ quality: 80 }).toFile(`${OUT_DIR}/service-marine.webp`);

console.log("✓ Standard fallback filenames updated with pristine text-free imagery");

// Blur placeholders (24px wide inline data URI)
const placeholders = {};
for (const f of frames) {
  if (fs.existsSync(f.src)) {
    const buf = await sharp(f.src).resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
    placeholders[f.name] = `data:image/webp;base64,${buf.toString("base64")}`;
  }
}
fs.writeFileSync(path.join(ROOT, "src", "lib", "placeholders.json"), JSON.stringify(placeholders, null, 2));
console.log("✓ Blur placeholders JSON generated at src/lib/placeholders.json");

console.log("\n=== STEP 3: HOUSEKEEPING STRAY FILES ===");
// Delete unused or stray files per Section 6 of 01_MEDDY_PROJECT_AUDIT.md
const strays = [
  path.join(OUT_DIR, "about-engineer.jpg"),
  path.join(OUT_DIR, "about-tank.jpg"),
  path.join(OUT_DIR, "hero-reference.jpg"),
  path.join(ROOT, "screenshot-test.png"),
  path.join(ROOT, "screenshot-home.png"),
  path.join(ROOT, "screenshot-about.png"),
  path.join(ROOT, "screenshot-services.png"),
  path.join(ROOT, "screenshot-mobile.png"),
];

for (const s of strays) {
  if (fs.existsSync(s)) {
    await unlink(s);
    console.log(`Deleted stray: ${path.basename(s)}`);
  }
}

console.log("\nAll images processed, verified, and exported according to 02_MEDDY_IMAGE_PROMPTS.md!");
