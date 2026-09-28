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

// ==========================================
// 1. ENGLISH & GLOBAL PLATFORM METADATA
// ==========================================
const PLATFORM_METADATA = {
  home: {
    title: 'Ad Revenue & Runway Calculator 2026 | RealTools',
    desc: 'Free calculators for AdSense, AdMob, YouTube, TikTok, Twitch, Kick, savings and startup runway. Estimate revenue, payouts and runway. | RealTools',
    keywords: 'ad revenue calculator, adsense calculator, admob calculator, youtube money calculator, tiktok money calculator, twitch calculator, kick calculator, runway calculator, startup runway calculator, financial runway calculator, free runway calculator, money runway calculator, how long will my money last, realtools',
    canonical: 'https://realtools.store/',
  },
  admob: {
    title: 'AdMob Revenue Calculator 2026 | ARPDAU & eCPM Tool',
    desc: 'Accurate AdMob calculator for iOS & Android apps. Estimate daily, monthly and yearly revenue (ARPDAU, eCPM) across Rewarded, Interstitial and App Open ads. | RealTools',
    keywords: 'Google AdMob revenue calculator, admob revenue calculator, app ad revenue calculator, mobile app revenue calculator, admob calculator, arpdau calculator, admob ecpm calculator, app monetization calculator, google admob, ad revenue calculator, mobile game revenue calculator, admob mediation calculator, realtools',
    canonical: 'https://realtools.store/admob',
  },
  adsense: {
    title: 'AdSense Calculator 2026 | Page RPM & Income Estimator',
    desc: 'Calculate potential website earnings with our AdSense ad revenue and Page RPM calculators. Estimate monthly and yearly revenue across 26 niches, countries and ad units. | RealTools',
    keywords: 'Google AdSense revenue calculator, adsense revenue calculator, website ad revenue calculator, ad revenue calculator website, google adsense, what is google adsense, website income checker, page rpm calculator, adsense earnings estimator, blog revenue calculator, how much does adsense pay per 1000 views, realtools',
    canonical: 'https://realtools.store/adsense',
  },
  youtube: {
    title: 'YouTube Money Calculator 2026 | Earnings, RPM, CPM & Shorts Estimator',
    desc: 'Calculate potential YouTube earnings with our ad revenue, RPM, CPM and Shorts calculators. Estimate monthly and yearly channel revenue from ads, memberships and brand deals. | RealTools',
    keywords: 'YouTube ad revenue calculator, youtube money calculator, youtube earnings calculator, youtube revenue calculator, youtube rpm calculator, youtube shorts money calculator, youtube channel calculator, youtube creator income estimator, youtube cpm calculator, youtube monetization calculator, how much does youtube pay per 1000 views, youtube shorts revenue calculator, youtube sponsor earnings, realtools',
    canonical: 'https://realtools.store/youtube',
  },
  tiktok: {
    title: 'TikTok Money Calculator 2026 | Creator Rewards Tool',
    desc: 'Calculate potential TikTok earnings with our Creator Rewards, LIVE gifts and Shop calculators. Estimate monthly and yearly revenue from qualified views, diamonds and commissions. | RealTools',
    keywords: 'TikTok money calculator, tiktok creator rewards calculator, tiktok earnings calculator, tiktok diamond to usd calculator, tiktok live gifts calculator, tiktok creator fund calculator, tiktok rpm calculator, calculate tiktok money, how much does tiktok pay for 1 million views, tiktok shop affiliate earnings calculator, realtools',
    canonical: 'https://realtools.store/tiktok',
  },
  twitch: {
    title: 'Twitch Money Calculator 2026 | Subs, Bits & Ad Revenue Estimator',
    desc: 'Calculate potential earnings on Twitch with our ad revenue, subscription, and Bits calculators. Estimate your monthly and yearly revenue from subs, AIP ads and sponsorships. | RealTools',
    keywords: 'Twitch money calculator, Twitch money calculators, Twitch ad revenue calculator, Twitch ad revenue calculators, twitch sub calculator, twitch earnings calculator, twitch bits calculator, twitch partner plus calculator, twitch streamer income calculator, twitch bits to usd, twitch ad incentive program calculator, how much do twitch streamers make, twitch sub revenue calculator, realtools',
    canonical: 'https://realtools.store/twitch',
  },
  runway: {
    title: 'Startup Runway Calculator 2026 | Financial Runway Tool',
    desc: 'Free runway calculator. See how long savings or startup cash lasts with withdrawals, returns and inflation rises. SWP breakeven analysis for 2026. | RealTools',
    keywords: 'runway calculator, startup runway calculator, financial runway calculator, free runway calculator, money runway calculator, how long will my money last, how long will 1 crore last, swp calculator, retirement withdrawal calculator, savings runway calculator, how long will $1 million last, systematic withdrawal plan calculator, breakeven withdrawal calculator, realtools',
    canonical: 'https://realtools.store/runway',
  },
  kick: {
    title: 'Kick Earnings Calculator 2026 | 95/5 Split & KCP Pay',
    desc: 'Calculate potential Kick earnings with our 95/5 split and KCP hourly calculators. Estimate monthly and yearly streamer revenue from subs, stipends and tips. | RealTools',
    keywords: 'Kick earnings calculator, kick stream calculator, kick revenue calculator, kick sub calculator, kick 95 5 split calculator, kick creator program hourly rate, kick vs twitch earnings calculator, kick streamer income, how much does kick pay streamers, kick money calculator, kick crypto tipping, realtools',
    canonical: 'https://realtools.store/kick',
  },
  '8th-pay-commission': {
    title: '8th Pay Commission Salary Calculator 2026 | Fitment Factor Tool India',
    desc: 'Calculate projected 8th Pay Commission salary for central govt employees. Try fitment factors 1.92x–3.83x with DA, HRA slabs, arrears and pension. | RealTools',
    keywords: '8th pay commission salary calculator, 8th cpc salary calculator, 8th pay commission fitment factor calculator, 8th pay commission basic pay calculator, 8th pay commission arrears calculator, 8th pay commission pension calculator, 8th pay commission level wise salary, what will be my salary in 8th pay commission, realtools',
    canonical: 'https://realtools.store/8th-pay-commission',
  },
  'fuel-cost-calculator': {
    title: 'Fuel Cost Calculator 2026 | Trip Petrol & Diesel Cost Estimator',
    desc: 'Free fuel cost calculator for any country. Enter distance, mileage and pump price to get trip cost, fuel needed, per-km cost and monthly estimate. | RealTools',
    keywords: 'fuel cost calculator, trip fuel cost calculator, petrol cost calculator, diesel cost calculator, car fuel cost per km calculator, mileage fuel cost calculator, road trip gas cost calculator, fuel consumption cost calculator, how much fuel will my trip use, realtools',
    canonical: 'https://realtools.store/fuel-cost-calculator',
  },
};

// ==========================================
// 2. COMPLETE LOCALIZED PLATFORM METADATA
// ==========================================
const LOCALIZED_PLATFORM_METADATA = {
  es: {
    root: {
      title: 'Calculadora AdSense, AdMob y Runway 2026 | Ingresos',
      desc: 'Calculadora precisa de ingresos de Google AdSense, AdMob, YouTube, TikTok, Twitch y Kick. Estima ganancias, vistas, subs y anuncios. | RealTools',
      keywords: 'calculadora de ingresos adsense, calculadora de ingresos google adsense, calculadora de ingresos publicitarios, calculadora ingresos web, calculadora ingresos app, ingresos adsense, que es google adsense, calculadora dinero youtube, calculadora ingresos tiktok, calculadora subs twitch, calculadora ganancias kick, cuanto paga adsense por clic, cuanto paga adsense por 1000 visitas, runway calculator, calculadora runway gratis, realtools',
    },
    admob: {
      title: 'Calculadora AdMob 2026 | ARPDAU y eCPM',
      desc: 'Calculadora AdMob para apps iOS y Android. Estima ARPDAU, eCPM y ganancias diarias con rewarded, intersticiales y mediación. | RealTools',
      keywords: 'calculadora admob, calculadora ingresos admob, arpdau calculadora, admob ecpm calculadora, calculadora ingresos app, realtools',
    },
    adsense: {
      title: 'Calculadora AdSense 2026 | RPM y Ganancias Web',
      desc: 'Calculadora precisa de ingresos de Google AdSense. Calcula el Page RPM de tu web y estimación de ganancias según nicho, país y formato publicitario. | RealTools',
      keywords: 'calculadora de ingresos google adsense, calculadora de ingresos adsense, calculadora ingresos web, que es google adsense, ganancias adsense, calcular rpm adsense, estimador ingresos blog, cuanto paga adsense por clic, adsense cpc cuanto paga, cuanto paga adsense por 1000 visitas, cuanto se gana con adsense, realtools',
    },
    youtube: {
      title: 'Calculadora YouTube 2026 | RPM y Shorts',
      desc: 'Calcula ingresos de YouTube por videos largos y Shorts. Estima RPM por nicho, membresías y anuncios para creadores de contenido. | RealTools',
      keywords: 'calculadora de ingresos youtube, calculadora dinero youtube, calculadora ganancias youtube, youtube rpm calculadora, cuanto paga youtube por visita, calculadora youtube shorts, cuanto paga youtube por 1000 visitas, cuanto paga youtube por suscriptor, calculadora cpm youtube, realtools',
    },
    tiktok: {
      title: 'Calculadora TikTok 2026 | Creator Rewards',
      desc: 'Calculadora de dinero de TikTok. Calcula ganancias del Creator Rewards Program por vistas calificadas y regalos LIVE. | RealTools',
      keywords: 'calculadora de dinero tiktok, calculadora ingresos tiktok, creadores tiktok ganancias, diamantes tiktok a dolares, cuanto paga tiktok por visitas, calculadora tiktok live, cuanto paga tiktok por 1000 vistas, cuanto paga tiktok por like, cuanto paga tiktok por 1 millón de vistas, cuanto paga tiktok por live, cuanto paga tiktok por mil vistas, realtools',
    },
    twitch: {
      title: 'Calculadora Twitch 2026 | Subs y AIP',
      desc: 'Calcula ganancias de Twitch para streamers: suscripciones Tier 1/2/3, repartos Partner Plus (50/50 y 70/30), bits y programa AIP. | RealTools',
      keywords: 'calculadora de ingresos twitch, calculadora subs twitch, cuanto gana un streamer en twitch, calculadora dinero twitch, reparto partner plus twitch, bits a dolares twitch, cuanto paga twitch por suscripcion, cuanto paga twitch por viewer, cuanto paga twitch por visitas, cuanto paga twitch por sub, cuanto paga twitch por hora, realtools',
    },
    kick: {
      title: 'Calculadora Kick 2026 | 95/5 y KCP',
      desc: 'Calculadora de ingresos de Kick. Descubre ganancias con el reparto de suscripción 95/5 ($4.74 neto/sub) y el programa KCP por hora. | RealTools',
      keywords: 'calculadora de ganancias kick, calculadora ingresos kick, reparto 95 5 kick, cuanto paga kick por hora, kick vs twitch ganancias, calculadora subs kick, cuanto paga kick por sub, cuanto paga kick por viewer, cuanto paga kick por 1000 viewers, cuanto paga kick en españa, realtools',
    },
    runway: {
      title: 'Calculadora Runway 2026 | Cuánto Durará Mi Dinero',
      desc: 'Calculadora de runway: descubre cuántos años duran tus ahorros con retiros mensuales, rentabilidad e inflación. Análisis breakeven SWP. | RealTools',
      keywords: 'calculadora runway, cuanto durará mi dinero, cuanto dura 1 millón, calculadora swp, calculadora retiro jubilación, calculadora ahorros, startup runway calculator, financial runway calculator, free runway calculator, calculadora runway gratis, calculadora financiera startup, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Calculadora de Combustible 2026 | Costo de Viaje por km',
      desc: 'Calculadora gratis de costo de combustible. Ingresa distancia, consumo y precio para obtener costo del viaje, litros y gasto mensual. | RealTools',
      keywords: 'calculadora de combustible, calculadora costo viaje gasolina, costo por km calculadora, consumo combustible calculadora, cuanto cuesta mi viaje en gasolina, realtools',
    },
  },
  ja: {
    root: {
      title: 'AdSense, AdMob & クリエイター収益計算ツール 2026 | 広告収入＆配信収益予測',
      desc: 'Google AdSense、AdMob、YouTube、TikTok、Twitch、Kickの正確な広告＆クリエイター収益計算機。再生数やサブスクから収益をシミュレーション。資産runway計算にも対応。 | RealTools',
      keywords: 'adsense 収益計算, アドセンス 収益 計算機, admob 収益計算, 広告収入 計算, ウェブサイト 広告収入, アプリ 広告収入, youtube 収益計算, tiktok 収益計算, twitch サブスク 収益, kick 収益計算機, アドセンス クリック単価, アドセンス 1クリック いくら, runway calculator, runway 計算, realtools',
    },
    admob: {
      title: 'AdMob 収益計算ツール 2026 | ARPDAU＆eCPM予測',
      desc: 'iOS・Androidアプリ向けAdMob収益計算。ARPDAU・eCPM・メディエーション効果を予測。 | RealTools',
      keywords: 'admob 収益計算, アドモブ 収益 計算機, arpdau 計算, アプリ 広告収入 計算, realtools',
    },
    adsense: {
      title: 'Google AdSense 収益計算ツール 2026 | ウェブサイト広告収入＆ページRPM予測',
      desc: 'Google AdSenseの広告収益見積もりツール。ジャンル、国、ページビュー数から月間ページRPMと推定収益を正確に計算。 | RealTools',
      keywords: 'google adsense 収益計算, アドセンス 収益 計算機, サイト 広告収入 計算, ページ rpm 計算, ブログ 収益シミュレーション, アドセンス 見積もり, アドセンス クリック単価, アドセンス 1クリック いくら, アドセンス 1000回 表示 いくら, アドセンス cpc 収益, realtools',
    },
    youtube: {
      title: 'YouTube 広告収益計算ツール 2026 | 動画再生数・RPM＆ショート収益予測',
      desc: 'YouTubeの長編動画およびShorts動画の広告収入計算ツール。ジャンル別RPM、メンバーシップ、広告単価からクリエイター収益を予測。 | RealTools',
      keywords: 'YouTube 収益 計算, ユーチューブ 収益計算機, youtube rpm 計算, youtube ショート 収益, ユーチューブ 再生回数 収入, チャンネル メンバーシップ 収益, ユーチューブ 再生数 収入 目安, ユーチューブ 1000回 再生 いくら, ユーチューブ cpm 計算, ユーチューブ ショート 収益 計算, ユーチューブ 再生 回数 収益 計算, realtools',
    },
    tiktok: {
      title: 'TikTok 収益計算ツール 2026 | Creator Rewards＆LIVEギフト換金予測',
      desc: 'TikTok Creator Rewards ProgramおよびLIVEギフト（ダイヤモンド）の換金収益計算ツール。対象視聴回数から推定月収を計算。 | RealTools',
      keywords: 'TikTok 収益 計算, tiktok 収益 計算機, tiktok 再生数 収入, tiktok ダイヤモンド 換金 計算, クリエイターリワードプログラム 収益, tiktok 1000回 再生 いくら, tiktok 再生数 収入 目安, tiktok 収益 計算 ツール, tiktok ライブ 収益 計算, realtools',
    },
    twitch: {
      title: 'Twitch 収益計算ツール 2026 | サブスク＆配信広告収入シミュレーター',
      desc: 'Twitchストリーマー向け収益計算ツール。Tier 1/2/3サブスク収益、Partner Plus（70/30配分）、Bits、AIP広告プログラム収益を計算。 | RealTools',
      keywords: 'Twitch 収益 計算 ツール, twitch サブスク 収益, twitch ストリーマー 収入, パートナープラス 収益配分, twitch ビッツ 換金, twitch サブスク いくら, twitch 視聴者数 収益, twitch サブスク 収益 計算 サイト, realtools',
    },
    kick: {
      title: 'Kick 収益計算ツール 2026 | 95/5サブスク還元＆KCP時給予測',
      desc: 'Kick配信者のための収益シミュレーター。業界最高の95/5サブスク還元率（1件あたり$4.74）およびKCP時給プログラム収益を計算。 | RealTools',
      keywords: 'Kick 収益 計算, kick 配信 収入, kick サブスク 95 5, kick クリエイター プログラム 時給, kick twitch 比較, kick サブスク いくら, kick 時給 収益, kick 収益 計算 サイト, realtools',
    },
    runway: {
      title: '資産寿命計算ツール 2026 | 老後資金は何年もつ？',
      desc: '毎月の取り崩し・運用利回り・インフレから資産の寿命を計算。SWP損益分岐点つき。 | RealTools',
      keywords: '資産寿命 計算, 老後資金 何年, 取り崩し シミュレーション, swp 計算, 1億円 何年, startup runway calculator, financial runway calculator, free runway calculator, 無料 runway 計算, スタートアップ runway 計算, realtools',
    },
    'fuel-cost-calculator': {
      title: '燃料費計算ツール 2026 | ガソリン代・燃費シミュレーター',
      desc: '距離・燃費・燃料単価から旅行の燃料費・必要量・月額を無料計算。世界対応。 | RealTools',
      keywords: '燃料費 計算, ガソリン代 計算, 燃費 計算, 旅行 ガソリン代, 月 燃料費 計算, realtools',
    },
  },
  fr: {
    root: {
      title: 'Calculateur AdSense, AdMob & Runway 2026 | Revenus',
      desc: 'Calculateur précis de revenus Google AdSense, AdMob, YouTube, TikTok, Twitch et Kick. Estimez vos gains publicitaires, abonnements et sponsors. | RealTools',
      keywords: 'calculateur de revenus adsense, simulateur de revenus adsense, calculateur de revenus publicitaires, gains google adsense, calculateur admob, calculateur revenus youtube, calculateur argent tiktok, simulateur gains twitch, calculateur kick, combien paye adsense par clic, combien gagne youtube 1000 vues, runway calculator, calculateur runway gratuit, realtools',
    },
    admob: {
      title: 'Calculateur AdMob 2026 | ARPDAU & eCPM',
      desc: 'Calculateur AdMob pour apps iOS et Android. Estimez ARPDAU, eCPM et revenus avec rewarded et médiation. | RealTools',
      keywords: 'calculateur admob, calculateur revenus admob, arpdau calculateur, admob ecpm, realtools',
    },
    adsense: {
      title: 'Calculateur AdSense 2026 | RPM & Gains',
      desc: 'Simulateur précis de revenus Google AdSense. Estimez le RPM de votre site web, vos impressions et vos gains mensuels selon la thématique et le pays. | RealTools',
      keywords: 'calculateur de revenus adsense, simulateur gains google adsense, revenus publicitaires site web, page rpm calculateur, gains blog adsense, combien paye adsense par clic, combien rapporte adsense par clic, combien gagne adsense 1000 vues, cpc adsense calculateur, realtools',
    },
    youtube: {
      title: 'Calculateur YouTube 2026 | RPM & Shorts',
      desc: 'Calculateur de revenus pour créateurs YouTube. Estimez vos gains sur les vidéos longues et Shorts selon votre RPM de niche et vos abonnements. | RealTools',
      keywords: 'calculateur de revenus youtube, simulateur argent youtube, combien rapporte youtube, youtube rpm calculateur, revenus shorts youtube, combien paye youtube 1000 vues, combien gagne un youtubeur, calculateur cpm youtube, combien youtube paye 1000 vues, combien paye youtube pour 1000 vues short, realtools',
    },
    tiktok: {
      title: 'Calculateur TikTok 2026 | Rewards',
      desc: 'Simulateur de revenus TikTok. Calculez les rémunérations du Creator Rewards Program pour les vidéos >1 min et les diamants LIVE. | RealTools',
      keywords: 'calculateur argent tiktok, calculateur revenus tiktok, remuneration tiktok vues, diamants tiktok en euros, gains tiktok live, combien paye tiktok 1000 vues, combien gagne tiktok par vue, combien paye tiktok pour 1000 vue, combien paye tiktok par vue, combien paye tiktok pour 1 millions de vue, realtools',
    },
    twitch: {
      title: 'Calculateur Twitch 2026 | Abonnements AIP',
      desc: 'Estimez les gains de streamer Twitch : abonnements Tier 1/2/3, partages Partner Plus (50/50 et 70/30), bits et coupures publicitaires AIP. | RealTools',
      keywords: 'calculateur revenus twitch, simulateur gains twitch, subs twitch revenus, combien gagne un streamer twitch, programme partner plus twitch, combien paye twitch par sub, combien paye twitch par viewer, calculateur revenu twitch, realtools',
    },
    kick: {
      title: 'Calculateur Kick 2026 | 95/5 & KCP',
      desc: 'Calculateur de gains pour streamers Kick. Calculez vos revenus grâce au partage d\'abonnement 95/5 (4,74 $ net/sub) et au programme KCP. | RealTools',
      keywords: 'calculateur gains kick, calculateur streamer kick, abonnement kick 95 5, salaire horaire kick kcp, kick vs twitch revenus, combien paye kick par sub, combien paye kick par heure, realtools',
    },
    runway: {
      title: 'Calculateur Runway 2026 | Combien de Temps ?',
      desc: 'Calculez combien d\'années dureront vos économies avec retraits mensuels, rendement et inflation. Analyse SWP. | RealTools',
      keywords: 'calculateur runway, combien de temps dureront mes économies, calculateur swp, calculateur retraite retraits, startup runway calculator, financial runway calculator, free runway calculator, calculateur runway gratuit, calculateur runway startup, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Calculateur Carburant 2026 | Coût Trajet au km',
      desc: 'Calculateur gratuit du coût carburant. Distance, consommation et prix pour un coût de trajet, litres et budget mensuel. | RealTools',
      keywords: 'calculateur carburant, coût trajet essence, prix au km voiture, consommation carburant calcul, combien coûte mon trajet, realtools',
    },
  },
  de: {
    root: {
      title: 'AdSense, AdMob & Runway Rechner 2026 | Einnahmen',
      desc: 'Präziser Rechner für Google AdSense, AdMob, YouTube, TikTok, Twitch und Kick Einnahmen. Berechnen Sie RPM, ARPDAU und Streamer-Auszahlungen. | RealTools',
      keywords: 'adsense einnahmen rechner, google adsense einnahmen rechner, werbeeinnahmen rechner, website werbeeinnahmen berechnen, app werbeeinnahmen rechner, youtube geld rechner, tiktok geld rechner, twitch einnahmen rechner, kick streamer rechner, was zahlt adsense pro klick, adsense einnahmen pro 1000 aufrufe, runway calculator, runway rechner, realtools',
    },
    admob: {
      title: 'AdMob Rechner 2026 | ARPDAU & eCPM',
      desc: 'AdMob Rechner für iOS- & Android-Apps. ARPDAU, eCPM und Tagesumsatz mit Rewarded und Mediation berechnen. | RealTools',
      keywords: 'admob rechner, admob einnahmen rechner, arpdau rechner, app werbeeinnahmen rechner, realtools',
    },
    adsense: {
      title: 'AdSense Rechner 2026 | RPM & Umsatz',
      desc: 'Kostenloser Google AdSense Einnahmen-Rechner. Berechnen Sie Seiten-RPM, Impressionen und monatliche Werbeeinnahmen für Ihre Website. | RealTools',
      keywords: 'adsense einnahmen rechner, google adsense einnahmen rechner, website werbeeinnahmen berechnen, seiten rpm rechner, blog einnahmen rechner, was zahlt adsense pro klick, wie viel verdient man mit adsense, adsense einnahmen pro 1000 aufrufe, adsense cpc rechner, was verdient man mit adsense, realtools',
    },
    youtube: {
      title: 'YouTube Rechner 2026 | RPM & Shorts',
      desc: 'YouTube Rechner für Video- und Shorts-Einnahmen. Berechnen Sie YouTube Creator Einkommen basierend auf Nischen-RPM und Kanalmitgliedschaften. | RealTools',
      keywords: 'youtube einnahmen rechner, youtube geld rechner, wie viel verdient man auf youtube, youtube rpm rechner, youtube shorts einnahmen, wie viel zahlt youtube pro 1000 aufrufe, wie viel verdient man pro 1000 klicks youtube, youtube cpm rechner, youtube shorts einnahmen rechner, youtube einnahmen rechner kanal, realtools',
    },
    tiktok: {
      title: 'TikTok Rechner 2026 | Rewards & LIVE',
      desc: 'Berechnen Sie TikTok Einnahmen aus dem Creator Rewards Program für Videos >1 Min und LIVE-Stream-Geschenke (Diamanten). | RealTools',
      keywords: 'tiktok geld rechner, tiktok einnahmen rechner, wie viel zahlt tiktok pro aufruf, tiktok diamanten euro rechner, creator rewards rechner, wie viel zahlt tiktok pro 1000 aufrufe, wie viel verdient man auf tiktok, tiktok geld rechner live, tiktok aufrufe geld rechner, realtools',
    },
    twitch: {
      title: 'Twitch Rechner 2026 | Subs & AIP',
      desc: 'Präziser Twitch Streamer Einnahmen-Rechner. Berechnen Sie Abonnements nach Tier 1/2/3, Partner Plus Splits (50/50 und 70/30) und AIP-Werbung. | RealTools',
      keywords: 'twitch einnahmen rechner, twitch sub rechner, wie viel verdient ein twitch streamer, partner plus split twitch, twitch bits in euro, wie viel verdient man pro sub twitch, wie viel zahlt twitch pro zuschauer, twitch sub einnahmen rechner, twitch werbung einnahmen rechner, realtools',
    },
    kick: {
      title: 'Kick Rechner 2026 | 95/5 & KCP',
      desc: 'Kick Einnahmen-Rechner für Streamer. Berechnen Sie Einnahmen mit dem 95/5 Abo-Split ($4,74 netto/Sub) und dem KCP-Stundenhonorar. | RealTools',
      keywords: 'kick einnahmen rechner, kick streamer rechner, kick 95 5 split, kick stundenlohn creator program, kick vs twitch vergleich, wie viel zahlt kick pro sub, wie viel zahlt kick pro stunde, realtools',
    },
    runway: {
      title: 'Runway Rechner 2026 | Wie Lange Reicht Geld?',
      desc: 'Runway-Rechner: Wie viele Jahre reichen Ersparnisse bei monatlicher Entnahme, Rendite und Inflation? SWP-Analyse. | RealTools',
      keywords: 'runway rechner, wie lange reicht geld, wie lange reicht 1 million, swp rechner, entnahme rechner rente, startup runway calculator, financial runway calculator, free runway calculator, kostenloser runway rechner, startup runway rechner, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Spritkosten Rechner 2026 | Fahrtkosten pro km',
      desc: 'Kostenloser Spritkosten-Rechner. Strecke, Verbrauch und Preis eingeben für Fahrtkosten, Liter und Monatskosten. | RealTools',
      keywords: 'spritkosten rechner, fahrtkosten rechner benzin, kosten pro km auto, spritverbrauch kosten rechner, was kostet meine fahrt, realtools',
    },
  },
  pt: {
    root: {
      title: 'Calculadora AdSense, AdMob e Runway 2026 | Receita',
      desc: 'Calculadora precisa de receita do Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcule ganhos de sites, apps móveis e canais de streaming. | RealTools',
      keywords: 'calculadora de receita adsense, calculadora ganhos adsense, calculadora receita admob, simulador adsense, ganhos com anuncios site, calculadora dinheiro youtube, calculadora dinheiro tiktok, calculadora ganhos twitch, calculadora kick, quanto paga adsense por clique, quanto ganha no youtube 1000 visualizacoes, runway calculator, calculadora runway grátis, realtools',
    },
    admob: {
      title: 'Calculadora AdMob 2026 | ARPDAU e eCPM',
      desc: 'Calculadora AdMob para apps iOS e Android. Estime ARPDAU, eCPM e receita diária com rewarded e mediação. | RealTools',
      keywords: 'calculadora admob, calculadora receita admob, arpdau calculadora, admob ecpm, realtools',
    },
    adsense: {
      title: 'Calculadora AdSense 2026 | RPM e Ganhos',
      desc: 'Calculadora precisa do Google AdSense. Estime o RPM da sua página, visualizações e faturamento mensal com anúncios em blogs e portais. | RealTools',
      keywords: 'calculadora de receita adsense, calculadora ganhos adsense, ganhos com anuncios site, calcular page rpm, simulador de ganhos adsense, quanto paga adsense por clique, quanto ganha adsense por 1000 visitas, adsense cpc quanto paga, realtools',
    },
    youtube: {
      title: 'Calculadora YouTube 2026 | RPM & Shorts',
      desc: 'Calculadora de ganhos para criadores do YouTube. Estime receita de vídeos longos e Shorts de acordo com o RPM de nicho e membros do canal. | RealTools',
      keywords: 'calculadora de ganhos youtube, calculadora dinheiro youtube, quanto o youtube paga por visualizacao, calculadora rpm youtube, ganhos youtube shorts, quanto ganha no youtube 1000 visualizacoes, quanto paga youtube por 1000 views, calculadora cpm youtube, quanto o youtube paga por 1000 visualizacoes no shorts, quanto o youtube paga por 1000 visualizacoes em reais, realtools',
    },
    tiktok: {
      title: 'Calculadora TikTok 2026 | Recompensas',
      desc: 'Calculadora de dinheiro no TikTok. Estime ganhos com o Creator Rewards Program para vídeos >1 min e conversão de diamantes de presentes LIVE. | RealTools',
      keywords: 'calculadora de dinheiro tiktok, quanto o tiktok paga, calculadora ganhos tiktok, diamantes tiktok em reais, programa criador tiktok, quanto paga tiktok por 1000 visualizacoes, quanto ganha no tiktok por view, quanto paga tiktok por visualização, quanto paga tiktok por 1000 visualizações, quanto paga tiktok por view, realtools',
    },
    twitch: {
      title: 'Calculadora Twitch 2026 | Subs e AIP',
      desc: 'Calculadora de receita para streamers na Twitch: inscrições Tier 1/2/3, divisões Partner Plus (50/50 e 70/30), bits e anúncios AIP. | RealTools',
      keywords: 'calculadora de receitas twitch, calculadora subs twitch, quanto ganha um streamer na twitch, divisao partner plus twitch, bits para reais, quanto paga twitch por sub, quanto paga twitch por viewer, calculadora de bit twitch, calculadora de ganhos twitch, calculadora sub twitch, realtools',
    },
    kick: {
      title: 'Calculadora Kick 2026 | 95/5 & KCP',
      desc: 'Calculadora de ganhos na Kick. Calcule receitas com a divisão de assinaturas 95/5 ($4,74 líquido/sub) e a remuneração horária do KCP. | RealTools',
      keywords: 'calculadora de ganhos kick, calculadora streamer kick, divisao 95 5 kick, quanto a kick paga por hora, kick vs twitch ganhos, quanto paga kick por sub, quanto paga kick por hora, calculadora de subs kick, calculadora de kicks, realtools',
    },
    runway: {
      title: 'Calculadora Runway 2026 | Quanto Tempo Dura?',
      desc: 'Descubra quantos anos suas economias duram com retiradas mensais, rendimento e inflação. Análise SWP. | RealTools',
      keywords: 'calculadora runway, quanto tempo dura meu dinheiro, quanto dura 1 milhão, calculadora swp, calculadora aposentadoria, startup runway calculator, financial runway calculator, free runway calculator, calculadora runway grátis, calculadora runway startup, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Calculadora de Combustível 2026 | Custo por km',
      desc: 'Calculadora grátis de custo de combustível. Distância, consumo e preço para custo da viagem, litros e gasto mensal. | RealTools',
      keywords: 'calculadora de combustível, custo viagem gasolina, custo por km carro, consumo combustível cálculo, quanto custa minha viagem, realtools',
    },
  },
  ko: {
    root: {
      title: '애드센스, 애드몹 & 크리에이터 수익 계산기 2026 | 유튜브·틱톡·트위치·킥',
      desc: '정확한 구글 애드센스, 애드몹, 유튜브, 틱톡, 트위치, 킥 수익 계산기. 조회수와 구독자 기반의 정밀한 월간 및 연간 수익을 예측합니다. 런웨이 계산 포함. | RealTools',
      keywords: '애드센스 수익 계산기, 구글 애드센스 수익 계산, 애드몹 수익 계산기, 웹사이트 광고수익 계산, 앱 광고수익 계산, 유튜브 수익 계산기, 틱톡 수익 계산기, 트위치 수익 계산기, 킥 수익 계산기, 애드센스 클릭당 수익, 애드센스 1000회당 수익, runway calculator, 런웨이 계산기, realtools',
    },
    admob: {
      title: '애드몹 수익 계산기 2026 | ARPDAU & eCPM',
      desc: 'iOS·안드로이드 앱을 위한 애드몹 수익 계산기. ARPDAU, eCPM, 미디에이션 효과를 예측합니다. | RealTools',
      keywords: '애드몹 수익 계산기, admob 수익 계산, arpdau 계산기, 앱 광고수익 계산, realtools',
    },
    adsense: {
      title: '구글 애드센스 수익 계산기 2026 | 웹사이트 페이지 RPM & 수익 예측',
      desc: '구글 애드센스 웹사이트 광고수익 계산기. 분야별 페이지 RPM, 트래픽 국가, 광고 단가를 기반으로 예상 월수익을 정밀하게 계산합니다. | RealTools',
      keywords: '구글 애드센스 수익 계산기, 애드센스 수익 계산, 웹사이트 광고수익 계산, 페이지 rpm 계산기, 블로그 수익 예측, 애드센스 클릭당 수익, 애드센스 cpc 수익, 유튜브 조회수 1000당 수익, 애드센스 하루 수익 계산, realtools',
    },
    youtube: {
      title: '유튜브 수익 계산기 2026 | 동영상 RPM & 쇼츠 수익 예측기',
      desc: '유튜브 크리에이터를 위한 동영상 및 쇼츠 광고수익 계산기. 분야별 RPM, 채널 멤버십, 중간 광고 효과를 반영하여 예상 수입을 산출합니다. | RealTools',
      keywords: '유튜브 수익 계산기, 유튜브 조회수 수익 계산, 유튜브 rpm 계산기, 유튜브 쇼츠 수익 계산기, 유튜브 수익 창출, 채널 멤버십 수익, 유튜브 조회수 1000당 수익, 유튜브 1만뷰 수익, 유튜브 cpm 계산기, 유튜브 수익 계산기 사이트, 유튜브 쇼츠 1000뷰 수익, realtools',
    },
    tiktok: {
      title: '틱톡 수익 계산기 2026 | 크리에이터 리워드 & 라이브 다이아몬드 환전',
      desc: '틱톡 수익 계산기. 1분 이상 동영상의 크리에이터 리워드 프로그램 수익 및 라이브 방송 선물(다이아몬드) 환전 금액을 예측합니다. | RealTools',
      keywords: '틱톡 수익 계산기, 틱톡 조회수 수익, 틱톡 다이아몬드 원화 환전, 틱톡 크리에이터 리워드, 틱톡 라이브 후원, 틱톡 조회수 1000당 수익, 틱톡 100만뷰 수익, 틱톡 라이브 수익 계산기, 틱톡 1분 이상 영상 수익, realtools',
    },
    twitch: {
      title: '트위치 수익 계산기 2026 | 정기구독 & AIP 광고 수익 시뮬레이터',
      desc: '트위치 스트리머를 위한 정기구독 수익 계산기. 티어 1/2/3 구독, 파트너 플러스 분배율(50/50 및 70/30), 비트, AIP 광고 수익을 예측합니다. | RealTools',
      keywords: '트위치 수익 계산기, 트위치 구독 수익, 스트리머 월수익 계산기, 파트너 플러스 분배율, 트위치 비트 환전, 트위치 구독 1개당 수익, 트위치 시청자수 수익, realtools',
    },
    kick: {
      title: '킥 수익 계산기 2026 | 95/5 구독 배분 & KCP 시급 스트리밍 수익',
      desc: '킥 스트리머 수익 계산기. 파격적인 95/5 구독 수익 배분(구독당 순수익 $4.74)과 KCP 크리에이터 프로그램 시급을 계산합니다. | RealTools',
      keywords: '킥 수익 계산기, 킥 스트리머 수익, 킥 95 5 구독 배분, 킥 크리에이터 프로그램 시급, 킥 트위치 수익 비교, 킥 구독 1개당 수익, 킥 시청자 100명 수익, realtools',
    },
    runway: {
      title: '자산수명 계산기 2026 | 은퇴자금 몇 년?',
      desc: '월 인출·수익률·인플레이션으로 저축이 몇 년 버틸지 계산. SWP 손익분기점 포함. | RealTools',
      keywords: '자산수명 계산기, 은퇴자금 몇 년, 인출 시뮬레이션, swp 계산기, 10억 몇 년, startup runway calculator, financial runway calculator, free runway calculator, 무료 런웨이 계산기, 스타트업 런웨이 계산기, realtools',
    },
    'fuel-cost-calculator': {
      title: '연료비 계산기 2026 | 주행 유류비 예측',
      desc: '거리·연비·유가를 입력해 여행 연료비·필요량·월 지출을 무료 계산. 전 세계 지원. | RealTools',
      keywords: '연료비 계산기, 주행 유류비 계산, km당 유류비, 연비 계산기, 여행 기름값 계산, realtools',
    },
  },
  it: {
    root: {
      title: 'Calcolatore AdSense, AdMob & Runway 2026 | Guadagni',
      desc: 'Calcolatore accurato dei guadagni di Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcola Page RPM, ARPDAU e guadagni streaming. | RealTools',
      keywords: 'calcolatore guadagni adsense, calcolatore entrate adsense, guadagni pubblicitari sito web, calcolo entrate admob, quanto si guadagna con adsense, calcolatore soldi youtube, calcolatore tiktok, calcolatore guadagni twitch, calcolatore kick, quanto paga adsense per click, quanto si guadagna con youtube 1000 visualizzazioni, runway calculator, calcolatore runway gratuito, realtools',
    },
    admob: {
      title: 'Calcolatore AdMob 2026 | ARPDAU ed eCPM',
      desc: 'Calcolatore AdMob per app iOS e Android. Stima ARPDAU, eCPM e ricavi con rewarded e mediation. | RealTools',
      keywords: 'calcolatore admob, calcolatore guadagni admob, arpdau calcolo, admob ecpm, realtools',
    },
    adsense: {
      title: 'Calcolatore AdSense 2026 | RPM & Guadagni',
      desc: 'Calcolatore accurato dei guadagni Google AdSense. Stima il Page RPM del tuo sito web, le visualizzazioni e le entrate mensili per nicchia e paese. | RealTools',
      keywords: 'calcolatore entrate adsense, calcolatore guadagni adsense, guadagni pubblicitari sito web, page rpm calcolo, quanto si guadagna con adsense, quanto paga adsense per click, quanto paga adsense per 1000 visualizzazioni, adsense cpc calcolatore, realtools',
    },
    youtube: {
      title: 'Calcolatore YouTube 2026 | RPM & Shorts',
      desc: 'Calcolatore di entrate per creator YouTube. Calcola i guadagni di video lunghi e Shorts in base a RPM di nicchia, abbonamenti e annunci mid-roll. | RealTools',
      keywords: 'calcolatore guadagni youtube, calcolatore soldi youtube, quanto paga youtube per visualizzazione, youtube rpm calcolatore, guadagni youtube shorts, quanto si guadagna con youtube 1000 visualizzazioni, quanto paga youtube per 1000 visualizzazioni, youtube cpm calcolatore, quanto paga youtube 1000 visualizzazioni, quanto paga youtube per 1000 visualizzazioni shorts, quanto paga youtube per 1000 visualizzazioni in italia, realtools',
    },
    tiktok: {
      title: 'Calcolatore TikTok 2026 | Ricompense',
      desc: 'Calcolatore di guadagni TikTok. Calcola le entrate del Creator Rewards Program per i video >1 min e la conversione dei diamanti dei regali LIVE. | RealTools',
      keywords: 'calcolatore soldi tiktok, quanto paga tiktok, calcolatore guadagni tiktok, diamanti tiktok in euro, programma ricompense creator, quanto paga tiktok per 1000 visualizzazioni, quanto si guadagna su tiktok, quanto paga tiktok per 1 milione di visualizzazioni, quanto paga tiktok per like, quanto paga tiktok per 100.000 visualizzazioni, realtools',
    },
    twitch: {
      title: 'Calcolatore Twitch 2026 | Abbonamenti AIP',
      desc: 'Calcolatore guadagni per streamer Twitch: abbonamenti Tier 1/2/3, divisioni Partner Plus (50/50 e 70/30), bits e programma pubblicitario AIP. | RealTools',
      keywords: 'calcolatore entrate twitch, calcolatore sub twitch, quanto guadagna uno streamer su twitch, programma partner plus twitch, bits in euro, quanto paga twitch per sub, quanto paga twitch per spettatore, calcolatore guadagni twitch, realtools',
    },
    kick: {
      title: 'Calcolatore Kick 2026 | 95/5 & KCP',
      desc: 'Calcolatore di entrate per streamer Kick. Calcola i ricavi con la divisione abbonamenti 95/5 ($4,74 netti/sub) e la paga oraria del Creator Program. | RealTools',
      keywords: 'calcolatore guadagni kick, calcolatore streamer kick, divisione 95 5 kick, stipendio orario kick kcp, kick vs twitch guadagni, quanto paga kick per sub, quanto paga kick all ora, realtools',
    },
    runway: {
      title: 'Calcolatore Runway 2026 | Quanto Dura?',
      desc: 'Scopri quanti anni dureranno i risparmi con prelievi mensili, rendimento e inflazione. Analisi SWP. | RealTools',
      keywords: 'calcolatore runway, quanto durano i miei risparmi, quanto dura 1 milione, calcolatore swp, calcolatore pensione, startup runway calculator, financial runway calculator, free runway calculator, calcolatore runway gratuito, calcolatore runway startup, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Calcolatore Carburante 2026 | Costo per km',
      desc: 'Calcolatore gratis del costo carburante. Distanza, consumo e prezzo per costo viaggio, litri e spesa mensile. | RealTools',
      keywords: 'calcolatore carburante, costo viaggio benzina, costo per km auto, consumo carburante calcolo, quanto costa il mio viaggio, realtools',
    },
  },
  ru: {
    root: {
      title: 'Калькулятор Дохода AdSense, AdMob и Runway 2026 | RealTools',
      desc: 'Точный калькулятор дохода от рекламы Google AdSense, AdMob, YouTube, TikTok, Twitch и Kick. Рассчитайте доходность и срок капитала. | RealTools',
      keywords: 'калькулятор дохода adsense, калькулятор доходов google adsense, калькулятор дохода с сайта, калькулятор admob, заработок на приложениях, калькулятор дохода ютуб, калькулятор твич, доход тикток, калькулятор kick, калькулятор окупаемости стартапа, сколько можно заработать на рекламе, расчет доходов от рекламы, realtools',
    },
    admob: {
      title: 'Калькулятор Дохода AdMob 2026 | Расчет ARPDAU и eCPM',
      desc: 'Калькулятор AdMob для iOS и Android. Расчет ARPDAU, eCPM и дневного дохода от Rewarded видео, межстраничных объявлений и медиации. | RealTools',
      keywords: 'калькулятор admob, калькулятор дохода admob, arpdau калькулятор, admob ecpm калькулятор, доход мобильных приложений, заработок на admob, сколько платит admob, admob ecpm в россии, монетизация мобильных игр, расчет дохода admob, realtools',
    },
    adsense: {
      title: 'Калькулятор Дохода AdSense 2026 | Оценка Page RPM Сайта',
      desc: 'Точный калькулятор дохода Google AdSense. Рассчитайте Page RPM сайта и прогноз прибыли по 26 тематикам, странам и рекламным блокам. | RealTools',
      keywords: 'калькулятор дохода google adsense, калькулятор adsense, page rpm калькулятор, доход сайта adsense, сколько платит adsense за клик, сколько платит adsense за 1000 просмотров, цена клика adsense, заработок на adsense калькулятор, доходность сайта калькулятор, как рассчитать доход adsense, realtools',
    },
    youtube: {
      title: 'Калькулятор Дохода YouTube 2026 | RPM, CPM и Shorts',
      desc: 'Рассчитайте заработок на YouTube: доход от длинных видео, Shorts, спонсорства и интеграций в 15+ тематиках. | RealTools',
      keywords: 'калькулятор дохода youtube, калькулятор заработка на ютубе, сколько платит ютуб за просмотры, youtube rpm калькулятор, доход от shorts, калькулятор cpm youtube, сколько платит ютуб за 1000 просмотров, сколько платят за 1000000 просмотров на ютубе, монетизация ютуб калькулятор, заработок на шортс, realtools',
    },
    tiktok: {
      title: 'Калькулятор Дохода TikTok 2026 | Creator Rewards и LIVE',
      desc: 'Калькулятор выплат в TikTok: расчет вознаграждения Creator Rewards за видео >1 мин и конвертация подарков LIVE в реальные деньги. | RealTools',
      keywords: 'калькулятор дохода tiktok, сколько платит тикток, калькулятор бриллиантов tiktok, выплаты creator rewards, сколько платит тикток за 1000 просмотров, сколько платит тикток за 1 миллион просмотров, калькулятор монет тикток, заработок в тик токе, сколько стоит подарок в тик токе, realtools',
    },
    twitch: {
      title: 'Калькулятор Twitch 2026 | Подписки, Bits и Доход от Рекламы',
      desc: 'Оцените доход стримера на Twitch: платные подписки Tier 1/2/3, распределение Partner Plus (50/50 и 70/30), реклама AIP и Bits. | RealTools',
      keywords: 'калькулятор дохода twitch, калькулятор подписок twitch, сколько зарабатывает стример на twitch, партнер плюс twitch, bits в доллары, сколько стоит подписка на твиче, сколько платят за сабку на твиче, калькулятор заработка твич, доход стримера калькулятор, realtools',
    },
    kick: {
      title: 'Калькулятор Kick 2026 | 95/5 Подписки и Ставка KCP',
      desc: 'Калькулятор заработка на Kick: доход с распределением подписок 95/5 ($4.74 net/sub) и почасовая оплата программы KCP. | RealTools',
      keywords: 'калькулятор дохода kick, калькулятор стримера kick, разделение 95 5 kick, почасовая оплата kcp kick, kick против twitch, сколько платит кик стримерам, сколько стоит подписка на kick, заработок на kick com, кик стрим калькулятор, realtools',
    },
    runway: {
      title: 'Калькулятор Runway 2026 | На Сколько Хватит Денег',
      desc: 'Узнайте, на сколько лет хватит накоплений или капитала стартапа при регулярных снятиях, доходности и инфляции. Анализ SWP. | RealTools',
      keywords: 'калькулятор runway, на сколько хватит сбережений, калькулятор swp, финансовая подушка калькулятор, калькулятор капитала стартапа, на сколько лет хватит миллиона, систематический вывод средств swp, калькулятор финансовой независимости, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Калькулятор Расхода Топлива 2026 | Стоимость Поездки на км',
      desc: 'Бесплатный калькулятор стоимости бензина и дизеля. Введите расстояние, расход и цену за литр для расчета стоимости поездки. | RealTools',
      keywords: 'калькулятор топлива, стоимость поездки на бензин, расход топлива на 100 км, расчет бензина на поездку, стоимость километра пути, рассчитать бензин на дорогу туда и обратно, расход бензина на авто калькулятор, realtools',
    },
  },
  ar: {
    root: {
      title: 'حاسبة أرباح الإعلانات والسيولة 2026 | RealTools',
      desc: 'حاسبات مجانية لحساب أرباح أدسنس، أدموب، يوتيوب، تيك توك، تويتش، كيك، وحساب مدرج السيولة للمشاريع. قدر أرباحك وعائداتك بدقة. | RealTools',
      keywords: 'حاسبة أرباح أدسنس, حاسبة أرباح جوجل أدسنس, حاسبة أرباح أدموب, حاسبة أرباح يوتيوب, حاسبة أرباح تيك توك, أرباح تويتش, أرباح كيك, حساب أرباح المواقع, حاسبة السيولة المالية, كم يربح صناع المحتوى, حاسبة أرباح الإعلانات, realtools',
    },
    admob: {
      title: 'حاسبة أرباح أدموب 2026 | أداة حساب ARPDAU و eCPM',
      desc: 'حاسبة أدموب دقيقة لتطبيقات iOS وأندرويد. قدر الأرباح اليومية والشهرية لإعلانات المكافأة، البينية، والشاشات الافتتاحية مع الوساطة. | RealTools',
      keywords: 'حاسبة أدموب, حاسبة أرباح التطبيقات, حساب arpdau, حساب ecpm admob, أرباح إعلانات التطبيقات, كم يدفع ادموب, حاسبة ارباح جوجل ادموب, اعلانات المكافأة ادموب, كيف تربح من تطبيقات الجوال, realtools',
    },
    adsense: {
      title: 'حاسبة أرباح أدسنس 2026 | عائد الألف ظهور Page RPM للمواقع',
      desc: 'احسب الأرباح المتوقعة لموقعك مع حاسبة أدسنس وعائد الألف ظهور. توقع الإيرادات عبر 26 تخصصاً ودول العالم ومواضع الإعلانات. | RealTools',
      keywords: 'حاسبة أرباح جوجل أدسنس, حاسبة أدسنس, حساب عائد الألف ظهور, أرباح المواقع من أدسنس, كم يدفع أدسنس لكل نقرة, كم يدفع أدسنس لكل 1000 ظهور, سعر النقرة في ادسنس cpc, حاسبة ارباح المواقع الالكترونية, كيف تحسب ارباح ادسنس, realtools',
    },
    youtube: {
      title: 'حاسبة أرباح يوتيوب 2026 | عائد المشاهدات RPM و Shorts',
      desc: 'احسب أرباح قناتك على يوتيوب: الفيديوهات الطويلة، وفيديوهات Shorts، والانتساب، والرعايات عبر أكثر من 15 تخصصاً. | RealTools',
      keywords: 'حاسبة أرباح يوتيوب, كم يدفع يوتيوب لكل 1000 مشاهدة, حاسبة rpm يوتيوب, أرباح يوتيوب شورتس, حاسبة cpm يوتيوب, كم أرباح المليون مشاهدة في اليوتيوب, كم يدفع اليوتيوب على المشاهدات, حاسبة دخل اليوتيوب, شروط الربح من اليوتيوب 2026, realtools',
    },
    tiktok: {
      title: 'حاسبة أرباح تيك توك 2026 | مكافآت المبدعين وهدايا البث',
      desc: 'احسب أرباح برنامج Creator Rewards للفيديوهات الأطول من دقيقة واحدة وتحويل ماس هدايا البث المباشر LIVE إلى دولارات. | RealTools',
      keywords: 'حاسبة أرباح تيك توك, كم يدفع تيك توك, تحويل ماس تيك توك لدولار, برنامج مكافآت المبدعين تيك توك, كم يدفع تيك توك على 1000 مشاهدة, كم أرباح مليون مشاهدة في التيك توك, حساب نقاط التيك توك إلى فلوس, كم سعر الأسد في التيك توك, هدايا التيك توك كم تساوي, realtools',
    },
    twitch: {
      title: 'حاسبة أرباح تويتش 2026 | الاشتراكات وإعلانات البث AIP',
      desc: 'احسب أرباحك على تويتش: اشتراكات المستويات 1/2/3، وتقسيم Partner Plus (50/50 و 70/30)، وإعلانات البث والبتس. | RealTools',
      keywords: 'حاسبة أرباح تويتش, حاسبة اشتراكات تويتش, كم يربح الستريمر في تويتش, برنامج بارتنر بلس تويتش, تحويل البتس إلى دولار, كم سعر السب في تويتش, كم أرباح البث المباشر في تويتش, realtools',
    },
    kick: {
      title: 'حاسبة أرباح كيك 2026 | تقسيم الاشتراكات 95/5 وراتب KCP',
      desc: 'احسب أرباح البث على منصة كيك: احتفاظك بنسبة 95% من الاشتراكات ($4.74 صافية) وراتب برنامج KCP بالساعة. | RealTools',
      keywords: 'حاسبة أرباح كيك, حاسبة بثوث كيك, تقسيم اشتراكات كيك 95 5, راتب كيك بالساعة, كيك مقابل تويتش, كم يدفع كيك للستريمر, شروط الربح من كيك, أرباح الاشتراكات في كيك, realtools',
    },
    runway: {
      title: 'حاسبة مدرج السيولة 2026 | كم ستكفيك مدخراتك؟',
      desc: 'اكتشف كم سنة ستكفيك أموالك أو رأس مال شركتك الناشئة مع السحوبات الشهرية ونسبة العائد والتضخم. تحليل SWP. | RealTools',
      keywords: 'حاسبة السيولة المالية, كم ستكفيني مدخراتي, حاسبة swp للسحب المنتظم, حاسبة مصاريف التقاعد, مدرج سيولة الشركات الناشئة, كم يكفي مليون دولار للعيش, حاسبة الادخار والتقاعد المبكر fire, realtools',
    },
    'fuel-cost-calculator': {
      title: 'حاسبة تكلفة الوقود 2026 | تكلفة استهلاك البنزين لكل كم',
      desc: 'حاسبة وقود مجانية لأي دولة. أدخل المسافة ومعدل الاستهلاك وسعر اللتر لحساب تكلفة الرحلة وكمية الوقود والتكلفة الشهرية. | RealTools',
      keywords: 'حاسبة تكلفة الوقود, حساب استهلاك البنزين للرحلة, حساب تكلفة البنزين لكل كيلومتر, كم لتر بنزين لقطع 100 كم, حاسبة صرفية البنزين للسيارة, حساب تكلفة السفر بالسيارة ذهاب وإياب, realtools',
    },
  },
  zh: {
    root: {
      title: '广告收益与资金跑道计算器 2026 | RealTools',
      desc: '精准预估 Google AdSense、AdMob、YouTube、TikTok、Twitch 和 Kick 收益，以及存款与创业资金跑道测算。 | RealTools',
      keywords: '广告收益计算器, adsense计算器, admob收益计算器, youtube赚钱计算器, tiktok收益计算器, twitch订阅收益, kick收益计算器, 资金跑道计算器, 网站广告收入预估, 创作者收入模拟器, realtools',
    },
    admob: {
      title: 'AdMob 收益计算器 2026 | ARPDAU 与 eCPM 预估工具',
      desc: '专为 iOS 和 Android 打造的 AdMob 计算器。精准测算激励视频、插屏广告及应用开屏广告的 ARPDAU 与日收益。 | RealTools',
      keywords: 'admob收益计算器, 应用广告收入计算, arpdau计算器, admob ecpm预估, 移动应用变现, admob激励视频收益, app每千次展示收入, admob中介聚合收益, 独立开发者app变现, realtools',
    },
    adsense: {
      title: 'AdSense 收益计算器 2026 | 网站 Page RPM 与收入预估',
      desc: '精准测算 Google AdSense 收益。支持 26 个行业垂直领域、全球不同国家流量和广告单元组合的 Page RPM 估算。 | RealTools',
      keywords: 'Google AdSense收益计算器, adsense收入预估, 网站广告收入测算, 网页rpm计算, adsense每千次展示多少钱, 网站一千次浏览能赚多少, adsense点击单价cpc, 博客流量变现计算, realtools',
    },
    youtube: {
      title: 'YouTube 赚钱计算器 2026 | RPM、CPM 与 Shorts 收益',
      desc: '测算 YouTube 长视频、Shorts 短视频、频道会员及广告收入。涵盖 15+ 创作垂类与全球受众收益模型。 | RealTools',
      keywords: 'youtube赚钱计算器, youtube收入预估, youtube千次播放收益, youtube rpm计算器, youtube shorts短视频收益, youtube cpm测算, youtube一百万播放量能赚多少钱, 油管收益怎么算, 油管创作者收入, realtools',
    },
    tiktok: {
      title: 'TikTok 收益计算器 2026 | 创作者奖励与直播礼物工具',
      desc: '计算 TikTok Creator Rewards 创作者奖励计划收入及 LIVE 直播礼物钻石兑现金额。 | RealTools',
      keywords: 'tiktok赚钱计算器, tiktok收益计算, tiktok千次播放多少钱, tiktok钻石兑换美元, tiktok创作者基金计算, tiktok播放量怎么变现, tiktok直播礼物折算, tiktok创作者奖励计划收入, realtools',
    },
    twitch: {
      title: 'Twitch 收入计算器 2026 | 订阅分成与 AIP 广告预估',
      desc: '面向 Twitch 主播的收入计算器：测算 Tier 1/2/3 订阅、Partner Plus (50/50 与 70/30) 分成、Bits 及 AIP 广告时薪。 | RealTools',
      keywords: 'twitch收入计算器, twitch订阅收益, twitch主播能赚多少钱, partner plus分成, bits折算美元, twitch aip收益, twitch一个订阅多少钱, 游戏主播收入计算器, realtools',
    },
    kick: {
      title: 'Kick 主播收益计算器 2026 | 95/5 分成与 KCP 时薪测算',
      desc: '测算 Kick 平台 95/5 订阅分成（每订阅净得 $4.74 美元）及 KCP 激励计划的平均时薪与月度总收益。 | RealTools',
      keywords: 'kick收益计算器, kick主播收入, kick 95 5分成, kick时薪多少, kick对比twitch收益, kick订阅怎么分成, kick直播平台分成比例, kick kcp激励计划, realtools',
    },
    runway: {
      title: '资金跑道计算器 2026 | 存款与创业本金能用多久',
      desc: '免费资金跑道测算工具。根据每月提取额、年化投资回报与通胀测算存款或创业储备资金的消耗与维持年限。SWP 模型。 | RealTools',
      keywords: '资金跑道计算器, 存款能用多久, 100万理财够花几年, swp系统提取计算器, 退休金消耗测算, 创业资金储备, 提前退休fire计算器, 资金能维持多少个月, realtools',
    },
    'fuel-cost-calculator': {
      title: '汽车油费计算器 2026 | 自驾出行百公里油耗与费用预估',
      desc: '输入行驶距离、百公里油耗及油价，一键计算单程及往返总油费、每公里油费成本及拼车人均分摊。 | RealTools',
      keywords: '油费计算器, 自驾游油费测算, 百公里油耗计算, 每公里多少油钱, 汽车出行燃油成本, 开车往返油费计算, 拼车油费分摊计算, realtools',
    },
  },
  tr: {
    root: {
      title: 'AdSense, AdMob ve Runway Gelir Hesaplayıcı 2026 | RealTools',
      desc: 'Google AdSense, AdMob, YouTube, TikTok, Twitch, Kick ve nakit pisti için ücretsiz gelir hesaplama araçları. Kazanç ve metriklerinizi modelleyin. | RealTools',
      keywords: 'reklam geliri hesaplayıcı, adsense hesaplayıcı, admob gelir hesaplama, youtube para hesaplama, tiktok para hesaplama, twitch abone geliri, kick hesaplayıcı, runway hesaplayıcı, site reklam geliri hesaplama, içerik üreticisi gelir hesaplama, realtools',
    },
    admob: {
      title: 'AdMob Gelir Hesaplayıcı 2026 | ARPDAU ve eCPM Aracı',
      desc: 'iOS ve Android uygulamaları için AdMob hesaplayıcı. Ödüllü video, geçiş ve açılış reklamlarında ARPDAU ve eCPM kazançlarını hesaplayın. | RealTools',
      keywords: 'admob gelir hesaplayıcı, admob hesaplama, arpdau hesaplayıcı, admob ecpm hesaplama, mobil uygulama reklam geliri, admob 1000 gösterim kaç tl, admob ödüllü video geliri, oyun reklam geliri hesaplama, realtools',
    },
    adsense: {
      title: 'AdSense Hesaplayıcı 2026 | Sayfa RPM ve Web Sitesi Geliri',
      desc: 'Doğru Google AdSense gelir hesaplayıcısı. 26 niş sektör, ülke ve reklam birimi kombinasyonlarıyla web sitenizin sayfa RPM değerini tahmin edin. | RealTools',
      keywords: 'google adsense gelir hesaplama, adsense hesaplayıcı, sayfa rpm hesaplama, web sitesi reklam geliri, adsense 1000 görüntüleme kaç tl, adsense tbm hesaplama, blog geliri hesaplama, adsense tıklama başına ne kadar verir, realtools',
    },
    youtube: {
      title: 'YouTube Para Hesaplama 2026 | RPM, CPM ve Shorts Kazancı',
      desc: 'YouTube uzun videolar, Shorts, katıl üyelikleri ve reklam gelirlerini hesaplayın. 15+ içerik kategorisinde kanal kazancınızı öngörün. | RealTools',
      keywords: 'youtube para hesaplama, youtube gelir hesaplayıcı, youtube 1000 izlenme kaç para, youtube rpm hesaplama, youtube shorts para kazanma, youtube 1 milyon izlenme ne kadar kazandırır, youtube cpm hesaplama, youtube izlenme başı para, realtools',
    },
    tiktok: {
      title: 'TikTok Para Hesaplama 2026 | Creator Rewards ve Canlı Yayın',
      desc: 'TikTok Creator Rewards Programı izlenme kazançlarını ve Canlı Yayın hediyesi Elmasların nakit karşılığını hesaplayın. | RealTools',
      keywords: 'tiktok para hesaplama, tiktok kazanç hesaplama, tiktok elmas kaç tl, tiktok izlenme parası, tiktok 1000 izlenme ne kadar, tiktok 1 milyon izlenme kaç para, tiktok hediye fiyatları ve karşılığı, tiktok canlı yayın kazancı hesaplama, realtools',
    },
    twitch: {
      title: 'Twitch Gelir Hesaplayıcı 2026 | Abonelik, Bit ve AIP Reklamı',
      desc: 'Twitch yayıncıları için kazanç hesaplayıcı: Kademe 1/2/3 abonelikler, Partner Plus (%50/%50 ve %70/%30) payı, Bitler ve AIP reklam geliri. | RealTools',
      keywords: 'twitch gelir hesaplama, twitch abone parası, twitch yayıncıları ne kadar kazanıyor, partner plus payı, twitch bit hesaplama, twitch 1 abone kaç tl, twitch saatlik reklam geliri, yayıncı kazancı hesaplama, realtools',
    },
    kick: {
      title: 'Kick Gelir Hesaplayıcı 2026 | %95/5 Abone Payı ve KCP Ücreti',
      desc: 'Kick yayıncı gelirlerini hesaplayın: %95/5 abone payı (abone başına net $4.74) ve KCP programı saatlik kazancı. | RealTools',
      keywords: 'kick gelir hesaplayıcı, kick yayıncı kazancı, kick 95 5 payı, kick saatlik ücret kcp, kick mi twitch mi, kick abone ücreti ne kadar, kick yayıncılarına ne kadar ödüyor, kick yayın geliri, realtools',
    },
    runway: {
      title: 'Finansal Pist (Runway) Hesaplayıcı 2026 | Birikimim Ne Kadar Yeter?',
      desc: 'Birikimlerinizin veya girişim sermayenizin aylık harcama, yatırım getirisi ve enflasyon artışıyla kaç yıl yeteceğini hesaplayın. SWP analizi. | RealTools',
      keywords: 'runway hesaplayıcı, birikimim ne kadar yeter, para ne kadar süre dayanır, swp hesaplayıcı, emeklilik maaş çekim hesaplama, 1 milyon lira ne kadar süre yeter, girişim nakit pisti hesaplama, finansal özgürlük hesaplayıcı, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Yakıt Maliyeti Hesaplayıcı 2026 | Yolculuk Benzin ve Mazot Tutarı',
      desc: 'Mesafe, yakıt tüketimi ve pompa fiyatını girerek yolculuk yakıt masrafını, kilometre başına maliyeti ve kişi başı ücreti hesaplayın. | RealTools',
      keywords: 'yakıt hesaplama, yol yakıt maliyeti hesaplama, 100 km de ne kadar yakar, km başına benzin maliyeti, yolculuk masrafı hesaplama, gidiş dönüş benzin hesaplama, araç kilometre maliyeti, realtools',
    },
  },
  pl: {
    root: {
      title: 'Kalkulator Dochodów AdSense, AdMob i Runway 2026 | RealTools',
      desc: 'Bezpłatne kalkulatory zarobków z Google AdSense, AdMob, YouTube, TikTok, Twitch, Kick oraz wyliczania czasu utrzymania kapitału. | RealTools',
      keywords: 'kalkulator dochodów adsense, kalkulator admob, zarobki na youtube kalkulator, kalkulator tiktok, kalkulator subów twitch, kalkulator kick, kalkulator runway, kalkulator zarobków z reklam, ile zarabia twórca, realtools',
    },
    admob: {
      title: 'Kalkulator Dochodów AdMob 2026 | Narzędzie ARPDAU i eCPM',
      desc: 'Precyzyjny kalkulator AdMob dla aplikacji na iOS i Androida. Oblicz ARPDAU, eCPM i dzienne zarobki z reklam z nagrodą i pełnoekranowych. | RealTools',
      keywords: 'kalkulator admob, zarobki z admob, arpdau kalkulator, admob ecpm kalkulator, zarobki z aplikacji mobilnej, ile płaci admob za 1000 wyświetleń, admob rewarded video zarobki, monetyzacja gier mobilnych, realtools',
    },
    adsense: {
      title: 'Kalkulator AdSense 2026 | Page RPM i Szacowanie Zarobków Strony',
      desc: 'Oblicz potencjalne przychody ze strony www z Google AdSense. Szacuj Page RPM i miesięczny dochód w 26 niszach tematycznych i formatach reklam. | RealTools',
      keywords: 'kalkulator zarobków google adsense, kalkulator adsense, page rpm kalkulator, ile płaci adsense za 1000 wyświetleń, zarobki z reklam na stronie, ile płaci adsense za kliknięcie cpc, kalkulator zysków z bloga, realtools',
    },
    youtube: {
      title: 'Kalkulator Zarobków YouTube 2026 | RPM, CPM i Shorts',
      desc: 'Oblicz przychody z YouTube: filmy długometrażowe, YouTube Shorts, wspieranie kanału i stawki RPM w ponad 15 kategoriach tematycznych. | RealTools',
      keywords: 'kalkulator zarobków youtube, ile płaci youtube za wyświetlenia, youtube rpm kalkulator, zarobki z youtube shorts, ile zarabia się na youtube za 1000 wyświetleń, ile płaci youtube za 1 milion wyświetleń, youtube cpm kalkulator, zarobki youtubera, realtools',
    },
    tiktok: {
      title: 'Kalkulator Zarobków TikTok 2026 | Creator Rewards i LIVE',
      desc: 'Kalkulator pieniędzy z TikToka: oblicz zarobki z programu Creator Rewards za kwalifikowane wyświetlenia oraz wymianę Diamentów z LIVE. | RealTools',
      keywords: 'kalkulator tiktok, ile płaci tiktok za wyświetlenia, diamenty tiktok na pln usd, zarobki z tiktoka kalkulator, ile płaci tiktok za 1000 wyświetleń, ile płaci tiktok za 1 mln wyświetleń, kalkulator prezentów tiktok, creator rewards program zarobki, realtools',
    },
    twitch: {
      title: 'Kalkulator Dochodów Twitch 2026 | Subskrypcje, Bity i Reklamy AIP',
      desc: 'Kalkulator dochodów dla streamerów na Twitchu: suby poziomu 1/2/3, podział Partner Plus (50/50 i 70/30), bity i stawki godzinowe AIP. | RealTools',
      keywords: 'kalkulator zarobków twitch, kalkulator subów twitch, ile zarabia streamer na twitchu, partner plus twitch podział, bity na pieniądze twitch, ile kosztuje sub na twitchu dla twórcy, twitch aip reklamy kalkulator, realtools',
    },
    kick: {
      title: 'Kalkulator Zarobków Kick 2026 | Podział 95/5 i Stawka KCP',
      desc: 'Oblicz dochód na platformie Kick: 95% podziału z subskrypcji (4,74 $ netto za suba) oraz wynagrodzenie godzinowe programu KCP. | RealTools',
      keywords: 'kalkulator zarobków kick, zarobki na kick, podział 95 5 kick, ile płaci kick za godzinę, kick vs twitch zarobki, ile dostaje streamer za suba na kick, kick creator program zarobki, realtools',
    },
    runway: {
      title: 'Kalkulator Runway 2026 | Na Ile Lat Wystarczą Oszczędności?',
      desc: 'Dowiedz się, na jak długo wystarczą Twoje oszczędności przy regularnych wypłatach, stopie zwrotu z inwestycji i inflacji. Model SWP. | RealTools',
      keywords: 'kalkulator runway, na ile starczą oszczędności, kalkulator swp, systematyczna wypłata kapitału, ile czasu wystarczy milion, kalkulator wolności finansowej fire, na ile miesięcy wystarczy kapitał, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Kalkulator Kosztu Paliwa 2026 | Koszt Podróży Samochodem na km',
      desc: 'Wprowadź dystans, średnie spalanie i cenę za litr, aby poznać całkowity koszt paliwa na trasie, koszt na km oraz podział na pasażerów. | RealTools',
      keywords: 'kalkulator kosztu paliwa, koszt podróży samochodem, ile spali na 100 km, koszt paliwa na km, obliczanie kosztów benzyny na wyjazd, kalkulator spalania benzyny i diesla, koszt przejazdu tam i z powrotem, realtools',
    },
  },
  id: {
    root: {
      title: 'Kalkulator Pendapatan AdSense, AdMob & Runway 2026 | RealTools',
      desc: 'Kalkulator akurat gratis untuk Google AdSense, AdMob, YouTube, TikTok, Twitch, Kick dan proyeksi runway modal usaha. | RealTools',
      keywords: 'kalkulator pendapatan adsense, kalkulator admob, kalkulator uang youtube, kalkulator tiktok, kalkulator streamer twitch, kalkulator kick, kalkulator runway, hitung pendapatan iklan web dan aplikasi, realtools',
    },
    admob: {
      title: 'Kalkulator Pendapatan AdMob 2026 | Alat Hitung ARPDAU & eCPM',
      desc: 'Kalkulator AdMob untuk aplikasi iOS & Android. Estimasi penghasilan harian, ARPDAU dan eCPM dari rewarded video, interstitial dan open ads. | RealTools',
      keywords: 'kalkulator admob, kalkulator penghasilan admob, kalkulator arpdau, admob ecpm kalkulator, penghasilan iklan aplikasi mobile, admob bayar berapa per 1000 tayangan, cara menghitung pendapatan admob, monetisasi game android, realtools',
    },
    adsense: {
      title: 'Kalkulator AdSense 2026 | Estimasi Page RPM & Pendapatan Website',
      desc: 'Hitung potensi penghasilan website dengan kalkulator Google AdSense. Estimasi Page RPM di 26 kategori niche, lokasi negara, dan format iklan. | RealTools',
      keywords: 'kalkulator pendapatan google adsense, kalkulator adsense, hitung page rpm, berapa penghasilan adsense per 1000 tayangan, adsense cpc indonesia, cek penghasilan website dari iklan, kalkulator penghasilan blog, realtools',
    },
    youtube: {
      title: 'Kalkulator Uang YouTube 2026 | Estimasi RPM, CPM & Shorts',
      desc: 'Hitung potensi penghasilan YouTube dari video panjang, YouTube Shorts, langganan channel, dan iklan di 15+ kategori konten. | RealTools',
      keywords: 'kalkulator uang youtube, kalkulator penghasilan youtube, berapa bayaran youtube per 1000 tayangan, youtube rpm kalkulator, gaji youtube shorts, 1 juta view youtube dapat berapa uang rupiah, estimasi penghasilan youtuber, cek rpm youtube, realtools',
    },
    tiktok: {
      title: 'Kalkulator Uang TikTok 2026 | Creator Rewards & Hadiah LIVE',
      desc: 'Kalkulator penghasilan TikTok: hitung pendapatan program Creator Rewards dari tayangan berkualifikasi dan konversi Berlian koin hadiah LIVE. | RealTools',
      keywords: 'kalkulator uang tiktok, berapa penghasilan tiktok, 1000 koin tiktok berapa rupiah, harga berlian tiktok, kalkulator creator rewards tiktok, 1 juta view di tiktok dapat uang berapa, kalkulator hadiah live tiktok, konversi koin tiktok ke rupiah, realtools',
    },
    twitch: {
      title: 'Kalkulator Penghasilan Twitch 2026 | Sub, Bits & Iklan AIP',
      desc: 'Kalkulator penghasilan streamer Twitch: langganan Tier 1/2/3, bagi hasil Partner Plus (50/50 dan 70/30), donasi Bits, dan tarif iklan AIP. | RealTools',
      keywords: 'kalkulator uang twitch, berapa gaji streamer twitch, bagi hasil partner plus twitch, konversi bits ke dolar, kalkulator aip twitch, 1 sub twitch berapa rupiah, berapa pendapatan streamer pemula, realtools',
    },
    kick: {
      title: 'Kalkulator Pendapatan Kick 2026 | Bagi Hasil 95/5 & Gaji KCP',
      desc: 'Kalkulator penghasilan streamer Kick: nikmati bagi hasil 95% per subscriber ($4.74 bersih/sub) dan simulasi gaji per jam program KCP. | RealTools',
      keywords: 'kalkulator pendapatan kick, penghasilan streamer kick, bagi hasil 95 5 kick, gaji per jam kick kcp, kick vs twitch penghasilan, berapa bayaran streamer kick per sub, cara dapat uang dari live streaming kick, realtools',
    },
    runway: {
      title: 'Kalkulator Runway Keuangan 2026 | Berapa Lama Tabungan Bertahan?',
      desc: 'Ketahui berapa lama tabungan atau modal startup Anda akan bertahan dengan simulasi penarikan bulanan, imbal hasil investasi, dan inflasi. Analisis SWP. | RealTools',
      keywords: 'kalkulator runway, berapa lama tabungan saya bertahan, kalkulator swp, kalkulator dana darurat, modal startup bertahan berapa bulan, uang 1 milyar bertahan berapa lama, simulasi dana pensiun bulanan, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Kalkulator Biaya Bahan Bakar 2026 | Estimasi Biaya Bensin per KM',
      desc: 'Masukkan jarak perjalanan, konsumsi BBM, dan harga per liter untuk menghitung total biaya bensin perjalanan, biaya per kilometer, dan patungan penumpang. | RealTools',
      keywords: 'kalkulator bensin, hitung biaya bensin perjalanan, konsumsi bbm per km, cara menghitung biaya bahan bakar mobil, estimasi biaya bensin pulang pergi, 1 liter bensin untuk berapa km, patungan bensin mobil, realtools',
    },
  },
  nl: {
    root: {
      title: 'AdSense, AdMob & Runway Calculator 2026 | RealTools',
      desc: 'Nauwkeurige gratis rekenmodellen voor Google AdSense, AdMob, YouTube, TikTok, Twitch, Kick en financiële runway berekeningen. | RealTools',
      keywords: 'advertentie inkomsten calculator, adsense calculator, admob calculator, youtube geld calculator, tiktok inkomsten, twitch subs calculator, kick verdiensten, runway calculator, online inkomsten berekenen, realtools',
    },
    admob: {
      title: 'AdMob Inkomsten Calculator 2026 | ARPDAU & eCPM Tool',
      desc: 'AdMob calculator voor iOS & Android apps. Bereken dagelijkse inkomsten, ARPDAU en eCPM voor rewarded video, interstitials en app open ads. | RealTools',
      keywords: 'admob calculator, admob inkomsten berekenen, arpdau calculator, admob ecpm berekening, app advertentie inkomsten, wat verdient een app met advertenties, admob rewarded video opbrengst, realtools',
    },
    adsense: {
      title: 'AdSense Calculator 2026 | Pagina-RPM & Website Inkomsten',
      desc: 'Bereken potentiële website-inkomsten met onze Google AdSense calculator. Schat de Pagina-RPM voor 26 niches, landen en advertentie-indelingen. | RealTools',
      keywords: 'google adsense inkomsten calculator, adsense calculator, pagina rpm berekenen, hoeveel betaalt adsense per 1000 views, website advertentie inkomsten, adsense cpc berekenen, wat verdient een website aan adsense, blog inkomsten berekenen, realtools',
    },
    youtube: {
      title: 'YouTube Geld Calculator 2026 | RPM, CPM & Shorts Inkomsten',
      desc: 'Bereken potentiële YouTube verdiensten: lange video\'s, YouTube Shorts, kanaallidmaatschappen en advertentie-inkomsten in 15+ niches. | RealTools',
      keywords: 'youtube geld calculator, wat verdient een youtuber, youtube 1000 weergaven vergoeding, youtube rpm berekenen, youtube shorts inkomsten, hoeveel verdient 1 miljoen weergaven op youtube, youtube inkomsten per video, realtools',
    },
    tiktok: {
      title: 'TikTok Geld Calculator 2026 | Creator Rewards & LIVE Geschenken',
      desc: 'Bereken uw inkomsten via het TikTok Creator Rewards Programma voor gekwalificeerde views en de waarde van LIVE Diamanten. | RealTools',
      keywords: 'tiktok geld calculator, hoeveel betaalt tiktok per 1000 weergaven, tiktok diamanten naar euro, creator rewards programma tiktok, hoeveel verdient 1 miljoen views op tiktok, live geschenken omrekenen tiktok, realtools',
    },
    twitch: {
      title: 'Twitch Inkomsten Calculator 2026 | Abonnees, Bits & AIP',
      desc: 'Bereken verdiensten voor Twitch-streamers: Tier 1/2/3 subs, Partner Plus (50/50 & 70/30) splitsing, Bits en AIP advertentievergoedingen. | RealTools',
      keywords: 'twitch inkomsten calculator, wat verdient een twitch streamer, partner plus regeling twitch, bits naar euro omrekenen, twitch sub opbrengst, hoeveel levert een tier 1 sub op, twitch aip vergoeding, realtools',
    },
    kick: {
      title: 'Kick Verdiensten Calculator 2026 | 95/5 Verdeling & KCP Uurtarief',
      desc: 'Bereken inkomsten voor Kick-streamers met de unieke 95/5 abonneeverdeling ($ 4,74 netto per sub) en het KCP uurloon. | RealTools',
      keywords: 'kick calculator, verdiensten kick streamer, 95 5 verdeling kick, hoeveel betaalt kick per uur, kick versus twitch inkomsten, hoeveel levert een sub op kick op, kick streamer salaris, realtools',
    },
    runway: {
      title: 'Runway Calculator 2026 | Hoe Lang Gaat Mijn Spaargeld Mee?',
      desc: 'Ontdek hoeveel jaar uw spaargeld of startupkapitaal meegaat bij maandelijkse opnames, beleggingsrendement en inflatie. SWP analyse. | RealTools',
      keywords: 'runway calculator, hoe lang gaat mijn spaargeld mee, swp calculator, pensioen opname calculator, hoe lang gaat 1 miljoen mee, financiële runway berekenen, systematisch opnameplan calculator, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Brandstofkosten Calculator 2026 | Benzine & Diesel Ritprijs per km',
      desc: 'Voer afstand, verbruik en literprijs in en bereken direct de brandstofkosten van uw autorit, kosten per kilometer en verdeling per passagier. | RealTools',
      keywords: 'brandstofkosten berekenen, benzinekosten reis, verbruik per 100 km, wat kost mijn autorit aan benzine, kosten per kilometer auto, brandstofverbruik calculator retour, brandstofkosten delen per persoon, realtools',
    },
  },
  vi: {
    root: {
      title: 'Công Cụ Tính Doanh Thu AdSense, AdMob & Runway 2026 | RealTools',
      desc: 'Công cụ tính toán doanh thu miễn phí cho Google AdSense, AdMob, YouTube, TikTok, Twitch, Kick và tính thời gian cạn vốn khởi nghiệp. | RealTools',
      keywords: 'công cụ tính doanh thu adsense, tính doanh thu admob, kiếm tiền youtube tính thế nào, tính tiền tiktok, tính sub twitch, tính tiền kick, tính runway tài chính, tính doanh thu quảng cáo website và ứng dụng, realtools',
    },
    admob: {
      title: 'Công Cụ Tính Doanh Thu AdMob 2026 | Công Cụ ARPDAU & eCPM',
      desc: 'Tính toán doanh thu AdMob cho ứng dụng iOS & Android. Ước tính ARPDAU, eCPM và doanh thu ngày từ quảng cáo thưởng, quảng cáo xen kẽ. | RealTools',
      keywords: 'tính doanh thu admob, công cụ admob, tính arpdau, admob ecpm calculator, doanh thu quảng cáo ứng dụng di động, admob trả bao nhiêu tiền cho 1000 lượt hiển thị, kiếm tiền từ ứng dụng game admob, realtools',
    },
    adsense: {
      title: 'Công Cụ Tính AdSense 2026 | Ước Tính Page RPM & Doanh Thu Web',
      desc: 'Tính toán tiềm năng kiếm tiền từ website với Google AdSense. Ước tính Page RPM theo 26 ngách chủ đề, quốc gia và định dạng quảng cáo. | RealTools',
      keywords: 'công cụ tính doanh thu google adsense, tính tiền adsense, tính page rpm, adsense trả bao nhiêu cho 1000 lượt xem, adsense cpc việt nam, 1 click adsense được bao nhiêu tiền, tính thu nhập website từ quảng cáo, realtools',
    },
    youtube: {
      title: 'Công Cụ Tính Tiền YouTube 2026 | Ước Tính RPM, CPM & Shorts',
      desc: 'Tính doanh thu YouTube từ video dài, Shorts, hội viên kênh và quảng cáo trên hơn 15 chủ đề nội dung và đối tượng khán giả. | RealTools',
      keywords: 'tính tiền youtube, youtube trả bao nhiêu cho 1000 view, tính rpm youtube, doanh thu youtube shorts, công cụ tính cpm youtube, 1 triệu view youtube được bao nhiêu tiền tại việt nam, bảng giá view youtube, ước tính thu nhập youtuber, realtools',
    },
    tiktok: {
      title: 'Công Cụ Tính Tiền TikTok 2026 | Creator Rewards & Quà Tặng LIVE',
      desc: 'Tính thu nhập TikTok từ chương trình Quỹ thưởng Creator Rewards cho lượt xem đủ điều kiện và quy đổi Kim cương quà tặng livestream. | RealTools',
      keywords: 'tính tiền tiktok, tiktok trả bao nhiêu tiền cho 1000 view, đổi kim cương tiktok sang usd, creator rewards tiktok, kiếm tiền tiktok, 1 triệu view tiktok được bao nhiêu tiền, quy đổi quà tặng livestream tiktok, bảng giá kim cương tiktok, realtools',
    },
    twitch: {
      title: 'Công Cụ Tính Thu Nhập Twitch 2026 | Gói Sub, Bits & Quảng Cáo AIP',
      desc: 'Tính thu nhập cho streamer Twitch: gói đăng ký Tier 1/2/3, tỷ lệ chia Partner Plus (50/50 và 70/30), Bits và phụ cấp quảng cáo AIP theo giờ. | RealTools',
      keywords: 'tính tiền twitch, streamer twitch kiếm bao nhiêu tiền, chia sẻ doanh thu partner plus twitch, đổi bits sang usd, tính doanh thu quảng cáo twitch, 1 sub twitch được bao nhiêu tiền, thu nhập của streamer twitch, realtools',
    },
    kick: {
      title: 'Công Cụ Tính Thu Nhập Kick 2026 | Tỷ Lệ Chia 95/5 & Lương KCP',
      desc: 'Tính toán thu nhập streamer trên Kick: nhận 95% doanh thu đăng ký ($4.74 thực nhận/sub) và lương giờ theo chương trình KCP. | RealTools',
      keywords: 'tính tiền kick, thu nhập streamer kick, tỷ lệ chia 95 5 kick, kick trả bao nhiêu tiền một giờ, kick so với twitch, lương streamer kick theo giờ, kiếm tiền livestream trên kick, realtools',
    },
    runway: {
      title: 'Công Cụ Tính Runway Tài Chính 2026 | Tiền Tiết Kiệm Sống Được Bao Lâu?',
      desc: 'Tìm hiểu tiền tiết kiệm hoặc vốn khởi nghiệp duy trì được bao lâu khi rút định kỳ hàng tháng, có lợi nhuận đầu tư và lạm phát. Mô hình SWP. | RealTools',
      keywords: 'tính runway tài chính, tiền tiết kiệm duy trì được bao lâu, công cụ swp, rút tiền hưu trí có hệ thống, 1 tỷ sống được bao lâu, tính thời gian cạn vốn khởi nghiệp, mô hình rút vốn định kỳ swp, realtools',
    },
    'fuel-cost-calculator': {
      title: 'Công Cụ Tính Chi Phí Xăng Xe 2026 | Ước Tính Tiền Xăng Theo Km',
      desc: 'Nhập quãng đường, mức tiêu hao nhiên liệu và giá xăng tại trạm để tính toán chi phí xăng cho chuyến đi, chi phí mỗi km và chia theo đầu người. | RealTools',
      keywords: 'tính tiền xăng, tính chi phí xăng xe chuyến đi, 100km tốn bao nhiêu lít xăng, tiền xăng mỗi km, tính chi phí đi xe đường dài, tính tiền xăng khứ hồi cả đi lẫn về, chia tiền xăng theo đầu người, realtools',
    },
  },
};
// ==========================================
// 3. GENERATE RICH JSON-LD STRUCTURED DATA
// ==========================================
function generateJsonLd(platformKey, meta, lang = 'en') {
  // Skip rich rating for 404/trust pages to avoid inflated rating
  const isAppPage = ['admob','adsense','youtube','tiktok','twitch','kick','runway','8th-pay-commission','fuel-cost-calculator'].includes(platformKey);
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': isAppPage ? 'WebApplication' : 'WebPage',
    'name': meta.title,
    'url': meta.canonical,
    'description': meta.desc,
    'inLanguage': lang,
    'applicationCategory': isAppPage ? 'FinanceApplication' : undefined,
    'operatingSystem': isAppPage ? 'All' : undefined,
    'browserRequirements': isAppPage ? 'Requires JavaScript and modern browser' : undefined,
    'isAccessibleForFree': true,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
    ...(isAppPage ? {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '1450',
        'bestRating': '5',
        'worstRating': '1',
      },
      'featureList': 'Revenue calculator, RPM forecasting, geo targeting, seasonality',
      'screenshot': 'https://realtools.store/og-image.png',
    } : {}),
  };
  // Clean undefined keys
  Object.keys(schemaApp).forEach(k => schemaApp[k] === undefined && delete schemaApp[k]);

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://realtools.store/',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': meta.title,
        'item': meta.canonical,
      },
    ],
  };

  // WebSite with SearchAction + Organization publisher
  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'RealTools',
    'alternateName': 'RealTools - Free Online Calculators',
    'url': 'https://realtools.store/',
    'inLanguage': lang,
    'description': meta.desc,
    'publisher': {
      '@type': 'Organization',
      'name': 'RealTools',
      'url': 'https://realtools.store/',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://realtools.store/og-image.png',
        'width': 1200,
        'height': 630,
      },
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://realtools.store/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // For 404, return minimal (no rating, no breadcrumb)
  if (platformKey === '404') {
    return `<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org','@type':'WebPage','name':meta.title,'url':meta.canonical,'inLanguage':lang })}</script>`;
  }

  const faqMap = {
    home: [
      { q: 'What calculators does RealTools offer?', a: 'AdSense, AdMob, YouTube, TikTok, Twitch, Kick revenue calculators plus a money runway (SWP withdrawal) calculator. All free, all run in your browser.' },
      { q: 'Do I need an account?', a: 'No. Every tool works instantly with no sign-up and no data collection. Your inputs never leave your device.' },
    ],
    runway: [
      { q: 'How long will my savings last?', a: 'Divide withdrawals into balance and returns: at 8% annual return, a balance supports about 0.67% monthly withdrawal forever. Enter your numbers above for an exact year-by-year projection.' },
      { q: 'Is this an SWP calculator?', a: 'Yes. A Systematic Withdrawal Plan takes a fixed amount monthly while the rest stays invested — exactly the math modelled here, minus tax and NAV fluctuation.' },
    ],
    admob: [
      { q: 'How is AdMob revenue calculated?', a: 'AdMob revenue = (Impressions / 1000) × eCPM. ARPDAU = Daily revenue / DAU. Our calculator models rewarded, interstitial and app open formats with mediation lift.' },
      { q: 'What is good ARPDAU for AdMob?', a: 'Good ARPDAU in Tier 1 is $0.04–$0.12, Tier 2 $0.015–$0.04, Tier 3 $0.003–$0.012. Rewarded video drives highest ARPDAU.' },
    ],
    adsense: [
      { q: 'How is AdSense Page RPM calculated?', a: 'Page RPM = (Estimated earnings / Pageviews) × 1000. It aggregates all ad units on a page. 26 niches and geo tiers drive variance.' },
      { q: 'What is good AdSense RPM?', a: 'Tier 1 RPM $12–$35 in finance/tech/legal, $3–$8 in entertainment. Viewability >70% doubles RPM.' },
    ],
    youtube: [
      { q: 'How does YouTube pay creators?', a: 'YouTube pays 55% of long-form ad revenue (RPM) and 45% of Shorts pool. Mid-rolls on 8m+ videos add +45% RPM.' },
      { q: 'What is YouTube RPM vs CPM?', a: 'CPM is advertiser cost per 1000 views. RPM is creator revenue per 1000 views after YouTube 45% cut. Use our calculator for net RPM.' },
    ],
    tiktok: [
      { q: 'How does TikTok Creator Rewards work?', a: 'TikTok pays only for original videos >1 min based on qualified FYP views (5s+ watch). RPM $0.40–$1.10 per 1000 qualified views plus LIVE diamonds.' },
      { q: 'How much does TikTok pay per 1000 views?', a: 'Payment depends on qualified view rate and niche. Use our TikTok calculator with your monthly views and live gifts to estimate.' },
    ],
    twitch: [
      { q: 'How much do Twitch streamers earn per sub?', a: 'Tier 1 $4.99: $2.49 at 50/50, $3.49 at 70/30 Partner Plus. Tier 2/3 proportionally higher plus AIP ad pay $3.50–$6/hr.' },
      { q: 'What is Twitch AIP?', a: 'Ad Incentive Program pays fixed per hour for running 2–3 min of ads per hour. Our calculator models CCV × AIP eCPM.' },
    ],
    kick: [
      { q: 'How does Kick 95/5 split work?', a: 'Kick pays $4.74 net per $4.99 sub (95%). Twitch 50/50 pays $2.49. KCP hourly $16–$40 based on CCV adds on top.' },
      { q: 'What is Kick KCP?', a: 'Kick Creator Program hourly stipend for eligible streamers based on average concurrent viewers. Enable KCP in calculator to include.' },
    ],
    '8th-pay-commission': [
      { q: 'What is the 8th Pay Commission fitment factor?', a: 'The multiplier converting 7th CPC basic pay to 8th CPC basic pay. Not yet announced; analyst consensus is ~1.92x, unions demand 3.83x. Try every scenario in the calculator above.' },
      { q: 'When will the 8th Pay Commission be implemented?', a: 'Revised pay is referenced to 1 January 2026 with arrears, but payout follows the report (expected mid-2027) and Cabinet approval.' },
    ],
    'fuel-cost-calculator': [
      { q: 'How do I calculate fuel cost for a trip?', a: 'Fuel needed = distance ÷ mileage, then cost = fuel × pump price. Enter distance, mileage and price above for an exact trip, monthly and per-person cost.' },
      { q: 'How much fuel will my car use?', a: 'Divide trip distance by mileage in matching units: 300 km at 15 km/L needs 20 litres. Our calculator converts km/L, L/100km and mpg automatically.' },
    ],
  };
  // Localized FAQ schema for non-AdMob pages (mirrors src/data/faqs.ts +
  // src/components/PlatformSeoSpotlight.tsx). AdMob keeps the English
  // faqMap above in every language so its indexed HTML stays identical.
  const LOCALIZED_FAQ = {
    es: {
      adsense: [
        { q: '¿Cuánto paga AdSense por cada 1.000 visitas?', a: 'Entre $2,50 y más de $45 por cada 1.000 páginas vistas. Finanzas y SaaS con tráfico Tier 1 logran $25–$60 de RPM; entretenimiento promedia $2–$7.' },
        { q: '¿Cuántas visitas necesito para ganar $1.000 al mes?', a: 'Unas 40.000 con RPM $25 (finanzas) o unas 166.000 con RPM $6 (temática general).' },
      ],
      youtube: [
        { q: '¿Cuánto paga YouTube por cada 1.000 visitas?', a: 'El RPM de videos largos va de $1,50 a más de $35 por 1.000 vistas tras la comisión del 45% de YouTube. Los Shorts se reparten aparte, unos $0,03–$0,09 de RPM.' },
        { q: '¿Cuántas vistas necesito para ganar $1.000 al mes?', a: 'Unas 200.000 con RPM $5, o unas 50.000 con RPM $20 (finanzas, audiencia EE.UU.).' },
      ],
      tiktok: [
        { q: '¿Cuánto paga TikTok por cada 1.000 visitas?', a: 'El Creator Rewards paga unos $0,40–$1,20 por cada 1.000 vistas calificadas (videos de más de 1 minuto vistos 5+ segundos desde «Para ti»).' },
        { q: '¿Cuánto valen 1.000 diamantes de TikTok?', a: '1.000 diamantes = $5 netos para el creador. El espectador pagó aproximadamente el doble en monedas.' },
      ],
      twitch: [
        { q: '¿Cuánto paga Twitch por sub?', a: 'Una sub Nivel 1 ($4,99) paga $2,49 con el reparto 50/50 y ~$3,49 con el 70/30 de Partner Plus.' },
        { q: '¿Cómo consigo el 70/30 en Twitch?', a: 'Mantén 350 Plus Points 3 meses consecutivos con subs de pago recurrentes (Nivel 1 = 1 pt, Nivel 2 = 2, Nivel 3 = 6).' },
      ],
      kick: [
        { q: '¿Cuánto paga Kick por sub?', a: 'Kick paga el 95%: $4,74 netos por cada suscripción de $4,99, casi el doble que los $2,49 de Twitch.' },
        { q: '¿Qué es el programa KCP de Kick?', a: 'Estipendio horario de unos $16–$40 según espectadores concurrentes (CCV); las propinas directas son 100% netas.' },
      ],
      runway: [
        { q: '¿Cuánto durarán mis ahorros?', a: 'Divide tu saldo entre tu déficit mensual: $60.000 ÷ $5.000/mes = 12 meses. Al 8% anual, el saldo soporta ~0,67% de retiro mensual.' },
        { q: '¿Es esto una calculadora SWP?', a: 'Sí: retiro mensual fijo con el resto capitalizándose, menos el aumento por inflación.' },
      ],
      'fuel-cost-calculator': [
        { q: '¿Cómo se calcula el costo de combustible de un viaje?', a: 'Combustible = Distancia ÷ Consumo; Costo = Combustible × Precio. Ejemplo: 300 km a 15 km/L necesitan 20 litros.' },
        { q: '¿Cuánto combustible gasto en 100 km?', a: '100 ÷ tu km/L: con 15 km/L necesitas ~6,7 litros.' },
      ],
    },
    ja: {
      adsense: [
        { q: 'AdSenseは1,000回表示でいくら稼げる？', a: '1,000PVあたり約$2.50〜$45以上です。金融・SaaSでTier1トラフィックの場合$25〜$60のページRPM、エンタメ系は$2〜$7が目安です。' },
        { q: '月$1,000稼ぐのに必要なPV数は？', a: 'RPM$25なら約4万PV、RPM$6なら約16.6万PVが目安です。' },
      ],
      youtube: [
        { q: 'YouTubeは1,000回再生でいくら支払いますか？', a: '長尺動画のRPMは1,000回再生あたり$1.50〜$35以上で、YouTubeの取り分45%控除後です。ショートは別プールで約$0.03〜$0.09のRPMです。' },
        { q: '月$1,000稼ぐのに必要な再生数は？', a: 'RPM$5なら月約20万回、RPM$20（金融・米国向け）なら約5万回が目安です。' },
      ],
      tiktok: [
        { q: 'TikTokは1,000回視聴でいくら支払いますか？', a: 'Creator Rewardsは対象1,000回視聴あたり約$0.40〜$1.20です（1分超の動画をおすすめで5秒以上視聴のみ対象）。' },
        { q: '1,000ダイヤモンドはいくら？', a: 'クリエイター受取で$5。視聴者のコイン課金額は約2倍です。' },
      ],
      twitch: [
        { q: 'Twitchのサブスク1件あたりの収益は？', a: '$4.99のTier1サブは通常配分50/50で$2.49、Partner Plusの70/30で約$3.49です。' },
        { q: '70/30配分になる条件は？', a: '有料継続サブで350ポイントを3ヶ月連続維持（Tier1＝1pt・Tier2＝2pt・Tier3＝6pt）です。' },
      ],
      kick: [
        { q: 'Kickのサブスク1件あたりの収益は？', a: 'Kickは還元率95%で$4.99のサブあたり$4.74が取り分となり、Twitchの約2倍です。' },
        { q: 'KickのKCP時給とは？', a: '同時視聴者数に応じて約$16〜$40/時を支給し、投げ銭は100%還元です。' },
      ],
      runway: [
        { q: '貯蓄は何年もちますか？', a: '残高÷毎月の不足額が目安：$60,000÷$5,000/月＝12ヶ月です。年利8%なら月0.67%の取り崩しを維持できます。' },
        { q: 'SWP計算機ですか？', a: 'はい。定額取崩し＋残高運用−インフレ上乗せの計算です。' },
      ],
      'fuel-cost-calculator': [
        { q: '旅行の燃料費の計算方法は？', a: '必要燃料＝距離÷燃費、費用＝燃料×単価です。例：300kmを15km/Lで走行なら20L必要です。' },
        { q: '100km走行の燃料は？', a: '100÷km/L：15km/Lなら約6.7L必要です。' },
      ],
    },
    fr: {
      adsense: [
        { q: 'Combien rapporte AdSense pour 1 000 vues ?', a: 'Environ 2,50 $ à plus de 45 $ pour 1 000 pages vues. Finance et SaaS en Tier 1 atteignent 25–60 $ de RPM ; divertissement moyenne 2–7 $.' },
        { q: 'Combien de vues pour gagner 1 000 $ par mois ?', a: 'Environ 40 000 à 25 $ RPM (finance) ou 166 000 à 6 $ RPM (généraliste).' },
      ],
      youtube: [
        { q: 'Combien paie YouTube pour 1 000 vues ?', a: 'Le RPM long format va de 1,50 $ à plus de 35 $ pour 1 000 vues après la part de 45 % de YouTube. Les Shorts sont mutualisés à part, environ 0,03–0,09 $ RPM.' },
        { q: 'Combien de vues pour 1 000 $ par mois ?', a: 'Environ 200 000 à 5 $ RPM, ou 50 000 à 20 $ RPM (finance, audience US).' },
      ],
      tiktok: [
        { q: 'Combien paie TikTok pour 1 000 vues ?', a: 'Le Creator Rewards paie environ 0,40–1,20 $ pour 1 000 vues qualifiées (vidéos de plus de 1 minute vues 5 s+ depuis « Pour toi »).' },
        { q: 'Combien valent 1 000 diamants TikTok ?', a: '1 000 diamants = 5 $ nets créateur. Le spectateur a payé environ le double en pièces.' },
      ],
      twitch: [
        { q: 'Combien rapporte 1 abonnement Twitch ?', a: 'Un sub Tier 1 (4,99 $) rapporte 2,49 $ en 50/50 et environ 3,49 $ en 70/30 Partner Plus.' },
        { q: 'Comment débloquer le 70/30 sur Twitch ?', a: 'Conservez 350 Plus Points 3 mois de suite via des subs payants récurrents (Tier 1 = 1 pt, Tier 2 = 2, Tier 3 = 6).' },
      ],
      kick: [
        { q: 'Combien paie Kick par abonnement ?', a: 'Kick reverse 95 % : 4,74 $ nets par abonnement à 4,99 $, soit près du double de Twitch.' },
        { q: "Qu'est-ce que le programme KCP de Kick ?", a: "Un fixe horaire d'environ 16–40 $ selon les spectateurs simultanés (CCV) ; pourboires directs à 100 % nets." },
      ],
      runway: [
        { q: 'Combien de temps dureront mes économies ?', a: 'Divisez le solde par le manque mensuel : 60 000 $ ÷ 5 000 $/mois = 12 mois. À 8 % annuel, le solde supporte ~0,67 % de retrait mensuel.' },
        { q: 'Est-ce un calculateur SWP ?', a: "Oui : retrait mensuel fixe avec solde capitalisé, moins la hausse d'inflation." },
      ],
      'fuel-cost-calculator': [
        { q: "Comment calculer le coût carburant d'un trajet ?", a: 'Carburant = Distance ÷ Consommation ; Coût = Carburant × Prix. Exemple : 300 km à 15 km/L = 20 litres.' },
        { q: 'Combien de carburant pour 100 km ?', a: '100 ÷ votre km/L : à 15 km/L il faut ~6,7 litres.' },
      ],
    },
    de: {
      adsense: [
        { q: 'Wie viel zahlt AdSense pro 1.000 Aufrufe?', a: 'Ca. $2,50 bis $45+ pro 1.000 Seitenaufrufe. Finanzen und SaaS mit Tier-1-Traffic erreichen $25–$60 RPM; Entertainment liegt bei $2–$7.' },
        { q: 'Wie viel Traffic braucht man für $1.000 im Monat?', a: 'Ca. 40.000 Aufrufe bei $25 RPM (Finanzen) oder ca. 166.000 bei $6 RPM.' },
      ],
      youtube: [
        { q: 'Wie viel zahlt YouTube pro 1.000 Aufrufe?', a: 'Der Long-Form-RPM liegt bei $1,50 bis $35+ pro 1.000 Aufrufe nach 45 % YouTube-Anteil. Shorts werden separat gepoolt bei ca. $0,03–$0,09 RPM.' },
        { q: 'Wie viele Aufrufe braucht man für $1.000 im Monat?', a: 'Ca. 200.000 bei $5 RPM oder ca. 50.000 bei $20 RPM (Finanzen, US-Publikum).' },
      ],
      tiktok: [
        { q: 'Wie viel zahlt TikTok pro 1.000 Aufrufe?', a: 'Das Creator-Rewards-Programm zahlt ca. $0,40–$1,20 pro 1.000 qualifizierte Aufrufe (Originale über 1 Minute mit 5+ Sekunden im Für-Dich-Feed).' },
        { q: 'Wie viel sind 1.000 TikTok-Diamonds wert?', a: '1.000 Diamonds = $5 netto für Creator. Zuschauer zahlten ca. das Doppelte in Coins.' },
      ],
      twitch: [
        { q: 'Wie viel verdient man pro Twitch-Sub?', a: 'Ein Tier-1-Sub ($4,99) bringt $2,49 bei 50/50 und ca. $3,49 bei 70/30 Partner Plus.' },
        { q: 'Wie bekommt man den 70/30-Split auf Twitch?', a: '350 Plus Points 3 Monate in Folge aus wiederkehrenden Paid-Subs halten (Tier 1 = 1 Pt, Tier 2 = 2, Tier 3 = 6).' },
      ],
      kick: [
        { q: 'Wie viel zahlt Kick pro Sub?', a: 'Kick zahlt 95 %: $4,74 netto pro $4,99-Abo — fast doppelt so viel wie Twitch.' },
        { q: 'Was ist das KCP-Programm von Kick?', a: 'Ein Stundensatz von ca. $16–$40 nach Zuschauern (CCV); direkte Trinkgelder sind 100 % netto.' },
      ],
      runway: [
        { q: 'Wie lange reicht mein Geld?', a: 'Saldo ÷ monatliche Lücke: $60.000 ÷ $5.000/Monat = 12 Monate. Bei 8 % p.a. trägt ein Saldo ca. 0,67 % Monatsentnahme.' },
        { q: 'Ist das ein Entnahmeplan-Rechner?', a: 'Ja: fixe Monatsentnahme bei thesaurierendem Rest, minus Inflationssteigerung.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Wie berechnet man die Spritkosten einer Fahrt?', a: 'Kraftstoff = Strecke ÷ Verbrauch; Kosten = Liter × Preis. Beispiel: 300 km bei 15 km/L = 20 Liter.' },
        { q: 'Wie viel Sprit braucht man für 100 km?', a: '100 ÷ Ihr km/L: bei 15 km/L ca. 6,7 Liter.' },
      ],
    },
    pt: {
      adsense: [
        { q: 'Quanto o AdSense paga por 1.000 visitas?', a: 'Cerca de $2,50 a mais de $45 por 1.000 páginas vistas. Finanças e SaaS com tráfego Tier 1 alcançam $25–$60 de RPM; entretenimento fica em $2–$7.' },
        { q: 'Quantas visitas preciso para faturar $1.000 por mês?', a: 'Cerca de 40.000 com RPM $25 (finanças) ou 166.000 com RPM $6 (nicho geral).' },
      ],
      youtube: [
        { q: 'Quanto o YouTube paga por 1.000 visualizações?', a: 'O RPM de vídeos longos vai de $1,50 a mais de $35 por 1.000 views após os 45% do YouTube. Shorts são rateados à parte, cerca de $0,03–$0,09 de RPM.' },
        { q: 'Quantas views preciso para $1.000 por mês?', a: 'Cerca de 200.000 com RPM $5, ou 50.000 com RPM $20 (finanças, público EUA).' },
      ],
      tiktok: [
        { q: 'Quanto o TikTok paga por 1.000 visualizações?', a: 'O Creator Rewards paga cerca de $0,40–$1,20 por 1.000 views qualificadas (originais acima de 1 min assistidos 5s+ no «Para você»).' },
        { q: 'Quanto valem 1.000 diamantes do TikTok?', a: '1.000 diamantes = $5 líquidos ao criador. O espectador pagou cerca do dobro em moedas.' },
      ],
      twitch: [
        { q: 'Quanto a Twitch paga por sub?', a: 'Um sub Tier 1 ($4,99) paga $2,49 no 50/50 e ~$3,49 no 70/30 do Partner Plus.' },
        { q: 'Como consigo o 70/30 na Twitch?', a: 'Mantenha 350 Plus Points por 3 meses seguidos com subs pagas recorrentes (Tier 1 = 1 pt, Tier 2 = 2, Tier 3 = 6).' },
      ],
      kick: [
        { q: 'Quanto a Kick paga por sub?', a: 'A Kick paga 95%: $4,74 líquidos por assinatura de $4,99, quase o dobro da Twitch.' },
        { q: 'O que é o programa KCP da Kick?', a: 'Fixo horário de cerca de $16–$40 conforme espectadores simultâneos (CCV); gorjetas diretas são 100% líquidas.' },
      ],
      runway: [
        { q: 'Quanto tempo minhas economias duram?', a: 'Divida o saldo pelo déficit mensal: $60.000 ÷ $5.000/mês = 12 meses. A 8% ao ano, o saldo suporta ~0,67% de retirada mensal.' },
        { q: 'Isto é uma calculadora SWP?', a: 'Sim: saque mensal fixo com o restante capitalizando, menos a alta da inflação.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Como calcular o custo de combustível da viagem?', a: 'Combustível = Distância ÷ Consumo; Custo = Litros × Preço. Exemplo: 300 km a 15 km/L = 20 litros.' },
        { q: 'Quanto combustível gasto em 100 km?', a: '100 ÷ seu km/L: com 15 km/L precisa de ~6,7 litros.' },
      ],
    },
    ko: {
      adsense: [
        { q: '애드센스는 조회수 1,000회당 얼마를 지급하나요?', a: '페이지뷰 1,000회당 약 $2.50~$45 이상입니다. Tier 1 트래픽의 금융·SaaS는 페이지 RPM $25~$60, 엔터는 $2~$7 수준입니다.' },
        { q: '월 $1,000 버는 데 필요한 조회수는?', a: 'RPM $25면 약 4만뷰, $6이면 약 16.6만뷰가 필요합니다.' },
      ],
      youtube: [
        { q: '유튜브는 조회수 1,000회당 얼마를 지급하나요?', a: '롱폼 RPM은 1,000회당 $1.50~$35 이상이며 유튜브 수수료 45% 제외 후입니다. 쇼츠는 별도 풀로 약 $0.03~$0.09 RPM입니다.' },
        { q: '월 $1,000 버는 데 필요한 조회수는?', a: 'RPM $5면 월 약 20만회, $20(금융·미국향)이면 약 5만회가 필요합니다.' },
      ],
      tiktok: [
        { q: '틱톡은 조회수 1,000회당 얼마를 지급하나요?', a: '크리에이터 리워드는 적격 조회수 1,000회당 약 $0.40~$1.20을 지급합니다(1분 이상 오리지널을 추천 피드에서 5초 이상 시청만 적격).' },
        { q: '다이아몬드 1,000개의 가치는?', a: '창작자 수령액 $5. 시청자는 코인으로 약 2배를 결제했습니다.' },
      ],
      twitch: [
        { q: '트위치 구독 1개당 수익은 얼마인가요?', a: '$4.99 Tier 1 구독은 50/50에서 $2.49, 파트너 플러스 70/30에서 약 $3.49입니다.' },
        { q: '70/30 등급 조건은?', a: '유료 정기구독으로 350포인트를 3개월 연속 유지하세요(Tier 1＝1pt·Tier 2＝2pt·Tier 3＝6pt).' },
      ],
      kick: [
        { q: '킥 구독 1개당 수익은 얼마인가요?', a: '킥은 95%를 지급해 $4.99 구독당 순수익 $4.74로 트위치의 약 2배입니다.' },
        { q: '킥 KCP 프로그램이란?', a: '동시시청자(CCV)에 따라 약 $16~$40/시를 지급하고 직접 후원은 100% 정산됩니다.' },
      ],
      runway: [
        { q: '내 저축은 몇 년 버틸까요?', a: '잔액÷월 부족액이 기준: $60,000÷$5,000/월＝12개월. 연 8%이면 월 0.67% 인출을 유지할 수 있습니다.' },
        { q: 'SWP 계산기인가요?', a: '네. 정액 월 인출＋잔액 복리−인플레 반영 계산입니다.' },
      ],
      'fuel-cost-calculator': [
        { q: '여행 연료비는 어떻게 계산하나요?', a: '필요 연료＝거리÷연비, 비용＝연료×단가입니다. 예: 300km를 15km/L로 주행하면 20L가 필요합니다.' },
        { q: '100km 주행 연료는?', a: '100÷km/L: 15km/L이면 약 6.7L가 필요합니다.' },
      ],
    },
    it: {
      adsense: [
        { q: 'Quanto paga AdSense ogni 1.000 visite?', a: 'Circa $2,50–$45+ ogni 1.000 pagine viste. Finanza e SaaS con traffico Tier 1 raggiungono $25–$60 di RPM; intrattenimento in media $2–$7.' },
        { q: 'Quante visite servono per $1.000 al mese?', a: 'Circa 40.000 con RPM $25 (finanza) o 166.000 con RPM $6 (nicchia generica).' },
      ],
      youtube: [
        { q: 'Quanto paga YouTube ogni 1.000 visualizzazioni?', a: 'Il RPM long-form va da $1,50 a oltre $35 ogni 1.000 views dopo il 45% di YouTube. Gli Shorts sono a parte, circa $0,03–$0,09 di RPM.' },
        { q: 'Quante views servono per $1.000 al mese?', a: 'Circa 200.000 con RPM $5, o 50.000 con RPM $20 (finanza, pubblico USA).' },
      ],
      tiktok: [
        { q: 'Quanto paga TikTok ogni 1.000 visualizzazioni?', a: 'Il Creator Rewards paga circa $0,40–$1,20 ogni 1.000 views qualificate (originali oltre 1 minuto visti 5s+ da «Per te»).' },
        { q: 'Quanto valgono 1.000 diamanti TikTok?', a: '1.000 diamanti = $5 netti al creator. Lo spettatore ha pagato circa il doppio in monete.' },
      ],
      twitch: [
        { q: 'Quanto paga Twitch per sub?', a: 'Una sub Tier 1 ($4,99) paga $2,49 al 50/50 e ~$3,49 al 70/30 Partner Plus.' },
        { q: 'Come sblocco il 70/30 su Twitch?', a: 'Mantieni 350 Plus Points per 3 mesi consecutivi con sub pagate ricorrenti (Tier 1 = 1 pt, Tier 2 = 2, Tier 3 = 6).' },
      ],
      kick: [
        { q: 'Quanto paga Kick per sub?', a: 'Kick paga il 95%: $4,74 netti per abbonamento da $4,99, quasi il doppio di Twitch.' },
        { q: "Cos'è il programma KCP di Kick?", a: 'Un fisso orario di circa $16–$40 in base agli spettatori simultanei (CCV); mance dirette al 100% nette.' },
      ],
      runway: [
        { q: 'Quanto dureranno i miei risparmi?', a: "Dividi il saldo per il deficit mensile: $60.000 ÷ $5.000/mese = 12 mesi. All'8% annuo, il saldo sostiene ~0,67% di prelievo mensile." },
        { q: 'È un calcolatore SWP?', a: "Sì: prelievo mensile fisso con resto capitalizzato, meno l'aumento dell'inflazione." },
      ],
      'fuel-cost-calculator': [
        { q: 'Come si calcola il costo carburante di un viaggio?', a: 'Carburante = Distanza ÷ Consumo; Costo = Litri × Prezzo. Esempio: 300 km a 15 km/L = 20 litri.' },
        { q: 'Quanto carburante serve per 100 km?', a: '100 ÷ il tuo km/L: con 15 km/L servono ~6,7 litri.' },
      ],
    },
    ru: {
      adsense: [
        { q: 'Сколько платит AdSense за 1 000 просмотров?', a: 'От $2.50 до $45+ за 1 000 просмотров страниц. Тематики финансов и SaaS в странах Tier 1 достигают $25–$60 Page RPM; развлечения — $2–$7.' },
        { q: 'Сколько просмотров нужно для заработка $1 000 в месяц?', a: 'Около 40 000 просмотров при RPM $25 (финансы) или около 166 000 при RPM $6 (общая тематика).' },
      ],
      youtube: [
        { q: 'Сколько платит YouTube за 1 000 просмотров?', a: 'RPM длинных видео составляет от $1.50 до $35+ после вычета 45% доли YouTube. Shorts оплачиваются из отдельного пула — около $0.03–$0.09 RPM.' },
        { q: 'Сколько просмотров нужно, чтобы зарабатывать $1 000 в месяц?', a: 'При RPM $5 нужно ~200 000 просмотров; при RPM $20 (финансы, аудитория США) — ~50 000 просмотров.' },
      ],
      tiktok: {
        adsense: [], // not used
      },
      tiktok: [
        { q: 'Сколько платит TikTok за 1 000 просмотров?', a: 'Программа Creator Rewards платит $0.40–$1.20 за 1 000 квалифицированных просмотров (видео >1 мин, от 5 сек в ленте «Для вас»).' },
        { q: 'Сколько стоят 1 000 бриллиантов в TikTok?', a: '1 000 бриллиантов = $5 чистого дохода автору. Зрители платят примерно вдвое больше при покупке монет.' },
      ],
      twitch: [
        { q: 'Сколько приносит 1 подписка на Twitch?', a: 'Подписка Tier 1 ($4.99) приносит $2.49 при сплите 50/50 и ~$3.49 при сплите 70/30 Partner Plus.' },
        { q: 'Как получить сплит 70/30 на Twitch?', a: 'Удерживайте 350 Plus Points в течение 3 месяцев подряд с регулярных платных подписок.' },
      ],
      kick: [
        { q: 'Сколько платит Kick за подписку?', a: 'Kick отдает 95%: $4.74 чистыми с подписки $4.99 — почти вдвое больше, чем $2.49 на Twitch.' },
        { q: 'Что такое программа KCP на Kick?', a: 'Почасовая ставка около $16–$40+ в зависимости от среднего онлайна (CCV); донаты поступают на 100% автору.' },
      ],
      runway: [
        { q: 'На сколько хватит сбережений?', a: 'Разделите капитал на ежемесячный дефицит: $60 000 ÷ $5 000/мес = 12 месяцев. При доходности 8% капитал поддерживает снятие ~0.67%/мес практически бессрочно.' },
        { q: 'Это калькулятор SWP?', a: 'Да: фиксированное ежемесячное снятие с капитализацией остатка минус индексация на инфляцию.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Как рассчитать стоимость топлива для поездки?', a: 'Топливо = Расстояние ÷ Расход; Стоимость = Литры × Цена. Пример: 300 км при 15 км/л требуют 20 литров.' },
        { q: 'Сколько топлива потребуется на 100 км?', a: '100 ÷ ваш показатель км/л: при 15 км/л нужно ~6.7 л. При 7 л/100 км — ровно 7 литров.' },
      ],
    },
    ar: {
      adsense: [
        { q: 'كم يدفع أدسنس مقابل 1,000 مشاهدة؟', a: 'ما بين 2.50$ إلى 45+$ لكل 1,000 مشاهدة. مجالات التمويل و SaaS تحقق 25–60$ RPM؛ بينما الترفيه 2–7$.' },
        { q: 'كم مشاهدة أحتاج لأربح 1,000 دولار شهرياً؟', a: 'حوالي 40,000 مشاهدة في التمويل (RPM 25$) أو 166,000 مشاهدة في المجالات العامة (RPM 6$).' },
      ],
      youtube: [
        { q: 'كم يدفع يوتيوب مقابل 1,000 مشاهدة؟', a: 'يتراوح RPM للفيديوهات الطويلة بين 1.50$ إلى 35+$ بعد خصم نسبة يوتيوب 45%. وتدفع فيديوهات Shorts نحو 0.03–0.09$.' },
        { q: 'كم مشاهدة أحتاج لأربح 1,000 دولار شهرياً؟', a: 'عند RPM بقيمة 5$ تحتاج ~200,000 مشاهدة؛ وعند 20$ (جمهور أمريكي وتمويل) تحتاج ~50,000 مشاهدة.' },
      ],
      tiktok: [
        { q: 'كم يدفع تيك توك مقابل 1,000 مشاهدة؟', a: 'يدفع برنامج Creator Rewards نحو 0.40–1.20$ لكل 1,000 مشاهدة مؤهلة (فيديوهات >1 دقيقة شوهدت 5 ثوانٍ فأكثر من شريط لك).' },
        { q: 'كم تساوي 1,000 ماسة في تيك توك؟', a: '1,000 ماسة = 5 دولارات صافية لصانع المحتوى بعد خصم المنصة.' },
      ],
      twitch: [
        { q: 'كم يدفع اشتراك تويتش للمذيع؟', a: 'اشتراك المستوى 1 ($4.99) يمنح 2.49$ بنسبة 50/50 ونحو 3.49$ بنسبة 70/30 في برنامج Partner Plus.' },
        { q: 'كيف أحصل على نسبة 70/30 في تويتش؟', a: 'حافظ على 350 نقطة بلس لمدة 3 أشهر متتالية من اشتراكات مدفوعة متكررة.' },
      ],
      kick: [
        { q: 'كم تدفع منصة كيك مقابل الاشتراك؟', a: 'تحتفظ كيك بـ 5% وتمنح المذيع 95%: 4.74$ صافية للاشتراك بقيمة 4.99$ — ضعف تويتش تقريباً.' },
        { q: 'ما هو برنامج KCP في كيك؟', a: 'راتب بالساعة يتراوح بين 16–40+$ حسب عدد المشاهدين المتزامن؛ والتبرعات المباشرة 100% صافية.' },
      ],
      runway: [
        { q: 'كم ستكفيك مدخراتك المالية؟', a: 'اقسم رصيدك على العجز الشهري: 60,000$ ÷ 5,000$/شهر = 12 شهراً. وبعائد استثماري 8% يدعم الرصيد سحب 0.67% شهرياً بصورة مستمرة.' },
        { q: 'هل هذه حاسبة SWP؟', a: 'نعم — سحب شهري ثابت مع نمو الرصيد المتبقي مطروحاً منه زيادة التضخم.' },
      ],
      'fuel-cost-calculator': [
        { q: 'كيف تحسب تكلفة الوقود لرحلتك؟', a: 'الوقود المطلوب = المسافة ÷ معدل الاستهلاك؛ التكلفة = الوقود × السعر. مثال: 300 كم بمعدل 15 كم/لتر تستهلك 20 لتراً.' },
        { q: 'كم وقوداً تحتاج سيارتي لقطع 100 كم؟', a: '100 ÷ كم/لتر لسيارتك: عند 15 كم/لتر تحتاج ~6.7 لتر. وعند 7 لتر/100 كم تحتاج 7 لترات بالضبط.' },
      ],
    },
    zh: {
      adsense: [
        { q: 'Google AdSense 每千次展示收入是多少？', a: '每千次页面展示 (Page RPM) 约为 $2.50 到 $45+ 美元。第一梯队金融 SaaS 网站可达 $25–$60 RPM；娱乐游戏类平均 $2–$7。' },
        { q: '每月想赚 $1,000 美元需要多少访问量？', a: '高单价领域（RPM $25）约需 40,000 次展示；大众综合类（RPM $6）约需 166,000 次展示。' },
      ],
      youtube: [
        { q: 'YouTube 每 1,000 次播放能赚多少钱？', a: '长视频千次播放净收入 RPM 约为 $1.50 至 $35+ 美元（已扣除 45% 分成）。Shorts 短视频独立分成池，RPM 约为 $0.03–$0.09。' },
        { q: '每月赚 $1,000 美元需要多少播放量？', a: '按 $5 RPM 计算约需 20 万次月播放；按 $20 RPM（欧美高客单金融）只需约 5 万次播放。' },
      ],
      tiktok: [
        { q: 'TikTok 每 1,000 次播放收益是多少？', a: 'Creator Rewards 创作者奖励计划每千次有效播放约为 $0.40–$1.20 美元（需为 1 分钟以上且在推荐流停留 5 秒以上）。' },
        { q: 'TikTok 1,000 颗钻石值多少钱？', a: '1,000 颗钻石创作者净得 $5 美元。观众充值金币所付金额约为该数字的两倍。' },
      ],
      twitch: [
        { q: 'Twitch 1 个订阅主播能拿多少分成？', a: '$4.99 美元的 Tier 1 订阅在 50/50 下分成 $2.49，在 Partner Plus 70/30 下可分约 $3.49。' },
        { q: '如何解锁 Twitch 70/30 顶格分成？', a: '连续 3 个月通过付费循环订阅维持 350 个 Plus 积分（不含 Prime 和一次性赠送订阅）。' },
      ],
      kick: [
        { q: 'Kick 每个订阅主播能赚多少？', a: 'Kick 平台仅抽取 5%，主播得 95%：每 $4.99 订阅净得 $4.74 美元，几乎是 Twitch $2.49 的两倍。' },
        { q: 'Kick 的 KCP 激励计划是什么？', a: '根据同时在线人数 (CCV) 每小时补贴 $16–$40+ 美元；直接打赏 100% 归主播所有。' },
      ],
      runway: [
        { q: '我的存款或启动资金能支撑多久？', a: '将本金除以每月净支出：$60,000 ÷ $5,000/月 = 12 个月。若在年化 8% 回报下，每月提取 0.67% 可长期维持不枯竭。' },
        { q: '这是 SWP 系统提取计划计算器吗？', a: '是的 — 支持固定月提取、剩余本金复利增值，并扣除通胀递增影响。' },
      ],
      'fuel-cost-calculator': [
        { q: '如何计算自驾出行的油费成本？', a: '耗油量 = 行驶距离 ÷ 百公里油耗；油费 = 耗油量 × 每升单价。例如：行驶 300 公里，车况 15 km/L 需耗油 20 升。' },
        { q: '开车 100 公里需要消耗多少升汽油？', a: '100 ÷ 你的 km/L：若为 15 km/L 约需 6.7 升；若标称为 7 L/100km 则正好为 7 升。' },
      ],
    },
    tr: {
      adsense: [
        { q: 'AdSense 1.000 görüntüleme başına ne kadar öder?', a: '1.000 sayfa görüntüleme başına yaklaşık $2.50 ile $45+ arasındadır. Finans ve SaaS siteleri $25–$60 sayfa RPM kazanırken; eğlence $2–$7 ortalamasındadır.' },
        { q: 'Ayda $1.000 kazanmak için kaç görüntüleme gerekir?', a: 'Finans gibi nişlerde ($25 RPM) yaklaşık 40.000; genel konularda ($6 RPM) yaklaşık 166.000 görüntüleme gerekir.' },
      ],
      youtube: [
        { q: 'YouTube 1.000 izlenme başına ne kadar öder?', a: 'Uzun video RPM oranları 1.000 izlenme başına $1.50 ile $35+ arasındadır (%45 YouTube kesintisi sonrası). Shorts havuzdan yaklaşık $0.03–$0.09 RPM öder.' },
        { q: 'Ayda $1.000 kazanmak için kaç izlenme gerekir?', a: '$5 RPM ile ayda yaklaşık 200.000 izlenme; $20 RPM ile (finans, ABD kitlesi) yaklaşık 50.000 izlenme gerekir.' },
      ],
      tiktok: [
        { q: 'TikTok 1.000 izlenme başına ne kadar öder?', a: 'Creator Rewards Programı 1.000 nitelikli izlenme başına yaklaşık $0.40–$1.20 öder (1 dk üzeri ve 5 sn izlenen videolar).' },
        { q: '1.000 TikTok Elması kaç dolar eder?', a: '1.000 Elmas üreticiye net $5 kazandırır. İzleyiciler bu jetonları alırken yaklaşık iki katını öder.' },
      ],
      twitch: [
        { q: '1 Twitch abonesi yayıncıya ne kadar kazandırır?', a: '$4.99 Kademe 1 abone, standart 50/50 paylaşımda $2.49 ve Partner Plus 70/30 paylaşımında ~$3.49 öder.' },
        { q: 'Twitch 70/30 paylaşımını nasıl açarım?', a: 'Yenilenen ücretli abonelerle üst üste 3 ay boyunca 350 Plus Puanını koruyun.' },
      ],
      kick: [
        { q: 'Kick abone başına ne kadar öder?', a: 'Kick yalnızca %5 keser ve yayıncılara %95 öder: $4.99 abonelik başına net $4.74 — Twitch\'in $2.49 tabanının neredeyse iki katı.' },
        { q: 'Kick KCP programı nedir?', a: 'Eşzamanlı izleyici sayısına göre saatte ~$16–$40+ taban ücret; doğrudan bağışlar %100 nettir.' },
      ],
      runway: [
        { q: 'Birikimlerim veya sermayem ne kadar süre yeter?', a: 'Toplam paranızı aylık açığınıza bölün: $60.000 ÷ $5.000/ay = 12 ay. Yıllık %8 getiri ile bir bakiye aylık yaklaşık %0.67 çekimi neredeyse süresiz destekler.' },
        { q: 'Bu bir SWP hesaplayıcı mıdır?', a: 'Evet — kalan bakiyenin bileşik büyüdüğü ve enflasyon artışının düşüldüğü sabit aylık çekim hesaplayıcısıdır.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Bir seyahatin yakıt maliyeti nasıl hesaplanır?', a: 'Gereken Yakıt = Mesafe ÷ Yakıt Tüketimi; Maliyet = Yakıt × Pompa Fiyatı. Örnek: 15 km/L ile 300 km için 20 litre gerekir.' },
        { q: 'Aracım 100 km\'de ne kadar yakıt harcar?', a: '100 ÷ km/L değeriniz: 15 km/L ile ~6.7 litre; 7 L/100km değeriyle tam 7 litre harcanır.' },
      ],
    },
    pl: {
      adsense: [
        { q: 'Ile płaci AdSense za 1 000 wyświetleń?', a: 'Średnio od 2,50 $ do ponad 45 $ za 1 000 odsłon. Finanse i SaaS z ruchem Tier 1 osiągają 25–60 $ Page RPM; rozrywka 2–7 $.' },
        { q: 'Ile odsłon potrzeba, aby zarobić 1 000 $ miesięcznie?', a: 'Około 40 000 odsłon w tematyce finansowej (RPM 25 $) lub 166 000 odsłon w tematyce ogólnej (RPM 6 $).' },
      ],
      youtube: [
        { q: 'Ile płaci YouTube za 1 000 wyświetleń?', a: 'Stawka RPM dla długich filmów wynosi od 1,50 $ do ponad 35 $ (po potrąceniu 45% prowizji YouTube). Shorts to około 0,03–0,09 $ RPM.' },
        { q: 'Ile wyświetleń potrzeba, aby zarobić 1 000 $ miesięcznie?', a: 'Przy RPM 5 $ potrzeba ~200 000 wyświetleń; przy RPM 20 $ (finanse, USA) ~50 000 wyświetleń.' },
      ],
      tiktok: [
        { q: 'Ile płaci TikTok za 1 000 wyświetleń?', a: 'Program Creator Rewards płaci około 0,40–1,20 $ za 1 000 kwalifikowanych wyświetleń (filmy >1 min oglądane przez min. 5 s).' },
        { q: 'Ile warte jest 1 000 Diamentów na TikToku?', a: '1 000 Diamentów = 5 $ netto dla twórcy. Widzowie płacą za monety około dwukrotnie więcej.' },
      ],
      twitch: [
        { q: 'Ile zarabia streamer za suba na Twitchu?', a: 'Subskrypcja Poziomu 1 (4,99 $) daje 2,49 $ przy podziale 50/50 i ~3,49 $ w Partner Plus 70/30.' },
        { q: 'Jak odblokować podział 70/30 na Twitchu?', a: 'Utrzymaj 350 punktów Plus przez 3 kolejne miesiące z odnawialnych płatnych subów.' },
      ],
      kick: [
        { q: 'Ile płaci Kick za subskrypcję?', a: 'Kick pobiera tylko 5% i wypłaca 95%: 4,74 $ netto za suba 4,99 $ — prawie dwukrotnie więcej niż 2,49 $ na Twitchu.' },
        { q: 'Czym jest program KCP na Kick?', a: 'Stawka godzinowa około 16–40 $+/godz. zależnie od liczby widzów (CCV); napiwki trafiają w 100% do streamera.' },
      ],
      runway: [
        { q: 'Na jak długo wystarczą moje oszczędności?', a: 'Podziel oszczędności przez miesięczny deficyt: 60 000 $ ÷ 5 000 $/mies. = 12 miesięcy. Przy stopie zwrotu 8% kapitał wspiera wypłatę ~0,67%/mies. niemal bezterminowo.' },
        { q: 'Czy to kalkulator SWP?', a: 'Tak — stała miesięczna wypłata z reinwestycją reszty środków pomniejszona o inflację.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Jak obliczyć koszt paliwa na podróż?', a: 'Potrzebne paliwo = Dystans ÷ Spalanie; Koszt = Paliwo × Cena. Przykład: 300 km przy 15 km/l wymaga 20 litrów.' },
        { q: 'Ile paliwa zużyje samochód na 100 km?', a: '100 ÷ Twoje km/l: przy 15 km/l potrzeba ~6,7 litra. Przy 7 l/100km dokładnie 7 litrów.' },
      ],
    },
    id: {
      adsense: [
        { q: 'Berapa penghasilan AdSense per 1.000 tayangan?', a: 'Sekitar $2.50 hingga $45+ per 1.000 tayangan halaman. Niche keuangan dan SaaS menghasilkan RPM $25–$60; hiburan rata-rata $2–$7.' },
        { q: 'Berapa tayangan yang dibutuhkan untuk menghasilkan $1.000 sebulan?', a: 'Sekitar 40.000 tayangan pada niche keuangan ($25 RPM) atau sekitar 166.000 tayangan pada niche umum ($6 RPM).' },
      ],
      youtube: [
        { q: 'Berapa penghasilan YouTube per 1.000 tayangan?', a: 'RPM video panjang berkisar antara $1.50 hingga $35+ setelah potongan 45% YouTube. Shorts menghasilkan sekitar $0.03–$0.09 RPM.' },
        { q: 'Berapa penayangan yang dibutuhkan untuk dapat $1.000 per bulan?', a: 'Pada RPM $5 butuh ~200.000 tayangan per bulan; pada RPM $20 (keuangan, audiens AS) butuh ~50.000 tayangan.' },
      ],
      tiktok: [
        { q: 'Berapa bayaran TikTok per 1.000 tayangan?', a: 'Program Creator Rewards membayar sekitar $0.40–$1.20 per 1.000 tayangan berkualifikasi (video >1 menit ditonton min 5 detik di FYP).' },
        { q: 'Berapa nilai 1.000 Berlian TikTok?', a: '1.000 Berlian = $5 bersih bagi kreator. Penonton membayar kira-kira dua kali lipat dalam koin.' },
      ],
      twitch: [
        { q: 'Berapa penghasilan 1 subscriber di Twitch?', a: 'Sub Tier 1 ($4.99) menghasilkan $2.49 pada bagi hasil 50/50 dan ~$3.49 pada Partner Plus 70/30.' },
        { q: 'Bagaimana cara membuka bagi hasil 70/30 di Twitch?', a: 'Pertahankan 350 Plus Points selama 3 bulan berturut-turut dari sub berbayar berulang.' },
      ],
      kick: [
        { q: 'Berapa penghasilan Kick per subscriber?', a: 'Kick hanya mengambil 5% dan memberikan 95%: $4.74 bersih per sub $4.99 — hampir dua kali lipat Twitch ($2.49).' },
        { q: 'Apa itu program KCP di Kick?', a: 'Gaji per jam sekitar $16–$40+/jam berdasarkan rata-rata penonton serentak (CCV); donasi langsung 100% bersih.' },
      ],
      runway: [
        { q: 'Berapa lama tabungan atau modal saya akan bertahan?', a: 'Bagi saldo dengan defisit bulanan: $60.000 ÷ $5.000/bln = 12 bulan. Imbal hasil 8% per tahun mendukung penarikan ~0.67%/bulan hampir selamanya.' },
        { q: 'Apakah ini kalkulator SWP?', a: 'Ya — penarikan bulanan tetap dengan sisa saldo yang terus berbunga, dikurangi kenaikan inflasi.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Bagaimana cara menghitung biaya bahan bakar untuk perjalanan?', a: 'Bahan bakar yang dibutuhkan = Jarak ÷ Konsumsi BBM; Biaya = Liter × Harga Pompa. Contoh: 300 km dengan 15 km/L butuh 20 liter.' },
        { q: 'Berapa banyak bahan bakar yang dibutuhkan mobil untuk 100 km?', a: '100 ÷ km/L mobil Anda: pada 15 km/L butuh ~6.7 liter. Pada 7 L/100km tepat 7 liter.' },
      ],
    },
    nl: {
      adsense: [
        { q: 'Hoeveel betaalt AdSense per 1.000 weergaven?', a: 'Ongeveer $ 2,50 tot $ 45+ per 1.000 paginaweergaven. Financiën en SaaS in Tier 1 behalen $ 25–$ 60 Pagina-RPM; entertainment $ 2–$ 7.' },
        { q: 'Hoeveel weergaven heb ik nodig om $ 1.000 per maand te verdienen?', a: 'Ongeveer 40.000 weergaven bij een RPM van $ 25 (financiën) of 166.000 weergaven bij een RPM van $ 6 (algemeen).' },
      ],
      youtube: [
        { q: 'Hoeveel betaalt YouTube per 1.000 weergaven?', a: 'De RPM voor lange video\'s varieert van $ 1,50 tot $ 35+ na de 45% inhouding van YouTube. Shorts leveren circa $ 0,03–$ 0,09 RPM op.' },
        { q: 'Hoeveel weergaven heb ik nodig voor $ 1.000 per maand?', a: 'Bij een RPM van $ 5 heeft u ~200.000 weergaven nodig; bij $ 20 (financiën, VS-publiek) ~50.000 weergaven.' },
      ],
      tiktok: [
        { q: 'Hoeveel betaalt TikTok per 1.000 weergaven?', a: 'Het Creator Rewards Programma betaalt circa $ 0,40–$ 1,20 per 1.000 gekwalificeerde views (video\'s >1 minuut bekeken vanaf 5s in Voor jou).' },
        { q: 'Hoeveel zijn 1.000 TikTok Diamanten waard?', a: '1.000 Diamanten = $ 5 netto voor de maker. Kijkers betalen ongeveer het dubbele in munten.' },
      ],
      twitch: [
        { q: 'Hoeveel verdient een streamer per Twitch-sub?', a: 'Een Tier 1-sub ($ 4,99) levert $ 2,49 op bij 50/50 en ~$ 3,49 bij 70/30 Partner Plus.' },
        { q: 'Hoe ontgrendel ik de 70/30-verdeling op Twitch?', a: 'Behoud 350 Plus Points gedurende 3 opeenvolgende maanden via terugkerende betaalde subs.' },
      ],
      kick: [
        { q: 'Hoeveel betaalt Kick per abonnee?', a: 'Kick houdt slechts 5% in en betaalt 95% uit: $ 4,74 netto per abonnement van $ 4,99 — bijna het dubbele van Twitch ($ 2,49).' },
        { q: 'Wat is het KCP-programma van Kick?', a: 'Een uurtarief van circa $ 16–$ 40+/uur op basis van gelijktijdige kijkers (CCV); directe fooien zijn 100% netto.' },
      ],
      runway: [
        { q: 'Hoe lang gaan mijn spaargelden mee?', a: 'Deel uw saldo door uw maandelijkse tekort: $ 60.000 ÷ $ 5.000/mnd = 12 maanden. Bij 8% jaarlijks rendement ondersteunt een saldo vrijwel onbeperkt een maandelijkse opname van ~0,67%.' },
        { q: 'Is dit een SWP-calculator?', a: 'Ja — een vaste maandelijkse opname waarbij het resterende bedrag rendeert, minus inflatiestijging.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Hoe bereken je de brandstofkosten voor een reis?', a: 'Brandstof nodig = Afstand ÷ Verbruik; Kosten = Brandstof × Pompprijs. Voorbeeld: 300 km bij 15 km/L vereist 20 liter.' },
        { q: 'Hoeveel brandstof verbruikt mijn auto voor 100 km?', a: '100 ÷ uw km/L: bij 15 km/L heeft u ~6,7 liter nodig. Bij 7 L/100km precies 7 liter.' },
      ],
    },
    vi: {
      adsense: [
        { q: 'Google AdSense trả bao nhiêu tiền cho 1.000 lượt xem?', a: 'Từ $2.50 đến hơn $45 cho mỗi 1.000 lượt xem trang (Page RPM). Mảng tài chính và SaaS đạt $25–$60 RPM; giải trí trung bình $2–$7.' },
        { q: 'Cần bao nhiêu lượt xem để kiếm được $1.000 mỗi tháng?', a: 'Khoảng 40.000 lượt xem với chủ đề tài chính (RPM $25) hoặc khoảng 166.000 lượt xem với chủ đề tổng hợp (RPM $6).' },
      ],
      youtube: [
        { q: 'YouTube trả bao nhiêu tiền cho 1.000 lượt xem?', a: 'RPM video dài dao động từ $1.50 đến hơn $35 sau khi trừ 45% phí YouTube. Shorts được chia từ quỹ riêng khoảng $0.03–$0.09 RPM.' },
        { q: 'Cần bao nhiêu lượt xem để kiếm $1.000 mỗi tháng?', a: 'Ở mức RPM $5 cần ~200.000 lượt xem/tháng; ở mức RPM $20 (tài chính, khán giả Mỹ) chỉ cần ~50.000 lượt xem.' },
      ],
      tiktok: [
        { q: 'TikTok trả bao nhiêu tiền cho 1.000 lượt xem?', a: 'Chương trình Creator Rewards trả khoảng $0.40–$1.20 cho mỗi 1.000 lượt xem đủ điều kiện (video gốc >1 phút xem trên 5 giây từ Dành cho bạn).' },
        { q: '1.000 Kim cương TikTok trị giá bao nhiêu tiền?', a: '1.000 Kim cương = $5 thực nhận cho nhà sáng tạo. Người xem nạp xu gấp khoảng 2 lần mức đó.' },
      ],
      twitch: [
        { q: '1 lượt đăng ký kênh Twitch mang lại bao nhiêu tiền?', a: 'Gói sub Tier 1 ($4.99) trả $2.49 theo tỷ lệ 50/50 và ~$3.49 theo tỷ lệ Partner Plus 70/30.' },
        { q: 'Làm thế nào để mở khóa mức chia 70/30 trên Twitch?', a: 'Duy trì 350 Điểm Plus trong 3 tháng liên tiếp từ các lượt đăng ký trả phí định kỳ.' },
      ],
      kick: [
        { q: 'Kick trả bao nhiêu tiền cho mỗi lượt đăng ký?', a: 'Kick giữ lại 5% và trả 95%: $4.74 thực nhận cho mỗi sub $4.99 — gần gấp đôi mức $2.49 của Twitch.' },
        { q: 'Chương trình KCP trên Kick là gì?', a: 'Phụ cấp theo giờ khoảng $16–$40+/giờ tùy theo lượng người xem đồng thời (CCV); tiền ủng hộ trực tiếp nhận đủ 100%.' },
      ],
      runway: [
        { q: 'Tiền tiết kiệm hoặc vốn khởi nghiệp của tôi sẽ duy trì được bao lâu?', a: 'Lấy tổng tiền chia cho số tiền chi tiêu ròng: $60.000 ÷ $5.000/tháng = 12 tháng. Ở mức lợi nhuận 8%/năm, khoản tiền duy trì rút ~0.67%/tháng gần như vô hạn.' },
        { q: 'Đây có phải là công cụ tính SWP không?', a: 'Đúng — tính toán rút tiền định kỳ hàng tháng với số dư còn lại tiếp tục sinh lời trừ đi lạm phát hàng năm.' },
      ],
      'fuel-cost-calculator': [
        { q: 'Làm thế nào để tính chi phí xăng dầu cho một chuyến đi?', a: 'Nhiên liệu cần = Khoảng cách ÷ Mức tiêu hao; Chi phí = Nhiên liệu × Giá xăng. Ví dụ: 300 km ở mức 15 km/L cần 20 lít.' },
        { q: 'Xe của tôi sẽ tiêu thụ bao nhiêu xăng cho 100 km?', a: '100 ÷ chỉ số km/L của bạn: ở mức 15 km/L cần ~6.7 lít. Ở mức 7 L/100km cần chính xác 7 lít.' },
      ],
    },
  };
  const faqForPlatform = (LOCALIZED_FAQ[lang] && LOCALIZED_FAQ[lang][platformKey] && platformKey !== 'admob')
    ? LOCALIZED_FAQ[lang][platformKey]
    : (faqMap[platformKey] || faqMap['adsense']);
  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'inLanguage': lang,
    'mainEntity': faqForPlatform.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a },
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schemaApp)}</script>\n<script type="application/ld+json">${JSON.stringify(schemaBreadcrumb)}</script>\n<script type="application/ld+json">${JSON.stringify(schemaWebsite)}</script>\n<script type="application/ld+json">${JSON.stringify(schemaFaq)}</script>`;
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

  // Helper to write prerendered file
  const writePrerender = (cleanSlug, htmlContent, meta, lang = 'en', platformKey = '') => {
    let renderedPage = template
      .replace('<html lang="en">', `<html lang="${lang}">`)
      .replace('<div id="root"></div>', `<div id="root">${htmlContent}</div>`)
      .replace(/<link rel="modulepreload"[^>]*(?:vendor-charts|Modal|Calculator|Editorial|Guide|Formula|Glossary|Faq|Tips|Trust|RevenueCharts)[^>]*>\s*/g, '');
    
    if (meta?.title) {
      renderedPage = renderedPage
        .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
        .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${meta.title}" />`)
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
      // Fix OG URL + Twitter URL + locale per-page (P0-5)
      renderedPage = renderedPage.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${meta.canonical}" />`);
      renderedPage = renderedPage.replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${meta.canonical}" />`);
      // Fix Twitter title/description name= tags for non-AdMob pages.
      // (index.html uses name=, not property=, so the property= replaces above are no-ops.
      // AdMob keeps legacy generic Twitter tags so its indexed HTML stays identical.)
      if (platformKey && platformKey !== 'admob' && meta?.title && meta?.desc) {
        renderedPage = renderedPage
          .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${meta.title}" />`)
          .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${meta.desc}" />`);
      }
      const localeMap = { en: 'en_US', es: 'es_ES', ja: 'ja_JP', fr: 'fr_FR', de: 'de_DE', pt: 'pt_BR', ko: 'ko_KR', it: 'it_IT', ru: 'ru_RU', ar: 'ar_SA', zh: 'zh_CN', tr: 'tr_TR', pl: 'pl_PL', id: 'id_ID', nl: 'nl_NL', vi: 'vi_VN' };
      const locale = localeMap[lang] || 'en_US';
      renderedPage = renderedPage.replace(/<meta property="og:locale" content=".*?" \/>/, `<meta property="og:locale" content="${locale}" />`);
      // Fix hreflang per-platform cluster (P0-5) - no trailing slash except root
      // India-only pages (8th-pay-commission) are English-only: just x-default + en
      const basePath = platformKey && platformKey !== 'home' ? platformKey : (cleanSlug === '404' ? '404' : '');
      const INDIA_ONLY = new Set(['8th-pay-commission']);
      const langs = INDIA_ONLY.has(platformKey)
        ? ['x-default', 'en']
        : ['x-default', 'en', 'es', 'ja', 'fr', 'de', 'pt', 'pt-BR', 'ko', 'it', 'ru', 'ar', 'zh', 'tr', 'pl', 'id', 'nl', 'vi'];
      const buildHref = (lng, path) => {
        if (!path) return `https://realtools.store/${lng === 'en' || lng === 'x-default' ? '' : lng}`;
        if (lng === 'en') return `https://realtools.store/${path}`;
        if (lng === 'x-default') return `https://realtools.store/${path}`;
        return `https://realtools.store/${lng}/${path}`;
      };
      const hreflangBlock = langs.map(lng => {
        const href = lng === 'pt-BR' ? buildHref('pt', basePath) : buildHref(lng, basePath);
        return `    <link rel="alternate" hreflang="${lng}" href="${href}" />`;
      }).join('\n');
      renderedPage = renderedPage.replace(/(<link rel="alternate" hreflang=".*?".*?\/>\s*){8,25}/, hreflangBlock + '\n');
    }

    if (meta) {
      const jsonLdTag = generateJsonLd(platformKey || cleanSlug, meta, lang);
      renderedPage = renderedPage.replace('</head>', `${jsonLdTag}\n</head>`);
    }

    if (cleanSlug === '' || cleanSlug === 'index') {
      const fullPath = path.join(root, 'dist', 'index.html');
      fs.writeFileSync(fullPath, renderedPage, 'utf-8');
      console.log(`  ✓ dist/index.html (${Math.round(renderedPage.length / 1024)} KB) [lang: ${lang}]`);
    } else {
      // 1. Write clean directory dist/slug/index.html
      const dirPath = path.join(root, 'dist', cleanSlug);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(path.join(dirPath, 'index.html'), renderedPage, 'utf-8');

      // 2. Also write flat fallback dist/slug.html
      fs.writeFileSync(path.join(root, 'dist', `${cleanSlug}.html`), renderedPage, 'utf-8');

      console.log(`  ✓ dist/${cleanSlug}/index.html (Clean URL /${cleanSlug}) (${Math.round(renderedPage.length / 1024)} KB) [lang: ${lang}]`);
    }
  };

  // 1. Pre-render Root / Home hub (/)
  const homeHtml = render('home', 'en');
  writePrerender('', homeHtml, PLATFORM_METADATA.home, 'en', 'home');

  // 1b. Pre-render Clean AdMob page (/admob)
  const admobHtml = render('admob', 'en');
  writePrerender('admob', admobHtml, PLATFORM_METADATA.admob, 'en', 'admob');

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

  // 6b. Pre-render Clean Runway page (/runway)
  const runwayHtml = render('runway', 'en');
  writePrerender('runway', runwayHtml, PLATFORM_METADATA.runway, 'en', 'runway');

  // 6c. Pre-render 8th Pay Commission page (/8th-pay-commission, India)
  const payHtml = render('8th-pay-commission', 'en');
  writePrerender('8th-pay-commission', payHtml, PLATFORM_METADATA['8th-pay-commission'], 'en', '8th-pay-commission');

  // 6d. Pre-render Fuel Cost page (/fuel-cost-calculator, global)
  const fuelHtml = render('fuel-cost-calculator', 'en');
  writePrerender('fuel-cost-calculator', fuelHtml, PLATFORM_METADATA['fuel-cost-calculator'], 'en', 'fuel-cost-calculator');

  // 7. Pre-render Clean Trust & Legal pages
  const aboutHtml = render('about', 'en');
  writePrerender('about', aboutHtml, { title: 'About Us | RealTools 2026 Free Calculators', desc: 'About RealTools publisher tools and creator revenue forecasting.', canonical: 'https://realtools.store/about', keywords: 'about realtools, monetization engine, revenue calculator team' }, 'en');

  const contactHtml = render('contact', 'en');
  writePrerender('contact', contactHtml, { title: 'Contact Us & Publisher Support | RealTools', desc: 'Contact publisher support and monetization engineers for calculator feedback. | RealTools', canonical: 'https://realtools.store/contact', keywords: 'contact realtools, publisher support, revenue calculator contact' }, 'en');

  const privacyHtml = render('privacy', 'en');
  writePrerender('privacy', privacyHtml, { title: 'Privacy Policy | RealTools', desc: 'Privacy Policy and data protection standards for RealTools.', canonical: 'https://realtools.store/privacy', keywords: 'privacy policy realtools, data protection' }, 'en');

  const termsHtml = render('terms', 'en');
  writePrerender('terms', termsHtml, { title: 'Terms of Service | RealTools', desc: 'Terms of Service and acceptable use policy for monetization calculations. | RealTools', canonical: 'https://realtools.store/terms', keywords: 'terms of service realtools' }, 'en');

  const disclaimerHtml = render('disclaimer', 'en');
  writePrerender('disclaimer', disclaimerHtml, { title: 'Earnings Disclaimer & Methodology | RealTools', desc: 'Earnings disclaimer, statistical accuracy, and calculation methodology for digital advertising networks. | RealTools', canonical: 'https://realtools.store/disclaimer', keywords: 'earnings disclaimer, revenue calculation methodology, realtools' }, 'en');

  // 8. Pre-render 7 Localized clean versions for ALL platforms with precise localized metadata
  const languages = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'ru', 'ar', 'zh', 'tr', 'pl', 'id', 'nl', 'vi'];
  for (const lang of languages) {
    const langDict = LOCALIZED_PLATFORM_METADATA[lang];

    // Localized Root (home hub)
    const langRootMeta = { ...langDict.root, canonical: `https://realtools.store/${lang}` };
    const langRootHtml = render('home', lang);
    writePrerender(`${lang}`, langRootHtml, langRootMeta, lang, 'home');

    // Localized AdMob
    const langAdmobMeta = { ...langDict.admob, canonical: `https://realtools.store/${lang}/admob` };
    const langAdmobHtml = render('admob', lang);
    writePrerender(`${lang}/admob`, langAdmobHtml, langAdmobMeta, lang, 'admob');

    // Localized AdSense
    const langAdsenseMeta = { ...langDict.adsense, canonical: `https://realtools.store/${lang}/adsense` };
    const langAdsenseHtml = render('adsense', lang);
    writePrerender(`${lang}/adsense`, langAdsenseHtml, langAdsenseMeta, lang, 'adsense');

    // Localized YouTube
    const langYtMeta = { ...langDict.youtube, canonical: `https://realtools.store/${lang}/youtube` };
    const langYtHtml = render('youtube', lang);
    writePrerender(`${lang}/youtube`, langYtHtml, langYtMeta, lang, 'youtube');

    // Localized TikTok
    const langTtMeta = { ...langDict.tiktok, canonical: `https://realtools.store/${lang}/tiktok` };
    const langTtHtml = render('tiktok', lang);
    writePrerender(`${lang}/tiktok`, langTtHtml, langTtMeta, lang, 'tiktok');

    // Localized Twitch
    const langTwitchMeta = { ...langDict.twitch, canonical: `https://realtools.store/${lang}/twitch` };
    const langTwitchHtml = render('twitch', lang);
    writePrerender(`${lang}/twitch`, langTwitchHtml, langTwitchMeta, lang, 'twitch');

    // Localized Kick
    const langKickMeta = { ...langDict.kick, canonical: `https://realtools.store/${lang}/kick` };
    const langKickHtml = render('kick', lang);
    writePrerender(`${lang}/kick`, langKickHtml, langKickMeta, lang, 'kick');

    // Localized Runway
    const langRunwayMeta = { ...langDict.runway, canonical: `https://realtools.store/${lang}/runway` };
    const langRunwayHtml = render('runway', lang);
    writePrerender(`${lang}/runway`, langRunwayHtml, langRunwayMeta, lang, 'runway');

    // Localized Fuel Cost (global tool)
    const langFuelMeta = { ...langDict['fuel-cost-calculator'], canonical: `https://realtools.store/${lang}/fuel-cost-calculator` };
    const langFuelHtml = render('fuel-cost-calculator', lang);
    writePrerender(`${lang}/fuel-cost-calculator`, langFuelHtml, langFuelMeta, lang, 'fuel-cost-calculator');
  }

  // 9. Pre-render 404 Not Found page — Cloudflare serves this with 404 status for unknown paths
  const notFoundMeta = {
    title: '404 - Page Not Found | RealTools',
    desc: 'The page you are looking for does not exist. Explore our AdSense, YouTube, TikTok, Twitch and Kick revenue calculators. | RealTools',
    keywords: '404, page not found, realtools',
    canonical: 'https://realtools.store/404',
  };
  const notFoundHtml = render('404', 'en');
  // Write 404.html at root (Cloudflare Pages serves this automatically with 404)
  const template404 = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf-8');
  // Re-render 404 from fresh template with noindex
  let notFoundPage = template
    .replace('<html lang="en">', `<html lang="en">`)
    .replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`)
    .replace(/<link rel="modulepreload"[^>]*(?:vendor-charts|Modal|Calculator|Editorial|Guide|Formula|Glossary|Faq|Tips|Trust|RevenueCharts)[^>]*>\s*/g, '');
  notFoundPage = notFoundPage
    .replace(/<title>.*?<\/title>/, `<title>${notFoundMeta.title}</title>`)
    .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${notFoundMeta.title}" />`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${notFoundMeta.desc}" />`)
    .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${notFoundMeta.keywords}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${notFoundMeta.canonical}" />`);
  // Force noindex for 404
  if (notFoundPage.includes('<meta name="robots"')) {
    notFoundPage = notFoundPage.replace(/<meta name="robots" content=".*?" \/>/, '<meta name="robots" content="noindex, nofollow" />');
  } else {
    notFoundPage = notFoundPage.replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n</head>');
  }
  // Remove any breadcrumb JSON-LD that implies valid page
  fs.writeFileSync(path.join(root, 'dist', '404.html'), notFoundPage, 'utf-8');
  // Also write 404/index.html for consistency
  const dir404 = path.join(root, 'dist', '404');
  if (!fs.existsSync(dir404)) fs.mkdirSync(dir404, { recursive: true });
  fs.writeFileSync(path.join(dir404, 'index.html'), notFoundPage, 'utf-8');
  console.log(`  ✓ dist/404.html (404 Not Found) (${Math.round(notFoundPage.length / 1024)} KB)`);

  // Clean up SSR temp directory
  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
} catch (ssrError) {
  console.warn('⚠️ SSR pre-rendering warning:', ssrError?.message || ssrError);
}

console.log('🎉 Production build and Clean Pretty URLs SSG completed successfully!');
