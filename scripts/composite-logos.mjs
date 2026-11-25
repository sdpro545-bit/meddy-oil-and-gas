import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(".");
const PLACEMENTS = JSON.parse(await fs.readFile(path.join(ROOT, "assets/logo/placements.json"), "utf8"));

const HERO_SRC = "C:/Users/user/.gemini/antigravity/brain/ba3ceaa0-611b-4c4e-9022-7080e3830589/hero_desktop_v2_1795554898583.jpg";
const HERO_MOBILE_SRC = "C:/Users/user/.gemini/antigravity/brain/ba3ceaa0-611b-4c4e-9022-7080e3830589/hero_mobile_1795593242732.jpg";
const QHSE_SRC = "C:/Users/user/.gemini/antigravity/brain/ba3ceaa0-611b-4c4e-9022-7080e3830589/qhse_banner_1795593347665.jpg";
const WELL_SRC = "C:/Users/user/.gemini/antigravity/brain/ba3ceaa0-611b-4c4e-9022-7080e3830589/service_well_construction_1795554920030.jpg";

// Save raw copies before compositing
await sharp(HERO_SRC).png().toFile(path.join(ROOT, "masters/hero-desktop-raw.png"));
await sharp(HERO_MOBILE_SRC).png().toFile(path.join(ROOT, "masters/hero-mobile-raw.png"));

// Trim white border off service_well_construction completely and upscale to 2400x1800
{
  const meta = await sharp(WELL_SRC).metadata();
  const trimX = 36;
  const trimY = 36;
  await sharp(WELL_SRC)
    .extract({
      left: trimX,
      top: trimY,
      width: meta.width - trimX * 2,
      height: meta.height - trimY * 2,
    })
    .resize(2400, 1800, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(ROOT, "masters/service-well-construction.png"));
  console.log("Prepared masters/service-well-construction.png (2400x1800, borderless)");
}

// Crop qhse_banner (1376x768) cleanly to 21:9 (top: 55, height: 590) -> 3840x1646
await sharp(QHSE_SRC)
  .extract({ left: 0, top: 55, width: 1376, height: 590 })
  .resize(3840, 1646, { fit: "cover" })
  .png()
  .toFile(path.join(ROOT, "masters/qhse-banner.png"));
console.log("Prepared masters/qhse-banner.png (3840x1646)");

// Cleanly remove the thin black placeholder circle on the desktop hero hard hat (preserving hat shading & glasses)
async function cleanHeroHatCircle(baseBuffer) {
  const { data, info } = await sharp(baseBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const ch = info.channels;

  const isRing = (x, y) => {
    const e = Math.hypot((x - 954) / 31, (y - 139) / 27);
    return e >= 0.72 && e <= 1.22 && y >= 110 && y <= 165;
  };

  const out = Buffer.from(data);
  for (let pass = 0; pass < 8; pass++) {
    const src = Buffer.from(out);
    for (let y = 110; y <= 165; y++) {
      for (let x = 918; x <= 990; x++) {
        if (!isRing(x, y)) continue;
        const idx = (y * w + x) * ch;
        const lum = 0.299 * src[idx] + 0.587 * src[idx + 1] + 0.114 * src[idx + 2];
        let maxLum = 0;
        let sr = 0, sg = 0, sb = 0, count = 0;
        for (let dy = -4; dy <= 4; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            const nx = x + dx, ny = y + dy;
            if (isRing(nx, ny)) continue;
            const nidx = (ny * w + nx) * ch;
            const nlum = 0.299 * src[nidx] + 0.587 * src[nidx + 1] + 0.114 * src[nidx + 2];
            if (nlum > maxLum) maxLum = nlum;
            if (nlum >= 165) {
              sr += src[nidx];
              sg += src[nidx + 1];
              sb += src[nidx + 2];
              count++;
            }
          }
        }
        if (count > 0 && lum < maxLum - 12) {
          out[idx] = Math.round(sr / count);
          out[idx + 1] = Math.round(sg / count);
          out[idx + 2] = Math.round(sb / count);
        }
      }
    }
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: ch } }).png().toBuffer();
}

async function applyPlacement(baseBuffer, baseW, baseH, spec, { sceneBrightness = 0.94 } = {}) {
  const size = Math.round(spec.width);
  let logoSharp = sharp(path.join(ROOT, spec.asset))
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .modulate({ brightness: sceneBrightness });

  if (spec.stitchedEdge) {
    const r = Math.max(4, Math.round(size * 0.14));
    const clipSvg = Buffer.from(
      `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white"/></svg>`
    );
    const stitchSvg = Buffer.from(
      `<svg width="${size}" height="${size}">
        <rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="${Math.max(2, r - 2)}" ry="${Math.max(2, r - 2)}" fill="none" stroke="rgba(11,30,54,0.22)" stroke-width="1" stroke-dasharray="2,2"/>
      </svg>`
    );
    const clipped = await logoSharp
      .ensureAlpha()
      .composite([{ input: clipSvg, blend: "dest-in" }])
      .png()
      .toBuffer();
    logoSharp = sharp(clipped).composite([{ input: stitchSvg }]);
  }

  const logoBuf = await logoSharp
    .rotate(spec.rotationDeg || 0, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoBuf).metadata();
  const lw = logoMeta.width;
  const lh = logoMeta.height;
  const left = Math.max(0, Math.min(baseW - lw, Math.round(spec.centerX - lw / 2)));
  const top = Math.max(0, Math.min(baseH - lh, Math.round(spec.centerY - lh / 2)));

  const logoAlpha = await sharp(logoBuf).extractChannel("alpha").toBuffer();
  const underTexRaw = await sharp(baseBuffer)
    .extract({ left, top, width: lw, height: lh })
    .grayscale()
    .linear(0.28, 195)
    .png()
    .toBuffer();
  const underTexMasked = await sharp(underTexRaw)
    .joinChannel(logoAlpha)
    .png()
    .toBuffer();

  return sharp(baseBuffer)
    .composite([
      { input: logoBuf, left, top },
      { input: underTexMasked, left, top, blend: "multiply" },
    ])
    .png()
    .toBuffer();
}

// 1. Hero Desktop composite -> 3840x2160
{
  const p = PLACEMENTS["hero-desktop"];
  let buf = await fs.readFile(path.join(ROOT, p.source));
  const meta = await sharp(buf).metadata();
  buf = await cleanHeroHatCircle(buf);
  buf = await applyPlacement(buf, meta.width, meta.height, p.hat, { sceneBrightness: 0.95 });
  buf = await applyPlacement(buf, meta.width, meta.height, p.chest, { sceneBrightness: 0.88 });
  await sharp(buf).resize(p.masterDimensions.width, p.masterDimensions.height, { fit: "cover" }).png().toFile(path.join(ROOT, p.output));
  console.log(`Composited ${p.output}`);
}

// 2. Hero Mobile composite -> 2250x3000
{
  const p = PLACEMENTS["hero-mobile"];
  let buf = await fs.readFile(path.join(ROOT, p.source));
  const meta = await sharp(buf).metadata();
  buf = await applyPlacement(buf, meta.width, meta.height, p.hat, { sceneBrightness: 0.95 });
  buf = await applyPlacement(buf, meta.width, meta.height, p.chest, { sceneBrightness: 0.88 });
  await sharp(buf).resize(p.masterDimensions.width, p.masterDimensions.height, { fit: "cover" }).png().toFile(path.join(ROOT, p.output));
  console.log(`Composited ${p.output}`);
}

// 3. About Engineer composite -> 2400x3000
{
  const p = PLACEMENTS["about-engineer"];
  let buf = await fs.readFile(path.join(ROOT, p.source));
  const meta = await sharp(buf).metadata();
  buf = await applyPlacement(buf, meta.width, meta.height, p.hat, { sceneBrightness: 0.96 });
  buf = await applyPlacement(buf, meta.width, meta.height, p.chest, { sceneBrightness: 0.88 });
  await sharp(buf).resize(p.masterDimensions.width, p.masterDimensions.height, { fit: "cover" }).png().toFile(path.join(ROOT, p.output));
  console.log(`Composited ${p.output}`);
}

// 4. About Tank master -> 2400x1800
await sharp(path.join(ROOT, "masters/about-tank.png"))
  .resize(2400, 1800, { fit: "cover", position: "centre" })
  .png()
  .toFile(path.join(ROOT, "masters/about-tank-master.png"));
console.log("Prepared masters/about-tank-master.png");

// 5. Neutral navy placeholders for the 10 remaining quota-blocked images (unique architectural geometry & tones, zero text)
const placeholders = [
  { name: "mission-team", w: 3840, h: 2160, cx: "22%", cy: "28%", bx: 0.14, by: 0.22, rot: 12, c1: "#0B1E36", c2: "#163B66" },
  { name: "careers-banner", w: 3840, h: 2160, cx: "78%", cy: "68%", bx: 0.72, by: 0.54, rot: -18, c1: "#0D223D", c2: "#1B4473" },
  { name: "qhse-banner-mobile", w: 2400, h: 3000, cx: "32%", cy: "76%", bx: 0.24, by: 0.65, rot: 28, c1: "#0A1B31", c2: "#183E6B" },
  { name: "service-oilfield", w: 2400, h: 1800, cx: "82%", cy: "22%", bx: 0.58, by: 0.16, rot: -32, c1: "#0B1E36", c2: "#1A4675" },
  { name: "service-wireline-testing", w: 2400, h: 1800, cx: "16%", cy: "78%", bx: 0.18, by: 0.72, rot: 45, c1: "#0C213B", c2: "#1E4B7C" },
  { name: "service-drilling-engineering", w: 2400, h: 1800, cx: "54%", cy: "20%", bx: 0.42, by: 0.28, rot: -8, c1: "#0B1E36", c2: "#14375F" },
  { name: "service-pressure-pumping", w: 2400, h: 1800, cx: "26%", cy: "46%", bx: 0.68, by: 0.34, rot: 62, c1: "#0E2440", c2: "#1F5085" },
  { name: "service-integrated", w: 2400, h: 1800, cx: "74%", cy: "82%", bx: 0.28, by: 0.44, rot: -48, c1: "#0B1E36", c2: "#153B68" },
  { name: "service-fpso-vessel", w: 2400, h: 1800, cx: "46%", cy: "78%", bx: 0.76, by: 0.76, rot: 19, c1: "#091A30", c2: "#174270" },
  { name: "service-power", w: 2400, h: 1800, cx: "62%", cy: "48%", bx: 0.12, by: 0.38, rot: -66, c1: "#0C203A", c2: "#21538A" },
];

for (const ph of placeholders) {
  const rx = Math.round(ph.w * ph.bx);
  const ry = Math.round(ph.h * ph.by);
  const bw = Math.round(ph.w * 0.26);
  const bh = Math.round(ph.h * 0.32);
  const svg = Buffer.from(
    `<svg width="${ph.w}" height="${ph.h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rg" cx="${ph.cx}" cy="${ph.cy}" r="68%">
          <stop offset="0%" stop-color="${ph.c2}"/>
          <stop offset="100%" stop-color="${ph.c1}"/>
        </radialGradient>
      </defs>
      <rect width="${ph.w}" height="${ph.h}" fill="url(#rg)"/>
      <g transform="rotate(${ph.rot} ${rx} ${ry})">
        <rect x="${rx - bw / 2}" y="${ry - bh / 2}" width="${bw}" height="${bh}" fill="#234F82" fill-opacity="0.34"/>
        <circle cx="${Math.round(ph.w * 0.85 - rx * 0.5)}" cy="${Math.round(ph.h * 0.85 - ry * 0.5)}" r="${Math.round(ph.h * 0.14)}" fill="#F69E28" fill-opacity="0.09"/>
      </g>
    </svg>`
  );
  await sharp(svg).png().toFile(path.join(ROOT, `masters/${ph.name}.png`));
}
console.log("Generated 10 neutral navy placeholders in masters/");
