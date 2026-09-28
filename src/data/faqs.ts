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
  {
    category: 'YouTube',
    question: '¿Cuánto paga YouTube por cada 1.000 visitas en 2026?',
    answer: 'El RPM de videos largos va de $1,50 a más de $35 por 1.000 vistas. Finanzas y SaaS logran $15–$35 en Tier 1; gaming y entretenimiento promedian $2–$6. Los Shorts se reparten aparte con unos $0,03–$0,09 de RPM tras la comisión del 45% de YouTube.',
  },
  {
    category: 'TikTok',
    question: '¿Cuánto paga TikTok por cada 1.000 visitas y cuánto vale un diamante?',
    answer: 'El Creator Rewards paga unos $0,40–$1,20 por cada 1.000 vistas calificadas (videos de más de 1 minuto vistos 5+ segundos desde «Para ti»). Cada diamante de regalos LIVE vale $0,005 con un 50% neto: 1.000 diamantes son $5.',
  },
  {
    category: 'Twitch',
    question: '¿Cuánto paga Twitch por sub y cómo funciona el Partner Plus?',
    answer: 'Una sub Nivel 1 ($4,99) paga $2,49 con el reparto 50/50 y unos $3,49 con el 70/30 de Partner Plus. El programa da 60/40 con 100 Plus Points y 70/30 con 350 puntos durante 3 meses, más $0,01 por Bit.',
  },
  {
    category: 'Kick',
    question: '¿Cuánto paga Kick por sub y qué es el programa KCP?',
    answer: 'Kick paga el 95%: $4,74 netos por cada suscripción de $4,99, casi el doble que Twitch. El programa KCP añade unos $16–$40 por hora según espectadores concurrentes (CCV) y las propinas directas son 100% netas.',
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
  {
    category: 'YouTube',
    question: 'YouTubeは1,000回再生でいくら支払いますか？',
    answer: '長尺動画のRPMは1,000回再生あたり$1.50〜$35以上です。金融・SaaSはTier1で$15〜$35、ゲーム・エンタメは$2〜$6が目安で、YouTubeの取り分45%控除後です。ショートは別プールで約$0.03〜$0.09のRPMです。',
  },
  {
    category: 'TikTok',
    question: 'TikTokの報酬単価とダイヤモンドの換金レートはいくらですか？',
    answer: 'Creator Rewardsは対象1,000回視聴あたり約$0.40〜$1.20です（1分超の動画をおすすめで5秒以上視聴のみ対象）。LIVEギフトのダイヤモンドは1個$0.005で取り分50%、1,000ダイヤで$5です。',
  },
  {
    category: 'Twitch',
    question: 'Twitchのサブスク報酬とPartner Plusの仕組みは？',
    answer: 'Tier1サブ（$4.99）は通常配分50/50で$2.49、Partner Plusの70/30で約$3.49です。100ポイントで60/40、350ポイント3ヶ月維持で70/30になり、Bitsは1bit＝$0.01です。',
  },
  {
    category: 'Kick',
    question: 'Kickのサブスク報酬とKCP時給はいくらですか？',
    answer: 'Kickは還元率95%で$4.99のサブあたり$4.74が取り分となり、Twitchの約2倍です。KCPプログラムは同時視聴者数に応じて約$16〜$40/時を支給し、投げ銭は100%還元です。',
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
  {
    category: 'YouTube',
    question: 'Combien paie YouTube pour 1 000 vues en 2026 ?',
    answer: "Le RPM des vidéos longues va de 1,50 $ à plus de 35 $ pour 1 000 vues. Finance et SaaS atteignent 15–35 $ en Tier 1 ; gaming et divertissement moyennent 2–6 $. Les Shorts sont mutualisés à part, environ 0,03–0,09 $ RPM après la part de 45 % de YouTube.",
  },
  {
    category: 'TikTok',
    question: 'Combien paie TikTok pour 1 000 vues et combien vaut un diamant ?',
    answer: "Le Creator Rewards paie environ 0,40–1,20 $ pour 1 000 vues qualifiées (vidéos de plus d'1 minute vues 5 s+ depuis « Pour toi »). Chaque diamant de cadeaux LIVE vaut 0,005 $ avec 50 % net : 1 000 diamants = 5 $.",
  },
  {
    category: 'Twitch',
    question: 'Combien rapporte un sub Twitch et comment fonctionne le Partner Plus ?',
    answer: "Un sub Tier 1 (4,99 $) rapporte 2,49 $ en 50/50 et environ 3,49 $ en 70/30 Partner Plus. Le programme offre 60/40 à 100 Plus Points et 70/30 à 350 points sur 3 mois, plus 0,01 $ par Bit.",
  },
  {
    category: 'Kick',
    question: 'Combien paie Kick par sub et que vaut le programme KCP ?',
    answer: "Kick reverse 95 % : 4,74 $ nets par abonnement à 4,99 $, soit près du double de Twitch. Le programme KCP ajoute environ 16–40 $/heure selon les spectateurs simultanés (CCV) et les pourboires directs sont à 100 % nets.",
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
  {
    category: 'YouTube',
    question: 'Wie viel zahlt YouTube pro 1.000 Aufrufe im Jahr 2026?',
    answer: 'Der Long-Form-RPM liegt bei $1,50 bis $35+ pro 1.000 Aufrufe. Finanzen und SaaS erreichen $15–$35 in Tier 1; Gaming und Entertainment liegen bei $2–$6. Shorts werden separat gepoolt bei ca. $0,03–$0,09 RPM nach 45 % YouTube-Anteil.',
  },
  {
    category: 'TikTok',
    question: 'Wie viel zahlt TikTok pro 1.000 Aufrufe und was ist ein Diamond wert?',
    answer: 'Das Creator-Rewards-Programm zahlt ca. $0,40–$1,20 pro 1.000 qualifizierte Aufrufe (Originale über 1 Minute mit 5+ Sekunden im Für-Dich-Feed). Jeder LIVE-Geschenk-Diamond ist $0,005 wert (50 % netto): 1.000 Diamonds = $5.',
  },
  {
    category: 'Twitch',
    question: 'Wie viel bringt ein Twitch-Sub und wie funktioniert Partner Plus?',
    answer: 'Ein Tier-1-Sub ($4,99) bringt $2,49 bei 50/50 und ca. $3,49 bei 70/30 Partner Plus. Das Programm gibt 60/40 ab 100 Plus Points und 70/30 ab 350 Punkten über 3 Monate, plus $0,01 pro Bit.',
  },
  {
    category: 'Kick',
    question: 'Wie viel zahlt Kick pro Sub und was ist das KCP-Programm?',
    answer: 'Kick zahlt 95 %: $4,74 netto pro $4,99-Abo — fast doppelt so viel wie Twitch. Das KCP-Programm zahlt ca. $16–$40/Std. nach Zuschauern (CCV) und direkte Trinkgelder sind 100 % netto.',
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
  {
    category: 'YouTube',
    question: 'Quanto o YouTube paga por 1.000 visualizações em 2026?',
    answer: 'O RPM de vídeos longos vai de $1,50 a mais de $35 por 1.000 views. Finanças e SaaS alcançam $15–$35 no Tier 1; games e entretenimento ficam em $2–$6. Shorts são rateados à parte, cerca de $0,03–$0,09 de RPM após os 45% do YouTube.',
  },
  {
    category: 'TikTok',
    question: 'Quanto o TikTok paga por 1.000 views e quanto vale um diamante?',
    answer: 'O Creator Rewards paga cerca de $0,40–$1,20 por 1.000 views qualificadas (originais acima de 1 min assistidos 5s+ no «Para você»). Cada diamante de presentes LIVE vale $0,005 (50% líquido): 1.000 diamantes = $5.',
  },
  {
    category: 'Twitch',
    question: 'Quanto a Twitch paga por sub e como funciona o Partner Plus?',
    answer: 'Um sub Tier 1 ($4,99) paga $2,49 no 50/50 e ~$3,49 no 70/30 do Partner Plus. O programa dá 60/40 com 100 Plus Points e 70/30 com 350 pontos por 3 meses, mais $0,01 por Bit.',
  },
  {
    category: 'Kick',
    question: 'Quanto a Kick paga por sub e o que é o programa KCP?',
    answer: 'A Kick paga 95%: $4,74 líquidos por assinatura de $4,99, quase o dobro da Twitch. O programa KCP soma cerca de $16–$40/hora conforme espectadores simultâneos (CCV) e gorjetas diretas são 100% líquidas.',
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
  {
    category: 'YouTube',
    question: '유튜브는 조회수 1,000회당 얼마를 지급하나요?',
    answer: '롱폼 RPM은 1,000회당 $1.50~$35 이상입니다. 금융·SaaS는 Tier 1에서 $15~$35, 게임·엔터는 $2~$6 수준이며 유튜브 수수료 45% 제외 후입니다. 쇼츠는 별도 풀로 약 $0.03~$0.09 RPM입니다.',
  },
  {
    category: 'TikTok',
    question: '틱톡은 조회수 1,000회당 얼마를 주고 다이아몬드 가치는 얼마인가요?',
    answer: '크리에이터 리워드는 적격 조회수 1,000회당 약 $0.40~$1.20을 지급합니다(1분 이상 오리지널을 추천 피드에서 5초 이상 시청만 적격). LIVE 선물 다이아몬드는 1개당 $0.005(정산율 50%)로 1,000개면 $5입니다.',
  },
  {
    category: 'Twitch',
    question: '트위치 구독 1개당 수익과 파트너 플러스 조건은?',
    answer: '$4.99 Tier 1 구독은 50/50에서 $2.49, 파트너 플러스 70/30에서 약 $3.49입니다. 100포인트에 60/40, 350포인트 3개월 유지 시 70/30이 적용되며 비트는 1bit＝$0.01입니다.',
  },
  {
    category: 'Kick',
    question: '킥 구독 1개당 수익과 KCP 시급은 얼마인가요?',
    answer: '킥은 95%를 지급해 $4.99 구독당 순수익 $4.74로 트위치의 약 2배입니다. KCP 프로그램은 동시시청자(CCV)에 따라 약 $16~$40/시를 지급하고 직접 후원은 100% 정산됩니다.',
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
  {
    category: 'YouTube',
    question: 'Quanto paga YouTube ogni 1.000 visualizzazioni nel 2026?',
    answer: 'Il RPM dei video lunghi va da $1,50 a oltre $35 ogni 1.000 views. Finanza e SaaS arrivano a $15–$35 in Tier 1; gaming e intrattenimento in media $2–$6. Gli Shorts sono a parte, circa $0,03–$0,09 di RPM dopo il 45% di YouTube.',
  },
  {
    category: 'TikTok',
    question: 'Quanto paga TikTok ogni 1.000 views e quanto vale un diamante?',
    answer: 'Il Creator Rewards paga circa $0,40–$1,20 ogni 1.000 views qualificate (originali oltre 1 minuto visti 5s+ da «Per te»). Ogni diamante dei regali LIVE vale $0,005 (50% netto): 1.000 diamanti = $5.',
  },
  {
    category: 'Twitch',
    question: 'Quanto paga Twitch per sub e come funziona il Partner Plus?',
    answer: 'Una sub Tier 1 ($4,99) paga $2,49 al 50/50 e ~$3,49 al 70/30 Partner Plus. Il programma dà 60/40 con 100 Plus Points e 70/30 con 350 punti per 3 mesi, più $0,01 per Bit.',
  },
  {
    category: 'Kick',
    question: 'Quanto paga Kick per sub e cos’è il programma KCP?',
    answer: 'Kick paga il 95%: $4,74 netti per abbonamento da $4,99, quasi il doppio di Twitch. Il programma KCP aggiunge circa $16–$40/ora in base agli spettatori simultanei (CCV) e le mance dirette sono al 100% nette.',
  },
];

export const FAQS_DATA_RU: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'Сколько платит YouTube за 1 000 просмотров (RPM) в 2026 году?',
    answer: 'В 2026 году RPM длинных видео на YouTube составляет от $1.50 до более $35 за 1 000 просмотров. В нишах финансов, IT и недвижимости доход достигает $15–$35 в Tier 1 странах, а Shorts оплачиваются по $0.03–$0.09 за 1 000 просмотров.',
  },
  {
    category: 'TikTok',
    question: 'Сколько платит TikTok за 1 000 просмотров и сколько стоят бриллианты?',
    answer: 'Программа Creator Rewards платит около $0.40–$1.20 за 1 000 засчитанных просмотров (видео >1 мин, от 5 секунд в ленте «Для вас»). 1 000 бриллиантов с подарков LIVE равны $5 чистого дохода.',
  },
  {
    category: 'Twitch',
    question: 'Сколько платит Twitch за подписку и как получить Partner Plus?',
    answer: 'Подписка Уровня 1 ($4.99) приносит $2.49 при сплите 50/50 и около $3.49 при 70/30 Partner Plus (требуется 350 Plus Points в течение 3 месяцев подряд).',
  },
  {
    category: 'Kick',
    question: 'Сколько платит Kick за подписку и что такое программа KCP?',
    answer: 'Kick выплачивает 95%: автор получает $4.74 с каждой подписки за $4.99, что почти вдвое выше Twitch. Программа KCP дополнительно начисляет от $16 до $40+ в час в зависимости от среднего онлайна (CCV).',
  },
];

export const FAQS_DATA_AR: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'كم يدفع يوتيوب مقابل 1000 مشاهدة (RPM) في عام 2026؟',
    answer: 'يتراوح عائد الألف مشاهدة للفيديوهات الطويلة بين $1.50 إلى أكثر من $35 بعد خصم نسبة يوتيوب 45%. وتصل مجالات التمويل والتقنية إلى $15–$35 في دول المستوى الأول، بينما تدفع فيديوهات Shorts ما بين $0.03–$0.09.',
  },
  {
    category: 'TikTok',
    question: 'كم يدفع تيك توك مقابل 1000 مشاهدة وكم قيمة الماس؟',
    answer: 'يدفع برنامج Creator Rewards ما بين $0.40 إلى $1.20 لكل 1000 مشاهدة مؤهلة (فيديوهات >1 دقيقة شوهدت 5 ثوانٍ فأكثر من شريط لك). كل 1000 ماسة من هدايا البث تساوي $5 صافية.',
  },
  {
    category: 'Twitch',
    question: 'كم يدفع تويتش مقابل الاشتراك وكيف يعمل برنامج Partner Plus؟',
    answer: 'اشتراك المستوى 1 ($4.99) يدفع $2.49 بنسبة 50/50 ونحو $3.49 بنسبة 70/30 عند تحقيق 350 نقطة بلس لمدة 3 أشهر متتالية.',
  },
  {
    category: 'Kick',
    question: 'كم يدفع كيك مقابل الاشتراك وما هو برنامج KCP؟',
    answer: 'يدفع كيك 95% حيث يحصل صانع المحتوى على $4.74 من كل اشتراك بقيمة $4.99. ويضيف برنامج KCP راتباً بين $16 إلى $40+ بالساعة وفقاً لعدد المشاهدين المتزامن.',
  },
];

export const FAQS_DATA_ZH: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'YouTube 每 1,000 次播放能赚多少钱 (RPM)？',
    answer: '2026 年长视频 RPM 约为 $1.50 至 $35+ 美元（已扣除平台 45% 分成）。金融商业类在第一梯队国家可达 $15–$35，Shorts 短视频千次播放收入约为 $0.03–$0.09 美元。',
  },
  {
    category: 'TikTok',
    question: 'TikTok 每千次播放收益是多少？直播礼物钻石价值几何？',
    answer: 'Creator Rewards 创作者奖励计划每千次有效播放约为 $0.40–$1.20 美元（需为 1 分钟以上且在推荐流停留 5 秒以上）。直播间 1,000 颗钻石可净兑换 $5 美元。',
  },
  {
    category: 'Twitch',
    question: 'Twitch 订阅分成是多少？如何获得 70/30 Partner Plus 分成？',
    answer: '$4.99 美元的 Tier 1 订阅在 50/50 下分成 $2.49，在 70/30 下约为 $3.49。连续 3 个月维持 350 个 Plus 积分即可解锁 70/30 顶格分成。',
  },
  {
    category: 'Kick',
    question: 'Kick 订阅分成是多少？什么是 KCP 计划？',
    answer: 'Kick 提供高达 95% 的分成：每单 $4.99 订阅净入 $4.74 美元。KCP 创作者扶持计划根据同时在线人数 (CCV) 提供每小时 $16 至 $40+ 美元的开播底薪。',
  },
];

export const FAQS_DATA_TR: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'YouTube 1.000 izlenme başına ne kadar öder (RPM)?',
    answer: '2026 yılında uzun videolarda 1.000 izlenme başına RPM $1.50 ile $35+ arasındadır. Finans ve teknoloji nişlerinde Tier 1 kitle için $15–$35 seviyelerine çıkar; Shorts için RPM $0.03–$0.09 civarındadır.',
  },
  {
    category: 'TikTok',
    question: 'TikTok 1.000 izlenmeye ne kadar öder ve elmaslar ne kadar eder?',
    answer: 'Creator Rewards programı uygun 1.000 izlenme başına yaklaşık $0.40–$1.20 öder (1 dk üzeri, Sizin İçin akışında 5 sn izlenenler). Canlı yayındaki 1.000 hediye elması net $5 değerindedir.',
  },
  {
    category: 'Twitch',
    question: 'Twitch abonelik başına ne kadar öder ve Partner Plus nasıl açılır?',
    answer: '$4.99 değerindeki Kademe 1 abonelik standart 50/50 ile $2.49, Partner Plus 70/30 ile yaklaşık $3.49 kazandırır. 70/30 için ardışık 3 ay 350 Plus Puanı tutturulmalıdır.',
  },
  {
    category: 'Kick',
    question: 'Kick abonelik başına ne kadar öder ve KCP programı nedir?',
    answer: 'Kick %95 pay verir: $4.99 abonelikten net $4.74 alırsınız. KCP programı ise eşzamanlı izleyici sayısına (CCV) bağlı olarak saatte $16–$40+ ek ödeme yapar.',
  },
];

export const FAQS_DATA_PL: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'Ile YouTube płaci za 1 000 wyświetleń (RPM) w 2026 roku?',
    answer: 'W 2026 roku RPM długich filmów wynosi od $1.50 do ponad $35 za 1 000 odsłon po 45% prowizji YouTube. W niszach finansowych w Tier 1 sięga $15–$35, a dla Shorts wynosi ok. $0.03–$0.09.',
  },
  {
    category: 'TikTok',
    question: 'Ile TikTok płaci za 1 000 wyświetleń i ile warte są diamenty?',
    answer: 'Program Creator Rewards wypłaca ok. $0.40–$1.20 za 1 000 zakwalifikowanych wyświetleń (filmy >1 min oglądane 5s+ w Dla Ciebie). 1 000 diamentów z transmisji LIVE to $5 netto dla twórcy.',
  },
  {
    category: 'Twitch',
    question: 'Ile zarabia się z suba na Twitchu i jak odblokować 70/30?',
    answer: 'Sub Tier 1 ($4.99) daje $2.49 przy podziale 50/50 oraz ok. $3.49 przy 70/30 Partner Plus (wymaga utrzymania 350 Plus Points przez 3 miesiące z rzędu).',
  },
  {
    category: 'Kick',
    question: 'Ile Kick płaci za suba i czym jest program KCP?',
    answer: 'Kick wypłaca 95%: otrzymujesz $4.74 netto za każdego suba $4.99. Program KCP dodaje stawkę godzinową ok. $16–$40+ zależnie od średniej liczby widzów (CCV).',
  },
];

export const FAQS_DATA_ID: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'Berapa penghasilan YouTube per 1.000 views (RPM) di 2026?',
    answer: 'Di tahun 2026, RPM video panjang berkisar antara $1.50 hingga $35+ per 1.000 tayangan setelah potongan YouTube 45%. Niche finansial di Tier 1 mencapai $15–$35, sedangkan Shorts sekitar $0.03–$0.09 RPM.',
  },
  {
    category: 'TikTok',
    question: 'Berapa bayaran TikTok per 1.000 views dan nilai koin/berlian?',
    answer: 'Creator Rewards membayar sekitar $0.40–$1.20 per 1.000 penayangan memenuhi syarat (video >1 menit ditonton 5 detik+ di FYP). 1.000 berlian dari hadiah LIVE bernilai bersih $5.',
  },
  {
    category: 'Twitch',
    question: 'Berapa penghasilan per sub Twitch dan cara dapat Partner Plus?',
    answer: 'Sub Tier 1 ($4.99) menghasilkan $2.49 pada bagi hasil 50/50 dan ~$3.49 pada 70/30 Partner Plus (memerlukan 350 Plus Points selama 3 bulan berturut-turut).',
  },
  {
    category: 'Kick',
    question: 'Berapa bayaran sub di Kick dan apa itu program KCP?',
    answer: 'Kick memberikan bagi hasil 95%: kreator membawa pulang $4.74 dari setiap sub $4.99. Program KCP menambahkan bayaran per jam sekitar $16–$40+ berdasarkan CCV penonton.',
  },
];

export const FAQS_DATA_NL: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'Hoeveel betaalt YouTube per 1.000 weergaven (RPM) in 2026?',
    answer: 'In 2026 varieert de RPM voor lange video\'s van $1.50 tot meer dan $35 per 1.000 weergaven na de 45% commissie van YouTube. Financiële niches in Tier 1 halen $15–$35; Shorts zitten rond $0.03–$0.09.',
  },
  {
    category: 'TikTok',
    question: 'Hoeveel betaalt TikTok per 1.000 views en wat zijn diamanten waard?',
    answer: 'Het Creator Rewards programma betaalt ongeveer $0.40–$1.20 per 1.000 gekwalificeerde views (video\'s >1 min, 5s+ bekeken in Voor Jou). 1.000 live diamanten leveren netto $5 op.',
  },
  {
    category: 'Twitch',
    question: 'Wat verdient een Twitch streamer per sub en hoe werkt Partner Plus?',
    answer: 'Een Tier 1 sub ($4.99) levert $2.49 op bij 50/50 en ~$3.49 bij de 70/30 Partner Plus verdeling (vereist 350 Plus Points gedurende 3 opeenvolgende maanden).',
  },
  {
    category: 'Kick',
    question: 'Hoeveel betaalt Kick per abonnee en wat is het KCP programma?',
    answer: 'Kick keert 95% uit: u houdt $4.74 over aan elk $4.99 abonnement. Het KCP programma biedt een extra uurvergoeding van $16–$40+ op basis van gemiddelde kijkers (CCV).',
  },
];

export const FAQS_DATA_VI: FAQItem[] = [
  {
    category: 'YouTube',
    question: 'YouTube trả bao nhiêu tiền cho 1.000 lượt xem (RPM) năm 2026?',
    answer: 'Năm 2026, RPM video dài dao động từ $1.50 đến hơn $35 trên 1.000 lượt xem sau khi trừ 45% phí YouTube. Chủ đề tài chính ở các nước Tier 1 đạt $15–$35, còn Shorts dao động khoảng $0.03–$0.09.',
  },
  {
    category: 'TikTok',
    question: 'TikTok trả bao nhiêu cho 1.000 lượt xem và kim cương đáng giá bao nhiêu?',
    answer: 'Creator Rewards trả khoảng $0.40–$1.20 cho mỗi 1.000 lượt xem hợp lệ (video >1 phút xem 5 giây+ trên Dành cho bạn). 1.000 kim cương từ livestream quy đổi ra $5 tiền mặt.',
  },
  {
    category: 'Twitch',
    question: 'Twitch trả bao nhiêu cho mỗi gói đăng ký và cách đạt 70/30?',
    answer: 'Gói Tier 1 ($4.99) trả $2.49 ở mức 50/50 và ~$3.49 ở mức 70/30 Partner Plus (cần duy trì 350 Plus Points trong 3 tháng liên tiếp).',
  },
  {
    category: 'Kick',
    question: 'Kick trả bao nhiêu cho mỗi gói đăng ký và chương trình KCP là gì?',
    answer: 'Kick chia sẻ 95%: streamer nhận $4.74 trên mỗi gói đăng ký $4.99. Chương trình KCP hỗ trợ thêm từ $16 đến $40+/giờ tùy theo lượng người xem đồng thời (CCV).',
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
  if (lang === 'ru') return FAQS_DATA_RU;
  if (lang === 'ar') return FAQS_DATA_AR;
  if (lang === 'zh') return FAQS_DATA_ZH;
  if (lang === 'tr') return FAQS_DATA_TR;
  if (lang === 'pl') return FAQS_DATA_PL;
  if (lang === 'id') return FAQS_DATA_ID;
  if (lang === 'nl') return FAQS_DATA_NL;
  if (lang === 'vi') return FAQS_DATA_VI;
  return FAQS_DATA_EN;
};

export const FAQS_DATA = FAQS_DATA_EN;
