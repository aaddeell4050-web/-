const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"');
fs.writeFileSync('src/App.tsx', code);
