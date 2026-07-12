const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

let target1 = `    window.addEventListener('scroll', handleScroll);`;
let rep1 = `    window.addEventListener('scroll', handleScroll, { passive: true });`;

let target2 = `    return () => window.removeEventListener('scroll', handleScroll);`;
let rep2 = `    return () => window.removeEventListener('scroll', handleScroll);`; // wait, removeEventListener doesn't need passive in some environments, but let's just change addEventListener

let navTarget = `      {/* Navbar */}
      <nav 
        className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out h-20 flex items-center px-6 md:px-12 border-b \${
          scrolled ? 'bg-white/80 backdrop-blur-[40px] border-slate-200 shadow-sm' : 'bg-transparent border-transparent'
        }\`}
      >`;
let navRep = `      {/* Navbar */}
      <nav 
        className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out h-20 flex items-center px-6 md:px-12 border-b transform-gpu \${
          scrolled ? 'bg-white/80 backdrop-blur-[40px] border-slate-200 shadow-sm' : 'bg-transparent border-transparent'
        }\`}
        style={{ willChange: 'background-color, backdrop-filter' }}
      >`;

code = code.replace(target1, rep1);
if (code.includes(navTarget)) {
    code = code.replace(navTarget, navRep);
    fs.writeFileSync('src/App.tsx', code, 'utf8');
    console.log("Success");
} else {
    console.log("Nav Target not found");
}
