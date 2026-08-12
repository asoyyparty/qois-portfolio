const fs = require('fs');

const logPath = 'C:/Users/GUDANG/.gemini/antigravity-ide/brain/a82f1b69-70d9-4c73-a954-0c28b29c2d30/.system_generated/logs/transcript_full.jsonl';
const content = fs.readFileSync(logPath, 'utf8');

const regex = /Show credential for ([^"<&]+)/g;
let m;
const titles = new Set();
while ((m = regex.exec(content)) !== null) {
  titles.add(m[1].trim());
}

console.log("=== CERTIFICATE TITLES (" + titles.size + ") ===");
console.log(Array.from(titles));

const idRegex = /Credential ID ([A-Z0-9]+)/g;
const ids = new Set();
while ((m = idRegex.exec(content)) !== null) {
  ids.add(m[1].trim());
}

console.log("=== CREDENTIAL IDS (" + ids.size + ") ===");
console.log(Array.from(ids));
