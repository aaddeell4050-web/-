const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/text-xs font-medium uppercase/g, 'text-xs font-normal uppercase');
fs.writeFileSync('src/App.tsx', code);
