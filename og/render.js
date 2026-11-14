// Maakt og-image.png (1200×630) uit og/og.html. Gebruik: npm run build:og
const path = require('path');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(__dirname, 'og.html')).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(__dirname, '..', 'og-image.png') });
  await browser.close();
  console.log('og-image.png gemaakt');
})();
