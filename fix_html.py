import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace font links
old_fonts = """<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet"></noscript>"""

new_fonts = '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet" >'

content = content.replace(old_fonts, new_fonts)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
