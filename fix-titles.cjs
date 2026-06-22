const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');
for (let i = 440; i < lines.length; i++) {
  if (/<h[1-6]/.test(lines[i])) {
    lines[i] = lines[i].replace(/font-normal/g, 'font-medium');
  }
}
fs.writeFileSync('src/App.tsx', lines.join('\n'));
