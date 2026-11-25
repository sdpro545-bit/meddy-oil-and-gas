import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { createWorker } from "tesseract.js";

const ROOT = path.resolve(".");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const SRC_DIR = path.join(ROOT, "src");

const FORBIDDEN_OCR = ["MEDDY", "GLOBAL", "SOLUTIONS", "LTD", "OILRIG", "4,20"];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function budgetFor(filename) {
  if (filename.startsWith("hero-")) return 260 * 1024;
  if (filename.includes("-banner-") || filename.startsWith("mission-team")) return 200 * 1024;
  return 150 * 1024;
}

async function dHash(filePath) {
  const { data } = await sharp(filePath)
    .grayscale()
    .resize(9, 8, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bits = "";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      bits += data[y * 9 + x] < data[y * 9 + x + 1] ? "1" : "0";
    }
  }
  return bits;
}

function hamming(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

async function main() {
  const errors = [];
  const imageFiles = (await fs.readdir(IMAGES_DIR)).filter((f) => /\.(avif|webp|png|jpe?g)$/i.test(f));
  const srcFiles = (await walk(SRC_DIR)).filter((f) => !f.endsWith("placeholders.json"));
  const srcContents = await Promise.all(srcFiles.map((f) => fs.readFile(f, "utf8")));
  const joinedSrc = srcContents.join("\n");

  // 1. Check every file in public/images/ is referenced in src (by filename, /images/ path, PictureImage stem, or service baseStem+variant)
  for (const file of imageFiles) {
    const stemMatch = file.replace(/-\d+\.(avif|webp)$/, "").replace(/\.(avif|webp|png|jpe?g)$/, "");
    const variantMatch = stemMatch.match(/^(.+)-(hero|preview|thumb)$/);
    const referenced =
      joinedSrc.includes(file) ||
      joinedSrc.includes(`/images/${stemMatch}`) ||
      joinedSrc.includes(`"${stemMatch}"`) ||
      joinedSrc.includes(`'${stemMatch}'`) ||
      Boolean(
        variantMatch &&
          (joinedSrc.includes(`"${variantMatch[1]}"`) || joinedSrc.includes(`'${variantMatch[1]}'`)) &&
          joinedSrc.includes(`-${variantMatch[2]}`)
      );
    if (!referenced) {
      errors.push(`Unreferenced image in public/images/: ${file}`);
    }
  }

  // 2. Check every /images/... reference in src exists in public/images/
  const refMatches = joinedSrc.match(/\/images\/[a-zA-Z0-9_.-]+/g) || [];
  const uniqueRefs = [...new Set(refMatches)];
  for (const ref of uniqueRefs) {
    const full = path.join(ROOT, "public", ref);
    try {
      await fs.access(full);
    } catch {
      errors.push(`Missing referenced image: ${ref}`);
    }
  }

  // 3. Budget check
  for (const file of imageFiles) {
    const stat = await fs.stat(path.join(IMAGES_DIR, file));
    const max = budgetFor(file);
    if (stat.size > max) {
      errors.push(`Budget exceeded (${Math.round(stat.size / 1024)} KB > ${Math.round(max / 1024)} KB): ${file}`);
    }
  }

  // 4. Perceptual hash duplicate check across representative largest WebP per asset stem
  const groups = new Map();
  for (const file of imageFiles) {
    if (!file.endsWith(".webp")) continue;
    const stem = file.replace(/-\d+\.webp$/, "").replace(/-(preview|hero|thumb)\.webp$/, "");
    if (!groups.has(stem)) groups.set(stem, []);
    groups.get(stem).push(file);
  }
  const repFiles = [];
  for (const [stem, list] of groups.entries()) {
    list.sort((a, b) => b.localeCompare(a));
    repFiles.push({ stem, file: list[0] });
  }

  const hashes = [];
  for (const rep of repFiles) {
    const h = await dHash(path.join(IMAGES_DIR, rep.file));
    for (const prev of hashes) {
      if (hamming(h, prev.hash) <= 2) {
        errors.push(`Perceptually duplicate images: ${rep.file} and ${prev.file}`);
      }
    }
    hashes.push({ ...rep, hash: h });
  }

  // 5. OCR check across representative assets (filter low-confidence texture noise)
  const worker = await createWorker("eng");
  for (const rep of repFiles) {
    const pngBuf = await sharp(path.join(IMAGES_DIR, rep.file)).png().toBuffer();
    const { data } = await worker.recognize(pngBuf, {}, { blocks: true });
    const rawText = data.text || "";
    const upper = rawText.toUpperCase();
    const words = (data.blocks || [])
      .flatMap((b) => b.paragraphs || [])
      .flatMap((p) => p.lines || [])
      .flatMap((l) => l.words || []);
    const confidentWords = words
      .filter((w) => w.confidence >= 60 && /[A-Za-z0-9]{2,}/.test(w.text))
      .map((w) => w.text.trim());
    const confidentJoined = confidentWords.join(" ").replace(/[^A-Za-z0-9]/g, "");

    for (const bad of FORBIDDEN_OCR) {
      const matchedLow = words.some((w) => w.confidence >= 30 && w.text.toUpperCase().includes(bad));
      if (upper.includes(bad) && (matchedLow || confidentJoined.toUpperCase().includes(bad))) {
        errors.push(`Forbidden OCR string "${bad}" detected in ${rep.file}: ${JSON.stringify(confidentWords)}`);
      }
    }
    if (confidentJoined.length > 3) {
      errors.push(`Readable text (${confidentJoined.length} chars) detected in ${rep.file}: ${JSON.stringify(confidentWords)}`);
    }
  }
  await worker.terminate();

  if (errors.length > 0) {
    console.error("Image QA FAILED:");
    for (const e of errors) console.error(" -", e);
    process.exit(1);
  }

  console.log(`Image QA PASSED: ${imageFiles.length} files checked, 0 errors.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
