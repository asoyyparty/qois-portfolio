const fs = require('fs');

const logPath = 'C:/Users/GUDANG/.gemini/antigravity-ide/brain/a82f1b69-70d9-4c73-a954-0c28b29c2d30/.system_generated/logs/transcript_full.jsonl';
const content = fs.readFileSync(logPath, 'utf8');

// find all occurrences of dicoding.com/certificates/
const matches = content.match(/dicoding\.com\\%2Fcertificates\\%2F([A-Z0-9]+)|dicoding\.com\/certificates\/([A-Z0-9]+)/g) || [];
console.log("All Dicoding Certificate URLs found:", [...new Set(matches)]);

// Find all certificate name paragraphs
const pRegex = /<p [^>]*>([^<]+)<\/p>/g;
let m;
const pTexts = [];
while ((m = pRegex.exec(content)) !== null) {
  const text = m[1].replace(/\\n/g, '').trim();
  if (text.length > 3 && !text.includes('{') && !text.includes('var(')) {
    pTexts.push(text);
  }
}

fs.writeFileSync('c:/IT/porto/qois-portfolio/parsed_texts.txt', pTexts.join('\n'));
console.log("Saved", pTexts.length, "paragraphs to parsed_texts.txt");
