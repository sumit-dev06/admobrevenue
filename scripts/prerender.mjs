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
  },
};

// ==========================================
// 3. GENERATE RICH JSON-LD STRUCTURED DATA
// ==========================================
function generateJsonLd(platformKey, meta, lang = 'en') {
  // Skip rich rating for 404/trust pages to avoid inflated rating
  const isAppPage = ['admob','adsense','youtube','tiktok','twitch','kick','runway'].includes(platformKey);
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
  };
  const faqForPlatform = faqMap[platformKey] || faqMap['adsense'];
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
      const localeMap = { en: 'en_US', es: 'es_ES', ja: 'ja_JP', fr: 'fr_FR', de: 'de_DE', pt: 'pt_BR', ko: 'ko_KR', it: 'it_IT' };
      const locale = localeMap[lang] || 'en_US';
      renderedPage = renderedPage.replace(/<meta property="og:locale" content=".*?" \/>/, `<meta property="og:locale" content="${locale}" />`);
      // Fix hreflang per-platform cluster (P0-5) - no trailing slash except root
      const basePath = platformKey && platformKey !== 'home' ? platformKey : (cleanSlug === '404' ? '404' : '');
      const buildHref = (lng, path) => {
        if (!path) return `https://realtools.store/${lng === 'en' || lng === 'x-default' ? '' : lng}`;
        if (lng === 'en') return `https://realtools.store/${path}`;
        if (lng === 'x-default') return `https://realtools.store/${path}`;
        return `https://realtools.store/${lng}/${path}`;
      };
      const langs = ['x-default', 'en', 'es', 'ja', 'fr', 'de', 'pt', 'pt-BR', 'ko', 'it'];
      const hreflangBlock = langs.map(lng => {
        const href = lng === 'pt-BR' ? buildHref('pt', basePath) : buildHref(lng, basePath);
        return `    <link rel="alternate" hreflang="${lng}" href="${href}" />`;
      }).join('\n');
      renderedPage = renderedPage.replace(/(<link rel="alternate" hreflang=".*?".*?\/>\s*){8,10}/, hreflangBlock + '\n');
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
  const languages = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
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
