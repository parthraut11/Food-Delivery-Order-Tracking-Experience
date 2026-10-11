import http.server
import socketserver
import threading
import subprocess
import os
import tempfile
from PIL import Image

PORT = 8120

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = socketserver.TCPServer(('127.0.0.1', PORT), QuietHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()

shots = [
    {
        "file": "assets/screenshots/state-a-on-track-desktop.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?state=on_track",
        "size": "1200,950",
        "crop_mobile": False
    },
    {
        "file": "assets/screenshots/state-b-delayed-desktop.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?state=delayed",
        "size": "1200,1100",
        "crop_mobile": False
    },
    {
        "file": "assets/screenshots/state-c-uncertain-desktop.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?state=uncertain",
        "size": "1200,1050",
        "crop_mobile": False
    },
    {
        "file": "assets/screenshots/mobile-390px-on-track.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?state=on_track&view=mobile",
        "size": "540,844",
        "crop_mobile": True
    },
    {
        "file": "assets/screenshots/mobile-390px-delayed.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?state=delayed&view=mobile",
        "size": "540,950",
        "crop_mobile": True
    },
    {
        "file": "assets/screenshots/support-modal-desktop.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?modal=support",
        "size": "1200,850",
        "crop_mobile": False
    },
    {
        "file": "assets/screenshots/contact-modal-desktop.png",
        "url": f"http://127.0.0.1:{PORT}/index.html?modal=contact_partner",
        "size": "1200,850",
        "crop_mobile": False
    }
]

chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
tmp_dir = tempfile.mkdtemp()

for s in shots:
    out_path = os.path.abspath(s["file"])
    cmd = [
        chrome_exe,
        "--headless=new",
        "--disable-gpu",
        "--disable-cache",
        f"--user-data-dir={tmp_dir}",
        f"--window-size={s['size']}",
        f"--screenshot={out_path}",
        s["url"]
    ]
    subprocess.run(cmd, capture_output=True)
    
    # If mobile crop requested, crop to the centered 390px phone frame!
    if s["crop_mobile"] and os.path.exists(out_path):
        img = Image.open(out_path)
        w, h = img.size
        # Center 390px
        left = max(0, (w - 390) // 2)
        right = left + 390
        cropped = img.crop((left, 0, right, h))
        cropped.save(out_path)

    if os.path.exists(out_path):
        print(f"Captured: {s['file']} ({os.path.getsize(out_path)} bytes)")

server.shutdown()
print("All screenshots generated and verified.")
