const fs = require('fs');
const zlib = require('zlib');

const path = 'C:/Users/GUDANG/.gemini/antigravity-ide/brain/a82f1b69-70d9-4c73-a954-0c28b29c2d30/.tempmediaStorage/media_a82f1b69-70d9-4c73-a954-0c28b29c2d30_1786433531215.pdf';
const buf = fs.readFileSync(path);

// Find stream blocks
const str = buf.toString('latin1');
const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
let match;
let count = 0;

while ((match = streamRegex.exec(str)) !== null) {
  count++;
  try {
    const streamData = Buffer.from(match[1], 'latin1');
    const decompressed = zlib.inflateSync(streamData).toString('utf8');
    // Extract readable text in parentheses Tj or TJ
    const tjMatches = decompressed.match(/\((.*?)\)/g);
    if (tjMatches) {
      const text = tjMatches.map(t => t.slice(1, -1)).join(' ');
      if (text.trim()) {
        console.log(`--- Stream ${count} ---`);
        console.log(text);
      }
    }
  } catch (e) {
    // Ignore uncompressed or non-flate streams
  }
}
