const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

text = text.replace(/<FaWhatsapp className="w-6 h-6 text-white" \/>/g, '<FaWhatsapp size={24} color="white" />');
text = text.replace(/<FaWhatsapp className="w-5 h-5 text-blue-900" \/>/g, '<FaWhatsapp size={20} color="#1e3a8a" />');
text = text.replace(/<FaWhatsapp className="w-5 h-5" \/>/g, '<FaWhatsapp size={20} />');

fs.writeFileSync('src/App.tsx', text);
