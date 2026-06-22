const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace font-black with font-medium in the first two CTA buttons
code = code.replace(
  'rounded-lg font-black text-base hover:from-green-800 hover:to-green-600 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-200"',
  'rounded-lg font-medium text-base hover:from-green-800 hover:to-green-600 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-200"'
);

code = code.replace(
  'rounded-lg font-black text-base hover:bg-blue-700 hover:border-blue-700 active:bg-blue-700 active:border-blue-700 hover:text-white active:text-white transition-colors flex items-center justify-center gap-3"',
  'rounded-lg font-medium text-base hover:bg-blue-700 hover:border-blue-700 active:bg-blue-700 active:border-blue-700 hover:text-white active:text-white transition-colors flex items-center justify-center gap-3"'
);

// Replace font-normal with font-medium in the bottom CTA buttons
code = code.replace(
  'rounded-lg font-normal text-base hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 shadow-lg"',
  'rounded-lg font-medium text-base hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 shadow-lg"'
);

code = code.replace(
  'rounded-lg font-normal text-base hover:bg-blue-950 transition-colors flex items-center justify-center gap-3 shadow-lg"',
  'rounded-lg font-medium text-base hover:bg-blue-950 transition-colors flex items-center justify-center gap-3 shadow-lg"'
);

fs.writeFileSync('src/App.tsx', code);
