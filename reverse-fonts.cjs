const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

for (let i = 440; i < lines.length; i++) {
    // Skip the ModernStatItem component definition as it is the counter itself
    if (i >= 715 && i <= 766) {
        continue;
    }
    
    // Reverse logic:
    if (lines[i].includes('font-bold')) {
        lines[i] = lines[i].replace(/font-bold/g, 'font-black');
    } else if (lines[i].includes('font-semibold')) {
        lines[i] = lines[i].replace(/font-semibold/g, 'font-bold');
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Reverse done');
