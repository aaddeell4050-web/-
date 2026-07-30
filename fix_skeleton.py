import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

skeleton = """<div id="root">
      <style>
        .initial-loader {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #f8fafc;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .loader-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #bfdbfe;
          border-top-color: #1e3a8a;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <div class="initial-loader">
        <div class="loader-spinner"></div>
      </div>
    </div>"""

content = content.replace('<div id="root"></div>', skeleton)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
