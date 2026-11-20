import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const projectDir = "c:/Users/user/Documents/0001 Web Design Project/Meddy Oil and Gas";
const stageDir = "c:/Users/user/Documents/0001 Web Design Project/staging_zip";
const zipOutput = "c:/Users/user/Documents/0001 Web Design Project/Meddy_Oil_and_Gas_Website.zip";

if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

const excludeDirs = new Set([".git", ".next", "node_modules", ".vercel"]);

function copyClean(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (excludeDirs.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyClean(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Staging clean project files...");
copyClean(projectDir, stageDir);

console.log("Compressing to zip...");
if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

execSync(`powershell -Command "Compress-Archive -Path '${stageDir}/*' -DestinationPath '${zipOutput}' -CompressionLevel Optimal"`, { stdio: "inherit" });

console.log("Cleaning staging directory...");
fs.rmSync(stageDir, { recursive: true, force: true });

const stat = fs.statSync(zipOutput);
console.log(`Successfully generated ${zipOutput} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
