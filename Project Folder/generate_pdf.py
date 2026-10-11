import http.server
import socketserver
import threading
import subprocess
import os

PORT = 8130

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = socketserver.TCPServer(('127.0.0.1', PORT), QuietHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()

out_pdf = os.path.abspath("CLEAR_Case_Study.pdf")
chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

cmd = [
    chrome_exe,
    "--headless=new",
    "--disable-gpu",
    f"--print-to-pdf={out_pdf}",
    "--no-pdf-header-footer",
    f"http://127.0.0.1:{PORT}/case-study.html"
]

res = subprocess.run(cmd, capture_output=True, text=True)
server.shutdown()

if os.path.exists(out_pdf):
    print(f"SUCCESS: Generated {out_pdf} ({os.path.getsize(out_pdf)} bytes)")
else:
    print("FAILED to generate PDF.")
