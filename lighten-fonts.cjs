const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

for (let i = 440; i < lines.length; i++) {
    // Skip the ModernStatItem component definition as it is the counter itself
    if (i >= 715 && i <= 766) {
        continue;
    }
    
    // Lighten the weights:
    // If it's font-black (900), let's change it to font-bold (700) or font-medium (500)
    // Actually let's just make font-black -> font-bold, font-bold -> font-medium
    if (lines[i].includes('font-black')) {
        lines[i] = lines[i].replace(/font-black/g, 'font-bold');
    } else if (lines[i].includes('font-bold')) {
        lines[i] = lines[i].replace(/font-bold/g, 'font-medium');
    } else if (lines[i].includes('font-semibold')) {
        lines[i] = lines[i].replace(/font-semibold/g, 'font-medium');
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Lighten done');
