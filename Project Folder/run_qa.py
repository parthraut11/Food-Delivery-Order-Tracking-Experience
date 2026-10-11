import http.server
import socketserver
import threading
import subprocess
import re
import os

PORT = 8090

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = socketserver.TCPServer(('127.0.0.1', PORT), QuietHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()

cmd = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '--headless=new',
    '--disable-gpu',
    '--dump-dom',
    f'http://127.0.0.1:{PORT}/test-suite.html'
]

res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
dom = res.stdout

failed_entries = re.findall(r'<div class="test-entry failed">[\s\S]*?<div class="test-name">([^<]+)</div>[\s\S]*?<span class="test-status-pill status-fail-pill">[\s\S]*?</span>', dom)

print(f"Total failed tests: {len(failed_entries)}")
for name in failed_entries:
    print(f"FAILED TEST: {name.strip()}")

server.shutdown()
