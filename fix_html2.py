import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the loader text visible for FCP
old_loader = '<div class="loader-spinner"></div>'
new_loader = '<div class="loader-spinner"></div><div style="margin-top: 20px; font-family: sans-serif; color: #1e3a8a; font-weight: bold;">جاري التحميل...</div>'

content = content.replace(old_loader, new_loader)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
