// Render the built report (dist/) to an A4 PDF with headless Chromium.
//
//   npm run pdf                      → validisory-report.pdf
//   node scripts/export-pdf.mjs out.pdf
//
// Set CHROMIUM_PATH to use a specific Chromium binary; otherwise the
// playwright-core managed browser is used.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright-core';

const root = resolve(import.meta.dirname, '..', 'dist');
const out = resolve(process.argv[2] ?? 'validisory-report.pdf');

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Module scripts don't load from file://, so serve dist/ on an ephemeral port.
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const file = join(root, path === '/' ? 'index.html' : path);
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('section.page');
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: out,
    preferCSSPageSize: true, // @page { size: A4; margin: 0 }
    printBackground: true,
    tagged: true, // accessible structure
    outline: true, // PDF bookmarks from page headings
  });
  console.log(`PDF written to ${out}`);
} finally {
  await browser.close();
  server.close();
}
