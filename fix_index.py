import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the GTM loading logic
new_script = """
    <script>
      window.dataLayer = window.dataLayer || [];
      function loadGTM() {
        if (window.gtmLoaded) return;
        window.gtmLoaded = true;
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PFPF6DLC');
      }
      
      var events = ['touchstart', 'scroll', 'mousemove', 'keydown', 'click'];
      events.forEach(function(ev) {
        window.addEventListener(ev, loadGTM, { once: true, passive: true });
      });
    </script>
"""

content = re.sub(r'<script>\s*window\.dataLayer.*?</script>', new_script.strip(), content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
