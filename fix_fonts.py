import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the font link
old_font = '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet" >'
new_font = '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet" media="print" onload="this.media=\'all\'">\n    <noscript><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet"></noscript>'

content = content.replace(old_font, new_font)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
