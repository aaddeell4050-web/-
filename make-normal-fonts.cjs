const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

for (let i = 440; i < lines.length; i++) {
    // Skip the ModernStatItem component definition as it is the counter itself
    if (i >= 715 && i <= 766) {
        continue;
    }
    
    // Lighten the weights to font-normal (400)
    lines[i] = lines[i].replace(/font-(black|extrabold|bold|semibold|medium)/g, 'font-normal');
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Normal conversion done');
