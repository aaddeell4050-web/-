const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Find the CSS file injected by Vite
const cssLinkRegex = /<link rel="stylesheet" crossorigin href="\/assets\/(index-[^"]+\.css)">/;
const match = html.match(cssLinkRegex);

if (match) {
  const cssFileName = match[1];
  const cssPath = path.join(__dirname, 'dist', 'assets', cssFileName);
  
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Replace the link tag with the inline style
    const styleTag = `<style>${cssContent}</style>`;
    html = html.replace(cssLinkRegex, styleTag);
    
    // Optionally delete the CSS file if it's not needed by anything else, but let's keep it safe
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`Successfully inlined ${cssFileName} into index.html`);
  } else {
    console.warn(`CSS file not found: ${cssPath}`);
  }
} else {
  console.log('No CSS link found to inline.');
}
