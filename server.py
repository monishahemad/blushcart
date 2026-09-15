"""Small zero-dependency development server for the Alfaaz prototype."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os


class AppHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/health":
            payload = b'{"status":"ok","app":"alfaaz"}'
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()


if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "5000"))
    print(f"Alfaaz is ready at http://localhost:{port}")
    ThreadingHTTPServer((host, port), AppHandler).serve_forever()
