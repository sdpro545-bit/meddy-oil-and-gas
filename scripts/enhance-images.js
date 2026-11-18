const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const LOGO_PATH = path.join(ROOT, 'assets', 'logo', 'meddy-mark.png');
const LOGO_PATCH_PATH = path.join(ROOT, 'assets', 'logo', 'meddy-mark-on-white-patch.png');

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function createBrandBadge(width, height, divisionText, locationText = 'LAGOS, NIGERIA') {
  const logoSize = Math.round(height * 0.65);
  const logoBuf = await sharp(LOGO_PATH)
    .resize(logoSize, logoSize, { fit: 'contain' })
    .png()
    .toBuffer();
  const logoB64 = 'data:image/png;base64,' + logoBuf.toString('base64');
  const safeDivision = escapeXml(divisionText.toUpperCase());

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B1E36" stop-opacity="0.94"/>
          <stop offset="60%" stop-color="#102A47" stop-opacity="0.90"/>
          <stop offset="100%" stop-color="#164882" stop-opacity="0.86"/>
        </linearGradient>
        <linearGradient id="badgeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F69E28" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="#F9DD6F" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#7CC1D0" stop-opacity="0.5"/>
        </linearGradient>
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
      </defs>
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${Math.round(height * 0.28)}"
            fill="url(#badgeBg)" stroke="url(#badgeBorder)" stroke-width="1.5" filter="url(#badgeShadow)"/>
      <image href="${logoB64}" x="${Math.round(height * 0.18)}" y="${Math.round(height * 0.17)}" width="${logoSize}" height="${logoSize}" />
      <text x="${Math.round(height * 0.18 + logoSize + 14)}" y="${Math.round(height * 0.44)}"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-weight="800" font-size="${Math.round(height * 0.24)}" fill="#FFFFFF" letter-spacing="0.8">
        MEDDY OIL &amp; GAS
      </text>
      <text x="${Math.round(height * 0.18 + logoSize + 14)}" y="${Math.round(height * 0.72)}"
            font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            font-weight="700" font-size="${Math.round(height * 0.16)}" fill="#F69E28" letter-spacing="1.2">
        ${safeDivision}
      </text>
    </svg>
  `;
  return Buffer.from(svg);
}

async function createColorGradeOverlay(width, height) {
  // Brand color scheme:
  // Flame Gold #F9DD6F (249, 221, 111)
  // Orange #F69E28 (246, 158, 40)
  // Amber #FCB424 (252, 180, 36)
  // Deep Navy #0B1E36 (11, 30, 54), #164882 (22, 72, 130)
  // Teal #7CC1D0 (124, 193, 208)
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Warm golden sunset glow from top corner -->
        <radialGradient id="sunGlow" cx="80%" cy="15%" r="65%">
          <stop offset="0%" stop-color="#F9DD6F" stop-opacity="0.22"/>
          <stop offset="40%" stop-color="#F69E28" stop-opacity="0.14"/>
          <stop offset="70%" stop-color="#FCB424" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <!-- Deep navy shadow lift at bottom and edges -->
        <linearGradient id="navyShadows" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0B1E36" stop-opacity="0.05"/>
          <stop offset="60%" stop-color="#164882" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#0B1E36" stop-opacity="0.35"/>
        </linearGradient>
        <!-- Subtle teal tone for steel and ocean midtones -->
        <radialGradient id="tealMid" cx="20%" cy="70%" r="50%">
          <stop offset="0%" stop-color="#7CC1D0" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#0B1E36" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#sunGlow)"/>
      <rect width="${width}" height="${height}" fill="url(#tealMid)"/>
      <rect width="${width}" height="${height}" fill="url(#navyShadows)"/>
    </svg>
  `;
  return Buffer.from(svg);
}

async function createTechnicalStamp(width, text = 'FIELD VERIFIED • NIGERIA UPSTREAM') {
  const safeText = escapeXml(text);
  const svg = `
    <svg width="${width}" height="32" viewBox="0 0 ${width} 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="32" rx="16" fill="#0B1E36" fill-opacity="0.80" stroke="#F69E28" stroke-opacity="0.4" stroke-width="1"/>
      <circle cx="16" cy="16" r="4" fill="#F69E28"/>
      <text x="28" y="20" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#F9DD6F" letter-spacing="1.2">
        ${safeText}
      </text>
    </svg>
  `;
  return Buffer.from(svg);
}

const SERVICES = [
  {
    file: 'service-drilling.webp',
    division: 'Well Intervention & Drilling',
    stamp: 'DRILLING & WORKOVER • OFFSHORE NIGERIA',
  },
  {
    file: 'service-engineering.webp',
    division: 'EPC & Offshore Facilities',
    stamp: 'FACILITIES ENGINEERING • LEKKI HUB',
  },
  {
    file: 'service-marine.webp',
    division: 'Offshore Marine Logistics',
    stamp: 'VESSEL SUPPORT • GULF OF GUINEA',
  },
  {
    file: 'service-pipeline.webp',
    division: 'Pipeline Integrity & Maintenance',
    stamp: 'ASSET INTEGRITY • NIGER DELTA BASIN',
  },
  {
    file: 'service-procurement.webp',
    division: 'Equipment & Materials Supply',
    stamp: 'OEM PROCUREMENT • GLOBAL SUPPLY CHAIN',
  },
  {
    file: 'service-wireline.webp',
    division: 'Wireline & Well Testing',
    stamp: 'SLICKLINE & TESTING • PRESSURE ANALYSIS',
  },
];

async function processServiceImages() {
  for (const s of SERVICES) {
    const inputPath = path.join(IMAGES_DIR, s.file);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File ${s.file} does not exist, skipping.`);
      continue;
    }

    const meta = await sharp(inputPath).metadata();
    const w = meta.width;
    const h = meta.height;

    // Badge sizing tailored to aspect ratio
    const badgeW = Math.round(w * 0.46);
    const badgeH = Math.round(badgeW * 0.22);
    const badgeBuf = await createBrandBadge(badgeW, badgeH, s.division);
    const colorGradeBuf = await createColorGradeOverlay(w, h);
    const stampBuf = await createTechnicalStamp(Math.round(w * 0.44), s.stamp);

    // Apply color grading and brand badge composite
    const processed = await sharp(inputPath)
      .modulate({
        brightness: 1.02,
        saturation: 1.12,
      })
      .sharpen({
        sigma: 1.1,
        m1: 1.0,
        m2: 2.0,
      })
      .composite([
        {
          input: colorGradeBuf,
          blend: 'over',
        },
        {
          input: badgeBuf,
          top: Math.round(h * 0.04),
          left: Math.round(w - badgeW - w * 0.04),
          blend: 'over',
        },
        {
          input: stampBuf,
          top: Math.round(h - 32 - h * 0.04),
          left: Math.round(w * 0.04),
          blend: 'over',
        },
      ])
      .webp({ quality: 92, effort: 6 })
      .toBuffer();

    fs.writeFileSync(inputPath, processed);
    console.log(`✓ Enhanced and brand-correlated: ${s.file} (${w}x${h})`);
  }
}

async function processAboutTank() {
  const file = 'about-tank.webp';
  const inputPath = path.join(IMAGES_DIR, file);
  if (!fs.existsSync(inputPath)) return;

  const meta = await sharp(inputPath).metadata();
  const w = meta.width;
  const h = meta.height;

  // Branded terminal asset badge
  const badgeW = Math.round(w * 0.38);
  const badgeH = Math.round(badgeW * 0.22);
  const badgeBuf = await createBrandBadge(badgeW, badgeH, 'Terminal & Storage Logistics');
  const colorGradeBuf = await createColorGradeOverlay(w, h);
  const stampBuf = await createTechnicalStamp(Math.round(w * 0.32), 'STORAGE FACILITY • LAGOS, NIGERIA');

  const processed = await sharp(inputPath)
    .modulate({
      brightness: 1.04,
      saturation: 1.14,
    })
    .sharpen({
      sigma: 1.0,
    })
    .composite([
      { input: colorGradeBuf, blend: 'over' },
      {
        input: badgeBuf,
        top: Math.round(h * 0.06),
        left: Math.round(w - badgeW - w * 0.06),
        blend: 'over',
      },
      {
        input: stampBuf,
        top: Math.round(h - 32 - h * 0.06),
        left: Math.round(w * 0.06),
        blend: 'over',
      },
    ])
    .webp({ quality: 92, effort: 6 })
    .toBuffer();

  fs.writeFileSync(inputPath, processed);
  console.log(`✓ Enhanced and brand-correlated: ${file} (${w}x${h})`);
}

async function processHeroAndAbout() {
  // hero-nigerian-engineer.png
  const heroPath = path.join(IMAGES_DIR, 'hero-nigerian-engineer.png');
  if (fs.existsSync(heroPath)) {
    const meta = await sharp(heroPath).metadata();
    const w = meta.width;
    const h = meta.height;
    const colorGradeBuf = await createColorGradeOverlay(w, h);

    const processed = await sharp(heroPath)
      .modulate({
        brightness: 1.03,
        saturation: 1.10,
      })
      .sharpen({ sigma: 0.9 })
      .composite([{ input: colorGradeBuf, blend: 'over' }])
      .png({ quality: 95, compressionLevel: 8 })
      .toBuffer();

    fs.writeFileSync(heroPath, processed);
    console.log(`✓ Enhanced and color-graded: hero-nigerian-engineer.png (${w}x${h})`);
  }

  // about-nigerian-engineer.png
  const aboutPath = path.join(IMAGES_DIR, 'about-nigerian-engineer.png');
  if (fs.existsSync(aboutPath)) {
    const meta = await sharp(aboutPath).metadata();
    const w = meta.width;
    const h = meta.height;
    const colorGradeBuf = await createColorGradeOverlay(w, h);

    const processed = await sharp(aboutPath)
      .modulate({
        brightness: 1.03,
        saturation: 1.12,
      })
      .sharpen({ sigma: 0.9 })
      .composite([{ input: colorGradeBuf, blend: 'over' }])
      .png({ quality: 95, compressionLevel: 8 })
      .toBuffer();

    fs.writeFileSync(aboutPath, processed);
    console.log(`✓ Enhanced and color-graded: about-nigerian-engineer.png (${w}x${h})`);
  }

  // qhse-toolbox-talk.png
  const qhsePath = path.join(IMAGES_DIR, 'qhse-toolbox-talk.png');
  if (fs.existsSync(qhsePath)) {
    const meta = await sharp(qhsePath).metadata();
    const w = meta.width;
    const h = meta.height;
    const colorGradeBuf = await createColorGradeOverlay(w, h);
    const stampBuf = await createTechnicalStamp(Math.round(w * 0.35), 'QHSE ZERO INCIDENT CULTURE • LEKKI');

    const processed = await sharp(qhsePath)
      .modulate({
        brightness: 1.03,
        saturation: 1.12,
      })
      .sharpen({ sigma: 0.9 })
      .composite([
        { input: colorGradeBuf, blend: 'over' },
        {
          input: stampBuf,
          top: Math.round(h - 32 - h * 0.05),
          left: Math.round(w * 0.05),
          blend: 'over',
        },
      ])
      .png({ quality: 95, compressionLevel: 8 })
      .toBuffer();

    fs.writeFileSync(qhsePath, processed);
    console.log(`✓ Enhanced and color-graded: qhse-toolbox-talk.png (${w}x${h})`);
  }
}

async function main() {
  console.log('Starting image regeneration and brand correlation pipeline...');
  await processServiceImages();
  await processAboutTank();
  await processHeroAndAbout();
  console.log('All website images successfully regenerated and brand-correlated!');
}

main().catch(err => {
  console.error('Pipeline error:', err);
  process.exit(1);
});
