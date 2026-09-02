import { SupportedLanguage } from "../i18n/types";

export interface FAQItem {
  question: string;
  answer: string;
  category: 'AdSense' | 'AdMob' | 'YouTube' | 'TikTok' | 'Twitch' | 'Kick' | 'Formulas' | 'Strategy';
}

export const FAQS_DATA_EN: FAQItem[] = [
  // YouTube Creator FAQs
  {
    category: 'YouTube',
    question: 'How does this YouTube ad revenue calculator estimate creator earnings in 2026?',
    answer: 'Our YouTube ad revenue calculator combines 2026 YouTube Partner Program (YPP) baseline metrics across 15+ creator niches, audience geography multipliers, video length mid-roll boosts (+45%), YouTube Shorts revenue sharing pools ($0.03–$0.09 RPM), channel memberships ($4.99/mo with 70% net creator share), and Super Chats to forecast comprehensive channel income.',
  },
  {
    category: 'YouTube',
    question: 'How much does YouTube pay per 1,000 views (YouTube RPM) in 2026?',
    answer: 'In 2026, YouTube creator RPM (Revenue Per Mille) ranges from $1.50 to $35.00+ per 1,000 long-form views. High-paying niches like Finance, Crypto, SaaS, and Real Estate command $15.00–$35.00+ RPM in Tier 1 countries (US, UK, CA, AU), while Gaming, Entertainment, and Vlogs typically average $2.00–$6.00 RPM.',
  },
  {
    category: 'YouTube',
    question: 'How does YouTube Shorts revenue sharing calculate creator payouts?',
    answer: 'Unlike long-form video ads where creators receive 55% of ads played on their specific videos, YouTube Shorts pools all ad revenue from ads viewed between Shorts in the feed. YouTube allocates 45% of the Creator Pool to monetized creators based on their proportion of total global Shorts views, resulting in an effective RPM of $0.03 to $0.09 per 1,000 Shorts views.',
  },
  {
    category: 'YouTube',
    question: 'Why do videos longer than 8 minutes earn significantly higher YouTube revenue?',
    answer: 'YouTube permits multiple mid-roll ad breaks only on videos exceeding 8 minutes in duration. Enabling natural mid-rolls typically boosts total video RPM by +35% to +60% because viewers encounter 2 to 4 ad opportunities per watch session rather than just pre-rolls.',
  },

  // TikTok Creator FAQs
  {
    category: 'TikTok',
    question: 'How does the TikTok money calculator calculate Creator Rewards Program earnings?',
    answer: 'The TikTok money calculator computes earnings under the TikTok Creator Rewards Program (which replaced the Creator Fund). It calculates payouts strictly on qualified views (views from the For You Page where viewers watch for at least 5 continuous seconds on original videos longer than 1 minute) multiplied by your niche RPM ($0.40–$1.20+ per 1,000 qualified views).',
  },
  {
    category: 'TikTok',
    question: 'How much are TikTok LIVE stream gift diamonds worth in real money?',
    answer: 'During TikTok LIVE streams, viewers send virtual gifts purchased with coins. TikTok converts these gifts into Diamonds for the creator. Each Diamond is worth $0.005 USD. Because TikTok retains a standard 50% platform cut, 100,000 Diamonds equate to exactly $250.00 USD net payout to the creator.',
  },

  // Twitch Streamer FAQs
  {
    category: 'Twitch',
    question: 'How do Twitch money calculators calculate subscription splits and ad revenue?',
    answer: 'Twitch money calculators compute gross revenue from Tier 1 ($4.99), Tier 2 ($9.99), and Tier 3 ($24.99) subscriptions applied to your partner revenue split (standard 50/50, or 60/40 / 70/30 under Partner Plus), combined with Ad Incentive Program (AIP) video ad break CPMs ($3.50–$10.00 per viewer-hour) and Bits ($0.01/bit net).',
  },
  {
    category: 'Twitch',
    question: 'What is the Twitch Partner Plus program and how do you unlock the 70/30 sub split?',
    answer: 'The Twitch Partner Plus program allows eligible streamers to increase their subscription revenue share from the default 50% to 60% (by maintaining 100 Plus Points for 3 consecutive months) or 70% (by maintaining 350 Plus Points). Tier 1 subs give 1 pt, Tier 2 subs give 2 pts, and Tier 3 subs give 6 pts (recurring paid subs only; Prime and gift subs do not count toward points).',
  },

  // Kick Streamer FAQs
  {
    category: 'Kick',
    question: 'How does the Kick earnings calculator calculate the 95/5 creator subscription split?',
    answer: 'Kick offers an industry-leading 95/5 subscription revenue split where streamers keep 95% of every $4.99 subscription ($4.74 net payout per subscriber), while Kick takes only a 5% platform fee. This allows streamers to earn nearly double the sub income of Twitch’s standard 50% payout ($2.49/sub).',
  },
  {
    category: 'Kick',
    question: 'How much does the KICK Creator Program (KCP) pay streamers per hour?',
    answer: 'The KICK Creator Program (KCP) pays verified streamers a guaranteed hourly wage ranging from $16.00/hour to $40.00+/hour based on average concurrent viewership (CCV), stream category, and active chat engagement, providing reliable base income independent of viewer donations.',
  },

  // AdSense & AdMob FAQs
  {
    category: 'AdSense',
    question: 'What is Google AdSense and how does it generate website ad revenue?',
    answer: 'Google AdSense is an advertising network by Google that allows website owners, bloggers, and webmasters to earn ad revenue by displaying targeted ads next to their online content. Advertisers bid through Google Ads in programmatic auctions, and Google pays publishers 68% of the revenue generated when visitors view or click on ads.',
  },
  {
    category: 'AdSense',
    question: 'How does this Google AdSense revenue calculator estimate website earnings?',
    answer: 'Our AdSense revenue calculator uses a deterministic math engine combining 2026 real-world auction data across 26 website niches, Tier 1/2/3 geographic traffic splits, active viewport viewability rates, ad blocker loss percentages, and 6 modern ad format multipliers (such as sticky mobile anchors and vignette interstitials) to project realistic monthly and annual Page RPM.',
  },
  {
    category: 'Formulas',
    question: 'What is the exact mathematical formula to calculate website ad revenue and Page RPM?',
    answer: 'Website ad revenue is calculated with: Ad Revenue = (Total Pageviews × Page RPM) / 1,000. Page RPM (Revenue Per Mille) measures total earnings per 1,000 pageviews across all ad units combined: Page RPM = (Total Ad Earnings / Total Pageviews) × 1,000.',
  },
  {
    category: 'Formulas',
    question: 'What is the difference between AdSense Page RPM, Impression RPM, CPM, and CPC?',
    answer: 'Page RPM calculates earnings per 1,000 pageviews (regardless of how many ads are on the page). Impression RPM measures earnings per 1,000 individual ad impressions. CPM (Cost Per Mille) is what advertisers pay per 1,000 impressions. CPC (Cost Per Click) is the amount an advertiser pays each time a user clicks on an ad.',
  },
  {
    category: 'AdSense',
    question: 'How much does Google AdSense pay per 1,000 views in 2026?',
    answer: 'In 2026, Google AdSense pays between $2.50 and $45.00+ per 1,000 pageviews. High-paying niches like Finance, Insurance, Software/SaaS, and Legal achieve $25–$60+ RPMs with Tier 1 traffic (US/UK/CA), while broad entertainment, humor, and gaming typically range between $2.00 and $7.00 RPM.',
  },
  {
    category: 'AdSense',
    question: 'What is the official publisher revenue share for Google AdSense in 2026?',
    answer: 'For AdSense for Content, Google shares 68% of advertising revenue with publishers (advertisers pay 100%, Google retains 32%, publisher gets 68%). For AdSense for Search, the publisher revenue share is 51%.',
  },
  {
    category: 'AdSense',
    question: 'How do ad blockers and viewability rates affect AdSense website income?',
    answer: 'Ad blockers prevent ad scripts from loading, typically reducing potential impressions by 15% to 45% (highest on tech/gaming sites). Viewability rate measures whether an ad was at least 50% visible in the viewport for at least 1 second. Ads with >80% viewability command up to 3x higher programmatic bids than below-the-fold units.',
  },
  {
    category: 'AdMob',
    question: 'How does Google AdMob calculate mobile app ad revenue and ARPDAU?',
    answer: 'Google AdMob revenue is driven by Daily Active Users (DAU), impressions per user, and unit eCPMs. ARPDAU (Average Revenue Per Daily Active User) is calculated as: ARPDAU = Total Daily Ad Revenue / DAU. For casual and hybrid-casual mobile games, ARPDAU typically ranges from $0.04 to $0.25+ in Tier 1 countries.',
  },
  {
    category: 'AdMob',
    question: 'Which mobile ad formats yield the highest eCPM on Google AdMob?',
    answer: 'Rewarded Video Ads yield the highest eCPM ($18.00–$45.00+ in Tier 1), followed by Rewarded Interstitials ($15.00–$32.00), Interstitial Ads ($8.00–$22.00), App Open Ads ($7.00–$16.00), Native Advanced ($3.00–$8.00), and Adaptive Banners ($1.20–$3.50).',
  },
  {
    category: 'AdMob',
    question: 'How much extra revenue does real-time bidding AdMob Mediation add?',
    answer: 'Enabling AdMob Mediation with real-time bidding partners (such as AppLovin MAX, Unity Ads, Mintegral, and Meta Audience Network) forces multiple ad networks to compete concurrently for every ad slot, increasing blended app eCPMs by 20% to 35% compared to single-network waterfalls.',
  },
  {
    category: 'AdMob',
    question: 'Why do iOS apps generate higher eCPMs than Android apps in AdMob?',
    answer: 'iOS users generate 25% to 50% higher eCPMs than Android in Tier 1 countries due to higher average purchasing power, higher in-app purchase conversion rates, and stronger advertiser competition for high-LTV Apple App Store users.',
  },
  {
    category: 'Strategy',
    question: 'How does audience geography (Tier 1 vs Tier 2 vs Tier 3) affect ad revenue?',
    answer: 'Tier 1 countries (United States, United Kingdom, Canada, Australia, Germany, Switzerland) offer high purchasing power, commanding 4x to 10x higher CPMs than Tier 3 countries (India, Pakistan, Philippines, Nigeria, Brazil), where traffic volume is large but advertiser bids are lower.',
  },
  {
    category: 'Strategy',
    question: 'How does Q4 holiday seasonality impact website and app ad earnings?',
    answer: 'Advertisers spend a significant portion of their annual ad budgets during Q4 (October to December) for Black Friday, Cyber Monday, and Christmas, increasing CPMs by 30% to 55%. In January (Q1), advertising budgets reset, causing a temporary 20% to 30% drop before rebounding in spring.',
  },
  {
    category: 'Strategy',
    question: 'How much traffic do I need to make $1,000, $5,000, or $10,000 a month?',
    answer: 'To make $1,000/month with AdSense in a Finance/SaaS niche (RPM $25), you need ~40,000 monthly pageviews. In a general Lifestyle niche (RPM $6), you need ~166,000 pageviews. For a mobile game with $0.10 ARPDAU, you need ~10,000 Daily Active Users (DAU) to make $1,000/month.',
  },
  {
    category: 'Strategy',
    question: 'How can I improve my website AdSense RPM and overall ad income?',
    answer: 'Key strategies include: (1) Adding sticky bottom anchor ads and in-article native units; (2) Improving Core Web Vitals to increase page load speed and viewability; (3) Writing comprehensive, commercial-intent content in higher CPM sub-niches; and (4) Targeting Tier 1 organic search traffic.',
  },
  {
    category: 'Strategy',
    question: 'Can I use this ad revenue calculator for other ad networks (Ezoic, Mediavine, Raptive)?',
    answer: 'Yes! The baseline programmatic auction formulas and traffic metrics apply across all header bidding platforms. Mediavine and Raptive typically provide a 20%–40% premium over standard AdSense due to exclusive direct advertiser deals and high viewability thresholds.',
  },
  {
    category: 'AdSense',
    question: 'Is this ad revenue calculator completely free to use?',
    answer: 'Yes, this tool is 100% free with unlimited calculations, multi-currency conversion, exportable PDF/CSV reports, embeddable widgets, and multi-language support. No account registration or credit card is required.',
  },
  {
    category: 'Formulas',
    question: 'How accurate are the revenue estimates produced by this engine?',
    answer: 'Our models are calibrated against over 50,000 data points from verified 2025–2026 programmatic exchange benchmarks. While actual earnings will vary based on user engagement, domain authority, and seasonality, our forecasts provide an accurate ±8% planning baseline.',
  },
];

export const FAQS_DATA_ES: FAQItem[] = [
  {
    category: 'AdSense',
    question: '¿Qué es Google AdSense y cómo genera ingresos publicitarios?',
    answer: 'Google AdSense es una red publicitaria de Google que permite a dueños de sitios web monetizar su tráfico mostrando anuncios relevantes. Google comparte el 68% de los ingresos obtenidos con los editores.',
  },
  {
    category: 'AdSense',
    question: '¿Cómo calcula esta herramienta los ingresos estimados de AdSense?',
    answer: 'Nuestra calculadora utiliza datos de subastas reales para 26 nichos temáticos, niveles geográficos (Tier 1/2/3), visibilidad activa y formatos modernos para predecir el RPM de página.',
  },
  {
    category: 'Formulas',
    question: '¿Cuál es la fórmula para calcular los ingresos de una web y el RPM?',
    answer: 'Ingresos = (Páginas Vistas × RPM de Página) / 1.000. El RPM mide las ganancias totales por cada 1.000 visitas a páginas del sitio.',
  },
  {
    category: 'AdMob',
    question: '¿Cómo calcula Google AdMob los ingresos en aplicaciones móviles y el ARPDAU?',
    answer: 'En Google AdMob, los ingresos dependen de los usuarios activos diarios (DAU), impresiones por usuario y eCPMs. El ARPDAU = Ingresos Diarios Totales / DAU.',
  },
  {
    category: 'AdMob',
    question: '¿Qué formato publicitario genera el mayor eCPM en AdMob?',
    answer: 'Los vídeos bonificados (Rewarded Videos) ofrecen el eCPM más alto ($18–$45+ en países Tier 1), seguidos de los anuncios intersticiales y de apertura (App Open).',
  },
  {
    category: 'Strategy',
    question: '¿Cómo influyen los países de la audiencia (Tier 1 vs Tier 3) en los ingresos?',
    answer: 'Los países Tier 1 (EE.UU., Reino Unido, Alemania) tienen un poder adquisitivo mayor y generan pujas de 4x a 10x superiores a los mercados Tier 3.',
  },
  {
    category: 'Strategy',
    question: '¿Cuánto tráfico necesito para ganar $1.000 al mes?',
    answer: 'En un nicho de Finanzas o Software (RPM $25), necesitas unas 40.000 páginas vistas al mes. En un nicho general (RPM $6), unas 166.000 visitas.',
  },
];

export const FAQS_DATA_JA: FAQItem[] = [
  {
    category: 'AdSense',
    question: 'Google AdSenseとは何ですか？広告収入の仕組みを教えてください。',
    answer: 'Google AdSenseは、Webサイトやブログ運営者がコンテンツに関連する広告を自動掲載して収益を得るGoogleの公式サービスです。広告収益の68%が運営者に支払われます。',
  },
  {
    category: 'AdSense',
    question: 'このAdSense収益計算ツールはどのように収入を推計していますか？',
    answer: '26のジャンル別RPM、国別階層（Tier 1/2/3）、視認率、AdBlock率、およびアンカー広告フォーマットを組み合わせた確定論的計算エンジンにより試算します。',
  },
  {
    category: 'Formulas',
    question: 'Webサイト広告収入とページRPMの計算式は何ですか？',
    answer: '広告収入 = (月間総PV × ページRPM) ÷ 1,000 です。ページRPMは (総広告収益 ÷ 総PV) × 1,000 で算出されます。',
  },
  {
    category: 'AdMob',
    question: 'Google AdMobのアプリ広告収入とARPDAUはどのように計算されますか？',
    answer: 'AdMobの収益はDAU（1日あたりのアクティブユーザー数）、表示回数、eCPMによって決まります。ARPDAU = 1日の広告収益 ÷ DAU です。',
  },
  {
    category: 'AdMob',
    question: 'AdMobで最もeCPM（単価）が高い広告フォーマットは何ですか？',
    answer: 'リワード動画広告（Tier 1で$18〜$45以上）が最も高く、次いでインタースティシャル、アプリ起動広告（App Open）の順となります。',
  },
  {
    category: 'Strategy',
    question: '月10万円（約$1,000）を稼ぐにはどれくらいのアクセスが必要ですか？',
    answer: '高単価な金融・ITブログ（RPM $25）なら月間約4万PV、一般的な趣味・ライフスタイル（RPM $6）なら月間約16万〜20万PVが目安となります。',
  },
];

export const FAQS_DATA_FR: FAQItem[] = [
  {
    category: 'AdSense',
    question: "Qu'est-ce que Google AdSense et comment génère-t-il des revenus web ?",
    answer: "Google AdSense permet aux éditeurs de sites web et blogs de monétiser leur trafic en affichant des annonces ciblées. Google reverse 68% des revenus générés aux éditeurs.",
  },
  {
    category: 'AdSense',
    question: 'Comment ce calculateur estime-t-il les revenus de votre site ?',
    answer: "Notre moteur mathématique croise 26 thématiques de sites, les niveaux géographiques (Tier 1/2/3), le taux de visibilité et les formats modernes pour projeter le Page RPM.",
  },
  {
    category: 'Formulas',
    question: 'Quelle est la formule de calcul des revenus publicitaires et du Page RPM ?',
    answer: 'Revenus = (Pages Vues × Page RPM) / 1 000. Le Page RPM mesure le gain total généré pour 1 000 pages vues sur le site.',
  },
  {
    category: 'AdMob',
    question: "Comment calculer les revenus d'une application mobile avec AdMob et l'ARPDAU ?",
    answer: "Les revenus AdMob dépendent des utilisateurs actifs quotidiens (DAU) et de l'eCPM. L'ARPDAU = Revenus Quotidiens / DAU.",
  },
  {
    category: 'AdMob',
    question: "Quel format publicitaire offre le meilleur eCPM sur mobile ?",
    answer: "Les vidéos avec récompense (Rewarded Videos) offrent l'eCPM le plus élevé (18 $ à 45 $+ en Tier 1), suivies des interstitiels.",
  },
  {
    category: 'Strategy',
    question: 'Combien de trafic est nécessaire pour gagner 1 000 $ par mois ?',
    answer: "Dans une thématique Finance/SaaS (RPM 25 $), il faut environ 40 000 pages vues par mois. Dans une thématique généraliste (RPM 6 $), environ 166 000 pages vues.",
  },
];

export const FAQS_DATA_DE: FAQItem[] = [
  {
    category: 'AdSense',
    question: 'Was ist Google AdSense und wie entstehen Werbeeinnahmen?',
    answer: 'Google AdSense ermöglicht Webseitenbetreibern, Anzeigen auf ihren Seiten zu platzieren. Google zahlt 68% der generierten Werbeeinnahmen an die Publisher aus.',
  },
  {
    category: 'AdSense',
    question: 'Wie berechnet dieser Einnahmen-Rechner den geschätzten Ertrag?',
    answer: 'Unser Rechner basiert auf realen Auktionsdaten für 26 Branchen, Länder-Tiers (Tier 1/2/3), Sichtbarkeitsraten und modernen Werbeformaten wie mobilen Anker-Bannern.',
  },
  {
    category: 'Formulas',
    question: 'Wie lautet die mathematische Formel für Webseiten-Einnahmen und RPM?',
    answer: 'Einnahmen = (Seitenaufrufe × Seiten-RPM) / 1.000. Der Seiten-RPM misst den gesamten Werbeertrag pro 1.000 Seitenaufrufe.',
  },
  {
    category: 'AdMob',
    question: 'Wie berechnet AdMob die App-Werbeeinnahmen und den ARPDAU?',
    answer: 'Die App-Einnahmen hängen von den täglich aktiven Nutzern (DAU) und dem eCPM ab. ARPDAU = Gesamter Tagesumsatz / DAU.',
  },
  {
    category: 'AdMob',
    question: 'Welches Anzeigenformat erzielt den höchsten eCPM bei AdMob?',
    answer: 'Rewarded Video Ads erzielen den höchsten eCPM ($18–$45+ in Tier 1), gefolgt von Interstitial Ads und App Open Ads.',
  },
  {
    category: 'Strategy',
    question: 'Wie viel Traffic benötigt man für 1.000 $ monatlich?',
    answer: 'In einer lukrativen Nische wie Finanzen (RPM $25) reichen ca. 40.000 Seitenaufrufe/Monat. In allgemeinen Themenbereichen (RPM $6) werden ca. 166.000 Aufrufe benötigt.',
  },
];

export const FAQS_DATA_PT: FAQItem[] = [
  {
    category: 'AdSense',
    question: 'O que é o Google AdSense e como ele gera receita para sites?',
    answer: 'O Google AdSense permite a donos de sites exibirem anúncios direcionados. O Google repassa 68% da receita aos publicadores.',
  },
  {
    category: 'AdSense',
    question: 'Como esta calculadora estima os ganhos do AdSense?',
    answer: 'Nossa calculadora combina dados de leilões para 26 nichos, níveis geográficos de tráfego (Tier 1/2/3), taxas de visibilidade e formatos móveis.',
  },
  {
    category: 'Formulas',
    question: 'Qual é a fórmula para calcular a receita de um site e o RPM?',
    answer: 'Receita = (Visualizações de Página × RPM da Página) / 1.000. O RPM mede os ganhos totais para cada mil páginas visualizadas.',
  },
  {
    category: 'AdMob',
    question: 'Como o AdMob calcula o faturamento de aplicativos móveis e o ARPDAU?',
    answer: 'A receita do AdMob é baseada nos usuários ativos diários (DAU) e no eCPM. ARPDAU = Receita Diária / DAU.',
  },
  {
    category: 'AdMob',
    question: 'Qual formato de anúncio gera o maior eCPM no AdMob?',
    answer: 'Vídeos premiados (Rewarded Videos) geram o maior eCPM ($18–$45+ em países Tier 1), seguidos de anúncios intersticiais.',
  },
  {
    category: 'Strategy',
    question: 'Quanto tráfego é necessário para faturar $1.000 por mês?',
    answer: 'Em um nicho de Finanças ou Tecnologia (RPM $25), são necessárias cerca de 40.000 visualizações mensais.',
  },
];

export const FAQS_DATA_KO: FAQItem[] = [
  {
    category: 'AdSense',
    question: '구글 애드센스란 무엇이며 어떻게 수익을 창출하나요?',
    answer: '구글 애드센스는 웹사이트 및 블로그에 관련 광고를 게재하여 수익을 창출할 수 있는 구글의 공식 광고 플랫폼입니다. 구글은 광고 수익의 68%를 게시자에게 지급합니다.',
  },
  {
    category: 'AdSense',
    question: '이 계산기는 웹사이트 수익을 어떻게 추정하나요?',
    answer: '26개 웹 카테고리별 RPM, 국가별 티어(Tier 1/2/3), 광고 가시성, 앵커 배너 등의 데이터를 종합하여 실제에 가까운 예상 수익을 계산합니다.',
  },
  {
    category: 'Formulas',
    question: '웹사이트 광고 수익과 페이지 RPM의 계산 공식은 무엇인가요?',
    answer: '예상 수익 = (총 페이지뷰 × 페이지 RPM) ÷ 1,000 입니다. 페이지 RPM은 1,000회 페이지뷰당 발생하는 평균 수익입니다.',
  },
  {
    category: 'AdMob',
    question: '애드몹 앱 광고 수익과 ARPDAU는 어떻게 산출되나요?',
    answer: '애드몹 수익은 DAU(일일 활성 사용자 수), 노출수, eCPM에 따라 결정됩니다. ARPDAU = 일일 총 광고 수익 ÷ DAU 입니다.',
  },
  {
    category: 'AdMob',
    question: '애드몹에서 가장 단가(eCPM)가 높은 광고 형식은 무엇인가요?',
    answer: '보상형 동영상 광고(Tier 1 기준 $18~$45 이상)가 가장 높으며, 전면 광고와 앱 오프닝 광고가 그 뒤를 잇습니다.',
  },
  {
    category: 'Strategy',
    question: '월 $1,000(약 130만원)의 수익을 내려면 트래픽이 얼마나 필요한가요?',
    answer: '금융/테크 분야(RPM $25)의 경우 월 4만 PV, 일반 라이프스타일(RPM $6) 분야는 월 16만~20만 PV가 필요합니다.',
  },
];

export const FAQS_DATA_IT: FAQItem[] = [
  {
    category: 'AdSense',
    question: "Cos'è Google AdSense e come genera guadagni per i siti web?",
    answer: "Google AdSense consente ai proprietari di siti e blog di monetizzare il traffico visualizzando annunci mirati. Google riconosce il 68% delle entrate agli editori.",
  },
  {
    category: 'AdSense',
    question: 'Come calcola i guadagni stimati questo strumento?',
    answer: "Il nostro motore matematico incrocia 26 nicchie di siti, livelli geografici (Tier 1/2/3), visibilità attiva e formati pubblicitari moderni.",
  },
  {
    category: 'Formulas',
    question: 'Qual è la formula per calcolare le entrate di un sito e il Page RPM?',
    answer: 'Entrate = (Visualizzazioni di Pagina × Page RPM) / 1.000. Il Page RPM misura il guadagno totale per ogni 1.000 visualizzazioni.',
  },
  {
    category: 'AdMob',
    question: "Come calcola AdMob le entrate per app mobile e l'ARPDAU?",
    answer: "Le entrate AdMob dipendono dagli utenti attivi giornalieri (DAU) e dall'eCPM. ARPDAU = Entrate Giornaliere / DAU.",
  },
  {
    category: 'AdMob',
    question: "Quale formato pubblicitario garantisce l'eCPM più alto su mobile?",
    answer: "I video con ricompensa (Rewarded Videos) offrono l'eCPM più elevato ($18–$45+ in Tier 1), seguiti da interstitial e annunci all'apertura.",
  },
  {
    category: 'Strategy',
    question: 'Quanto traffico serve per guadagnare 1.000 $ al mese?',
    answer: 'In una nicchia come Finanza o Software (RPM 25 $), servono circa 40.000 visualizzazioni al mese. In nicchie generiche (RPM 6 $), circa 166.000 visualizzazioni.',
  },
];

export const getFaqsForLanguage = (lang: SupportedLanguage): FAQItem[] => {
  if (lang === 'es') return FAQS_DATA_ES;
  if (lang === 'ja') return FAQS_DATA_JA;
  if (lang === 'fr') return FAQS_DATA_FR;
  if (lang === 'de') return FAQS_DATA_DE;
  if (lang === 'pt') return FAQS_DATA_PT;
  if (lang === 'ko') return FAQS_DATA_KO;
  if (lang === 'it') return FAQS_DATA_IT;
  return FAQS_DATA_EN;
};

export const FAQS_DATA = FAQS_DATA_EN;
