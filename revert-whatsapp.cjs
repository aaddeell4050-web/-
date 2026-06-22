const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');
text = text.replace(/\{\/\* @ts-ignore \*\/}\n/g, '');
fs.writeFileSync('src/App.tsx', text);
