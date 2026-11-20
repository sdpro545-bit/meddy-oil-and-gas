import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const dir = path.resolve("c:/Users/user/Documents/0001 Web Design Project/Meddy Oil and Gas/qa/verification");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const tests = [
  { name: "home-desktop.png", url: "http://localhost:3000/?skip_intro=1", w: 1440, h: 900 },
  { name: "home-mobile.png", url: "http://localhost:3000/?skip_intro=1", w: 390, h: 844 },
  { name: "about-desktop.png", url: "http://localhost:3000/about", w: 1440, h: 900 },
  { name: "services-desktop.png", url: "http://localhost:3000/services", w: 1440, h: 900 },
];

for (const item of tests) {
  const out = path.join(dir, item.name);
  const cmd = `"${chrome}" --headless=new --screenshot="${out}" --window-size=${item.w},${item.h} --virtual-time-budget=3000 "${item.url}"`;
  try {
    execSync(cmd, { stdio: "pipe" });
    if (fs.existsSync(out)) {
      console.log("Captured:", item.name, fs.statSync(out).size, "bytes");
    } else {
      console.log("Failed to produce:", item.name);
    }
  } catch (err) {
    console.error("Error capturing", item.name, err.message);
  }
}
