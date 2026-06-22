const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

for (let i = 440; i < lines.length; i++) {
    // Skip the ModernStatItem component definition as it is the counter itself
    if (i >= 715 && i <= 766) {
        continue;
    }
    
    if (lines[i].includes('font-black')) {
        lines[i] = lines[i].replace(/font-black/g, 'font-bold');
    } else if (lines[i].includes('font-bold')) {
        lines[i] = lines[i].replace(/font-bold/g, 'font-semibold');
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Replacement done');
