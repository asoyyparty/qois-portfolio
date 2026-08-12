const fs = require('fs');

const logPath = 'C:/Users/GUDANG/.gemini/antigravity-ide/brain/a82f1b69-70d9-4c73-a954-0c28b29c2d30/.system_generated/logs/transcript_full.jsonl';
const logText = fs.readFileSync(logPath, 'utf8');

// Find all dicoding certificate links
const certUrlRegex = /https%3A%2F%2Fwww%2Edicoding%2Ecom%2Fcertificates%2F([A-Z0-9]+)|https:\/\/www\.dicoding\.com\/certificates\/([A-Z0-9]+)/g;

let match;
const certsFound = [];

// Also find titles and credential IDs
const titleRegex = /Show credential for ([^"\<\>]+)/g;
while ((match = titleRegex.exec(logText)) !== null) {
  certsFound.push(match[1]);
}

console.log("=== CERTIFICATE TITLES FOUND ===");
console.log([...new Set(certsFound)]);

const linkRegex = /dicoding\.com%2Fcertificates%2F([A-Z0-9]+)/g;
const links = [];
while ((match = linkRegex.exec(logText)) !== null) {
  links.push(match[1]);
}
console.log("=== CREDENTIAL IDS FOUND ===");
console.log([...new Set(links)]);
