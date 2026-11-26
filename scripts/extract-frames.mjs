import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import ffprobePkg from "ffprobe-static";

const rootDir = process.cwd();
const videoPath = path.join(rootDir, "assets", "Meddy_Oil_Gas_brand_reveal_a16e9c74_1080p.mp4");
const framesDir = path.join(rootDir, "public", "frames");
const framesSmDir = path.join(rootDir, "public", "frames-sm");
const manifestPath = path.join(rootDir, "src", "lib", "frames-manifest.json");

const TARGET_MIN = 60;
const TARGET_MAX = 120;
const QUALITY = 75;

if (!fs.existsSync(videoPath)) {
  console.error(`Source video not found: ${videoPath}`);
  process.exit(1);
}

// 1. Inspect source video with ffprobe
const probeRaw = execFileSync(
  ffprobePkg.path,
  [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,r_frame_rate,nb_frames,duration",
    "-show_entries", "format=duration",
    "-of", "json",
    videoPath,
  ],
  { encoding: "utf8" }
);
const probe = JSON.parse(probeRaw);
const stream = probe.streams?.[0] ?? {};
const duration = parseFloat(stream.duration || probe.format?.duration || "0");
const [num, den] = (stream.r_frame_rate || "24/1").split("/").map(Number);
const srcFps = den ? num / den : 24;
const srcFrames = parseInt(stream.nb_frames || String(Math.round(duration * srcFps)), 10);

// Choose output fps so total frames stay within 60-120
let outFps = srcFps;
if (srcFrames > TARGET_MAX) {
  outFps = Math.max(1, (TARGET_MAX - 2) / duration);
} else if (srcFrames < TARGET_MIN && duration > 0) {
  outFps = TARGET_MIN / duration;
}

console.log(`Source: ${stream.width}x${stream.height}, ${srcFps.toFixed(2)} fps, ${duration.toFixed(2)}s, ${srcFrames} frames`);
console.log(`Extracting at ${outFps.toFixed(2)} fps (WebP q=${QUALITY})...`);

for (const dir of [framesDir, framesSmDir]) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

// 2. Extract desktop 1920px WebP frames
execFileSync(
  ffmpegPath,
  [
    "-y",
    "-i", videoPath,
    "-vf", `fps=${outFps},scale=1920:-2:flags=lanczos`,
    "-c:v", "libwebp",
    "-q:v", String(QUALITY),
    "-preset", "picture",
    "-an",
    path.join(framesDir, "frame_%04d.webp"),
  ],
  { stdio: "inherit" }
);

// 3. Extract mobile 960px WebP frames
execFileSync(
  ffmpegPath,
  [
    "-y",
    "-i", videoPath,
    "-vf", `fps=${outFps},scale=960:-2:flags=lanczos`,
    "-c:v", "libwebp",
    "-q:v", String(QUALITY),
    "-preset", "picture",
    "-an",
    path.join(framesSmDir, "frame_%04d.webp"),
  ],
  { stdio: "inherit" }
);

const desktopFiles = fs.readdirSync(framesDir).filter((f) => f.endsWith(".webp")).sort();
const mobileFiles = fs.readdirSync(framesSmDir).filter((f) => f.endsWith(".webp")).sort();
const maxDesktopKB = Math.max(...desktopFiles.map((f) => fs.statSync(path.join(framesDir, f)).size / 1024));
const maxMobileKB = Math.max(...mobileFiles.map((f) => fs.statSync(path.join(framesSmDir, f)).size / 1024));

const manifest = {
  frameCount: desktopFiles.length,
  width: 1920,
  height: 1080,
  fps: Number(outFps.toFixed(2)),
  duration: Number(duration.toFixed(3)),
  firstFrameBg: "#0064E4",
  lastFrameBg: "#F0EDDE",
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");

console.log(`Done: ${desktopFiles.length} desktop frames (max ${maxDesktopKB.toFixed(1)} KB), ${mobileFiles.length} mobile frames (max ${maxMobileKB.toFixed(1)} KB).`);
