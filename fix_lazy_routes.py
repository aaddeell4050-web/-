import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Suspense and lazy to react imports
content = re.sub(
    r"import React, { useState, useEffect, useRef, ReactNode, FormEvent, InputHTMLAttributes } from 'react';",
    "import React, { useState, useEffect, useRef, ReactNode, FormEvent, InputHTMLAttributes, Suspense, lazy } from 'react';",
    content
)

# Extract ServicesPage
services_page_match = re.search(r'function ServicesPage\(\) \{.*?\n\}', content, re.DOTALL)
if services_page_match:
    with open('src/pages/ServicesPage.tsx', 'w', encoding='utf-8') as f:
        f.write('import React, { useState } from "react";\n')
        f.write('import { DetailServiceCard } from "../components/Cards";\n\n')
        f.write('export default ' + services_page_match.group(0))

# We'll just lazy load them directly in App.tsx by keeping them in the same file?
# Actually, React.lazy requires a default export from a separate file.
