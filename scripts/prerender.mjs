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

const PLATFORM_METADATA = {
  admob: {
    title: 'Google AdSense, AdMob & Creator Revenue Calculator 2026 | YouTube, TikTok, Twitch, Kick',
    desc: 'Accurate revenue calculators for Google AdSense, Google AdMob, YouTube ad revenue, TikTok Creator Rewards, Twitch subs & AIP, and Kick 95/5 stream earnings for 2026.',
    keywords: 'Kick earnings calculator, YouTube ad revenue calculator, TikTok money calculator, Twitch money calculators, Twitch ad revenue calculators, Google AdSense revenue calculator, Google AdMob revenue calculator, website ad revenue calculator, app ad revenue calculator, ad revenue calculator, streamer earnings calculator, page rpm calculator, arpdau calculator, admob mediation lift',
    canonical: 'https://admobrevenue.pages.dev/',
  },
  adsense: {
    title: 'Google AdSense Revenue Calculator 2026 | Website RPM & Page Income Estimator',
    desc: 'Accurate Google AdSense revenue calculator. Forecast website page RPM and earnings across 26 niches, traffic countries, ad units, and viewability for 2026.',
    keywords: 'Google AdSense revenue calculator, adsense revenue calculator, website ad revenue calculator, ad revenue calculator website, website income checker, google adsense, what is google adsense, ad revenue, page rpm calculator',
    canonical: 'https://admobrevenue.pages.dev/adsense',
  },
  youtube: {
    title: 'YouTube Ad Revenue Calculator 2026 | Video RPM & Shorts Money Calculator',
    desc: 'Accurate YouTube ad revenue calculator. Calculate YouTube creator income, video RPM, and Shorts earnings across 15+ niches, mid-rolls, and memberships for 2026.',
    keywords: 'YouTube ad revenue calculator, youtube money calculator, youtube rpm calculator, youtube shorts earnings calculator, youtube earnings calculator, youtube channel calculator, youtube creator income estimator, youtube cpm calculator, youtube monetization calculator, how much does youtube pay per 1000 views',
    canonical: 'https://admobrevenue.pages.dev/youtube',
  },
  tiktok: {
    title: 'TikTok Money Calculator 2026 | Creator Rewards & LIVE Diamond Estimator',
    desc: 'Free TikTok money calculator. Estimate TikTok Creator Rewards Program earnings for >1 min videos, qualified FYP view rates, and LIVE stream gift diamonds.',
    keywords: 'TikTok money calculator, tiktok creator rewards calculator, tiktok earnings calculator, tiktok diamond to usd calculator, tiktok live gifts calculator, tiktok creator fund calculator, tiktok rpm calculator, calculate tiktok money, how much does tiktok pay for 1 million views',
    canonical: 'https://admobrevenue.pages.dev/tiktok',
  },
  twitch: {
    title: 'Twitch Money & Sub Calculator 2026 | Streamer Earnings & AIP Ad Revenue',
    desc: 'Accurate Twitch money calculators and sub revenue estimator. Calculate Tier 1/2/3 subscription income across 50/50 and 70/30 Partner Plus splits, bits, and ads.',
    keywords: 'Twitch money calculators, Twitch ad revenue calculators, twitch sub calculator, twitch earnings calculator, twitch partner plus calculator, twitch streamer income calculator, twitch bits to usd, twitch ad incentive program calculator, how much do twitch streamers make',
    canonical: 'https://admobrevenue.pages.dev/twitch',
  },
  kick: {
    title: 'Kick Earnings Calculator 2026 | 95/5 Sub Split & KCP Hourly Stream Pay',
    desc: 'Accurate Kick earnings calculator. Calculate Kick streamer revenue with the 95/5 subscription split ($4.74 net/sub) and KICK Creator Program hourly rate stipend.',
    keywords: 'Kick earnings calculator, kick stream calculator, kick revenue calculator, kick sub calculator, kick 95 5 split calculator, kick creator program hourly rate, kick vs twitch earnings calculator, kick streamer income, how much does kick pay streamers',
    canonical: 'https://admobrevenue.pages.dev/kick',
  },
};

const LOCALIZED_METADATA = {
  en: PLATFORM_METADATA.admob,
  es: {
    title: 'Calculadora de Ingresos AdSense, AdMob y Creadores 2026 | Estimador de Ganancias',
    desc: 'Calculadora precisa de ingresos de Google AdSense, AdMob, YouTube, TikTok, Twitch y Kick. Estima ganancias por reproducciones, suscriptores y anuncios.',
    keywords: 'calculadora de ingresos adsense, calculadora de ingresos google adsense, calculadora de ingresos publicitarios, calculadora ingresos web, calculadora ingresos app, ingresos adsense, que es google adsense, calculadora dinero youtube, calculadora ingresos tiktok, calculadora subs twitch, calculadora ganancias kick',
  },
  ja: {
    title: 'AdSense, AdMob & クリエイター収益計算ツール 2026 | 広告収入＆配信収益予測',
    desc: 'Google AdSense、AdMob、YouTube、TikTok、Twitch、Kickの正確な広告＆クリエイター収益計算機。再生数やサブスクから収益をシミュレーション。',
    keywords: 'adsense 収益計算, アドセンス 収益 計算機, admob 収益計算, 広告収入 計算, ウェブサイト 広告収入, アプリ 広告収入, youtube 収益計算, tiktok 収益計算, twitch サブスク 収益, kick 収益計算機',
  },
  fr: {
    title: 'Calculateur de Revenus AdSense, AdMob & Créateurs 2026 | Estimation des Gains',
    desc: 'Calculateur précis de revenus Google AdSense, AdMob, YouTube, TikTok, Twitch et Kick. Estimez vos gains publicitaires, abonnements et sponsors.',
    keywords: 'calculateur de revenus adsense, simulateur de revenus adsense, calculateur de revenus publicitaires, gains google adsense, calculateur admob, calculateur revenus youtube, calculateur argent tiktok, simulateur gains twitch, calculateur kick',
  },
  de: {
    title: 'AdSense, AdMob & Creator Einnahmen-Rechner 2026 | Werbe- & Streaming-Einnahmen',
    desc: 'Präziser Rechner für Google AdSense, AdMob, YouTube, TikTok, Twitch und Kick Einnahmen. Berechnen Sie RPM, ARPDAU und Streamer-Auszahlungen.',
    keywords: 'adsense einnahmen rechner, google adsense rechner, werbeeinnahmen rechner, website werbeeinnahmen berechnen, app werbeeinnahmen rechner, youtube geld rechner, tiktok geld rechner, twitch einnahmen rechner, kick streamer rechner',
  },
  pt: {
    title: 'Calculadora de Receita AdSense, AdMob e Criadores 2026 | Estimativa de Ganhos',
    desc: 'Calculadora precisa de receita do Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcule ganhos de sites, apps móveis e canais de streaming.',
    keywords: 'calculadora de receita adsense, calculadora ganhos adsense, calculadora receita admob, simulador adsense, ganhos com anuncios site, calculadora dinheiro youtube, calculadora dinheiro tiktok, calculadora ganhos twitch, calculadora kick',
  },
  ko: {
    title: '애드센스, 애드몹 & 크리에이터 수익 계산기 2026 | 유튜브·틱톡·트위치·킥',
    desc: '정확한 구글 애드센스, 애드몹, 유튜브, 틱톡, 트위치, 킥 수익 계산기. 조회수와 구독자 기반의 정밀한 월간 및 연간 수익을 예측합니다.',
    keywords: '애드센스 수익 계산기, 구글 애드센스 수익 계산, 애드몹 수익 계산기, 웹사이트 광고수익 계산, 앱 광고수익 계산, 유튜브 수익 계산기, 틱톡 수익 계산기, 트위치 수익 계산기, 킥 수익 계산기',
  },
  it: {
    title: 'Calcolatore Guadagni AdSense, AdMob & Creator 2026 | Stima Entrate Web & Streamer',
    desc: 'Calcolatore accurato dei guadagni di Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcola Page RPM, ARPDAU e guadagni streaming.',
    keywords: 'calcolatore guadagni adsense, calcolatore entrate adsense, guadagni pubblicitari sito web, calcolo entrate admob, quanto si guadagna con adsense, calcolatore soldi youtube, calcolatore tiktok, calcolatore guadagni twitch, calcolatore kick',
  },
};

// Generate Rich JSON-LD Schemas
function generateJsonLd(platformKey, meta) {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': meta.title,
    'url': meta.canonical,
    'description': meta.desc,
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript and modern browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schemaApp)}</script>`;
}

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

  console.log('✨ [3/3] Pre-rendering clean static HTML pages for instant SEO & Google Crawling...');
  const ssrEntryPath = path.join(root, 'dist-ssr', 'entry-server.js');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);

  const template = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf-8');

  // Helper to write prerendered file (both clean directory /slug/index.html and /slug.html fallback)
  const writePrerender = (cleanSlug, htmlContent, meta, lang = 'en', platformKey = '') => {
    let renderedPage = template
      .replace('<html lang="en">', `<html lang="${lang}">`)
      .replace('<div id="root"></div>', `<div id="root">${htmlContent}</div>`)
      .replace(/<link rel="modulepreload"[^>]*(?:vendor-charts|Modal|Calculator|Editorial|Guide|Formula|Glossary|Faq|Tips|Trust|RevenueCharts)[^>]*>\s*/g, '');
    
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
    if (meta?.canonical) {
      renderedPage = renderedPage.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${meta.canonical}" />`);
    }

    if (platformKey && meta) {
      const jsonLdTag = generateJsonLd(platformKey, meta);
      renderedPage = renderedPage.replace('</head>', `${jsonLdTag}\n</head>`);
    }

    if (cleanSlug === '' || cleanSlug === 'index') {
      const fullPath = path.join(root, 'dist', 'index.html');
      fs.writeFileSync(fullPath, renderedPage, 'utf-8');
      console.log(`  ✓ dist/index.html (${Math.round(renderedPage.length / 1024)} KB) [lang: ${lang}]`);
    } else {
      // 1. Write clean directory dist/slug/index.html (e.g. dist/youtube/index.html -> serves /youtube cleanly)
      const dirPath = path.join(root, 'dist', cleanSlug);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(path.join(dirPath, 'index.html'), renderedPage, 'utf-8');

      // 2. Also write flat fallback dist/slug.html (e.g. dist/youtube.html)
      fs.writeFileSync(path.join(root, 'dist', `${cleanSlug}.html`), renderedPage, 'utf-8');

      console.log(`  ✓ dist/${cleanSlug}/index.html (Clean URL /${cleanSlug}) (${Math.round(renderedPage.length / 1024)} KB) [lang: ${lang}]`);
    }
  };

  // 1. Pre-render Root / AdMob page (/)
  const admobHtml = render('admob', 'en');
  writePrerender('', admobHtml, PLATFORM_METADATA.admob, 'en', 'admob');

  // 2. Pre-render Clean AdSense page (/adsense)
  const adsenseHtml = render('adsense', 'en');
  writePrerender('adsense', adsenseHtml, PLATFORM_METADATA.adsense, 'en', 'adsense');

  // 3. Pre-render Clean YouTube page (/youtube)
  const youtubeHtml = render('youtube', 'en');
  writePrerender('youtube', youtubeHtml, PLATFORM_METADATA.youtube, 'en', 'youtube');

  // 4. Pre-render Clean TikTok page (/tiktok)
  const tiktokHtml = render('tiktok', 'en');
  writePrerender('tiktok', tiktokHtml, PLATFORM_METADATA.tiktok, 'en', 'tiktok');

  // 5. Pre-render Clean Twitch page (/twitch)
  const twitchHtml = render('twitch', 'en');
  writePrerender('twitch', twitchHtml, PLATFORM_METADATA.twitch, 'en', 'twitch');

  // 6. Pre-render Clean Kick page (/kick)
  const kickHtml = render('kick', 'en');
  writePrerender('kick', kickHtml, PLATFORM_METADATA.kick, 'en', 'kick');

  // 7. Pre-render Clean Trust & Legal pages
  const aboutHtml = render('about', 'en');
  writePrerender('about', aboutHtml, { title: 'About Us | AdMobRevenue 2026 Monetization Engine', desc: 'About AdMobRevenue publisher tools and creator revenue forecasting.', canonical: 'https://admobrevenue.pages.dev/about' }, 'en');

  const contactHtml = render('contact', 'en');
  writePrerender('contact', contactHtml, { title: 'Contact Us & Publisher Support | AdMobRevenue', desc: 'Contact publisher support and monetization engineers.', canonical: 'https://admobrevenue.pages.dev/contact' }, 'en');

  const privacyHtml = render('privacy', 'en');
  writePrerender('privacy', privacyHtml, { title: 'Privacy Policy | AdMobRevenue', desc: 'Privacy Policy and data protection standards for AdMobRevenue.', canonical: 'https://admobrevenue.pages.dev/privacy' }, 'en');

  const termsHtml = render('terms', 'en');
  writePrerender('terms', termsHtml, { title: 'Terms of Service | AdMobRevenue', desc: 'Terms of Service and acceptable use policy.', canonical: 'https://admobrevenue.pages.dev/terms' }, 'en');

  const disclaimerHtml = render('disclaimer', 'en');
  writePrerender('disclaimer', disclaimerHtml, { title: 'Earnings Disclaimer & Methodology | AdMobRevenue', desc: 'Earnings disclaimer, statistical accuracy, and methodology.', canonical: 'https://admobrevenue.pages.dev/disclaimer' }, 'en');

  // 8. Pre-render 7 Localized clean versions for all platforms
  const languages = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const lang of languages) {
    const langMeta = { ...LOCALIZED_METADATA[lang], canonical: `https://admobrevenue.pages.dev/${lang}` };

    const langRootHtml = render('adsense', lang);
    writePrerender(`${lang}`, langRootHtml, langMeta, lang);

    const langYtHtml = render('youtube', lang);
    writePrerender(`${lang}/youtube`, langYtHtml, { ...langMeta, canonical: `https://admobrevenue.pages.dev/${lang}/youtube` }, lang);

    const langTtHtml = render('tiktok', lang);
    writePrerender(`${lang}/tiktok`, langTtHtml, { ...langMeta, canonical: `https://admobrevenue.pages.dev/${lang}/tiktok` }, lang);

    const langTwitchHtml = render('twitch', lang);
    writePrerender(`${lang}/twitch`, langTwitchHtml, { ...langMeta, canonical: `https://admobrevenue.pages.dev/${lang}/twitch` }, lang);

    const langKickHtml = render('kick', lang);
    writePrerender(`${lang}/kick`, langKickHtml, { ...langMeta, canonical: `https://admobrevenue.pages.dev/${lang}/kick` }, lang);

    const langAdsenseSubHtml = render('adsense', lang);
    writePrerender(`${lang}/adsense`, langAdsenseSubHtml, { ...langMeta, canonical: `https://admobrevenue.pages.dev/${lang}/adsense` }, lang);
  }

  // Clean up SSR temp directory
  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
} catch (ssrError) {
  console.warn('⚠️ SSR pre-rendering warning:', ssrError?.message || ssrError);
}

console.log('🎉 Production build and Clean Pretty URLs SSG completed successfully!');
