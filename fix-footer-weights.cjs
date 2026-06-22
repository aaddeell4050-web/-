const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/<span className="text-xl font-bold text-white tracking-tight">/g, '<span className="text-xl font-medium text-white tracking-tight">');
code = code.replace(/<h4 className="text-white font-bold mb-6">/g, '<h4 className="text-white font-medium mb-6">');
code = code.replace(/<div className="flex flex-col gap-3 font-light text-sm text-slate-300">/g, '<div className="flex flex-col gap-3 font-normal text-sm text-slate-300">');
fs.writeFileSync('src/App.tsx', code);
