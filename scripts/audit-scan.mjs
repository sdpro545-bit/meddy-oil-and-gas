import fs from "fs";
import path from "path";

const bannedWords = [
  "seamless", "elevate", "unlock", "unleash", "empower", "leverage", "harness",
  "streamline", "robust", "cutting edge", "state of the art", "next level",
  "game changing", "revolutionize", "journey", "holistic", "synergy",
  "world class", "best in class", "effortless", "supercharge"
];

const bannedPatterns = [
  { name: "em-dash", regex: /—/g },
  { name: "en-dash", regex: /–/g },
  { name: "spaced-hyphen", regex: /\s-\s/g },
  { name: "backdrop-blur", regex: /backdrop-blur/g },
  { name: "apple-glow", regex: /apple-glow/g }
];

function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      scanDir(full);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(f.name)) {
      const content = fs.readFileSync(full, "utf8");
      bannedWords.forEach(w => {
        const regex = new RegExp(`\\b${w}\\w*\\b`, "gi");
        let m;
        while ((m = regex.exec(content)) !== null) {
          // get line number
          const line = content.substring(0, m.index).split("\n").length;
          console.log(`BANNED WORD [${m[0]}] in ${full}:${line}`);
        }
      });
      bannedPatterns.forEach(p => {
        let m;
        while ((m = p.regex.exec(content)) !== null) {
          const line = content.substring(0, m.index).split("\n").length;
          console.log(`BANNED PATTERN [${p.name}] in ${full}:${line}`);
        }
      });
    }
  }
}

scanDir("c:/Users/user/Documents/0001 Web Design Project/Meddy Oil and Gas/src");
console.log("Scan finished.");
