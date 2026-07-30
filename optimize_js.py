import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's remove the framer-motion delay in the Hero section
content = re.sub(r'delay: [0-9.]+,?\s*', '', content)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
