import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def extract_component(name, imports, exports=""):
    pattern = r'function ' + name + r'\b.*?\n\}'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        comp = match.group(0)
        with open(f'src/components/{name}.tsx', 'w', encoding='utf-8') as f:
            f.write(imports + '\n' + exports + '\nexport default ' + comp)
        return True
    return False

extract_component('TestimonialsCarousel', 
"import React, { useState, useEffect } from 'react';\nimport useEmblaCarousel from 'embla-carousel-react';\nimport { FaStar, FaQuoteRight } from 'react-icons/fa';")

