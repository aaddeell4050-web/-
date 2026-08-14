const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Find the CSS file injected by Vite
const cssLinkRegex = /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/;
const match = html.match(cssLinkRegex);

if (match) {
  const cssFileName = match[1];
  
  // Make the CSS non-blocking
  const nonBlockingLink = `<link rel="preload" as="style" href="${cssFileName}">\n<link rel="stylesheet" href="${cssFileName}" media="print" onload="this.media='all'">\n<noscript><link rel="stylesheet" href="${cssFileName}"></noscript>`;
  html = html.replace(match[0], nonBlockingLink);
  
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`Made ${cssFileName} non-blocking in index.html`);
} else {
  // If already modified or not found
  console.log('No standard CSS link found to make non-blocking.');
}
