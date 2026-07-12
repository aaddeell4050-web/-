const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

let target = `  .backdrop-blur-2xl, .backdrop-blur-xl, .backdrop-blur-md, .backdrop-blur-sm {
    backdrop-filter: blur(40px) !important;
    background-color: rgba(255, 255, 255, 0.8) !important;
  }`;

code = code.replace(target, '');
fs.writeFileSync('src/index.css', code, 'utf8');
console.log("Success");
