const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure "عادل السداد" in header has font-[800]
content = content.replace(/<span className="text-lg md:text-2xl (font-[^ ]+) tracking-tight/g, '<span className="text-lg md:text-2xl font-[800] tracking-tight');

// Ensure "عادل السداد - حلولك المالية بين يديك" has font-[800]
content = content.replace(/<h1 className="text-3xl md:text-5xl lg:text-6xl (font-[^ ]+) text-slate-900/g, '<h1 className="text-3xl md:text-5xl lg:text-6xl font-[800] text-slate-900');

// Ensure all "تواصل عبر الواتساب" and "اتصل بنا" buttons have font-[800]
// Footer whatsapp:
content = content.replace(/className="text-xl (font-[^ ]+) text-green-600 block hover:text-green-700/g, 'className="text-xl font-[800] text-green-600 block hover:text-green-700');

// Footer call:
content = content.replace(/className="text-2xl (font-[^ ]+) block hover:text-blue-200/g, 'className="text-2xl font-[800] block hover:text-blue-200');

// CTA Buttons in hero and CTA section
content = content.replace(/className="relative overflow-hidden bg-white text-blue-900 px-6 py-3 rounded-lg (font-[^ ]+) text-base/g, 'className="relative overflow-hidden bg-white text-blue-900 px-6 py-3 rounded-lg font-[800] text-base');
content = content.replace(/className="bg-blue-800 text-white border-2 border-white px-6 py-3 rounded-lg (font-[^ ]+) text-base/g, 'className="bg-blue-800 text-white border-2 border-white px-6 py-3 rounded-lg font-[800] text-base');

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
