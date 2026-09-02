// Comprehensive datasets, niche CPM benchmarks, subscription tiers, and monetization models for 2026

export interface PlatformNiche {
  id: string;
  name: string;
  baseRpm: number; // in USD per 1000 views
  typicalCpm: number;
  description: string;
}

export const YOUTUBE_NICHES: PlatformNiche[] = [
  { id: 'finance-investing', name: '💰 Finance, Investing & Crypto', baseRpm: 18.5, typicalCpm: 32.0, description: 'High advertiser competition for banking, brokerage, and SaaS leads.' },
  { id: 'tech-ai-software', name: '🤖 Tech, AI & Software Development', baseRpm: 12.0, typicalCpm: 22.0, description: 'High B2B advertiser demand for cloud, hardware, and developer tools.' },
  { id: 'business-marketing', name: '📈 Business, Marketing & E-Commerce', baseRpm: 14.0, typicalCpm: 25.0, description: 'Agencies, entrepreneurs, and CRM software sponsors.' },
  { id: 'real-estate', name: '🏠 Real Estate & Property Investing', baseRpm: 15.0, typicalCpm: 28.0, description: 'Mortgage lenders, luxury real estate, and escrow advertisers.' },
  { id: 'health-fitness', name: '🏋️ Health, Fitness & Nutrition', baseRpm: 6.5, typicalCpm: 12.0, description: 'Supplements, gym equipment, and wellness subscriptions.' },
  { id: 'cars-automotive', name: '🚗 Cars & Automotive', baseRpm: 8.5, typicalCpm: 16.0, description: 'Car manufacturers, insurance, and aftermarket parts.' },
  { id: 'education-tutorials', name: '🎓 Education, Science & How-To', baseRpm: 7.0, typicalCpm: 13.0, description: 'Online courses, learning platforms, and certifications.' },
  { id: 'beauty-lifestyle', name: '💄 Beauty, Fashion & Lifestyle', baseRpm: 5.5, typicalCpm: 10.5, description: 'Cosmetics, apparel brands, and direct-to-consumer sponsors.' },
  { id: 'food-cooking', name: '🍳 Food, Cooking & Recipes', baseRpm: 4.8, typicalCpm: 9.0, description: 'Kitchen appliances, meal kits, and grocery retail.' },
  { id: 'travel-vlogs', name: '✈️ Travel & Adventure', baseRpm: 5.0, typicalCpm: 9.5, description: 'Airlines, hotel booking engines, and travel insurance.' },
  { id: 'gaming-esports', name: '🎮 Gaming & Esports', baseRpm: 3.2, typicalCpm: 6.0, description: 'High view volume with gaming hardware and mobile game ads.' },
  { id: 'entertainment-comedy', name: '🎭 Entertainment, Comedy & Commentary', baseRpm: 2.8, typicalCpm: 5.2, description: 'Mass appeal with broad FMCG and movie studio advertising.' },
  { id: 'music-dance', name: '🎵 Music & Dance', baseRpm: 1.8, typicalCpm: 3.5, description: 'High repeat views, lower direct ad click-through rate.' },
  { id: 'kids-animation', name: '🧸 Kids & Animation (COPPA)', baseRpm: 2.2, typicalCpm: 4.0, description: 'Non-personalized ads only under COPPA regulations.' },
  { id: 'news-politics', name: '📰 News & Current Affairs', baseRpm: 4.0, typicalCpm: 7.5, description: 'High engagement during election cycles and breaking news.' },
];

export const TIKTOK_NICHES: PlatformNiche[] = [
  { id: 'finance-business', name: '💰 Finance & Business', baseRpm: 1.10, typicalCpm: 2.5, description: 'High-value leads and B2B sponsor appeal.' },
  { id: 'tech-gadgets', name: '📱 Tech & AI Gadgets', baseRpm: 0.85, typicalCpm: 2.0, description: 'Consumer tech and mobile app installations.' },
  { id: 'health-fitness', name: '💪 Health & Workout Tips', baseRpm: 0.65, typicalCpm: 1.6, description: 'TikTok Shop supplement affiliates and fitness apps.' },
  { id: 'beauty-fashion', name: '👗 Beauty, Skincare & GRWM', baseRpm: 0.70, typicalCpm: 1.8, description: 'Huge TikTok Shop GMV and viral beauty brand campaigns.' },
  { id: 'lifestyle-vlogs', name: '✨ Lifestyle & Storytelling', baseRpm: 0.50, typicalCpm: 1.2, description: 'High watch time and strong emotional community connection.' },
  { id: 'food-recipes', name: '🍔 Food & Quick Recipes', baseRpm: 0.55, typicalCpm: 1.3, description: 'High save/share rates and kitchen gadget affiliate links.' },
  { id: 'gaming-streaming', name: '🎮 Gaming Clips & Memes', baseRpm: 0.35, typicalCpm: 0.9, description: 'High volume, lower qualified commercial conversion.' },
  { id: 'comedy-entertainment', name: '😂 Comedy, Skits & Memes', baseRpm: 0.38, typicalCpm: 1.0, description: 'Maximum viral potential across global FYP feeds.' },
];

export const TWITCH_SUBSCRIPTION_PRICING = {
  tier1: 4.99,
  tier2: 9.99,
  tier3: 24.99,
};

export const KICK_SUBSCRIPTION_PRICING = {
  tier1: 4.99,
};

export const TWITCH_SPLIT_RATES = {
  affiliate: 0.50,     // 50/50 standard
  partnerPlus100: 0.60, // 60/40 Partner Plus (100 sub points)
  partnerPlus350: 0.70, // 70/30 Partner Plus (350 sub points)
};

export const KICK_CREATOR_SPLIT = 0.95; // 95% to creator, 5% platform fee

export const KICK_KCP_TIERS = [
  { minCcv: 10, hourlyRate: 16.0, name: 'Tier 1 (10+ CCV)' },
  { minCcv: 50, hourlyRate: 22.0, name: 'Tier 2 (50+ CCV)' },
  { minCcv: 250, hourlyRate: 30.0, name: 'Tier 3 (250+ CCV)' },
  { minCcv: 1000, hourlyRate: 40.0, name: 'Tier 4 (1000+ CCV)' },
  { minCcv: 5000, hourlyRate: 65.0, name: 'Partner Elite (5000+ CCV)' },
];
