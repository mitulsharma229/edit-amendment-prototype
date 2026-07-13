// Minimal pure-Node static file server for dist/ (no native binaries).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('./dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const port = process.env.PORT ? Number(process.env.PORT) : 5180;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = normalize(join(root, urlPath));
    if (!filePath.startsWith(normalize(root))) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    let data;
    try {
      data = await readFile(filePath);
    } catch {
      // SPA fallback
      data = await readFile(join(root, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(data);
      return;
    }
    res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' }).end(data);
  } catch (err) {
    res.writeHead(500).end('Server error: ' + err.message);
  }
});

server.listen(port, () => {
  console.log(`Serving dist/ at http://localhost:${port}/`);
});
