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
// platform: home | admob | adsense | youtube | tiktok | twitch | kick | runway
// Missing lang/platform falls back to English (see getPlatformSeo below).

export interface SeoEntry {
  title: string;
  desc: string;
}

export const PLATFORM_SEO: Record<string, Record<string, SeoEntry>> = {
  en: {
    home: {
      title: 'Ad Revenue & Runway Calculator 2026 | RealTools',
      desc: 'Free calculators for AdSense, AdMob, YouTube, TikTok, Twitch, Kick, savings and startup runway. Estimate revenue, payouts and runway. | RealTools',
    },
    admob: {
      title: 'AdMob Revenue Calculator 2026 | ARPDAU & eCPM Tool',
      desc: 'Accurate AdMob calculator for iOS & Android apps. Estimate daily, monthly and yearly revenue (ARPDAU, eCPM) across Rewarded, Interstitial and App Open ads. | RealTools',
    },
    adsense: {
      title: 'AdSense Calculator 2026 | Page RPM & Income Estimator',
      desc: 'Calculate potential website earnings with our AdSense ad revenue and Page RPM calculators. Estimate monthly and yearly revenue across 26 niches, countries and ad units. | RealTools',
    },
    youtube: {
      title: 'YouTube Money Calculator 2026 | Earnings, RPM, CPM & Shorts Estimator',
      desc: 'Calculate potential YouTube earnings with our ad revenue, RPM, CPM and Shorts calculators. Estimate monthly and yearly channel revenue from ads, memberships and brand deals. | RealTools',
    },
    tiktok: {
      title: 'TikTok Money Calculator 2026 | Creator Rewards Tool',
      desc: 'Calculate potential TikTok earnings with our Creator Rewards, LIVE gifts and Shop calculators. Estimate monthly and yearly revenue from qualified views, diamonds and commissions. | RealTools',
    },
    twitch: {
      title: 'Twitch Money Calculator 2026 | Subs, Bits & Ad Revenue Estimator',
      desc: 'Calculate potential earnings on Twitch with our ad revenue, subscription, and Bits calculators. Estimate your monthly and yearly revenue from subs, AIP ads and sponsorships. | RealTools',
    },
    kick: {
      title: 'Kick Earnings Calculator 2026 | 95/5 Split & KCP Pay',
      desc: 'Calculate potential Kick earnings with our 95/5 split and KCP hourly calculators. Estimate monthly and yearly streamer revenue from subs, stipends and tips. | RealTools',
    },
    runway: {
      title: 'Startup Runway Calculator 2026 | Financial Runway Tool',
      desc: 'Free runway calculator. See how long savings or startup cash lasts with withdrawals, returns and inflation rises. SWP breakeven analysis for 2026. | RealTools',
    },
  },
  es: {
    home: {
      title: 'Calculadora AdSense, AdMob y Runway 2026 | Ingresos',
      desc: 'Calculadora precisa de ingresos de Google AdSense, AdMob, YouTube, TikTok, Twitch y Kick. Estima ganancias, vistas, subs y anuncios. | RealTools',
    },
    admob: {
      title: 'Calculadora AdMob 2026 | ARPDAU y eCPM',
      desc: 'Calculadora AdMob para apps iOS y Android. Estima ARPDAU, eCPM y ganancias diarias con rewarded, intersticiales y mediación. | RealTools',
    },
    adsense: {
      title: 'Calculadora AdSense 2026 | RPM y Ganancias Web',
      desc: 'Calculadora precisa de ingresos de Google AdSense. Calcula el Page RPM de tu web y estimación de ganancias según nicho, país y formato publicitario. | RealTools',
    },
    youtube: {
      title: 'Calculadora YouTube 2026 | RPM y Shorts',
      desc: 'Calcula ingresos de YouTube por videos largos y Shorts. Estima RPM por nicho, membresías y anuncios para creadores de contenido. | RealTools',
    },
    tiktok: {
      title: 'Calculadora TikTok 2026 | Creator Rewards',
      desc: 'Calculadora de dinero de TikTok. Calcula ganancias del Creator Rewards Program por vistas calificadas y regalos LIVE. | RealTools',
    },
    twitch: {
      title: 'Calculadora Twitch 2026 | Subs y AIP',
      desc: 'Calcula ganancias de Twitch para streamers: suscripciones Tier 1/2/3, repartos Partner Plus (50/50 y 70/30), bits y programa AIP. | RealTools',
    },
    kick: {
      title: 'Calculadora Kick 2026 | 95/5 y KCP',
      desc: 'Calculadora de ingresos de Kick. Descubre ganancias con el reparto de suscripción 95/5 ($4.74 neto/sub) y el programa KCP por hora. | RealTools',
    },
    runway: {
      title: 'Calculadora Runway 2026 | Cuánto Durará Mi Dinero',
      desc: 'Calculadora de runway: descubre cuántos años duran tus ahorros con retiros mensuales, rentabilidad e inflación. Análisis breakeven SWP. | RealTools',
    },
  },
  ja: {
    home: {
      title: 'AdSense, AdMob & クリエイター収益計算ツール 2026 | 広告収入＆配信収益予測',
      desc: 'Google AdSense、AdMob、YouTube、TikTok、Twitch、Kickの正確な広告＆クリエイター収益計算機。再生数やサブスクから収益をシミュレーション。資産runway計算にも対応。 | RealTools',
    },
    admob: {
      title: 'AdMob 収益計算ツール 2026 | ARPDAU＆eCPM予測',
      desc: 'iOS・Androidアプリ向けAdMob収益計算。ARPDAU・eCPM・メディエーション効果を予測。 | RealTools',
    },
    adsense: {
      title: 'Google AdSense 収益計算ツール 2026 | ウェブサイト広告収入＆ページRPM予測',
      desc: 'Google AdSenseの広告収益見積もりツール。ジャンル、国、ページビュー数から月間ページRPMと推定収益を正確に計算。 | RealTools',
    },
    youtube: {
      title: 'YouTube 広告収益計算ツール 2026 | 動画再生数・RPM＆ショート収益予測',
      desc: 'YouTubeの長編動画およびShorts動画の広告収入計算ツール。ジャンル別RPM、メンバーシップ、広告単価からクリエイター収益を予測。 | RealTools',
    },
    tiktok: {
      title: 'TikTok 収益計算ツール 2026 | Creator Rewards＆LIVEギフト換金予測',
      desc: 'TikTok Creator Rewards ProgramおよびLIVEギフト（ダイヤモンド）の換金収益計算ツール。対象視聴回数から推定月収を計算。 | RealTools',
    },
    twitch: {
      title: 'Twitch 収益計算ツール 2026 | サブスク＆配信広告収入シミュレーター',
      desc: 'Twitchストリーマー向け収益計算ツール。Tier 1/2/3サブスク収益、Partner Plus（70/30配分）、Bits、AIP広告プログラム収益を計算。 | RealTools',
    },
    kick: {
      title: 'Kick 収益計算ツール 2026 | 95/5サブスク還元＆KCP時給予測',
      desc: 'Kick配信者のための収益シミュレーター。業界最高の95/5サブスク還元率（1件あたり$4.74）およびKCP時給プログラム収益を計算。 | RealTools',
    },
    runway: {
      title: '資産寿命計算ツール 2026 | 老後資金は何年もつ？',
      desc: '毎月の取り崩し・運用利回り・インフレから資産の寿命を計算。SWP損益分岐点つき。 | RealTools',
    },
  },
  fr: {
    home: {
      title: 'Calculateur AdSense, AdMob & Runway 2026 | Revenus',
      desc: 'Calculateur précis de revenus Google AdSense, AdMob, YouTube, TikTok, Twitch et Kick. Estimez vos gains publicitaires, abonnements et sponsors. | RealTools',
    },
    admob: {
      title: 'Calculateur AdMob 2026 | ARPDAU & eCPM',
      desc: 'Calculateur AdMob pour apps iOS et Android. Estimez ARPDAU, eCPM et revenus avec rewarded et médiation. | RealTools',
    },
    adsense: {
      title: 'Calculateur AdSense 2026 | RPM & Gains',
      desc: 'Simulateur précis de revenus Google AdSense. Estimez le RPM de votre site web, vos impressions et vos gains mensuels selon la thématique et le pays. | RealTools',
    },
    youtube: {
      title: 'Calculateur YouTube 2026 | RPM & Shorts',
      desc: 'Calculateur de revenus pour créateurs YouTube. Estimez vos gains sur les vidéos longues et Shorts selon votre RPM de niche et vos abonnements. | RealTools',
    },
    tiktok: {
      title: 'Calculateur TikTok 2026 | Rewards',
      desc: 'Simulateur de revenus TikTok. Calculez les rémunérations du Creator Rewards Program pour les vidéos >1 min et les diamants LIVE. | RealTools',
    },
    twitch: {
      title: 'Calculateur Twitch 2026 | Abonnements AIP',
      desc: 'Estimez les gains de streamer Twitch : abonnements Tier 1/2/3, partages Partner Plus (50/50 et 70/30), bits et coupures publicitaires AIP. | RealTools',
    },
    kick: {
      title: "Calculateur Kick 2026 | 95/5 & KCP",
      desc: "Calculateur de gains pour streamers Kick. Calculez vos revenus grâce au partage d'abonnement 95/5 (4,74 $ net/sub) et au programme KCP. | RealTools",
    },
    runway: {
      title: 'Calculateur Runway 2026 | Combien de Temps ?',
      desc: "Calculez combien d'années dureront vos économies avec retraits mensuels, rendement et inflation. Analyse SWP. | RealTools",
    },
  },
  de: {
    home: {
      title: 'AdSense, AdMob & Runway Rechner 2026 | Einnahmen',
      desc: 'Präziser Rechner für Google AdSense, AdMob, YouTube, TikTok, Twitch und Kick Einnahmen. Berechnen Sie RPM, ARPDAU und Streamer-Auszahlungen. | RealTools',
    },
    admob: {
      title: 'AdMob Rechner 2026 | ARPDAU & eCPM',
      desc: 'AdMob Rechner für iOS- & Android-Apps. ARPDAU, eCPM und Tagesumsatz mit Rewarded und Mediation berechnen. | RealTools',
    },
    adsense: {
      title: 'AdSense Rechner 2026 | RPM & Umsatz',
      desc: 'Kostenloser Google AdSense Einnahmen-Rechner. Berechnen Sie Seiten-RPM, Impressionen und monatliche Werbeeinnahmen für Ihre Website. | RealTools',
    },
    youtube: {
      title: 'YouTube Rechner 2026 | RPM & Shorts',
      desc: 'YouTube Rechner für Video- und Shorts-Einnahmen. Berechnen Sie YouTube Creator Einkommen basierend auf Nischen-RPM und Kanalmitgliedschaften. | RealTools',
    },
    tiktok: {
      title: 'TikTok Rechner 2026 | Rewards & LIVE',
      desc: 'Berechnen Sie TikTok Einnahmen aus dem Creator Rewards Program für Videos >1 Min und LIVE-Stream-Geschenke (Diamanten). | RealTools',
    },
    twitch: {
      title: 'Twitch Rechner 2026 | Subs & AIP',
      desc: 'Präziser Twitch Streamer Einnahmen-Rechner. Berechnen Sie Abonnements nach Tier 1/2/3, Partner Plus Splits (50/50 und 70/30) und AIP-Werbung. | RealTools',
    },
    kick: {
      title: 'Kick Rechner 2026 | 95/5 & KCP',
      desc: 'Kick Einnahmen-Rechner für Streamer. Berechnen Sie Einnahmen mit dem 95/5 Abo-Split ($4,74 netto/Sub) und dem KCP-Stundenhonorar. | RealTools',
    },
    runway: {
      title: 'Runway Rechner 2026 | Wie Lange Reicht Geld?',
      desc: 'Runway-Rechner: Wie viele Jahre reichen Ersparnisse bei monatlicher Entnahme, Rendite und Inflation? SWP-Analyse. | RealTools',
    },
  },
  pt: {
    home: {
      title: 'Calculadora AdSense, AdMob e Runway 2026 | Receita',
      desc: 'Calculadora precisa de receita do Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcule ganhos de sites, apps móveis e canais de streaming. | RealTools',
    },
    admob: {
      title: 'Calculadora AdMob 2026 | ARPDAU e eCPM',
      desc: 'Calculadora AdMob para apps iOS e Android. Estime ARPDAU, eCPM e receita diária com rewarded e mediação. | RealTools',
    },
    adsense: {
      title: 'Calculadora AdSense 2026 | RPM e Ganhos',
      desc: 'Calculadora precisa do Google AdSense. Estime o RPM da sua página, visualizações e faturamento mensal com anúncios em blogs e portais. | RealTools',
    },
    youtube: {
      title: 'Calculadora YouTube 2026 | RPM & Shorts',
      desc: 'Calculadora de ganhos para criadores do YouTube. Estime receita de vídeos longos e Shorts de acordo com o RPM de nicho e membros do canal. | RealTools',
    },
    tiktok: {
      title: 'Calculadora TikTok 2026 | Recompensas',
      desc: 'Calculadora de dinheiro no TikTok. Estime ganhos com o Creator Rewards Program para vídeos >1 min e conversão de diamantes de presentes LIVE. | RealTools',
    },
    twitch: {
      title: 'Calculadora Twitch 2026 | Subs e AIP',
      desc: 'Calculadora de receita para streamers na Twitch: inscrições Tier 1/2/3, divisões Partner Plus (50/50 e 70/30), bits e anúncios AIP. | RealTools',
    },
    kick: {
      title: 'Calculadora Kick 2026 | 95/5 & KCP',
      desc: 'Calculadora de ganhos na Kick. Calcule receitas com a divisão de assinaturas 95/5 ($4,74 líquido/sub) e a remuneração horária do KCP. | RealTools',
    },
    runway: {
      title: 'Calculadora Runway 2026 | Quanto Tempo Dura?',
      desc: 'Descubra quantos anos suas economias duram com retiradas mensais, rendimento e inflação. Análise SWP. | RealTools',
    },
  },
  ko: {
    home: {
      title: '애드센스, 애드몹 & 크리에이터 수익 계산기 2026 | 유튜브·틱톡·트위치·킥',
      desc: '정확한 구글 애드센스, 애드몹, 유튜브, 틱톡, 트위치, 킥 수익 계산기. 조회수와 구독자 기반의 정밀한 월간 및 연간 수익을 예측합니다. 런웨이 계산 포함. | RealTools',
    },
    admob: {
      title: '애드몹 수익 계산기 2026 | ARPDAU & eCPM',
      desc: 'iOS·안드로이드 앱을 위한 애드몹 수익 계산기. ARPDAU, eCPM, 미디에이션 효과를 예측합니다. | RealTools',
    },
    adsense: {
      title: '구글 애드센스 수익 계산기 2026 | 웹사이트 페이지 RPM & 수익 예측',
      desc: '구글 애드센스 웹사이트 광고수익 계산기. 분야별 페이지 RPM, 트래픽 국가, 광고 단가를 기반으로 예상 월수익을 정밀하게 계산합니다. | RealTools',
    },
    youtube: {
      title: '유튜브 수익 계산기 2026 | 동영상 RPM & 쇼츠 수익 예측기',
      desc: '유튜브 크리에이터를 위한 동영상 및 쇼츠 광고수익 계산기. 분야별 RPM, 채널 멤버십, 중간 광고 효과를 반영하여 예상 수입을 산출합니다. | RealTools',
    },
    tiktok: {
      title: '틱톡 수익 계산기 2026 | 크리에이터 리워드 & 라이브 다이아몬드 환전',
      desc: '틱톡 수익 계산기. 1분 이상 동영상의 크리에이터 리워드 프로그램 수익 및 라이브 방송 선물(다이아몬드) 환전 금액을 예측합니다. | RealTools',
    },
    twitch: {
      title: '트위치 수익 계산기 2026 | 정기구독 & AIP 광고 수익 시뮬레이터',
      desc: '트위치 스트리머를 위한 정기구독 수익 계산기. 티어 1/2/3 구독, 파트너 플러스 분배율(50/50 및 70/30), 비트, AIP 광고 수익을 예측합니다. | RealTools',
    },
    kick: {
      title: '킥 수익 계산기 2026 | 95/5 구독 배분 & KCP 시급 스트리밍 수익',
      desc: '킥 스트리머 수익 계산기. 파격적인 95/5 구독 수익 배분(구독당 순수익 $4.74)과 KCP 크리에이터 프로그램 시급을 계산합니다. | RealTools',
    },
    runway: {
      title: '자산수명 계산기 2026 | 은퇴자금 몇 년?',
      desc: '월 인출·수익률·인플레이션으로 저축이 몇 년 버틸지 계산. SWP 손익분기점 포함. | RealTools',
    },
  },
  it: {
    home: {
      title: 'Calcolatore AdSense, AdMob & Runway 2026 | Guadagni',
      desc: 'Calcolatore accurato dei guadagni di Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcola Page RPM, ARPDAU e guadagni streaming. | RealTools',
    },
    admob: {
      title: 'Calcolatore AdMob 2026 | ARPDAU ed eCPM',
      desc: 'Calcolatore AdMob per app iOS e Android. Stima ARPDAU, eCPM e ricavi con rewarded e mediation. | RealTools',
    },
    adsense: {
      title: 'Calcolatore AdSense 2026 | RPM & Guadagni',
      desc: 'Calcolatore accurato dei guadagni Google AdSense. Stima il Page RPM del tuo sito web, le visualizzazioni e le entrate mensili per nicchia e paese. | RealTools',
    },
    youtube: {
      title: 'Calcolatore YouTube 2026 | RPM & Shorts',
      desc: 'Calcolatore di entrate per creator YouTube. Calcola i guadagni di video lunghi e Shorts in base a RPM di nicchia, abbonamenti e annunci mid-roll. | RealTools',
    },
    tiktok: {
      title: 'Calcolatore TikTok 2026 | Ricompense',
      desc: 'Calcolatore di guadagni TikTok. Calcola le entrate del Creator Rewards Program per i video >1 min e la conversione dei diamanti dei regali LIVE. | RealTools',
    },
    twitch: {
      title: 'Calcolatore Twitch 2026 | Abbonamenti AIP',
      desc: 'Calcolatore guadagni per streamer Twitch: abbonamenti Tier 1/2/3, divisioni Partner Plus (50/50 e 70/30), bits e programma pubblicitario AIP. | RealTools',
    },
    kick: {
      title: 'Calcolatore Kick 2026 | 95/5 & KCP',
      desc: 'Calcolatore di entrate per streamer Kick. Calcola i ricavi con la divisione abbonamenti 95/5 ($4,74 netti/sub) e la paga oraria del Creator Program. | RealTools',
    },
    runway: {
      title: 'Calcolatore Runway 2026 | Quanto Dura?',
      desc: 'Scopri quanti anni dureranno i risparmi con prelievi mensili, rendimento e inflazione. Analisi SWP. | RealTools',
    },
  },
};

const CALC_PLATFORMS = new Set(['home', 'admob', 'adsense', 'youtube', 'tiktok', 'twitch', 'kick', 'runway']);

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
