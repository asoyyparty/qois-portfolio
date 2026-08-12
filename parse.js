const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'C:/Users/GUDANG/.gemini/antigravity-ide/brain/a82f1b69-70d9-4c73-a954-0c28b29c2d30/.tempmediaStorage/media_a82f1b69-70d9-4c73-a954-0c28b29c2d30_1786433531215.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse({ data: new Uint8Array(dataBuffer) });
parser.getText().then(res => {
    console.log("=== EXTRACTED TEXT ===");
    console.log(res);
}).catch(err => {
    console.error("Failed:", err);
});

parser.getHyperlinks().then(links => {
    console.log("=== HYPERLINKS ===");
    console.log(links);
}).catch(err => console.log("No hyperlinks method"));
