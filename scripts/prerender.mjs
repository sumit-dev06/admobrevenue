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

const LOCALIZED_METADATA = {
  en: {
    title: 'Google AdSense & AdMob Revenue Calculator 2026 | Website RPM & App Income',
    desc: 'Accurate Google AdSense and AdMob revenue calculator. Forecast website page RPM and mobile app ARPDAU across 26 niches, countries, and ad formats for 2026.',
    keywords: 'adsense revenue calculator, google adsense revenue calculator, ad revenue calculator, website ad revenue calculator, app ad revenue calculator, ad revenue calculator website, admob revenue calculator, google admob, google adsense, what is google adsense, website income checker, ad revenue',
  },
  es: {
    title: 'Calculadora de Ingresos AdSense y AdMob 2026 | Estimador de Ganancias Web y Apps',
    desc: 'Calculadora precisa de ingresos de Google AdSense y AdMob. Calcula el RPM de tu web y el ARPDAU de tu app móvil según nicho, país y formato publicitario.',
    keywords: 'calculadora de ingresos adsense, calculadora de ingresos google adsense, calculadora de ingresos publicitarios, calculadora ingresos web, calculadora ingresos app, ingresos adsense, que es google adsense, ingresos admob, estimador de ingresos web, calculadora rpm adsense',
  },
  ja: {
    title: 'AdSense & AdMob 収益計算ツール 2026 | Webサイト＆アプリ広告収入予測',
    desc: 'Google AdSenseおよびAdMobの正確な広告収益計算ツール。26のジャンル、国別、広告フォーマットごとのページRPMやアプリARPDAUを高精度に試算します。',
    keywords: 'adsense 収益計算, アドセンス 収益 計算機, admob 収益計算, 広告収入 計算, ウェブサイト 広告収入, アプリ 広告収入, google adsense とは, アドセンス 収益 目安, admob 収益 目安, 広告収入 シミュレーター',
  },
  fr: {
    title: 'Calculateur de Revenus AdSense et AdMob 2026 | Estimation des Gains Web et Apps',
    desc: 'Calculateur précis de revenus Google AdSense et AdMob. Estimez le RPM de votre site et l\'ARPDAU de votre application mobile selon la thématique et le pays.',
    keywords: 'calculateur de revenus adsense, simulateur de revenus adsense, calculateur de revenus publicitaires, gains google adsense, calculateur admob, revenus publicitaires site web, quest ce que google adsense, simulateur rpm adsense',
  },
  de: {
    title: 'AdSense & AdMob Einnahmen-Rechner 2026 | Werbeeinnahmen für Webseiten & Apps berechnen',
    desc: 'Präziser Rechner für Google AdSense und AdMob Einnahmen. Berechnen Sie Seiten-RPM und App-ARPDAU nach Nische, Ländern und Werbeformaten.',
    keywords: 'adsense einnahmen rechner, google adsense rechner, werbeeinnahmen rechner, website werbeeinnahmen berechnen, app werbeeinnahmen rechner, admob rechner, was ist google adsense, adsense rpm rechner, werbeertrag berechnen',
  },
  pt: {
    title: 'Calculadora de Receita AdSense e AdMob 2026 | Estimativa de Ganhos Web e Apps',
    desc: 'Calculadora precisa de receita do Google AdSense e AdMob. Calcule o RPM de páginas do seu site e o ARPDAU de apps móveis por nicho, país e formatos.',
    keywords: 'calculadora de receita adsense, calculadora ganhos adsense, calculadora receita admob, simulador adsense, ganhos com anuncios site, o que e google adsense, estimativa de receita adsense, ganhos admob app',
  },
  ko: {
    title: '구글 애드센스 및 애드몹 수익 계산기 2026 | 웹사이트 & 앱 광고수익 예측',
    desc: '정확한 구글 애드센스 및 애드몹 광고수익 계산기. 26개 카테고리, 국가별 트래픽, 모바일 앱 ARPDAU 및 웹사이트 페이지 RPM 수익을 예측합니다.',
    keywords: '애드센스 수익 계산기, 구글 애드센스 수익 계산, 애드몹 수익 계산기, 웹사이트 광고수익 계산, 앱 광고수익 계산, 구글 애드센스란, 애드센스 예상수익, admob 수익 예측',
  },
  it: {
    title: 'Calcolatore Guadagni AdSense e AdMob 2026 | Stima Entrate Pubblicitarie Web e App',
    desc: 'Calcolatore accurato dei guadagni di Google AdSense e AdMob. Calcola il Page RPM del tuo sito web e l\'ARPDAU della tua app per nicchia, paese e formati.',
    keywords: 'calcolatore guadagni adsense, calcolatore entrate adsense, guadagni pubblicitari sito web, calcolo entrate admob, quanto si guadagna con adsense, cos e google adsense, stima entrate adsense, calcolatore rpm adsense',
  },
};

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

  // Helper to write prerendered file
  const writePrerender = (relPath, htmlContent, meta, lang = 'en', canonical = 'https://admobrevenue.pages.dev/') => {
    const fullPath = path.join(root, 'dist', relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    let renderedPage = template
      .replace('<html lang="en">', `<html lang="${lang}">`)
      .replace('<div id="root"></div>', `<div id="root">${htmlContent}</div>`);
    
    if (meta?.title) {
      renderedPage = renderedPage
        .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.title}" />`)
        .replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${meta.title}" />`);
    }
    if (meta?.desc) {
      renderedPage = renderedPage
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.desc}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.desc}" />`)
        .replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${meta.desc}" />`);
    }
    if (meta?.keywords) {
      renderedPage = renderedPage.replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${meta.keywords}" />`);
    }
    if (canonical) {
      renderedPage = renderedPage.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
    }

    fs.writeFileSync(fullPath, renderedPage, 'utf-8');
    console.log(`  ✓ dist/${relPath} (${Math.round(renderedPage.length / 1024)} KB) [lang: ${lang}]`);
  };

  // 1. Pre-render main AdMob page (index.html)
  const admobHtml = render('admob', 'en');
  writePrerender('index.html', admobHtml, LOCALIZED_METADATA.en, 'en', 'https://admobrevenue.pages.dev/');

  // 2. Pre-render dedicated AdSense page (dist/adsense.html)
  const adsenseHtml = render('adsense', 'en');
  writePrerender('adsense.html', adsenseHtml, {
    title: 'Google AdSense Revenue Calculator 2026 | Website RPM & Income Forecast',
    desc: 'Accurate Google AdSense revenue calculator. Forecast website page RPM and earnings across 26 niches, traffic countries, ad units, and viewability for 2026.',
    keywords: 'adsense revenue calculator, google adsense revenue calculator, website ad revenue calculator, ad revenue calculator website, website income checker, google adsense, what is google adsense, ad revenue',
  }, 'en', 'https://admobrevenue.pages.dev/?page=adsense');

  // 3. Pre-render Trust & Legal pages
  const aboutHtml = render('about', 'en');
  writePrerender('about.html', aboutHtml, { title: 'About Us | AdMobRevenue 2026 Monetization Engine' }, 'en', 'https://admobrevenue.pages.dev/?page=about');

  const contactHtml = render('contact', 'en');
  writePrerender('contact.html', contactHtml, { title: 'Contact Us & Publisher Support | AdMobRevenue' }, 'en', 'https://admobrevenue.pages.dev/?page=contact');

  const privacyHtml = render('privacy', 'en');
  writePrerender('privacy.html', privacyHtml, { title: 'Privacy Policy | AdMobRevenue' }, 'en', 'https://admobrevenue.pages.dev/?page=privacy');

  const termsHtml = render('terms', 'en');
  writePrerender('terms.html', termsHtml, { title: 'Terms of Service | AdMobRevenue' }, 'en', 'https://admobrevenue.pages.dev/?page=terms');

  const disclaimerHtml = render('disclaimer', 'en');
  writePrerender('disclaimer.html', disclaimerHtml, { title: 'Earnings Disclaimer & Methodology | AdMobRevenue' }, 'en', 'https://admobrevenue.pages.dev/?page=disclaimer');

  // 4. Pre-render 8 Localized versions with exact language keywords and metadata
  const languages = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const lang of languages) {
    const langAdsenseHtml = render('adsense', lang);
    writePrerender(`${lang}/index.html`, langAdsenseHtml, LOCALIZED_METADATA[lang], lang, `https://admobrevenue.pages.dev/?lang=${lang}`);
  }

  // Clean up SSR temp directory
  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
} catch (ssrError) {
  console.warn('⚠️ SSR pre-rendering warning:', ssrError?.message || ssrError);
}

console.log('🎉 Production build and multilingual SSG completed successfully!');
