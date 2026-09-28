// Per-route SEO titles + descriptions for the runtime (client-side) SEO sync in App.tsx.
//
// SINGLE SOURCE OF TRUTH for prerendered tags lives in scripts/prerender.mjs
// (PLATFORM_METADATA + LOCALIZED_PLATFORM_METADATA). This table MUST mirror it.
// It exists because the client must set the exact same <title>/<meta description>
// after hydration and on client-side platform navigation — otherwise the generic
// t.meta.* strings overwrite the correct per-calculator tags and Google indexes
// /youtube, /tiktok, /twitch with AdSense titles/descriptions.
//
// Shape: PLATFORM_SEO[lang][platform] = { title, desc }
// platform: home | admob | adsense | youtube | tiktok | twitch | kick | runway | 8th-pay-commission | fuel-cost-calculator
// Missing lang/platform falls back to English (see getPlatformSeo below).

export interface SeoEntry {
  title: string;
  desc: string;
  keywords?: string;
}

export const PLATFORM_SEO: Record<string, Record<string, SeoEntry>> = {
  en: {
    home: {
      title: 'Ad Revenue & Runway Calculator 2026 | RealTools',
      desc: 'Free calculators for AdSense, AdMob, YouTube, TikTok, Twitch, Kick, savings and startup runway. Estimate revenue, payouts and runway. | RealTools',
      keywords: 'ad revenue calculator, adsense calculator, admob calculator, youtube money calculator, tiktok money calculator, twitch calculator, kick calculator, runway calculator, startup runway calculator, financial runway calculator, free runway calculator, money runway calculator, how long will my money last, realtools'
    },
    admob: {
      title: 'AdMob Revenue Calculator 2026 | ARPDAU & eCPM Tool',
      desc: 'Accurate AdMob calculator for iOS & Android apps. Estimate daily, monthly and yearly revenue (ARPDAU, eCPM) across Rewarded, Interstitial and App Open ads. | RealTools',
      keywords: 'Google AdMob revenue calculator, admob revenue calculator, app ad revenue calculator, mobile app revenue calculator, admob calculator, arpdau calculator, admob ecpm calculator, app monetization calculator, google admob, ad revenue calculator, mobile game revenue calculator, admob mediation calculator, realtools'
    },
    adsense: {
      title: 'AdSense Calculator 2026 | Page RPM & Income Estimator',
      desc: 'Calculate potential website earnings with our AdSense ad revenue and Page RPM calculators. Estimate monthly and yearly revenue across 26 niches, countries and ad units. | RealTools',
      keywords: 'Google AdSense revenue calculator, adsense revenue calculator, website ad revenue calculator, ad revenue calculator website, google adsense, what is google adsense, website income checker, page rpm calculator, adsense earnings estimator, blog revenue calculator, how much does adsense pay per 1000 views, realtools'
    },
    youtube: {
      title: 'YouTube Money Calculator 2026 | Earnings, RPM, CPM & Shorts Estimator',
      desc: 'Calculate potential YouTube earnings with our ad revenue, RPM, CPM and Shorts calculators. Estimate monthly and yearly channel revenue from ads, memberships and brand deals. | RealTools',
      keywords: 'YouTube ad revenue calculator, youtube money calculator, youtube earnings calculator, youtube revenue calculator, youtube rpm calculator, youtube shorts money calculator, youtube channel calculator, youtube creator income estimator, youtube cpm calculator, youtube monetization calculator, how much does youtube pay per 1000 views, youtube shorts revenue calculator, youtube sponsor earnings, realtools'
    },
    tiktok: {
      title: 'TikTok Money Calculator 2026 | Creator Rewards Tool',
      desc: 'Calculate potential TikTok earnings with our Creator Rewards, LIVE gifts and Shop calculators. Estimate monthly and yearly revenue from qualified views, diamonds and commissions. | RealTools',
      keywords: 'TikTok money calculator, tiktok creator rewards calculator, tiktok earnings calculator, tiktok diamond to usd calculator, tiktok live gifts calculator, tiktok creator fund calculator, tiktok rpm calculator, calculate tiktok money, how much does tiktok pay for 1 million views, tiktok shop affiliate earnings calculator, realtools'
    },
    twitch: {
      title: 'Twitch Money Calculator 2026 | Subs, Bits & Ad Revenue Estimator',
      desc: 'Calculate potential earnings on Twitch with our ad revenue, subscription, and Bits calculators. Estimate your monthly and yearly revenue from subs, AIP ads and sponsorships. | RealTools',
      keywords: 'Twitch money calculator, Twitch money calculators, Twitch ad revenue calculator, Twitch ad revenue calculators, twitch sub calculator, twitch earnings calculator, twitch bits calculator, twitch partner plus calculator, twitch streamer income calculator, twitch bits to usd, twitch ad incentive program calculator, how much do twitch streamers make, twitch sub revenue calculator, realtools'
    },
    kick: {
      title: 'Kick Earnings Calculator 2026 | 95/5 Split & KCP Pay',
      desc: 'Calculate potential Kick earnings with our 95/5 split and KCP hourly calculators. Estimate monthly and yearly streamer revenue from subs, stipends and tips. | RealTools',
      keywords: 'Kick earnings calculator, kick stream calculator, kick revenue calculator, kick sub calculator, kick 95 5 split calculator, kick creator program hourly rate, kick vs twitch earnings calculator, kick streamer income, how much does kick pay streamers, kick money calculator, kick crypto tipping, realtools'
    },
    runway: {
      title: 'Startup Runway Calculator 2026 | Financial Runway Tool',
      desc: 'Free runway calculator. See how long savings or startup cash lasts with withdrawals, returns and inflation rises. SWP breakeven analysis for 2026. | RealTools',
      keywords: 'runway calculator, startup runway calculator, financial runway calculator, free runway calculator, money runway calculator, how long will my money last, how long will 1 crore last, swp calculator, retirement withdrawal calculator, savings runway calculator, how long will $1 million last, systematic withdrawal plan calculator, breakeven withdrawal calculator, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | Fitment Factor Tool India',
      desc: 'Calculate projected 8th Pay Commission salary for central govt employees. Try fitment factors 1.92x–3.83x with DA, HRA slabs, arrears and pension. | RealTools',
      keywords: '8th pay commission salary calculator, 8th cpc salary calculator, 8th pay commission fitment factor calculator, 8th pay commission basic pay calculator, 8th pay commission arrears calculator, 8th pay commission pension calculator, 8th pay commission level wise salary, what will be my salary in 8th pay commission, realtools'
    },
    'fuel-cost-calculator': {
      title: 'Fuel Cost Calculator 2026 | Trip Petrol & Diesel Cost Estimator',
      desc: 'Free fuel cost calculator for any country. Enter distance, mileage and pump price to get trip cost, fuel needed, per-km cost and monthly estimate. | RealTools',
      keywords: 'fuel cost calculator, trip fuel cost calculator, petrol cost calculator, diesel cost calculator, car fuel cost per km calculator, mileage fuel cost calculator, road trip gas cost calculator, fuel consumption cost calculator, how much fuel will my trip use, realtools'
    },
  },
  es: {
    home: {
      title: 'Calculadora AdSense, AdMob y Runway 2026 | Ingresos',
      desc: 'Calculadora precisa de ingresos de Google AdSense, AdMob, YouTube, TikTok, Twitch y Kick. Estima ganancias, vistas, subs y anuncios. | RealTools',
      keywords: 'calculadora de ingresos adsense, calculadora de ingresos google adsense, calculadora de ingresos publicitarios, calculadora ingresos web, calculadora ingresos app, ingresos adsense, que es google adsense, calculadora dinero youtube, calculadora ingresos tiktok, calculadora subs twitch, calculadora ganancias kick, cuanto paga adsense por clic, cuanto paga adsense por 1000 visitas, runway calculator, calculadora runway gratis, realtools'
    },
    admob: {
      title: 'Calculadora AdMob 2026 | ARPDAU y eCPM',
      desc: 'Calculadora AdMob para apps iOS y Android. Estima ARPDAU, eCPM y ganancias diarias con rewarded, intersticiales y mediación. | RealTools',
      keywords: 'calculadora admob, calculadora ingresos admob, arpdau calculadora, admob ecpm calculadora, calculadora ingresos app, realtools'
    },
    adsense: {
      title: 'Calculadora AdSense 2026 | RPM y Ganancias Web',
      desc: 'Calculadora precisa de ingresos de Google AdSense. Calcula el Page RPM de tu web y estimación de ganancias según nicho, país y formato publicitario. | RealTools',
      keywords: 'calculadora de ingresos google adsense, calculadora de ingresos adsense, calculadora ingresos web, que es google adsense, ganancias adsense, calcular rpm adsense, estimador ingresos blog, cuanto paga adsense por clic, adsense cpc cuanto paga, cuanto paga adsense por 1000 visitas, cuanto se gana con adsense, realtools'
    },
    youtube: {
      title: 'Calculadora YouTube 2026 | RPM y Shorts',
      desc: 'Calcula ingresos de YouTube por videos largos y Shorts. Estima RPM por nicho, membresías y anuncios para creadores de contenido. | RealTools',
      keywords: 'calculadora de ingresos youtube, calculadora dinero youtube, calculadora ganancias youtube, youtube rpm calculadora, cuanto paga youtube por visita, calculadora youtube shorts, cuanto paga youtube por 1000 visitas, cuanto paga youtube por suscriptor, calculadora cpm youtube, realtools'
    },
    tiktok: {
      title: 'Calculadora TikTok 2026 | Creator Rewards',
      desc: 'Calculadora de dinero de TikTok. Calcula ganancias del Creator Rewards Program por vistas calificadas y regalos LIVE. | RealTools',
      keywords: 'calculadora de dinero tiktok, calculadora ingresos tiktok, creadores tiktok ganancias, diamantes tiktok a dolares, cuanto paga tiktok por visitas, calculadora tiktok live, cuanto paga tiktok por 1000 vistas, cuanto paga tiktok por like, cuanto paga tiktok por 1 millón de vistas, cuanto paga tiktok por live, cuanto paga tiktok por mil vistas, realtools'
    },
    twitch: {
      title: 'Calculadora Twitch 2026 | Subs y AIP',
      desc: 'Calcula ganancias de Twitch para streamers: suscripciones Tier 1/2/3, repartos Partner Plus (50/50 y 70/30), bits y programa AIP. | RealTools',
      keywords: 'calculadora de ingresos twitch, calculadora subs twitch, cuanto gana un streamer en twitch, calculadora dinero twitch, reparto partner plus twitch, bits a dolares twitch, cuanto paga twitch por suscripcion, cuanto paga twitch por viewer, cuanto paga twitch por visitas, cuanto paga twitch por sub, cuanto paga twitch por hora, realtools'
    },
    kick: {
      title: 'Calculadora Kick 2026 | 95/5 y KCP',
      desc: 'Calculadora de ingresos de Kick. Descubre ganancias con el reparto de suscripción 95/5 ($4.74 neto/sub) y el programa KCP por hora. | RealTools',
      keywords: 'calculadora de ganancias kick, calculadora ingresos kick, reparto 95 5 kick, cuanto paga kick por hora, kick vs twitch ganancias, calculadora subs kick, cuanto paga kick por sub, cuanto paga kick por viewer, cuanto paga kick por 1000 viewers, cuanto paga kick en españa, realtools'
    },
    runway: {
      title: 'Calculadora Runway 2026 | Cuánto Durará Mi Dinero',
      desc: 'Calculadora de runway: descubre cuántos años duran tus ahorros con retiros mensuales, rentabilidad e inflación. Análisis breakeven SWP. | RealTools',
      keywords: 'calculadora runway, cuanto durará mi dinero, cuanto dura 1 millón, calculadora swp, calculadora retiro jubilación, calculadora ahorros, startup runway calculator, financial runway calculator, free runway calculator, calculadora runway gratis, calculadora financiera startup, realtools'
    },
    'fuel-cost-calculator': {
      title: 'Calculadora de Combustible 2026 | Costo de Viaje por km',
      desc: 'Calculadora gratis de costo de combustible. Ingresa distancia, consumo y precio para obtener costo del viaje, litros y gasto mensual. | RealTools',
      keywords: 'calculadora de combustible, calculadora costo viaje gasolina, costo por km calculadora, consumo combustible calculadora, cuanto cuesta mi viaje en gasolina, realtools'
    },
  },
  ja: {
    home: {
      title: 'AdSense, AdMob & クリエイター収益計算ツール 2026 | 広告収入＆配信収益予測',
      desc: 'Google AdSense、AdMob、YouTube、TikTok、Twitch、Kickの正確な広告＆クリエイター収益計算機。再生数やサブスクから収益をシミュレーション。資産runway計算にも対応。 | RealTools',
      keywords: 'adsense 収益計算, アドセンス 収益 計算機, admob 収益計算, 広告収入 計算, ウェブサイト 広告収入, アプリ 広告収入, youtube 収益計算, tiktok 収益計算, twitch サブスク 収益, kick 収益計算機, アドセンス クリック単価, アドセンス 1クリック いくら, runway calculator, runway 計算, realtools'
    },
    admob: {
      title: 'AdMob 収益計算ツール 2026 | ARPDAU＆eCPM予測',
      desc: 'iOS・Androidアプリ向けAdMob収益計算。ARPDAU・eCPM・メディエーション効果を予測。 | RealTools',
      keywords: 'admob 収益計算, アドモブ 収益 計算機, arpdau 計算, アプリ 広告収入 計算, realtools'
    },
    adsense: {
      title: 'Google AdSense 収益計算ツール 2026 | ウェブサイト広告収入＆ページRPM予測',
      desc: 'Google AdSenseの広告収益見積もりツール。ジャンル、国、ページビュー数から月間ページRPMと推定収益を正確に計算。 | RealTools',
      keywords: 'google adsense 収益計算, アドセンス 収益 計算機, サイト 広告収入 計算, ページ rpm 計算, ブログ 収益シミュレーション, アドセンス 見積もり, アドセンス クリック単価, アドセンス 1クリック いくら, アドセンス 1000回 表示 いくら, アドセンス cpc 収益, realtools'
    },
    youtube: {
      title: 'YouTube 広告収益計算ツール 2026 | 動画再生数・RPM＆ショート収益予測',
      desc: 'YouTubeの長編動画およびShorts動画の広告収入計算ツール。ジャンル別RPM、メンバーシップ、広告単価からクリエイター収益を予測。 | RealTools',
      keywords: 'YouTube 収益 計算, ユーチューブ 収益計算機, youtube rpm 計算, youtube ショート 収益, ユーチューブ 再生回数 収入, チャンネル メンバーシップ 収益, ユーチューブ 再生数 収入 目安, ユーチューブ 1000回 再生 いくら, ユーチューブ cpm 計算, ユーチューブ ショート 収益 計算, ユーチューブ 再生 回数 収益 計算, realtools'
    },
    tiktok: {
      title: 'TikTok 収益計算ツール 2026 | Creator Rewards＆LIVEギフト換金予測',
      desc: 'TikTok Creator Rewards ProgramおよびLIVEギフト（ダイヤモンド）の換金収益計算ツール。対象視聴回数から推定月収を計算。 | RealTools',
      keywords: 'TikTok 収益 計算, tiktok 収益 計算機, tiktok 再生数 収入, tiktok ダイヤモンド 換金 計算, クリエイターリワードプログラム 収益, tiktok 1000回 再生 いくら, tiktok 再生数 収入 目安, tiktok 収益 計算 ツール, tiktok ライブ 収益 計算, realtools'
    },
    twitch: {
      title: 'Twitch 収益計算ツール 2026 | サブスク＆配信広告収入シミュレーター',
      desc: 'Twitchストリーマー向け収益計算ツール。Tier 1/2/3サブスク収益、Partner Plus（70/30配分）、Bits、AIP広告プログラム収益を計算。 | RealTools',
      keywords: 'Twitch 収益 計算 ツール, twitch サブスク 収益, twitch ストリーマー 収入, パートナープラス 収益配分, twitch ビッツ 換金, twitch サブスク いくら, twitch 視聴者数 収益, twitch サブスク 収益 計算 サイト, realtools'
    },
    kick: {
      title: 'Kick 収益計算ツール 2026 | 95/5サブスク還元＆KCP時給予測',
      desc: 'Kick配信者のための収益シミュレーター。業界最高の95/5サブスク還元率（1件あたり$4.74）およびKCP時給プログラム収益を計算。 | RealTools',
      keywords: 'Kick 収益 計算, kick 配信 収入, kick サブスク 95 5, kick クリエイター プログラム 時給, kick twitch 比較, kick サブスク いくら, kick 時給 収益, kick 収益 計算 サイト, realtools'
    },
    runway: {
      title: '資産寿命計算ツール 2026 | 老後資金は何年もつ？',
      desc: '毎月の取り崩し・運用利回り・インフレから資産の寿命を計算。SWP損益分岐点つき。 | RealTools',
      keywords: '資産寿命 計算, 老後資金 何年, 取り崩し シミュレーション, swp 計算, 1億円 何年, startup runway calculator, financial runway calculator, free runway calculator, 無料 runway 計算, スタートアップ runway 計算, realtools'
    },
    'fuel-cost-calculator': {
      title: '燃料費計算ツール 2026 | ガソリン代・燃費シミュレーター',
      desc: '距離・燃費・燃料単価から旅行の燃料費・必要量・月額を無料計算。世界対応。 | RealTools',
      keywords: '燃料費 計算, ガソリン代 計算, 燃費 計算, 旅行 ガソリン代, 月 燃料費 計算, realtools'
    },
  },
  fr: {
    home: {
      title: 'Calculateur AdSense, AdMob & Runway 2026 | Revenus',
      desc: 'Calculateur précis de revenus Google AdSense, AdMob, YouTube, TikTok, Twitch et Kick. Estimez vos gains publicitaires, abonnements et sponsors. | RealTools',
      keywords: 'calculateur de revenus adsense, simulateur de revenus adsense, calculateur de revenus publicitaires, gains google adsense, calculateur admob, calculateur revenus youtube, calculateur argent tiktok, simulateur gains twitch, calculateur kick, combien paye adsense par clic, combien gagne youtube 1000 vues, runway calculator, calculateur runway gratuit, realtools'
    },
    admob: {
      title: 'Calculateur AdMob 2026 | ARPDAU & eCPM',
      desc: 'Calculateur AdMob pour apps iOS et Android. Estimez ARPDAU, eCPM et revenus avec rewarded et médiation. | RealTools',
      keywords: 'calculateur admob, calculateur revenus admob, arpdau calculateur, admob ecpm, realtools'
    },
    adsense: {
      title: 'Calculateur AdSense 2026 | RPM & Gains',
      desc: 'Simulateur précis de revenus Google AdSense. Estimez le RPM de votre site web, vos impressions et vos gains mensuels selon la thématique et le pays. | RealTools',
      keywords: 'calculateur de revenus adsense, simulateur gains google adsense, revenus publicitaires site web, page rpm calculateur, gains blog adsense, combien paye adsense par clic, combien rapporte adsense par clic, combien gagne adsense 1000 vues, cpc adsense calculateur, realtools'
    },
    youtube: {
      title: 'Calculateur YouTube 2026 | RPM & Shorts',
      desc: 'Calculateur de revenus pour créateurs YouTube. Estimez vos gains sur les vidéos longues et Shorts selon votre RPM de niche et vos abonnements. | RealTools',
      keywords: 'calculateur de revenus youtube, simulateur argent youtube, combien rapporte youtube, youtube rpm calculateur, revenus shorts youtube, combien paye youtube 1000 vues, combien gagne un youtubeur, calculateur cpm youtube, combien youtube paye 1000 vues, combien paye youtube pour 1000 vues short, realtools'
    },
    tiktok: {
      title: 'Calculateur TikTok 2026 | Rewards',
      desc: 'Simulateur de revenus TikTok. Calculez les rémunérations du Creator Rewards Program pour les vidéos >1 min et les diamants LIVE. | RealTools',
      keywords: 'calculateur argent tiktok, calculateur revenus tiktok, remuneration tiktok vues, diamants tiktok en euros, gains tiktok live, combien paye tiktok 1000 vues, combien gagne tiktok par vue, combien paye tiktok pour 1000 vue, combien paye tiktok par vue, combien paye tiktok pour 1 millions de vue, realtools'
    },
    twitch: {
      title: 'Calculateur Twitch 2026 | Abonnements AIP',
      desc: 'Estimez les gains de streamer Twitch : abonnements Tier 1/2/3, partages Partner Plus (50/50 et 70/30), bits et coupures publicitaires AIP. | RealTools',
      keywords: 'calculateur revenus twitch, simulateur gains twitch, subs twitch revenus, combien gagne un streamer twitch, programme partner plus twitch, combien paye twitch par sub, combien paye twitch par viewer, calculateur revenu twitch, realtools'
    },
    kick: {
      title: "Calculateur Kick 2026 | 95/5 & KCP",
      desc: "Calculateur de gains pour streamers Kick. Calculez vos revenus grâce au partage d'abonnement 95/5 (4,74 $ net/sub) et au programme KCP. | RealTools",
      keywords: 'calculateur gains kick, calculateur streamer kick, abonnement kick 95 5, salaire horaire kick kcp, kick vs twitch revenus, combien paye kick par sub, combien paye kick par heure, realtools'
    },
    runway: {
      title: 'Calculateur Runway 2026 | Combien de Temps ?',
      desc: "Calculez combien d'années dureront vos économies avec retraits mensuels, rendement et inflation. Analyse SWP. | RealTools",
      keywords: 'calculateur runway, combien de temps dureront mes économies, calculateur swp, calculateur retraite retraits, startup runway calculator, financial runway calculator, free runway calculator, calculateur runway gratuit, calculateur runway startup, realtools'
    },
    'fuel-cost-calculator': {
      title: 'Calculateur Carburant 2026 | Coût Trajet au km',
      desc: "Calculateur gratuit du coût carburant. Distance, consommation et prix pour un coût de trajet, litres et budget mensuel. | RealTools",
      keywords: 'calculateur carburant, coût trajet essence, prix au km voiture, consommation carburant calcul, combien coûte mon trajet, realtools'
    },
  },
  de: {
    home: {
      title: 'AdSense, AdMob & Runway Rechner 2026 | Einnahmen',
      desc: 'Präziser Rechner für Google AdSense, AdMob, YouTube, TikTok, Twitch und Kick Einnahmen. Berechnen Sie RPM, ARPDAU und Streamer-Auszahlungen. | RealTools',
      keywords: 'adsense einnahmen rechner, google adsense einnahmen rechner, werbeeinnahmen rechner, website werbeeinnahmen berechnen, app werbeeinnahmen rechner, youtube geld rechner, tiktok geld rechner, twitch einnahmen rechner, kick streamer rechner, was zahlt adsense pro klick, adsense einnahmen pro 1000 aufrufe, runway calculator, runway rechner, realtools'
    },
    admob: {
      title: 'AdMob Rechner 2026 | ARPDAU & eCPM',
      desc: 'AdMob Rechner für iOS- & Android-Apps. ARPDAU, eCPM und Tagesumsatz mit Rewarded und Mediation berechnen. | RealTools',
      keywords: 'admob rechner, admob einnahmen rechner, arpdau rechner, app werbeeinnahmen rechner, realtools'
    },
    adsense: {
      title: 'AdSense Rechner 2026 | RPM & Umsatz',
      desc: 'Kostenloser Google AdSense Einnahmen-Rechner. Berechnen Sie Seiten-RPM, Impressionen und monatliche Werbeeinnahmen für Ihre Website. | RealTools',
      keywords: 'adsense einnahmen rechner, google adsense einnahmen rechner, website werbeeinnahmen berechnen, seiten rpm rechner, blog einnahmen rechner, was zahlt adsense pro klick, wie viel verdient man mit adsense, adsense einnahmen pro 1000 aufrufe, adsense cpc rechner, was verdient man mit adsense, realtools'
    },
    youtube: {
      title: 'YouTube Rechner 2026 | RPM & Shorts',
      desc: 'YouTube Rechner für Video- und Shorts-Einnahmen. Berechnen Sie YouTube Creator Einkommen basierend auf Nischen-RPM und Kanalmitgliedschaften. | RealTools',
      keywords: 'youtube einnahmen rechner, youtube geld rechner, wie viel verdient man auf youtube, youtube rpm rechner, youtube shorts einnahmen, wie viel zahlt youtube pro 1000 aufrufe, wie viel verdient man pro 1000 klicks youtube, youtube cpm rechner, youtube shorts einnahmen rechner, youtube einnahmen rechner kanal, realtools'
    },
    tiktok: {
      title: 'TikTok Rechner 2026 | Rewards & LIVE',
      desc: 'Berechnen Sie TikTok Einnahmen aus dem Creator Rewards Program für Videos >1 Min und LIVE-Stream-Geschenke (Diamanten). | RealTools',
      keywords: 'tiktok geld rechner, tiktok einnahmen rechner, wie viel zahlt tiktok pro aufruf, tiktok diamanten euro rechner, creator rewards rechner, wie viel zahlt tiktok pro 1000 aufrufe, wie viel verdient man auf tiktok, tiktok geld rechner live, tiktok aufrufe geld rechner, realtools'
    },
    twitch: {
      title: 'Twitch Rechner 2026 | Subs & AIP',
      desc: 'Präziser Twitch Streamer Einnahmen-Rechner. Berechnen Sie Abonnements nach Tier 1/2/3, Partner Plus Splits (50/50 und 70/30) und AIP-Werbung. | RealTools',
      keywords: 'twitch einnahmen rechner, twitch sub rechner, wie viel verdient ein twitch streamer, partner plus split twitch, twitch bits in euro, wie viel verdient man pro sub twitch, wie viel zahlt twitch pro zuschauer, twitch sub einnahmen rechner, twitch werbung einnahmen rechner, realtools'
    },
    kick: {
      title: 'Kick Rechner 2026 | 95/5 & KCP',
      desc: 'Kick Einnahmen-Rechner für Streamer. Berechnen Sie Einnahmen mit dem 95/5 Abo-Split ($4,74 netto/Sub) und dem KCP-Stundenhonorar. | RealTools',
      keywords: 'kick einnahmen rechner, kick streamer rechner, kick 95 5 split, kick stundenlohn creator program, kick vs twitch vergleich, wie viel zahlt kick pro sub, wie viel zahlt kick pro stunde, realtools'
    },
    runway: {
      title: 'Runway Rechner 2026 | Wie Lange Reicht Geld?',
      desc: 'Runway-Rechner: Wie viele Jahre reichen Ersparnisse bei monatlicher Entnahme, Rendite und Inflation? SWP-Analyse. | RealTools',
      keywords: 'runway rechner, wie lange reicht geld, wie lange reicht 1 million, swp rechner, entnahme rechner rente, startup runway calculator, financial runway calculator, free runway calculator, kostenloser runway rechner, startup runway rechner, realtools'
    },
    'fuel-cost-calculator': {
      title: 'Spritkosten Rechner 2026 | Fahrtkosten pro km',
      desc: 'Kostenloser Spritkosten-Rechner. Strecke, Verbrauch und Preis eingeben für Fahrtkosten, Liter und Monatskosten. | RealTools',
      keywords: 'spritkosten rechner, fahrtkosten rechner benzin, kosten pro km auto, spritverbrauch kosten rechner, was kostet meine fahrt, realtools'
    },
  },
  pt: {
    home: {
      title: 'Calculadora AdSense, AdMob e Runway 2026 | Receita',
      desc: 'Calculadora precisa de receita do Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcule ganhos de sites, apps móveis e canais de streaming. | RealTools',
      keywords: 'calculadora de receita adsense, calculadora ganhos adsense, calculadora receita admob, simulador adsense, ganhos com anuncios site, calculadora dinheiro youtube, calculadora dinheiro tiktok, calculadora ganhos twitch, calculadora kick, quanto paga adsense por clique, quanto ganha no youtube 1000 visualizacoes, runway calculator, calculadora runway grátis, realtools'
    },
    admob: {
      title: 'Calculadora AdMob 2026 | ARPDAU e eCPM',
      desc: 'Calculadora AdMob para apps iOS e Android. Estime ARPDAU, eCPM e receita diária com rewarded e mediação. | RealTools',
      keywords: 'calculadora admob, calculadora receita admob, arpdau calculadora, admob ecpm, realtools'
    },
    adsense: {
      title: 'Calculadora AdSense 2026 | RPM e Ganhos',
      desc: 'Calculadora precisa do Google AdSense. Estime o RPM da sua página, visualizações e faturamento mensal com anúncios em blogs e portais. | RealTools',
      keywords: 'calculadora de receita adsense, calculadora ganhos adsense, ganhos com anuncios site, calcular page rpm, simulador de ganhos adsense, quanto paga adsense por clique, quanto ganha adsense por 1000 visitas, adsense cpc quanto paga, realtools'
    },
    youtube: {
      title: 'Calculadora YouTube 2026 | RPM & Shorts',
      desc: 'Calculadora de ganhos para criadores do YouTube. Estime receita de vídeos longos e Shorts de acordo com o RPM de nicho e membros do canal. | RealTools',
      keywords: 'calculadora de ganhos youtube, calculadora dinheiro youtube, quanto o youtube paga por visualizacao, calculadora rpm youtube, ganhos youtube shorts, quanto ganha no youtube 1000 visualizacoes, quanto paga youtube por 1000 views, calculadora cpm youtube, quanto o youtube paga por 1000 visualizacoes no shorts, quanto o youtube paga por 1000 visualizacoes em reais, realtools'
    },
    tiktok: {
      title: 'Calculadora TikTok 2026 | Recompensas',
      desc: 'Calculadora de dinheiro no TikTok. Estime ganhos com o Creator Rewards Program para vídeos >1 min e conversão de diamantes de presentes LIVE. | RealTools',
      keywords: 'calculadora de dinheiro tiktok, quanto o tiktok paga, calculadora ganhos tiktok, diamantes tiktok em reais, programa criador tiktok, quanto paga tiktok por 1000 visualizacoes, quanto ganha no tiktok por view, quanto paga tiktok por visualização, quanto paga tiktok por 1000 visualizações, quanto paga tiktok por view, realtools'
    },
    twitch: {
      title: 'Calculadora Twitch 2026 | Subs e AIP',
      desc: 'Calculadora de receita para streamers na Twitch: inscrições Tier 1/2/3, divisões Partner Plus (50/50 e 70/30), bits e anúncios AIP. | RealTools',
      keywords: 'calculadora de receitas twitch, calculadora subs twitch, quanto ganha um streamer na twitch, divisao partner plus twitch, bits para reais, quanto paga twitch por sub, quanto paga twitch por viewer, calculadora de bit twitch, calculadora de ganhos twitch, calculadora sub twitch, realtools'
    },
    kick: {
      title: 'Calculadora Kick 2026 | 95/5 & KCP',
      desc: 'Calculadora de ganhos na Kick. Calcule receitas com a divisão de assinaturas 95/5 ($4,74 líquido/sub) e a remuneração horária do KCP. | RealTools',
      keywords: 'calculadora de ganhos kick, calculadora streamer kick, divisao 95 5 kick, quanto a kick paga por hora, kick vs twitch ganhos, quanto paga kick por sub, quanto paga kick por hora, calculadora de subs kick, calculadora de kicks, realtools'
    },
    runway: {
      title: 'Calculadora Runway 2026 | Quanto Tempo Dura?',
      desc: 'Descubra quantos anos suas economias duram com retiradas mensais, rendimento e inflação. Análise SWP. | RealTools',
      keywords: 'calculadora runway, quanto tempo dura meu dinheiro, quanto dura 1 milhão, calculadora swp, calculadora aposentadoria, startup runway calculator, financial runway calculator, free runway calculator, calculadora runway grátis, calculadora runway startup, realtools'
    },
    'fuel-cost-calculator': {
      title: 'Calculadora de Combustível 2026 | Custo por km',
      desc: 'Calculadora grátis de custo de combustível. Distância, consumo e preço para custo da viagem, litros e gasto mensal. | RealTools',
      keywords: 'calculadora de combustível, custo viagem gasolina, custo por km carro, consumo combustível cálculo, quanto custa minha viagem, realtools'
    },
  },
  ko: {
    home: {
      title: '애드센스, 애드몹 & 크리에이터 수익 계산기 2026 | 유튜브·틱톡·트위치·킥',
      desc: '정확한 구글 애드센스, 애드몹, 유튜브, 틱톡, 트위치, 킥 수익 계산기. 조회수와 구독자 기반의 정밀한 월간 및 연간 수익을 예측합니다. 런웨이 계산 포함. | RealTools',
      keywords: '애드센스 수익 계산기, 구글 애드센스 수익 계산, 애드몹 수익 계산기, 웹사이트 광고수익 계산, 앱 광고수익 계산, 유튜브 수익 계산기, 틱톡 수익 계산기, 트위치 수익 계산기, 킥 수익 계산기, 애드센스 클릭당 수익, 애드센스 1000회당 수익, runway calculator, 런웨이 계산기, realtools'
    },
    admob: {
      title: '애드몹 수익 계산기 2026 | ARPDAU & eCPM',
      desc: 'iOS·안드로이드 앱을 위한 애드몹 수익 계산기. ARPDAU, eCPM, 미디에이션 효과를 예측합니다. | RealTools',
      keywords: '애드몹 수익 계산기, admob 수익 계산, arpdau 계산기, 앱 광고수익 계산, realtools'
    },
    adsense: {
      title: '구글 애드센스 수익 계산기 2026 | 웹사이트 페이지 RPM & 수익 예측',
      desc: '구글 애드센스 웹사이트 광고수익 계산기. 분야별 페이지 RPM, 트래픽 국가, 광고 단가를 기반으로 예상 월수익을 정밀하게 계산합니다. | RealTools',
      keywords: '구글 애드센스 수익 계산기, 애드센스 수익 계산, 웹사이트 광고수익 계산, 페이지 rpm 계산기, 블로그 수익 예측, 애드센스 클릭당 수익, 애드센스 cpc 수익, 유튜브 조회수 1000당 수익, 애드센스 하루 수익 계산, realtools'
    },
    youtube: {
      title: '유튜브 수익 계산기 2026 | 동영상 RPM & 쇼츠 수익 예측기',
      desc: '유튜브 크리에이터를 위한 동영상 및 쇼츠 광고수익 계산기. 분야별 RPM, 채널 멤버십, 중간 광고 효과를 반영하여 예상 수입을 산출합니다. | RealTools',
      keywords: '유튜브 수익 계산기, 유튜브 조회수 수익 계산, 유튜브 rpm 계산기, 유튜브 쇼츠 수익 계산기, 유튜브 수익 창출, 채널 멤버십 수익, 유튜브 조회수 1000당 수익, 유튜브 1만뷰 수익, 유튜브 cpm 계산기, 유튜브 수익 계산기 사이트, 유튜브 쇼츠 1000뷰 수익, realtools'
    },
    tiktok: {
      title: '틱톡 수익 계산기 2026 | 크리에이터 리워드 & 라이브 다이아몬드 환전',
      desc: '틱톡 수익 계산기. 1분 이상 동영상의 크리에이터 리워드 프로그램 수익 및 라이브 방송 선물(다이아몬드) 환전 금액을 예측합니다. | RealTools',
      keywords: '틱톡 수익 계산기, 틱톡 조회수 수익, 틱톡 다이아몬드 원화 환전, 틱톡 크리에이터 리워드, 틱톡 라이브 후원, 틱톡 조회수 1000당 수익, 틱톡 100만뷰 수익, 틱톡 라이브 수익 계산기, 틱톡 1분 이상 영상 수익, realtools'
    },
    twitch: {
      title: '트위치 수익 계산기 2026 | 정기구독 & AIP 광고 수익 시뮬레이터',
      desc: '트위치 스트리머를 위한 정기구독 수익 계산기. 티어 1/2/3 구독, 파트너 플러스 분배율(50/50 및 70/30), 비트, AIP 광고 수익을 예측합니다. | RealTools',
      keywords: '트위치 수익 계산기, 트위치 구독 수익, 스트리머 월수익 계산기, 파트너 플러스 분배율, 트위치 비트 환전, 트위치 구독 1개당 수익, 트위치 시청자수 수익, realtools'
    },
    kick: {
      title: '킥 수익 계산기 2026 | 95/5 구독 배분 & KCP 시급 스트리밍 수익',
      desc: '킥 스트리머 수익 계산기. 파격적인 95/5 구독 수익 배분(구독당 순수익 $4.74)과 KCP 크리에이터 프로그램 시급을 계산합니다. | RealTools',
      keywords: '킥 수익 계산기, 킥 스트리머 수익, 킥 95 5 구독 배분, 킥 크리에이터 프로그램 시급, 킥 트위치 수익 비교, 킥 구독 1개당 수익, 킥 시청자 100명 수익, realtools'
    },
    runway: {
      title: '자산수명 계산기 2026 | 은퇴자금 몇 년?',
      desc: '월 인출·수익률·인플레이션으로 저축이 몇 년 버틸지 계산. SWP 손익분기점 포함. | RealTools',
      keywords: '자산수명 계산기, 은퇴자금 몇 년, 인출 시뮬레이션, swp 계산기, 10억 몇 년, startup runway calculator, financial runway calculator, free runway calculator, 무료 런웨이 계산기, 스타트업 런웨이 계산기, realtools'
    },
    'fuel-cost-calculator': {
      title: '연료비 계산기 2026 | 주행 유류비 예측',
      desc: '거리·연비·유가를 입력해 여행 연료비·필요량·월 지출을 무료 계산. 전 세계 지원. | RealTools',
      keywords: '연료비 계산기, 주행 유류비 계산, km당 유류비, 연비 계산기, 여행 기름값 계산, realtools'
    },
  },
  it: {
    home: {
      title: 'Calcolatore AdSense, AdMob & Runway 2026 | Guadagni',
      desc: 'Calcolatore accurato dei guadagni di Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcola Page RPM, ARPDAU e guadagni streaming. | RealTools',
      keywords: 'calcolatore guadagni adsense, calcolatore entrate adsense, guadagni pubblicitari sito web, calcolo entrate admob, quanto si guadagna con adsense, calcolatore soldi youtube, calcolatore tiktok, calcolatore guadagni twitch, calcolatore kick, quanto paga adsense per click, quanto si guadagna con youtube 1000 visualizzazioni, runway calculator, calcolatore runway gratuito, realtools'
    },
    admob: {
      title: 'Calcolatore AdMob 2026 | ARPDAU ed eCPM',
      desc: 'Calcolatore AdMob per app iOS e Android. Stima ARPDAU, eCPM e ricavi con rewarded e mediation. | RealTools',
      keywords: 'calcolatore admob, calcolatore guadagni admob, arpdau calcolo, admob ecpm, realtools'
    },
    adsense: {
      title: 'Calcolatore AdSense 2026 | RPM & Guadagni',
      desc: 'Calcolatore accurato dei guadagni Google AdSense. Stima il Page RPM del tuo sito web, le visualizzazioni e le entrate mensili per nicchia e paese. | RealTools',
      keywords: 'calcolatore entrate adsense, calcolatore guadagni adsense, guadagni pubblicitari sito web, page rpm calcolo, quanto si guadagna con adsense, quanto paga adsense per click, quanto paga adsense per 1000 visualizzazioni, adsense cpc calcolatore, realtools'
    },
    youtube: {
      title: 'Calcolatore YouTube 2026 | RPM & Shorts',
      desc: 'Calcolatore di entrate per creator YouTube. Calcola i guadagni di video lunghi e Shorts in base a RPM di nicchia, abbonamenti e annunci mid-roll. | RealTools',
      keywords: 'calcolatore guadagni youtube, calcolatore soldi youtube, quanto paga youtube per visualizzazione, youtube rpm calcolatore, guadagni youtube shorts, quanto si guadagna con youtube 1000 visualizzazioni, quanto paga youtube per 1000 visualizzazioni, youtube cpm calcolatore, quanto paga youtube 1000 visualizzazioni, quanto paga youtube per 1000 visualizzazioni shorts, quanto paga youtube per 1000 visualizzazioni in italia, realtools'
    },
    tiktok: {
      title: 'Calcolatore TikTok 2026 | Ricompense',
      desc: 'Calcolatore di guadagni TikTok. Calcola le entrate del Creator Rewards Program per i video >1 min e la conversione dei diamanti dei regali LIVE. | RealTools',
      keywords: 'calcolatore soldi tiktok, quanto paga tiktok, calcolatore guadagni tiktok, diamanti tiktok in euro, programma ricompense creator, quanto paga tiktok per 1000 visualizzazioni, quanto si guadagna su tiktok, quanto paga tiktok per 1 milione di visualizzazioni, quanto paga tiktok per like, quanto paga tiktok per 100.000 visualizzazioni, realtools'
    },
    twitch: {
      title: 'Calcolatore Twitch 2026 | Abbonamenti AIP',
      desc: 'Calcolatore guadagni per streamer Twitch: abbonamenti Tier 1/2/3, divisioni Partner Plus (50/50 e 70/30), bits e programma pubblicitario AIP. | RealTools',
      keywords: 'calcolatore entrate twitch, calcolatore sub twitch, quanto guadagna uno streamer su twitch, programma partner plus twitch, bits in euro, quanto paga twitch per sub, quanto paga twitch per spettatore, calcolatore guadagni twitch, realtools'
    },
    kick: {
      title: 'Calcolatore Kick 2026 | 95/5 & KCP',
      desc: 'Calcolatore di entrate per streamer Kick. Calcola i ricavi con la divisione abbonamenti 95/5 ($4,74 netti/sub) e la paga oraria del Creator Program. | RealTools',
      keywords: 'calcolatore guadagni kick, calcolatore streamer kick, divisione 95 5 kick, stipendio orario kick kcp, kick vs twitch guadagni, quanto paga kick per sub, quanto paga kick all ora, realtools'
    },
    runway: {
      title: 'Calcolatore Runway 2026 | Quanto Dura?',
      desc: 'Scopri quanti anni dureranno i risparmi con prelievi mensili, rendimento e inflazione. Analisi SWP. | RealTools',
      keywords: 'calcolatore runway, quanto durano i miei risparmi, quanto dura 1 milione, calcolatore swp, calcolatore pensione, startup runway calculator, financial runway calculator, free runway calculator, calcolatore runway gratuito, calcolatore runway startup, realtools'
    },
    'fuel-cost-calculator': {
      title: 'Calcolatore Carburante 2026 | Costo per km',
      desc: 'Calcolatore gratis del costo carburante. Distanza, consumo e prezzo per costo viaggio, litri e spesa mensile. | RealTools',
      keywords: 'calcolatore carburante, costo viaggio benzina, costo per km auto, consumo carburante calcolo, quanto costa il mio viaggio, realtools'
    },
  },
  ru: {
    home: {
      title: 'Калькулятор доходов от рекламы и Runway 2026 | RealTools',
      desc: 'Бесплатные калькуляторы доходов AdSense, AdMob, YouTube, TikTok, Twitch, Kick и финансового runway. Оцените заработок и выплаты. | RealTools',
      keywords: 'калькулятор дохода adsense, калькулятор admob, доход youtube, калькулятор tiktok, калькулятор подписок twitch, доход kick, runway calculator, realtools'
    },
    admob: {
      title: 'Калькулятор AdMob 2026 | Расчет ARPDAU и eCPM',
      desc: 'Точный калькулятор AdMob для приложений iOS и Android. Оцените доход от рекламы с вознаграждением, межстраничных объявлений и медиации. | RealTools',
      keywords: 'калькулятор admob, калькулятор дохода admob, arpdau калькулятор, admob ecpm калькулятор, доход мобильных приложений, realtools'
    },
    adsense: {
      title: 'Калькулятор AdSense 2026 | Расчет Page RPM и Дохода Сайта',
      desc: 'Рассчитайте потенциальный доход сайта с помощью калькулятора AdSense и Page RPM. Прогноз заработка по 26 нишам и странам. | RealTools',
      keywords: 'калькулятор дохода google adsense, калькулятор adsense, page rpm калькулятор, доход сайта adsense, сколько платит adsense за клик, сколько платит adsense за 1000 просмотров, realtools'
    },
    youtube: {
      title: 'Калькулятор Дохода YouTube 2026 | RPM, CPM и Shorts',
      desc: 'Рассчитайте заработок на YouTube: доход от длинных видео, Shorts, спонсорства и интеграций в 15+ тематиках. | RealTools',
      keywords: 'калькулятор дохода youtube, калькулятор заработка на ютубе, сколько платит ютуб за просмотры, youtube rpm калькулятор, доход от shorts, калькулятор cpm youtube, realtools'
    },
    tiktok: {
      title: 'Калькулятор Дохода TikTok 2026 | Creator Rewards и LIVE',
      desc: 'Калькулятор выплат в TikTok: расчет вознаграждения Creator Rewards за видео >1 мин и конвертация подарков LIVE в реальные деньги. | RealTools',
      keywords: 'калькулятор дохода tiktok, сколько платит тикток, калькулятор бриллиантов tiktok, выплаты creator rewards, сколько платит тикток за 1000 просмотров, realtools'
    },
    twitch: {
      title: 'Калькулятор Twitch 2026 | Подписки, Bits и Доход от Рекламы',
      desc: 'Оцените доход стримера на Twitch: платные подписки Tier 1/2/3, распределение Partner Plus (50/50 и 70/30), реклама AIP и Bits. | RealTools',
      keywords: 'калькулятор дохода twitch, калькулятор подписок twitch, сколько зарабатывает стример на twitch, партнер плюс twitch, bits в доллары, realtools'
    },
    kick: {
      title: 'Калькулятор Kick 2026 | 95/5 Подписки и Ставка KCP',
      desc: 'Калькулятор заработка на Kick: доход с распределением подписок 95/5 ($4.74 net/sub) и почасовая оплата программы KCP. | RealTools',
      keywords: 'калькулятор дохода kick, калькулятор стримера kick, разделение 95 5 kick, почасовая оплата kcp kick, kick против twitch, realtools'
    },
    runway: {
      title: 'Калькулятор Runway 2026 | На Сколько Хватит Денег',
      desc: 'Узнайте, на сколько лет хватит накоплений или капитала стартапа при регулярных снятиях, доходности и инфляции. Анализ SWP. | RealTools',
      keywords: 'калькулятор runway, на сколько хватит сбережений, калькулятор swp, финансовая подушка калькулятор, калькулятор капитала стартапа, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | Индия (CPC)',
      desc: 'Калькулятор зарплаты 8th Pay Commission для госслужащих Индии. Факторы умножения 1.92x–3.83x, DA и пенсии. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'Калькулятор Расхода Топлива 2026 | Стоимость Поездки на км',
      desc: 'Бесплатный калькулятор стоимости бензина и дизеля. Введите расстояние, расход и цену за литр для расчета стоимости поездки. | RealTools',
      keywords: 'калькулятор топлива, стоимость поездки на бензин, расход топлива на 100 км, расчет бензина на поездку, стоимость километра пути, realtools'
    },
  },
  ar: {
    home: {
      title: 'حاسبة أرباح الإعلانات والسيولة 2026 | RealTools',
      desc: 'حاسبات مجانية لحساب أرباح أدسنس، أدموب، يوتيوب، تيك توك، تويتش، كيك، وحساب مدرج السيولة للمشاريع. قدر أرباحك وعائداتك بدقة. | RealTools',
      keywords: 'حاسبة أرباح أدسنس, حاسبة أرباح أدموب, حاسبة أرباح يوتيوب, حاسبة أرباح تيك توك, حاسبة تويتش, حاسبة كيك, حاسبة السيولة المالية, realtools'
    },
    admob: {
      title: 'حاسبة أرباح أدموب 2026 | أداة حساب ARPDAU و eCPM',
      desc: 'حاسبة أدموب دقيقة لتطبيقات iOS وأندرويد. قدر الأرباح اليومية والشهرية لإعلانات المكافأة، البينية، والشاشات الافتتاحية مع الوساطة. | RealTools',
      keywords: 'حاسبة أدموب, حاسبة أرباح التطبيقات, حساب arpdau, حساب ecpm admob, أرباح إعلانات التطبيقات, realtools'
    },
    adsense: {
      title: 'حاسبة أرباح أدسنس 2026 | عائد الألف ظهور Page RPM للمواقع',
      desc: 'احسب الأرباح المتوقعة لموقعك مع حاسبة أدسنس وعائد الألف ظهور. توقع الإيرادات عبر 26 تخصصاً ودول العالم ومواضع الإعلانات. | RealTools',
      keywords: 'حاسبة أرباح جوجل أدسنس, حاسبة أدسنس, حساب عائد الألف ظهور, أرباح المواقع من أدسنس, كم يدفع أدسنس لكل نقرة, كم يدفع أدسنس لكل 1000 ظهور, realtools'
    },
    youtube: {
      title: 'حاسبة أرباح يوتيوب 2026 | عائد المشاهدات RPM و Shorts',
      desc: 'احسب أرباح قناتك على يوتيوب: الفيديوهات الطويلة، وفيديوهات Shorts، والانتساب، والرعايات عبر أكثر من 15 تخصصاً. | RealTools',
      keywords: 'حاسبة أرباح يوتيوب, كم يدفع يوتيوب لكل 1000 مشاهدة, حاسبة rpm يوتيوب, أرباح يوتيوب شورتس, حاسبة cpm يوتيوب, realtools'
    },
    tiktok: {
      title: 'حاسبة أرباح تيك توك 2026 | مكافآت المبدعين وهدايا البث',
      desc: 'احسب أرباح برنامج Creator Rewards للفيديوهات الأطول من دقيقة واحدة وتحويل ماس هدايا البث المباشر LIVE إلى دولارات. | RealTools',
      keywords: 'حاسبة أرباح تيك توك, كم يدفع تيك توك, تحويل ماس تيك توك لدولار, برنامج مكافآت المبدعين تيك توك, كم يدفع تيك توك على 1000 مشاهدة, realtools'
    },
    twitch: {
      title: 'حاسبة أرباح تويتش 2026 | الاشتراكات وإعلانات البث AIP',
      desc: 'احسب أرباحك على تويتش: اشتراكات المستويات 1/2/3، وتقسيم Partner Plus (50/50 و 70/30)، وإعلانات البث والبتس. | RealTools',
      keywords: 'حاسبة أرباح تويتش, حاسبة اشتراكات تويتش, كم يربح الستريمر في تويتش, برنامج بارتنر بلس تويتش, تحويل البتس إلى دولار, realtools'
    },
    kick: {
      title: 'حاسبة أرباح كيك 2026 | تقسيم الاشتراكات 95/5 وراتب KCP',
      desc: 'احسب أرباح البث على منصة كيك: احتفاظك بنسبة 95% من الاشتراكات ($4.74 صافية) وراتب برنامج KCP بالساعة. | RealTools',
      keywords: 'حاسبة أرباح كيك, حاسبة بثوث كيك, تقسيم اشتراكات كيك 95 5, راتب كيك بالساعة, كيك مقابل تويتش, realtools'
    },
    runway: {
      title: 'حاسبة مدرج السيولة 2026 | كم ستكفيك مدخراتك؟',
      desc: 'اكتشف كم من السنوات ستكفيك مدخراتك مع السحب الشهري، والعوائد الاستثمارية، ونسب التضخم. تحليل SWP للتقاعد والشركات الناشئة. | RealTools',
      keywords: 'حاسبة السيولة المالية, كم ستكفيني مدخراتي, حاسبة swp للسحب المنتظم, حاسبة مصاريف التقاعد, مدرج سيولة الشركات الناشئة, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | الهند',
      desc: 'حاسبة رواتب لجنة الرواتب الثامنة لموظفي الحكومة الهندية. معاملات الضرب من 1.92x إلى 3.83x وبدلات السكن والمعاشات. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'حاسبة تكلفة الوقود 2026 | تكلفة السفر والبنزين لكل كم',
      desc: 'حاسبة تكلفة الوقود المجانية لجميع الدول. أدخل المسافة ومعدل الاستهلاك وسعر اللتر لحساب تكلفة الرحلة الإجمالية والشهرية. | RealTools',
      keywords: 'حاسبة تكلفة الوقود, حساب استهلاك البنزين للرحلة, حساب تكلفة البنزين لكل كيلومتر, كم لتر بنزين لقطع 100 كم, realtools'
    },
  },
  zh: {
    home: {
      title: '广告收益与资金跑道计算器 2026 | RealTools',
      desc: '免费的 AdSense、AdMob、YouTube、TikTok、Twitch、Kick 收益及资金储备测算工具。精准预测收入与变现。 | RealTools',
      keywords: '广告收益计算器, adsense计算器, admob收益计算器, youtube赚钱计算器, tiktok收益计算器, twitch订阅收益, kick收益计算器, 资金跑道计算器, realtools'
    },
    admob: {
      title: 'AdMob 收益计算器 2026 | ARPDAU 与 eCPM 测算工具',
      desc: '精准的 iOS 与 Android 移动应用 AdMob 计算器。估算激励视频、插屏和开屏广告的日收益、月收益及中介聚合溢价。 | RealTools',
      keywords: 'admob收益计算器, 应用广告收入计算, arpdau计算器, admob ecpm预估, 移动应用变现, realtools'
    },
    adsense: {
      title: 'AdSense 收益计算器 2026 | 网页 Page RPM 与收入估算',
      desc: '测算网站广告收益潜能。支持按 26 种利基行业、全球访客地域及广告单元组合预测每月和年度收入。 | RealTools',
      keywords: 'Google AdSense收益计算器, adsense收入预估, 网站广告收入测算, 网页rpm计算, adsense每千次展示多少钱, realtools'
    },
    youtube: {
      title: 'YouTube 收益计算器 2026 | 播放量 RPM、CPM 与 Shorts 估算',
      desc: '测算 YouTube 频道收入：涵盖长视频广告、Shorts 基金池、频道会员订阅及品牌商业合作分成。 | RealTools',
      keywords: 'youtube赚钱计算器, youtube收入预估, youtube千次播放收益, youtube rpm计算器, youtube shorts短视频收益, youtube cpm测算, realtools'
    },
    tiktok: {
      title: 'TikTok 创作者收入计算器 2026 | Creator Rewards 与直播打赏',
      desc: '测算 TikTok 创作者奖励计划收入（1分钟以上合格视频）及直播间礼物钻石兑换净收益。 | RealTools',
      keywords: 'tiktok赚钱计算器, tiktok收益计算, tiktok千次播放多少钱, tiktok钻石兑换美元, tiktok创作者基金计算, realtools'
    },
    twitch: {
      title: 'Twitch 收入计算器 2026 | 订阅分成、Bits 与 AIP 广告补贴',
      desc: '精准模拟 Twitch 主播收入：包含 Tier 1/2/3 订阅、Partner Plus (50/50 与 70/30) 分成、广告激励及打赏。 | RealTools',
      keywords: 'twitch收入计算器, twitch订阅收益, twitch主播能赚多少钱, partner plus分成, bits折算美元, twitch aip收益, realtools'
    },
    kick: {
      title: 'Kick 主播收益计算器 2026 | 95/5 订阅分成与 KCP 底薪',
      desc: '测算 Kick 平台直播收益：享受 95% 顶格订阅分成（每单净赚 $4.74）及 KCP 创作者扶持计划时薪补贴。 | RealTools',
      keywords: 'kick收益计算器, kick主播收入, kick 95 5分成, kick时薪多少, kick对比twitch收益, realtools'
    },
    runway: {
      title: '资金跑道计算器 2026 | 个人储蓄与初创资金可持续年限',
      desc: '免费资金跑道计算器。输入储蓄余额、月度支出、年化回报与通胀率，获取 SWP 定投提取年度推演。 | RealTools',
      keywords: '资金跑道计算器, 存款能用多久, 100万理财够花几年, swp系统提取计算器, 退休金消耗测算, 创业资金储备, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | 印度薪资工具',
      desc: '印度中央政府雇员第八次薪酬委员会薪资预测。支持 1.92x–3.83x 系数、津贴及退休金测算。 | RealTools',
    },
    'fuel-cost-calculator': {
      title: '燃油出行成本计算器 2026 | 每公里油耗与自驾花费',
      desc: '免费全球燃油费用估算器。输入行程距离、综合油耗与实时油价，快速算出行程油费、所需油量与月度开销。 | RealTools',
      keywords: '油费计算器, 自驾游油费测算, 百公里油耗计算, 每公里多少油钱, 汽车出行燃油成本, realtools'
    },
  },
  tr: {
    home: {
      title: 'AdSense, AdMob ve Runway Gelir Hesaplama 2026 | RealTools',
      desc: 'AdSense, AdMob, YouTube, TikTok, Twitch, Kick ve finansal runway için ücretsiz gelir hesaplayıcılar. Kazancınızı simüle edin. | RealTools',
      keywords: 'reklam geliri hesaplayıcı, adsense hesaplayıcı, admob gelir hesaplama, youtube para hesaplama, tiktok para hesaplama, twitch abone geliri, kick hesaplayıcı, runway hesaplayıcı, realtools'
    },
    admob: {
      title: 'AdMob Gelir Hesaplama 2026 | ARPDAU ve eCPM Aracı',
      desc: 'iOS ve Android uygulamaları için hassas AdMob hesaplayıcı. Ödüllü, geçiş ve açılış reklamları ile günlük ve aylık kazancı hesaplayın. | RealTools',
      keywords: 'admob gelir hesaplayıcı, admob hesaplama, arpdau hesaplayıcı, admob ecpm hesaplama, mobil uygulama reklam geliri, realtools'
    },
    adsense: {
      title: 'AdSense Hesaplama 2026 | Sayfa RPM ve Web Sitesi Geliri',
      desc: 'Google AdSense reklam geliri ve Sayfa RPM hesaplayıcısı. 26 niş, ülke ve reklam formatına göre aylık ve yıllık geliri tahmin edin. | RealTools',
      keywords: 'google adsense gelir hesaplama, adsense hesaplayıcı, sayfa rpm hesaplama, web sitesi reklam geliri, adsense 1000 görüntüleme kaç tl, realtools'
    },
    youtube: {
      title: 'YouTube Gelir Hesaplama 2026 | RPM, CPM ve Shorts Kazancı',
      desc: 'YouTube kazancınızı hesaplayın: uzun videolar, Shorts fonu, kanal üyelikleri ve marka sponsorlukları ile kanal geliri tahmini. | RealTools',
      keywords: 'youtube para hesaplama, youtube gelir hesaplayıcı, youtube 1000 izlenme kaç para, youtube rpm hesaplama, youtube shorts para kazanma, realtools'
    },
    tiktok: {
      title: 'TikTok Para Hesaplama 2026 | Creator Rewards ve Canlı Yayın',
      desc: 'TikTok para hesaplayıcı: 1 dakikadan uzun videolar için Creator Rewards kazancı ve canlı yayın elmas bozdurma simülasyonu. | RealTools',
      keywords: 'tiktok para hesaplama, tiktok kazanç hesaplama, tiktok elmas kaç tl, tiktok izlenme parası, tiktok 1000 izlenme ne kadar, realtools'
    },
    twitch: {
      title: 'Twitch Gelir Hesaplama 2026 | Abonelik, Bits ve AIP Reklamı',
      desc: 'Twitch yayıncı kazançlarını hesaplayın: Kademe 1/2/3 abonelikler, Partner Plus (%50/%50 ve %70/%30) payı, reklamlar ve Bits. | RealTools',
      keywords: 'twitch gelir hesaplama, twitch abone parası, twitch yayıncıları ne kadar kazanıyor, partner plus payı, twitch bit hesaplama, realtools'
    },
    kick: {
      title: 'Kick Gelir Hesaplama 2026 | 95/5 Abonelik Payı ve KCP Ücreti',
      desc: 'Kick yayıncı gelir hesaplayıcı: %95 abonelik komisyon oranı (abonelik başına net $4.74) ve saatlik KCP yayıncı desteği. | RealTools',
      keywords: 'kick gelir hesaplayıcı, kick yayıncı kazancı, kick 95 5 payı, kick saatlik ücret kcp, kick mi twitch mi, realtools'
    },
    runway: {
      title: 'Runway Hesaplayıcı 2026 | Birikimlerim Kaç Yıl Yeter?',
      desc: 'Birikimlerinizin veya startup sermayenizin aylık çekimler, getiri ve enflasyonla kaç yıl yeteceğini hesaplayın. SWP analizi. | RealTools',
      keywords: 'runway hesaplayıcı, birikimim ne kadar yeter, para ne kadar süre dayanır, swp hesaplayıcı, emeklilik maaş çekim hesaplama, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | Hindistan Maaş Aracı',
      desc: 'Hindistan merkezi hükümet çalışanları için 8. Maaş Komisyonu maaş tahmini. 1.92x–3.83x çarpan senaryoları. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'Yakıt Maliyeti Hesaplama 2026 | Yolculuk Benzin ve Mazot Tutarı',
      desc: 'Ücretsiz yakıt hesaplayıcı. Mesafe, yakıt tüketimi ve pompa fiyatını girerek seyahat maliyeti, gereken litre ve km başına ücreti hesaplayın. | RealTools',
      keywords: 'yakıt hesaplama, yol yakıt maliyeti hesaplama, 100 km de ne kadar yakar, km başına benzin maliyeti, yolculuk masrafı hesaplama, realtools'
    },
  },
  pl: {
    home: {
      title: 'Kalkulator Przychodów AdSense, AdMob i Runway 2026 | RealTools',
      desc: 'Darmowe kalkulatory zarobków z AdSense, AdMob, YouTube, TikTok, Twitch, Kick oraz finansowego runway. Szacuj zyski i wypłaty. | RealTools',
      keywords: 'kalkulator dochodów adsense, kalkulator admob, zarobki na youtube kalkulator, kalkulator tiktok, kalkulator subów twitch, kalkulator kick, kalkulator runway, realtools'
    },
    admob: {
      title: 'Kalkulator AdMob 2026 | Oblicz ARPDAU i eCPM Aplikacji',
      desc: 'Precyzyjny kalkulator AdMob dla aplikacji na iOS i Androida. Szacuj zarobki z reklam z nagrodą, pełnoekranowych i mediacji. | RealTools',
      keywords: 'kalkulator admob, zarobki z admob, arpdau kalkulator, admob ecpm kalkulator, zarobki z aplikacji mobilnej, realtools'
    },
    adsense: {
      title: 'Kalkulator AdSense 2026 | Page RPM i Przychody ze Strony',
      desc: 'Oblicz potencjalne przychody ze strony dzięki kalkulatorowi AdSense i Page RPM w 26 niszach, krajach i formatach reklamowych. | RealTools',
      keywords: 'kalkulator zarobków google adsense, kalkulator adsense, page rpm kalkulator, ile płaci adsense za 1000 wyświetleń, zarobki z reklam na stronie, realtools'
    },
    youtube: {
      title: 'Kalkulator Zarobków YouTube 2026 | RPM, CPM i Shorts',
      desc: 'Oblicz zarobki kanału na YouTube: długie filmy, fundusz Shorts, członkostwa i współprace reklamowe w ponad 15 niszach. | RealTools',
      keywords: 'kalkulator zarobków youtube, ile płaci youtube za wyświetlenia, youtube rpm kalkulator, zarobki z youtube shorts, ile zarabia się na youtube za 1000 wyświetleń, realtools'
    },
    tiktok: {
      title: 'Kalkulator Pieniędzy TikTok 2026 | Creator Rewards i LIVE',
      desc: 'Kalkulator wypłat z TikToka: zyski z programu Creator Rewards dla filmów >1 min oraz przelicznik diamentów z transmisji LIVE. | RealTools',
      keywords: 'kalkulator tiktok, ile płaci tiktok za wyświetlenia, diamenty tiktok na pln usd, zarobki z tiktoka kalkulator, ile płaci tiktok za 1000 wyświetleń, realtools'
    },
    twitch: {
      title: 'Kalkulator Twitch 2026 | Subskrypcje, Bits i Reklamy AIP',
      desc: 'Oszacuj zarobki streamera na Twitchu: suby Tier 1/2/3, podział Partner Plus (50/50 i 70/30), reklamy AIP i napiwki Bits. | RealTools',
      keywords: 'kalkulator zarobków twitch, kalkulator subów twitch, ile zarabia streamer na twitchu, partner plus twitch podział, bity na pieniądze twitch, realtools'
    },
    kick: {
      title: 'Kalkulator Kick 2026 | Podział 95/5 i Stawka KCP',
      desc: 'Kalkulator zarobków na platformie Kick: 95% wypłaty za subskrypcje ($4.74 netto/sub) i stawka godzinowa w programie KCP. | RealTools',
      keywords: 'kalkulator zarobków kick, zarobki na kick, podział 95 5 kick, ile płaci kick za godzinę, kick vs twitch zarobki, realtools'
    },
    runway: {
      title: 'Kalkulator Runway 2026 | Na Ile Lat Wystarczy Oszczędności?',
      desc: 'Sprawdź, na ile lat wystarczy kapitał przy comiesięcznych wypłatach, stopie zwrotu i inflacji. Analiza planu SWP. | RealTools',
      keywords: 'kalkulator runway, na ile starczą oszczędności, kalkulator swp, systematyczna wypłata kapitału, ile czasu wystarczy milion, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | Indie (CPC)',
      desc: 'Kalkulator wynagrodzenia dla indyjskich pracowników państwowych. Mnożniki 1.92x–3.83x, dodatki DA, HRA i emerytura. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'Kalkulator Kosztów Paliwa 2026 | Koszt Przejazdu za km',
      desc: 'Darmowy kalkulator kosztów paliwa. Wpisz dystans, spalanie i cenę litra, aby obliczyć całkowity koszt podróży i wydatek na kilometr. | RealTools',
      keywords: 'kalkulator kosztu paliwa, koszt podróży samochodem, ile spali na 100 km, koszt paliwa na km, obliczanie kosztów benzyny na wyjazd, realtools'
    },
  },
  id: {
    home: {
      title: 'Kalkulator Pendapatan AdSense, AdMob & Runway 2026 | RealTools',
      desc: 'Kalkulator gratis untuk estimasi pendapatan AdSense, AdMob, YouTube, TikTok, Twitch, Kick, dan runway keuangan pribadi. | RealTools',
      keywords: 'kalkulator pendapatan adsense, kalkulator admob, kalkulator uang youtube, kalkulator tiktok, kalkulator streamer twitch, kalkulator kick, kalkulator runway, realtools'
    },
    admob: {
      title: 'Kalkulator AdMob 2026 | Estimasi ARPDAU & eCPM Aplikasi',
      desc: 'Kalkulator AdMob akurat untuk aplikasi iOS & Android. Estimasi pendapatan harian dan bulanan dari iklan rewarded, interstitial, dan mediasi. | RealTools',
      keywords: 'kalkulator admob, kalkulator penghasilan admob, kalkulator arpdau, admob ecpm kalkulator, penghasilan iklan aplikasi mobile, realtools'
    },
    adsense: {
      title: 'Kalkulator AdSense 2026 | Page RPM & Pendapatan Web',
      desc: 'Hitung potensi penghasilan situs web dengan kalkulator AdSense dan Page RPM kami di 26 niche konten, negara audiens, dan format iklan. | RealTools',
      keywords: 'kalkulator pendapatan google adsense, kalkulator adsense, hitung page rpm, berapa penghasilan adsense per 1000 tayangan, adsense cpc indonesia, realtools'
    },
    youtube: {
      title: 'Kalkulator Penghasilan YouTube 2026 | RPM, CPM & Shorts',
      desc: 'Hitung potensi penghasilan channel YouTube: video panjang, YouTube Shorts, langganan channel, dan kerja sama sponsor di 15+ niche. | RealTools',
      keywords: 'kalkulator uang youtube, kalkulator penghasilan youtube, berapa bayaran youtube per 1000 tayangan, youtube rpm kalkulator, gaji youtube shorts, realtools'
    },
    tiktok: {
      title: 'Kalkulator Uang TikTok 2026 | Creator Rewards & Hadiah LIVE',
      desc: 'Hitung estimasi pendapatan TikTok Creator Rewards untuk video >1 menit dan konversi berlian hadiah siaran langsung LIVE. | RealTools',
      keywords: 'kalkulator uang tiktok, berapa penghasilan tiktok, 1000 koin tiktok berapa rupiah, harga berlian tiktok, kalkulator creator rewards tiktok, realtools'
    },
    twitch: {
      title: 'Kalkulator Twitch 2026 | Langganan, Bits & Iklan AIP',
      desc: 'Perkirakan penghasilan streamer Twitch: langganan Tier 1/2/3, bagi hasil Partner Plus (50/50 dan 70/30), program iklan AIP, dan Bits. | RealTools',
      keywords: 'kalkulator uang twitch, berapa gaji streamer twitch, bagi hasil partner plus twitch, konversi bits ke dolar, kalkulator aip twitch, realtools'
    },
    kick: {
      title: 'Kalkulator Kick 2026 | Bagi Hasil 95/5 & Bayaran KCP',
      desc: 'Hitung pendapatan streaming di Kick: bagi hasil langganan 95% untuk kreator ($4.74 bersih/sub) dan bayaran per jam program KCP. | RealTools',
      keywords: 'kalkulator pendapatan kick, penghasilan streamer kick, bagi hasil 95 5 kick, gaji per jam kick kcp, kick vs twitch penghasilan, realtools'
    },
    runway: {
      title: 'Kalkulator Runway Keuangan 2026 | Berapa Lama Tabungan Bertahan?',
      desc: 'Ketahui berapa tahun tabungan atau modal startup Anda bertahan dengan penarikan bulanan, imbal hasil investasi, dan inflasi. Analisis SWP. | RealTools',
      keywords: 'kalkulator runway, berapa lama tabungan saya bertahan, kalkulator swp, kalkulator dana darurat, modal startup bertahan berapa bulan, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | Gaji Pegawai India',
      desc: 'Kalkulator proyeksi gaji komisi ke-8 pegawai negeri India. Simulasi faktor 1.92x–3.83x dengan tunjangan DA, HRA, dan pensiun. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'Kalkulator Biaya Bensin 2026 | Hitung Biaya Perjalanan per km',
      desc: 'Kalkulator gratis biaya bahan bakar perjalanan. Masukkan jarak tempuh, konsumsi BBM, dan harga per liter untuk estimasi biaya total. | RealTools',
      keywords: 'kalkulator bensin, hitung biaya bensin perjalanan, konsumsi bbm per km, cara menghitung biaya bahan bakar mobil, realtools'
    },
  },
  nl: {
    home: {
      title: 'AdSense, AdMob & Runway Inkomsten Calculator 2026 | RealTools',
      desc: 'Gratis calculators voor AdSense, AdMob, YouTube, TikTok, Twitch, Kick en financiële runway. Bereken uw opbrengst en uitbetalingen. | RealTools',
      keywords: 'advertentie inkomsten calculator, adsense calculator, admob calculator, youtube geld calculator, tiktok inkomsten, twitch subs calculator, kick verdiensten, runway calculator, realtools'
    },
    admob: {
      title: 'AdMob Inkomsten Calculator 2026 | ARPDAU & eCPM Tool',
      desc: 'Nauwkeurige AdMob calculator voor iOS en Android apps. Schat dagelijkse en maandelijkse omzet uit Rewarded, Interstitial en mediatie. | RealTools',
      keywords: 'admob calculator, admob inkomsten berekenen, arpdau calculator, admob ecpm berekening, app advertentie inkomsten, realtools'
    },
    adsense: {
      title: 'AdSense Calculator 2026 | Pagina-RPM & Website Opbrengst',
      desc: 'Bereken potentiële website-inkomsten met onze AdSense advertentie- en Pagina-RPM calculators over 26 niches, landen en advertentie-eenheden. | RealTools',
      keywords: 'google adsense inkomsten calculator, adsense calculator, pagina rpm berekenen, hoeveel betaalt adsense per 1000 views, website advertentie inkomsten, realtools'
    },
    youtube: {
      title: 'YouTube Geld Calculator 2026 | RPM, CPM & Shorts Inkomsten',
      desc: 'Bereken potentiële YouTube opbrengsten: lange video advertenties, Shorts fonds, kanaallidmaatschappen en merksponsoring. | RealTools',
      keywords: 'youtube geld calculator, wat verdient een youtuber, youtube 1000 weergaven vergoeding, youtube rpm berekenen, youtube shorts inkomsten, realtools'
    },
    tiktok: {
      title: 'TikTok Inkomsten Calculator 2026 | Creator Rewards & LIVE',
      desc: 'Bereken TikTok verdiensten uit het Creator Rewards programma voor video\'s >1 minuut en het omrekenen van virtuele LIVE diamanten. | RealTools',
      keywords: 'tiktok geld calculator, hoeveel betaalt tiktok per 1000 weergaven, tiktok diamanten naar euro, creator rewards programma tiktok, realtools'
    },
    twitch: {
      title: 'Twitch Inkomsten Calculator 2026 | Subs, Bits & AIP Advertenties',
      desc: 'Schat inkomsten als Twitch streamer: Tier 1/2/3 abonnementen, Partner Plus verdeling (50/50 en 70/30), AIP advertenties en Bits. | RealTools',
      keywords: 'twitch inkomsten calculator, wat verdient een twitch streamer, partner plus regeling twitch, bits naar euro omrekenen, twitch sub opbrengst, realtools'
    },
    kick: {
      title: 'Kick Inkomsten Calculator 2026 | 95/5 Verdeling & KCP Uurtarief',
      desc: 'Bereken streaming inkomsten op Kick: de toonaangevende 95% abonnementsverdeling ($4.74 netto/sub) en het KCP uurloon programma. | RealTools',
      keywords: 'kick calculator, verdiensten kick streamer, 95 5 verdeling kick, hoeveel betaalt kick per uur, kick versus twitch inkomsten, realtools'
    },
    runway: {
      title: 'Runway Calculator 2026 | Hoe Lang Gaat Mijn Spaargeld Mee?',
      desc: 'Ontdek hoeveel jaar uw spaargeld of startkapitaal meegaat bij maandelijkse opnames, rendement en inflatie. SWP analyse. | RealTools',
      keywords: 'runway calculator, hoe lang gaat mijn spaargeld mee, swp calculator, pensioen opname calculator, hoe lang gaat 1 miljoen mee, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | India Salaris Tool',
      desc: 'Bereken het verwachte salaris voor Indiase ambtenaren onder de 8e looncommissie. Factor 1.92x–3.83x, toeslagen en pensioen. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'Brandstofkosten Calculator 2026 | Ritkosten per km Berekenen',
      desc: 'Gratis brandstofkosten calculator. Voer afstand, verbruik en literprijs in voor de totale ritkosten, benodigde liters en maandelijkse kosten. | RealTools',
      keywords: 'brandstofkosten berekenen, benzinekosten reis, verbruik per 100 km, wat kost mijn autorit aan benzine, kosten per kilometer auto, realtools'
    },
  },
  vi: {
    home: {
      title: 'Công Cụ Tính Doanh Thu AdSense, AdMob & Runway 2026 | RealTools',
      desc: 'Công cụ tính miễn phí doanh thu AdSense, AdMob, YouTube, TikTok, Twitch, Kick và đường băng tài chính. Dự toán thu nhập chuẩn xác. | RealTools',
      keywords: 'công cụ tính doanh thu adsense, tính doanh thu admob, kiếm tiền youtube tính thế nào, tính tiền tiktok, tính sub twitch, tính tiền kick, tính runway tài chính, realtools'
    },
    admob: {
      title: 'Tính Doanh Thu AdMob 2026 | Dự Đoán ARPDAU & eCPM Ứng Dụng',
      desc: 'Công cụ tính AdMob chuẩn xác cho app iOS và Android. Ước tính doanh thu từ quảng cáo thưởng, xen kẽ và trung gian đấu thầu. | RealTools',
      keywords: 'tính doanh thu admob, công cụ admob, tính arpdau, admob ecpm calculator, doanh thu quảng cáo ứng dụng di động, realtools'
    },
    adsense: {
      title: 'Tính Doanh Thu AdSense 2026 | Page RPM & Thu Nhập Website',
      desc: 'Ước tính doanh thu quảng cáo website với công cụ tính AdSense và Page RPM trên 26 chủ đề nội dung, quốc gia và vị trí đặt quảng cáo. | RealTools',
      keywords: 'công cụ tính doanh thu google adsense, tính tiền adsense, tính page rpm, adsense trả bao nhiêu cho 1000 lượt xem, adsense cpc việt nam, realtools'
    },
    youtube: {
      title: 'Tính Tiền YouTube 2026 | Dự Đoán RPM, CPM & YouTube Shorts',
      desc: 'Tính doanh thu kênh YouTube: video dài, quỹ Shorts, hội viên kênh và tài trợ nhãn hàng trên hơn 15 lĩnh vực nội dung. | RealTools',
      keywords: 'tính tiền youtube, youtube trả bao nhiêu cho 1000 view, tính rpm youtube, doanh thu youtube shorts, công cụ tính cpm youtube, realtools'
    },
    tiktok: {
      title: 'Tính Tiền TikTok 2026 | Quỹ Creator Rewards & Quà Tặng LIVE',
      desc: 'Ước tính thu nhập TikTok từ chương trình Creator Rewards cho video trên 1 phút và quy đổi kim cương quà tặng livestream. | RealTools',
      keywords: 'tính tiền tiktok, tiktok trả bao nhiêu tiền cho 1000 view, đổi kim cương tiktok sang usd, creator rewards tiktok, kiếm tiền tiktok, realtools'
    },
    twitch: {
      title: 'Tính Doanh Thu Twitch 2026 | Gói Đăng Ký, Bits & Quảng Cáo AIP',
      desc: 'Tính thu nhập streamer Twitch: các gói đăng ký Tier 1/2/3, tỷ lệ chia sẻ Partner Plus (50/50 và 70/30), quảng cáo AIP và Bits. | RealTools',
      keywords: 'tính tiền twitch, streamer twitch kiếm bao nhiêu tiền, chia sẻ doanh thu partner plus twitch, đổi bits sang usd, tính doanh thu quảng cáo twitch, realtools'
    },
    kick: {
      title: 'Tính Thu Nhập Kick 2026 | Tỷ Lệ 95/5 & Trợ Cấp KCP Theo Giờ',
      desc: 'Tính doanh thu livestream Kick: tỷ lệ chia sẻ 95% gói đăng ký ($4.74 net/sub) và trợ cấp phát sóng theo giờ chương trình KCP. | RealTools',
      keywords: 'tính tiền kick, thu nhập streamer kick, tỷ lệ chia 95 5 kick, kick trả bao nhiêu tiền một giờ, kick so với twitch, realtools'
    },
    runway: {
      title: 'Kalkulator Đường Băng Tiền 2026 | Tiết Kiệm Duy Trì Bao Lâu?',
      desc: 'Khám phá số tiền tiết kiệm hoặc vốn khởi nghiệp của bạn duy trì được bao nhiêu năm khi rút tiền định kỳ, sinh lời và lạm phát. | RealTools',
      keywords: 'tính runway tài chính, tiền tiết kiệm duy trì được bao lâu, công cụ swp, rút tiền hưu trí có hệ thống, 1 tỷ sống được bao lâu, realtools'
    },
    '8th-pay-commission': {
      title: '8th Pay Commission Salary Calculator 2026 | Lương Ấn Độ',
      desc: 'Dự báo lương theo Ủy ban Tiền lương thứ 8 cho công chức Ấn Độ. Mô phỏng hệ số 1.92x–3.83x, phụ cấp DA, HRA và lương hưu. | RealTools',
    },
    'fuel-cost-calculator': {
      title: 'Tính Tiền Xăng Xe Đi Lại 2026 | Ước Tính Chi Phí Xăng Dầu / km',
      desc: 'Công cụ tính chi phí nhiên liệu miễn phí. Nhập quãng đường, mức tiêu hao và giá xăng dầu để tính chi phí chuyến đi và số lít xăng cần dùng. | RealTools',
      keywords: 'tính tiền xăng, tính chi phí xăng xe chuyến đi, 100km tốn bao nhiêu lít xăng, tiền xăng mỗi km, tính chi phí đi xe đường dài, realtools'
    },
  },
};

const CALC_PLATFORMS = new Set(['home', 'admob', 'adsense', 'youtube', 'tiktok', 'twitch', 'kick', 'runway', '8th-pay-commission', 'fuel-cost-calculator']);

/** Canonical URL for a platform + language (mirrors scripts/prerender.mjs). */
export function canonicalFor(platform: string, lang: string): string {
  const base = 'https://realtools.store';
  const plat = CALC_PLATFORMS.has(platform) && platform !== 'home' ? platform : '';
  if (lang === 'en' || !lang) return plat ? `${base}/${plat}` : `${base}/`;
  return plat ? `${base}/${lang}/${plat}` : `${base}/${lang}`;
}

/** Look up SEO entry with English fallback. Returns null for trust/legal/404 pages. */
export function getPlatformSeo(platform: string, lang: string): (SeoEntry & { canonical: string }) | null {
  if (!CALC_PLATFORMS.has(platform)) return null;
  const table = PLATFORM_SEO[lang] || PLATFORM_SEO.en;
  const entry = table[platform] || PLATFORM_SEO.en[platform];
  if (!entry) return null;
  return { ...entry, canonical: canonicalFor(platform, lang) };
}
