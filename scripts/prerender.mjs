import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

console.log('🚀 [1/3] Building client production bundle...');
await build({
  root,
  configFile: path.join(root, 'vite.config.ts'),
});

try {
  console.log('⚡ [2/3] Building SSR pre-rendering bundle...');
  await build({
    root,
    configFile: path.join(root, 'vite.config.ts'),
    build: {
      ssr: path.join(root, 'src/entry-server.tsx'),
      outDir: 'dist-ssr',
    },
  });

  console.log('✨ [3/3] Pre-rendering static HTML pages for instant SEO & Google Crawling...');
  const ssrEntryPath = path.join(root, 'dist-ssr', 'entry-server.js');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);

  const template = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf-8');

  // 1. Pre-render main AdMob page (index.html)
  const admobHtml = render('admob');
  const finalIndexHtml = template.replace('<div id="root"></div>', `<div id="root">${admobHtml}</div>`);
  fs.writeFileSync(path.join(root, 'dist', 'index.html'), finalIndexHtml, 'utf-8');
  console.log(`  ✓ dist/index.html pre-rendered (${Math.round(finalIndexHtml.length / 1024)} KB)`);

  // 2. Pre-render dedicated AdSense page (dist/adsense.html)
  const adsenseHtml = render('adsense');
  const finalAdSenseHtml = template
    .replace('<div id="root"></div>', `<div id="root">${adsenseHtml}</div>`)
    .replace('<title>AdMob & AdSense Revenue Calculator', '<title>Google AdSense Revenue Calculator | Website RPM Forecast')
    .replace('https://admobrevenue.pages.dev/', 'https://admobrevenue.pages.dev/?page=adsense');
  fs.writeFileSync(path.join(root, 'dist', 'adsense.html'), finalAdSenseHtml, 'utf-8');
  console.log(`  ✓ dist/adsense.html pre-rendered (${Math.round(finalAdSenseHtml.length / 1024)} KB)`);

  // Clean up SSR temp directory
  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
} catch (ssrError) {
  console.warn('⚠️ SSR pre-rendering skipped/warning:', ssrError?.message || ssrError);
  // Ensure dist/adsense.html exists
  const template = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf-8');
  const fallbackAdSense = template
    .replace('<title>AdMob & AdSense Revenue Calculator', '<title>Google AdSense Revenue Calculator | Website RPM Forecast')
    .replace('https://admobrevenue.pages.dev/', 'https://admobrevenue.pages.dev/?page=adsense');
  fs.writeFileSync(path.join(root, 'dist', 'adsense.html'), fallbackAdSense, 'utf-8');
}

console.log('🎉 Production build completed successfully!');
