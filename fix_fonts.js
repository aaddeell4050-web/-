const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. "عادل السداد" above (Header logo text) -> 800
content = content.replace(/className="text-lg md:text-2xl font-bold/g, 'className="text-lg md:text-2xl font-[800]');

// 2. "عادل السداد - حلولك المالية بين يديك" -> 800
content = content.replace(/className="text-3xl md:text-5xl lg:text-6xl font-bold/g, 'className="text-3xl md:text-5xl lg:text-6xl font-[800]');

// 3. "تواصل عبر الواتساب" -> 800 (There are a few WhatsApp buttons)
content = content.replace(/className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-500 text-white px-8 py-4 rounded-xl font-bold/g, 'className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-500 text-white px-8 py-4 rounded-xl font-[800]');

content = content.replace(/className="relative overflow-hidden bg-white text-blue-900 px-6 py-3 rounded-lg font-medium/g, 'className="relative overflow-hidden bg-white text-blue-900 px-6 py-3 rounded-lg font-[800]');

// 4. "جميع النصوص في الموقع العناوين 700 والشرح 500"
// Let's replace headings (h1, h2, h3, h4) font weights to font-bold (which is 700)
content = content.replace(/<h([1-6])[^>]*className="([^"]*?)\bfont-(medium|normal|semibold|black|extrabold)\b([^"]*)"/g, '<h$1 className="$2font-bold$4"');
content = content.replace(/<h([1-6])[^>]*className="([^"]*?)\bfont-\[.*?\]([^"]*)"/g, '<h$1 className="$2font-bold$3"');

// Description (p, span, div) that act as descriptions. 
// We will replace font-normal with font-medium (500)
content = content.replace(/font-normal/g, 'font-medium');

// And if there are text-slate-600 or text-slate-700 without font weight, we might want to add font-medium.
// Actually, Tailwind defaults to 400. If he wants descriptions to be 500, we can just set the base font in the body to 500, or add font-medium to paragraphs.
// Let's add font-medium to paragraphs if they don't have a font weight.
content = content.replace(/<p className="([^"]*?)"/g, (match, classes) => {
    if (!classes.includes('font-')) {
        return `<p className="${classes} font-medium"`;
    }
    return match;
});

// For any other text that is slate-600 or slate-700 (which are usually descriptions), let's ensure font-medium.
content = content.replace(/className="([^"]*text-slate-600[^"]*)"/g, (match, classes) => {
    if (!classes.includes('font-')) {
        return `className="${classes} font-medium"`;
    }
    return match;
});

fs.writeFileSync('src/App.tsx', content);
console.log('Fonts updated successfully');
