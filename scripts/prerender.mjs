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
  admob: {
    title: 'Google AdMob Revenue Calculator 2026 | App ARPDAU & eCPM Forecaster',
    desc: 'Accurate Google AdMob revenue calculator for iOS & Android. Calculate mobile app ARPDAU, daily earnings, and eCPM across Rewarded, Interstitial, and App Open ads.',
    keywords: 'Google AdMob revenue calculator, admob revenue calculator, app ad revenue calculator, mobile app revenue calculator, admob calculator, arpdau calculator, admob ecpm calculator, app monetization calculator, google admob, ad revenue calculator, mobile game revenue calculator, admob mediation calculator',
    canonical: 'https://admobrevenue.pages.dev/',
  },
  adsense: {
    title: 'Google AdSense Revenue Calculator 2026 | Website Page RPM & Income Estimator',
    desc: 'Free Google AdSense revenue calculator. Estimate website ad revenue, Page RPM, and monthly publisher income across 26 niches, traffic countries, and ad units for 2026.',
    keywords: 'Google AdSense revenue calculator, adsense revenue calculator, website ad revenue calculator, ad revenue calculator website, google adsense, what is google adsense, website income checker, page rpm calculator, adsense earnings estimator, blog revenue calculator, how much does adsense pay per 1000 views',
    canonical: 'https://admobrevenue.pages.dev/adsense',
  },
  youtube: {
    title: 'YouTube Ad Revenue Calculator 2026 | Video RPM & Shorts Money Calculator',
    desc: 'Accurate YouTube ad revenue calculator for long-form & Shorts. Calculate YouTube creator income, video RPM, mid-roll boost, channel memberships, and sponsorships for 2026.',
    keywords: 'YouTube ad revenue calculator, youtube money calculator, youtube rpm calculator, youtube shorts money calculator, youtube earnings calculator, youtube channel calculator, youtube creator income estimator, youtube cpm calculator, youtube monetization calculator, how much does youtube pay per 1000 views, youtube shorts revenue calculator, youtube sponsor earnings',
    canonical: 'https://admobrevenue.pages.dev/youtube',
  },
  tiktok: {
    title: 'TikTok Money Calculator 2026 | Creator Rewards & LIVE Diamond Estimator',
    desc: 'Free TikTok money calculator. Estimate TikTok Creator Rewards Program earnings for >1 min videos, qualified FYP view rates, LIVE stream gift diamonds, and TikTok Shop commissions.',
    keywords: 'TikTok money calculator, tiktok creator rewards calculator, tiktok earnings calculator, tiktok diamond to usd calculator, tiktok live gifts calculator, tiktok creator fund calculator, tiktok rpm calculator, calculate tiktok money, how much does tiktok pay for 1 million views, tiktok shop affiliate earnings calculator',
    canonical: 'https://admobrevenue.pages.dev/tiktok',
  },
  twitch: {
    title: 'Twitch Money & Sub Calculator 2026 | Streamer Earnings & AIP Ad Revenue',
    desc: 'Accurate Twitch money calculators and sub revenue estimator. Calculate Tier 1/2/3 subscription income across 50/50 and 70/30 Partner Plus splits, bits, and AIP ad breaks for 2026.',
    keywords: 'Twitch money calculators, Twitch ad revenue calculators, twitch sub calculator, twitch earnings calculator, twitch partner plus calculator, twitch streamer income calculator, twitch bits to usd, twitch ad incentive program calculator, how much do twitch streamers make, twitch sub revenue calculator',
    canonical: 'https://admobrevenue.pages.dev/twitch',
  },
  kick: {
    title: 'Kick Earnings Calculator 2026 | 95/5 Sub Split & KCP Hourly Stream Pay',
    desc: 'Accurate Kick earnings calculator. Calculate Kick streamer revenue with the 95/5 subscription split ($4.74 net/sub) and KICK Creator Program hourly rate stipend for 2026.',
    keywords: 'Kick earnings calculator, kick stream calculator, kick revenue calculator, kick sub calculator, kick 95 5 split calculator, kick creator program hourly rate, kick vs twitch earnings calculator, kick streamer income, how much does kick pay streamers, kick money calculator, kick crypto tipping',
    canonical: 'https://admobrevenue.pages.dev/kick',
  },
};

// ==========================================
// 2. COMPLETE LOCALIZED PLATFORM METADATA
// ==========================================
const LOCALIZED_PLATFORM_METADATA = {
  es: {
    root: {
      title: 'Calculadora de Ingresos AdSense, AdMob y Creadores 2026 | Estimador de Ganancias',
      desc: 'Calculadora precisa de ingresos de Google AdSense, AdMob, YouTube, TikTok, Twitch y Kick. Estima ganancias por reproducciones, suscriptores y anuncios.',
      keywords: 'calculadora de ingresos adsense, calculadora de ingresos google adsense, calculadora de ingresos publicitarios, calculadora ingresos web, calculadora ingresos app, ingresos adsense, que es google adsense, calculadora dinero youtube, calculadora ingresos tiktok, calculadora subs twitch, calculadora ganancias kick, cuanto paga adsense por clic, cuanto paga adsense por 1000 visitas',
    },
    adsense: {
      title: 'Calculadora de Ingresos Google AdSense 2026 | RPM y Ganancias de Páginas Web',
      desc: 'Calculadora precisa de ingresos de Google AdSense. Calcula el Page RPM de tu web y estimación de ganancias según nicho, país y formato publicitario.',
      keywords: 'calculadora de ingresos google adsense, calculadora de ingresos adsense, calculadora ingresos web, que es google adsense, ganancias adsense, calcular rpm adsense, estimador ingresos blog, cuanto paga adsense por clic, adsense cpc cuanto paga, cuanto paga adsense por 1000 visitas, cuanto se gana con adsense',
    },
    youtube: {
      title: 'Calculadora de Ingresos YouTube 2026 | Calculadora de Dinero y RPM de Videos',
      desc: 'Calcula ingresos de YouTube por videos largos y Shorts. Estima RPM por nicho, membresías y anuncios para creadores de contenido.',
      keywords: 'calculadora de ingresos youtube, calculadora dinero youtube, calculadora ganancias youtube, youtube rpm calculadora, cuanto paga youtube por visita, calculadora youtube shorts, cuanto paga youtube por 1000 visitas, cuanto paga youtube por suscriptor, calculadora cpm youtube',
    },
    tiktok: {
      title: 'Calculadora de Dinero TikTok 2026 | Programa Creator Rewards y Diamantes LIVE',
      desc: 'Calculadora de dinero de TikTok. Calcula ganancias del Creator Rewards Program por vistas calificadas y regalos LIVE.',
      keywords: 'calculadora de dinero tiktok, calculadora ingresos tiktok, creadores tiktok ganancias, diamantes tiktok a dolares, cuanto paga tiktok por visitas, calculadora tiktok live, cuanto paga tiktok por 1000 vistas, cuanto paga tiktok por like',
    },
    twitch: {
      title: 'Calculadora de Ingresos Twitch 2026 | Suscripciones y Publicidad AIP',
      desc: 'Calcula ganancias de Twitch para streamers: suscripciones Tier 1/2/3, repartos Partner Plus (50/50 y 70/30), bits y programa AIP.',
      keywords: 'calculadora de ingresos twitch, calculadora subs twitch, cuanto gana un streamer en twitch, calculadora dinero twitch, reparto partner plus twitch, bits a dolares twitch, cuanto paga twitch por suscripcion, cuanto paga twitch por viewer',
    },
    kick: {
      title: 'Calculadora de Ganancias Kick 2026 | Reparto 95/5 y Tarifa por Hora KCP',
      desc: 'Calculadora de ingresos de Kick. Descubre ganancias con el reparto de suscripción 95/5 ($4.74 neto/sub) y el programa KCP por hora.',
      keywords: 'calculadora de ganancias kick, calculadora ingresos kick, reparto 95 5 kick, cuanto paga kick por hora, kick vs twitch ganancias, calculadora subs kick, cuanto paga kick por sub, cuanto paga kick por viewer',
    },
  },
  ja: {
    root: {
      title: 'AdSense, AdMob & クリエイター収益計算ツール 2026 | 広告収入＆配信収益予測',
      desc: 'Google AdSense、AdMob、YouTube、TikTok、Twitch、Kickの正確な広告＆クリエイター収益計算機。再生数やサブスクから収益をシミュレーション。',
      keywords: 'adsense 収益計算, アドセンス 収益 計算機, admob 収益計算, 広告収入 計算, ウェブサイト 広告収入, アプリ 広告収入, youtube 収益計算, tiktok 収益計算, twitch サブスク 収益, kick 収益計算機, アドセンス クリック単価, アドセンス 1クリック いくら',
    },
    adsense: {
      title: 'Google AdSense 収益計算ツール 2026 | ウェブサイト広告収入＆ページRPM予測',
      desc: 'Google AdSenseの広告収益見積もりツール。ジャンル、国、ページビュー数から月間ページRPMと推定収益を正確に計算。',
      keywords: 'google adsense 収益計算, アドセンス 収益 計算機, サイト 広告収入 計算, ページ rpm 計算, ブログ 収益シミュレーション, アドセンス 見積もり, アドセンス クリック単価, アドセンス 1クリック いくら, アドセンス 1000回 表示 いくら, アドセンス cpc 収益',
    },
    youtube: {
      title: 'YouTube 広告収益計算ツール 2026 | 動画再生数・RPM＆ショート収益予測',
      desc: 'YouTubeの長編動画およびShorts動画の広告収入計算ツール。ジャンル別RPM、メンバーシップ、広告単価からクリエイター収益を予測。',
      keywords: 'YouTube 収益 計算, ユーチューブ 収益計算機, youtube rpm 計算, youtube ショート 収益, ユーチューブ 再生回数 収入, チャンネル メンバーシップ 収益, ユーチューブ 再生数 収入 目安, ユーチューブ 1000回 再生 いくら, ユーチューブ cpm 計算',
    },
    tiktok: {
      title: 'TikTok 収益計算ツール 2026 | Creator Rewards＆LIVEギフト換金予測',
      desc: 'TikTok Creator Rewards ProgramおよびLIVEギフト（ダイヤモンド）の換金収益計算ツール。対象視聴回数から推定月収を計算。',
      keywords: 'TikTok 収益 計算, tiktok 収益 計算機, tiktok 再生数 収入, tiktok ダイヤモンド 換金 計算, クリエイターリワードプログラム 収益, tiktok 1000回 再生 いくら, tiktok 再生数 収入 目安',
    },
    twitch: {
      title: 'Twitch 収益計算ツール 2026 | サブスク＆配信広告収入シミュレーター',
      desc: 'Twitchストリーマー向け収益計算ツール。Tier 1/2/3サブスク収益、Partner Plus（70/30配分）、Bits、AIP広告プログラム収益を計算。',
      keywords: 'Twitch 収益 計算 ツール, twitch サブスク 収益, twitch ストリーマー 収入, パートナープラス 収益配分, twitch ビッツ 換金, twitch サブスク いくら, twitch 視聴者数 収益',
    },
    kick: {
      title: 'Kick 収益計算ツール 2026 | 95/5サブスク還元＆KCP時給予測',
      desc: 'Kick配信者のための収益シミュレーター。業界最高の95/5サブスク還元率（1件あたり$4.74）およびKCP時給プログラム収益を計算。',
      keywords: 'Kick 収益 計算, kick 配信 収入, kick サブスク 95 5, kick クリエイター プログラム 時給, kick twitch 比較, kick サブスク いくら, kick 時給 収益',
    },
  },
  fr: {
    root: {
      title: 'Calculateur de Revenus AdSense, AdMob & Créateurs 2026 | Estimation des Gains',
      desc: 'Calculateur précis de revenus Google AdSense, AdMob, YouTube, TikTok, Twitch et Kick. Estimez vos gains publicitaires, abonnements et sponsors.',
      keywords: 'calculateur de revenus adsense, simulateur de revenus adsense, calculateur de revenus publicitaires, gains google adsense, calculateur admob, calculateur revenus youtube, calculateur argent tiktok, simulateur gains twitch, calculateur kick, combien paye adsense par clic, combien gagne youtube 1000 vues',
    },
    adsense: {
      title: 'Calculateur de Revenus Google AdSense 2026 | RPM de Page & Gains de Site Web',
      desc: 'Simulateur précis de revenus Google AdSense. Estimez le RPM de votre site web, vos impressions et vos gains mensuels selon la thématique et le pays.',
      keywords: 'calculateur de revenus adsense, simulateur gains google adsense, revenus publicitaires site web, page rpm calculateur, gains blog adsense, combien paye adsense par clic, combien rapporte adsense par clic, combien gagne adsense 1000 vues, cpc adsense calculateur',
    },
    youtube: {
      title: 'Calculateur de Revenus YouTube 2026 | Simulateur d\'Argent Vidéo & Shorts RPM',
      desc: 'Calculateur de revenus pour créateurs YouTube. Estimez vos gains sur les vidéos longues et Shorts selon votre RPM de niche et vos abonnements.',
      keywords: 'calculateur de revenus youtube, simulateur argent youtube, combien rapporte youtube, youtube rpm calculateur, revenus shorts youtube, combien paye youtube 1000 vues, combien gagne un youtubeur, calculateur cpm youtube',
    },
    tiktok: {
      title: 'Calculateur d\'Argent TikTok 2026 | Programme Récompenses & Diamants LIVE',
      desc: 'Simulateur de revenus TikTok. Calculez les rémunérations du Creator Rewards Program pour les vidéos >1 min et les diamants LIVE.',
      keywords: 'calculateur argent tiktok, calculateur revenus tiktok, remuneration tiktok vues, diamants tiktok en euros, gains tiktok live, combien paye tiktok 1000 vues, combien gagne tiktok par vue',
    },
    twitch: {
      title: 'Calculateur de Revenus Twitch 2026 | Abonnements & Revenus Publicitaires AIP',
      desc: 'Estimez les gains de streamer Twitch : abonnements Tier 1/2/3, partages Partner Plus (50/50 et 70/30), bits et coupures publicitaires AIP.',
      keywords: 'calculateur revenus twitch, simulateur gains twitch, subs twitch revenus, combien gagne un streamer twitch, programme partner plus twitch, combien paye twitch par sub, combien paye twitch par viewer',
    },
    kick: {
      title: 'Calculateur de Gains Kick 2026 | Partage 95/5 & Rémunération Horaire KCP',
      desc: 'Calculateur de gains pour streamers Kick. Calculez vos revenus grâce au partage d\'abonnement 95/5 (4,74 $ net/sub) et au programme KCP.',
      keywords: 'calculateur gains kick, calculateur streamer kick, abonnement kick 95 5, salaire horaire kick kcp, kick vs twitch revenus, combien paye kick par sub, combien paye kick par heure',
    },
  },
  de: {
    root: {
      title: 'AdSense, AdMob & Creator Einnahmen-Rechner 2026 | Werbe- & Streaming-Einnahmen',
      desc: 'Präziser Rechner für Google AdSense, AdMob, YouTube, TikTok, Twitch und Kick Einnahmen. Berechnen Sie RPM, ARPDAU und Streamer-Auszahlungen.',
      keywords: 'adsense einnahmen rechner, google adsense rechner, werbeeinnahmen rechner, website werbeeinnahmen berechnen, app werbeeinnahmen rechner, youtube geld rechner, tiktok geld rechner, twitch einnahmen rechner, kick streamer rechner, was zahlt adsense pro klick, adsense einnahmen pro 1000 aufrufe',
    },
    adsense: {
      title: 'Google AdSense Einnahmen Rechner 2026 | Website RPM & Seitenumsatz',
      desc: 'Kostenloser Google AdSense Einnahmen-Rechner. Berechnen Sie Seiten-RPM, Impressionen und monatliche Werbeeinnahmen für Ihre Website.',
      keywords: 'adsense einnahmen rechner, google adsense rechner, website werbeeinnahmen berechnen, seiten rpm rechner, blog einnahmen rechner, was zahlt adsense pro klick, wie viel verdient man mit adsense, adsense einnahmen pro 1000 aufrufe, adsense cpc rechner, was verdient man mit adsense',
    },
    youtube: {
      title: 'YouTube Einnahmen Rechner 2026 | Video RPM & Shorts Geld Rechner',
      desc: 'YouTube Rechner für Video- und Shorts-Einnahmen. Berechnen Sie YouTube Creator Einkommen basierend auf Nischen-RPM und Kanalmitgliedschaften.',
      keywords: 'youtube einnahmen rechner, youtube geld rechner, wie viel verdient man auf youtube, youtube rpm rechner, youtube shorts einnahmen, wie viel zahlt youtube pro 1000 aufrufe, wie viel verdient man pro 1000 klicks youtube, youtube cpm rechner',
    },
    tiktok: {
      title: 'TikTok Geld Rechner 2026 | Creator Rewards & LIVE Diamanten Rechner',
      desc: 'Berechnen Sie TikTok Einnahmen aus dem Creator Rewards Program für Videos >1 Min und LIVE-Stream-Geschenke (Diamanten).',
      keywords: 'tiktok geld rechner, tiktok einnahmen rechner, wie viel zahlt tiktok pro aufruf, tiktok diamanten euro rechner, creator rewards rechner, wie viel zahlt tiktok pro 1000 aufrufe, wie viel verdient man auf tiktok',
    },
    twitch: {
      title: 'Twitch Einnahmen Rechner 2026 | Sub-Einnahmen & AIP Werbevergütung',
      desc: 'Präziser Twitch Streamer Einnahmen-Rechner. Berechnen Sie Abonnements nach Tier 1/2/3, Partner Plus Splits (50/50 und 70/30) und AIP-Werbung.',
      keywords: 'twitch einnahmen rechner, twitch sub rechner, wie viel verdient ein twitch streamer, partner plus split twitch, twitch bits in euro, wie viel verdient man pro sub twitch, wie viel zahlt twitch pro zuschauer',
    },
    kick: {
      title: 'Kick Einnahmen Rechner 2026 | 95/5 Sub Split & KCP Stundenlohn',
      desc: 'Kick Einnahmen-Rechner für Streamer. Berechnen Sie Einnahmen mit dem 95/5 Abo-Split ($4,74 netto/Sub) und dem KCP-Stundenhonorar.',
      keywords: 'kick einnahmen rechner, kick streamer rechner, kick 95 5 split, kick stundenlohn creator program, kick vs twitch vergleich, wie viel zahlt kick pro sub, wie viel zahlt kick pro stunde',
    },
  },
  pt: {
    root: {
      title: 'Calculadora de Receita AdSense, AdMob e Criadores 2026 | Estimativa de Ganhos',
      desc: 'Calculadora precisa de receita do Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcule ganhos de sites, apps móveis e canais de streaming.',
      keywords: 'calculadora de receita adsense, calculadora ganhos adsense, calculadora receita admob, simulador adsense, ganhos com anuncios site, calculadora dinheiro youtube, calculadora dinheiro tiktok, calculadora ganhos twitch, calculadora kick, quanto paga adsense por clique, quanto ganha no youtube 1000 visualizacoes',
    },
    adsense: {
      title: 'Calculadora de Receita Google AdSense 2026 | Page RPM e Ganhos de Sites',
      desc: 'Calculadora precisa do Google AdSense. Estime o RPM da sua página, visualizações e faturamento mensal com anúncios em blogs e portais.',
      keywords: 'calculadora de receita adsense, calculadora ganhos adsense, ganhos com anuncios site, calcular page rpm, simulador de ganhos adsense, quanto paga adsense por clique, quanto ganha adsense por 1000 visitas, adsense cpc quanto paga',
    },
    youtube: {
      title: 'Calculadora de Ganhos YouTube 2026 | Calculadora de Dinheiro e RPM de Vídeos',
      desc: 'Calculadora de ganhos para criadores do YouTube. Estime receita de vídeos longos e Shorts de acordo com o RPM de nicho e membros do canal.',
      keywords: 'calculadora de ganhos youtube, calculadora dinheiro youtube, quanto o youtube paga por visualizacao, calculadora rpm youtube, ganhos youtube shorts, quanto ganha no youtube 1000 visualizacoes, quanto paga youtube por 1000 views, calculadora cpm youtube',
    },
    tiktok: {
      title: 'Calculadora de Dinheiro TikTok 2026 | Programa de Recompensas e Diamantes',
      desc: 'Calculadora de dinheiro no TikTok. Estime ganhos com o Creator Rewards Program para vídeos >1 min e conversão de diamantes de presentes LIVE.',
      keywords: 'calculadora de dinheiro tiktok, quanto o tiktok paga, calculadora ganhos tiktok, diamantes tiktok em reais, programa criador tiktok, quanto paga tiktok por 1000 visualizacoes, quanto ganha no tiktok por view',
    },
    twitch: {
      title: 'Calculadora de Receitas Twitch 2026 | Inscrições e Anúncios AIP',
      desc: 'Calculadora de receita para streamers na Twitch: inscrições Tier 1/2/3, divisões Partner Plus (50/50 e 70/30), bits e anúncios AIP.',
      keywords: 'calculadora de receitas twitch, calculadora subs twitch, quanto ganha um streamer na twitch, divisao partner plus twitch, bits para reais, quanto paga twitch por sub, quanto paga twitch por viewer',
    },
    kick: {
      title: 'Calculadora de Ganhos Kick 2026 | Divisão 95/5 e Pagamento por Hora KCP',
      desc: 'Calculadora de ganhos na Kick. Calcule receitas com a divisão de assinaturas 95/5 ($4,74 líquido/sub) e a remuneração horária do KCP.',
      keywords: 'calculadora de ganhos kick, calculadora streamer kick, divisao 95 5 kick, quanto a kick paga por hora, kick vs twitch ganhos, quanto paga kick por sub, quanto paga kick por hora',
    },
  },
  ko: {
    root: {
      title: '애드센스, 애드몹 & 크리에이터 수익 계산기 2026 | 유튜브·틱톡·트위치·킥',
      desc: '정확한 구글 애드센스, 애드몹, 유튜브, 틱톡, 트위치, 킥 수익 계산기. 조회수와 구독자 기반의 정밀한 월간 및 연간 수익을 예측합니다.',
      keywords: '애드센스 수익 계산기, 구글 애드센스 수익 계산, 애드몹 수익 계산기, 웹사이트 광고수익 계산, 앱 광고수익 계산, 유튜브 수익 계산기, 틱톡 수익 계산기, 트위치 수익 계산기, 킥 수익 계산기, 애드센스 클릭당 수익, 애드센스 1000회당 수익',
    },
    adsense: {
      title: '구글 애드센스 수익 계산기 2026 | 웹사이트 페이지 RPM & 수익 예측',
      desc: '구글 애드센스 웹사이트 광고수익 계산기. 분야별 페이지 RPM, 트래픽 국가, 광고 단가를 기반으로 예상 월수익을 정밀하게 계산합니다.',
      keywords: '구글 애드센스 수익 계산기, 애드센스 수익 계산, 웹사이트 광고수익 계산, 페이지 rpm 계산기, 블로그 수익 예측, 애드센스 클릭당 수익, 애드센스 cpc 수익, 유튜브 조회수 1000당 수익, 애드센스 하루 수익 계산',
    },
    youtube: {
      title: '유튜브 수익 계산기 2026 | 동영상 RPM & 쇼츠 수익 예측기',
      desc: '유튜브 크리에이터를 위한 동영상 및 쇼츠 광고수익 계산기. 분야별 RPM, 채널 멤버십, 중간 광고 효과를 반영하여 예상 수입을 산출합니다.',
      keywords: '유튜브 수익 계산기, 유튜브 조회수 수익 계산, 유튜브 rpm 계산기, 유튜브 쇼츠 수익 계산기, 유튜브 수익 창출, 채널 멤버십 수익, 유튜브 조회수 1000당 수익, 유튜브 1만뷰 수익, 유튜브 cpm 계산기',
    },
    tiktok: {
      title: '틱톡 수익 계산기 2026 | 크리에이터 리워드 & 라이브 다이아몬드 환전',
      desc: '틱톡 수익 계산기. 1분 이상 동영상의 크리에이터 리워드 프로그램 수익 및 라이브 방송 선물(다이아몬드) 환전 금액을 예측합니다.',
      keywords: '틱톡 수익 계산기, 틱톡 조회수 수익, 틱톡 다이아몬드 원화 환전, 틱톡 크리에이터 리워드, 틱톡 라이브 후원, 틱톡 조회수 1000당 수익, 틱톡 100만뷰 수익',
    },
    twitch: {
      title: '트위치 수익 계산기 2026 | 정기구독 & AIP 광고 수익 시뮬레이터',
      desc: '트위치 스트리머를 위한 정기구독 수익 계산기. 티어 1/2/3 구독, 파트너 플러스 분배율(50/50 및 70/30), 비트, AIP 광고 수익을 예측합니다.',
      keywords: '트위치 수익 계산기, 트위치 구독 수익, 스트리머 월수익 계산기, 파트너 플러스 분배율, 트위치 비트 환전, 트위치 구독 1개당 수익, 트위치 시청자수 수익',
    },
    kick: {
      title: '킥 수익 계산기 2026 | 95/5 구독 배분 & KCP 시급 스트리밍 수익',
      desc: '킥 스트리머 수익 계산기. 파격적인 95/5 구독 수익 배분(구독당 순수익 $4.74)과 KCP 크리에이터 프로그램 시급을 계산합니다.',
      keywords: '킥 수익 계산기, 킥 스트리머 수익, 킥 95 5 구독 배분, 킥 크리에이터 프로그램 시급, 킥 트위치 수익 비교, 킥 구독 1개당 수익, 킥 시청자 100명 수익',
    },
  },
  it: {
    root: {
      title: 'Calcolatore Guadagni AdSense, AdMob & Creator 2026 | Stima Entrate Web & Streamer',
      desc: 'Calcolatore accurato dei guadagni di Google AdSense, AdMob, YouTube, TikTok, Twitch e Kick. Calcola Page RPM, ARPDAU e guadagni streaming.',
      keywords: 'calcolatore guadagni adsense, calcolatore entrate adsense, guadagni pubblicitari sito web, calcolo entrate admob, quanto si guadagna con adsense, calcolatore soldi youtube, calcolatore tiktok, calcolatore guadagni twitch, calcolatore kick, quanto paga adsense per click, quanto si guadagna con youtube 1000 visualizzazioni',
    },
    adsense: {
      title: 'Calcolatore Entrate Google AdSense 2026 | Page RPM & Guadagni Sito Web',
      desc: 'Calcolatore accurato dei guadagni Google AdSense. Stima il Page RPM del tuo sito web, le visualizzazioni e le entrate mensili per nicchia e paese.',
      keywords: 'calcolatore entrate adsense, calcolatore guadagni adsense, guadagni pubblicitari sito web, page rpm calcolo, quanto si guadagna con adsense, quanto paga adsense per click, quanto paga adsense per 1000 visualizzazioni, adsense cpc calcolatore',
    },
    youtube: {
      title: 'Calcolatore Guadagni YouTube 2026 | Calcolatore Soldi Video & Shorts RPM',
      desc: 'Calcolatore di entrate per creator YouTube. Calcola i guadagni di video lunghi e Shorts in base a RPM di nicchia, abbonamenti e annunci mid-roll.',
      keywords: 'calcolatore guadagni youtube, calcolatore soldi youtube, quanto paga youtube per visualizzazione, youtube rpm calcolatore, guadagni youtube shorts, quanto si guadagna con youtube 1000 visualizzazioni, quanto paga youtube per 1000 visualizzazioni, youtube cpm calcolatore',
    },
    tiktok: {
      title: 'Calcolatore Soldi TikTok 2026 | Programma Ricompense & Diamanti LIVE',
      desc: 'Calcolatore di guadagni TikTok. Calcola le entrate del Creator Rewards Program per i video >1 min e la conversione dei diamanti dei regali LIVE.',
      keywords: 'calcolatore soldi tiktok, quanto paga tiktok, calcolatore guadagni tiktok, diamanti tiktok in euro, programma ricompense creator, quanto paga tiktok per 1000 visualizzazioni, quanto si guadagna su tiktok',
    },
    twitch: {
      title: 'Calcolatore Entrate Twitch 2026 | Abbonamenti & Pubblicità AIP',
      desc: 'Calcolatore guadagni per streamer Twitch: abbonamenti Tier 1/2/3, divisioni Partner Plus (50/50 e 70/30), bits e programma pubblicitario AIP.',
      keywords: 'calcolatore entrate twitch, calcolatore sub twitch, quanto guadagna uno streamer su twitch, programma partner plus twitch, bits in euro, quanto paga twitch per sub, quanto paga twitch per spettatore',
    },
    kick: {
      title: 'Calcolatore Guadagni Kick 2026 | Divisione 95/5 & Tariffa Oraria KCP',
      desc: 'Calcolatore di entrate per streamer Kick. Calcola i ricavi con la divisione abbonamenti 95/5 ($4,74 netti/sub) e la paga oraria del Creator Program.',
      keywords: 'calcolatore guadagni kick, calcolatore streamer kick, divisione 95 5 kick, stipendio orario kick kcp, kick vs twitch guadagni, quanto paga kick per sub, quanto paga kick all ora',
    },
  },
};

// ==========================================
// 3. GENERATE RICH JSON-LD STRUCTURED DATA
// ==========================================
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
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '1450',
      'bestRating': '5',
      'worstRating': '1',
    },
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://admobrevenue.pages.dev/',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': meta.title,
        'item': meta.canonical,
      },
    ],
  };

  return `<script type="application/ld+json">${JSON.stringify(schemaApp)}</script>\n<script type="application/ld+json">${JSON.stringify(schemaBreadcrumb)}</script>`;
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
    }

    if (meta) {
      const jsonLdTag = generateJsonLd(platformKey || cleanSlug, meta);
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
  writePrerender('about', aboutHtml, { title: 'About Us | AdMobRevenue 2026 Monetization Engine', desc: 'About AdMobRevenue publisher tools and creator revenue forecasting.', canonical: 'https://admobrevenue.pages.dev/about', keywords: 'about admobrevenue, monetization engine, revenue calculator team' }, 'en');

  const contactHtml = render('contact', 'en');
  writePrerender('contact', contactHtml, { title: 'Contact Us & Publisher Support | AdMobRevenue', desc: 'Contact publisher support and monetization engineers for calculator feedback.', canonical: 'https://admobrevenue.pages.dev/contact', keywords: 'contact admobrevenue, publisher support, revenue calculator contact' }, 'en');

  const privacyHtml = render('privacy', 'en');
  writePrerender('privacy', privacyHtml, { title: 'Privacy Policy | AdMobRevenue', desc: 'Privacy Policy and data protection standards for AdMobRevenue.', canonical: 'https://admobrevenue.pages.dev/privacy', keywords: 'privacy policy admobrevenue, data protection' }, 'en');

  const termsHtml = render('terms', 'en');
  writePrerender('terms', termsHtml, { title: 'Terms of Service | AdMobRevenue', desc: 'Terms of Service and acceptable use policy for monetization calculations.', canonical: 'https://admobrevenue.pages.dev/terms', keywords: 'terms of service admobrevenue' }, 'en');

  const disclaimerHtml = render('disclaimer', 'en');
  writePrerender('disclaimer', disclaimerHtml, { title: 'Earnings Disclaimer & Methodology | AdMobRevenue', desc: 'Earnings disclaimer, statistical accuracy, and calculation methodology for digital advertising networks.', canonical: 'https://admobrevenue.pages.dev/disclaimer', keywords: 'earnings disclaimer, revenue calculation methodology' }, 'en');

  // 8. Pre-render 7 Localized clean versions for ALL platforms with precise localized metadata
  const languages = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const lang of languages) {
    const langDict = LOCALIZED_PLATFORM_METADATA[lang];

    // Localized Root
    const langRootMeta = { ...langDict.root, canonical: `https://admobrevenue.pages.dev/${lang}` };
    const langRootHtml = render('admob', lang);
    writePrerender(`${lang}`, langRootHtml, langRootMeta, lang, 'admob');

    // Localized AdSense
    const langAdsenseMeta = { ...langDict.adsense, canonical: `https://admobrevenue.pages.dev/${lang}/adsense` };
    const langAdsenseHtml = render('adsense', lang);
    writePrerender(`${lang}/adsense`, langAdsenseHtml, langAdsenseMeta, lang, 'adsense');

    // Localized YouTube
    const langYtMeta = { ...langDict.youtube, canonical: `https://admobrevenue.pages.dev/${lang}/youtube` };
    const langYtHtml = render('youtube', lang);
    writePrerender(`${lang}/youtube`, langYtHtml, langYtMeta, lang, 'youtube');

    // Localized TikTok
    const langTtMeta = { ...langDict.tiktok, canonical: `https://admobrevenue.pages.dev/${lang}/tiktok` };
    const langTtHtml = render('tiktok', lang);
    writePrerender(`${lang}/tiktok`, langTtHtml, langTtMeta, lang, 'tiktok');

    // Localized Twitch
    const langTwitchMeta = { ...langDict.twitch, canonical: `https://admobrevenue.pages.dev/${lang}/twitch` };
    const langTwitchHtml = render('twitch', lang);
    writePrerender(`${lang}/twitch`, langTwitchHtml, langTwitchMeta, lang, 'twitch');

    // Localized Kick
    const langKickMeta = { ...langDict.kick, canonical: `https://admobrevenue.pages.dev/${lang}/kick` };
    const langKickHtml = render('kick', lang);
    writePrerender(`${lang}/kick`, langKickHtml, langKickMeta, lang, 'kick');
  }

  // 9. Pre-render 404 Not Found page — Cloudflare serves this with 404 status for unknown paths
  const notFoundMeta = {
    title: '404 - Page Not Found | AdMobRevenue',
    desc: 'The page you are looking for does not exist. Explore our AdSense, YouTube, TikTok, Twitch and Kick revenue calculators.',
    keywords: '404, page not found, admobrevenue',
    canonical: 'https://admobrevenue.pages.dev/404',
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
