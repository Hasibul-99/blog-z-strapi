const strapi = require('@strapi/strapi');

// Cloudinary image URL as specified
const imageUrl = 'https://res.cloudinary.com/do7pzyta9/image/upload/v1760032266/thumbnail_484670175_2816197311921874_8065170605529369429_n_6de3cb41b6.jpg?updatedAt=2025-10-09T17%3A51%3A11.815Z';

// 12 Categories with English and Bengali content
const categories = [
  {
    title: 'Technology',
    title_bn: 'প্রযুক্তি',
    slug: 'technology',
    description: 'Latest technology news and updates',
    description_bn: 'সর্বশেষ প্রযুক্তি সংবাদ এবং আপডেট',
    keywords: 'tech, technology, innovation, gadgets',
    keywords_bn: 'প্রযুক্তি, উদ্ভাবন, গ্যাজেট',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Technology', url: '/technology' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'প্রযুক্তি', url: '/technology' }],
    is_active: true,
    is_hot: true,
    rating: 9
  },
  {
    title: 'Sports',
    title_bn: 'খেলাধুলা',
    slug: 'sports',
    description: 'Sports news, scores, and analysis',
    description_bn: 'খেলাধুলার খবর, স্কোর এবং বিশ্লেষণ',
    keywords: 'sports, football, basketball, soccer',
    keywords_bn: 'খেলাধুলা, ফুটবল, বাস্কেটবল',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Sports', url: '/sports' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'খেলাধুলা', url: '/sports' }],
    is_active: true,
    is_hot: true,
    rating: 8
  },
  {
    title: 'Politics',
    title_bn: 'রাজনীতি',
    slug: 'politics',
    description: 'Political news and analysis',
    description_bn: 'রাজনৈতিক সংবাদ এবং বিশ্লেষণ',
    keywords: 'politics, government, elections, policy',
    keywords_bn: 'রাজনীতি, সরকার, নির্বাচন, নীতি',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Politics', url: '/politics' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'রাজনীতি', url: '/politics' }],
    is_active: true,
    is_hot: false,
    rating: 7
  },
  {
    title: 'Entertainment',
    title_bn: 'বিনোদন',
    slug: 'entertainment',
    description: 'Entertainment news and celebrity updates',
    description_bn: 'বিনোদন সংবাদ এবং সেলিব্রিটি আপডেট',
    keywords: 'entertainment, movies, music, celebrities',
    keywords_bn: 'বিনোদন, চলচ্চিত্র, সঙ্গীত, সেলিব্রিটি',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Entertainment', url: '/entertainment' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'বিনোদন', url: '/entertainment' }],
    is_active: true,
    is_hot: true,
    rating: 8
  },
  {
    title: 'Health',
    title_bn: 'স্বাস্থ্য',
    slug: 'health',
    description: 'Health and wellness news',
    description_bn: 'স্বাস্থ্য এবং সুস্থতার সংবাদ',
    keywords: 'health, wellness, medicine, fitness',
    keywords_bn: 'স্বাস্থ্য, সুস্থতা, চিকিৎসা, ফিটনেস',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Health', url: '/health' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'স্বাস্থ্য', url: '/health' }],
    is_active: true,
    is_hot: false,
    rating: 7
  },
  {
    title: 'Business',
    title_bn: 'ব্যবসা',
    slug: 'business',
    description: 'Business news, market analysis, and financial updates',
    description_bn: 'ব্যবসায়িক সংবাদ, বাজার বিশ্লেষণ এবং আর্থিক আপডেট',
    keywords: 'business, finance, market, economy, stocks',
    keywords_bn: 'ব্যবসা, অর্থ, বাজার, অর্থনীতি, শেয়ার',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Business', url: '/business' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'ব্যবসা', url: '/business' }],
    is_active: true,
    is_hot: true,
    rating: 8
  },
  {
    title: 'Science',
    title_bn: 'বিজ্ঞান',
    slug: 'science',
    description: 'Scientific discoveries and research breakthroughs',
    description_bn: 'বৈজ্ঞানিক আবিষ্কার এবং গবেষণার অগ্রগতি',
    keywords: 'science, research, discovery, innovation, technology',
    keywords_bn: 'বিজ্ঞান, গবেষণা, আবিষ্কার, উদ্ভাবন',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Science', url: '/science' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'বিজ্ঞান', url: '/science' }],
    is_active: true,
    is_hot: true,
    rating: 9
  },
  {
    title: 'Travel',
    title_bn: 'ভ্রমণ',
    slug: 'travel',
    description: 'Travel guides, destinations, and adventure stories',
    description_bn: 'ভ্রমণ গাইড, গন্তব্য এবং অ্যাডভেঞ্চার গল্প',
    keywords: 'travel, tourism, destinations, adventure, culture',
    keywords_bn: 'ভ্রমণ, পর্যটন, গন্তব্য, অ্যাডভেঞ্চার, সংস্কৃতি',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Travel', url: '/travel' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'ভ্রমণ', url: '/travel' }],
    is_active: true,
    is_hot: false,
    rating: 7
  },
  {
    title: 'Education',
    title_bn: 'শিক্ষা',
    slug: 'education',
    description: 'Educational news, learning resources, and academic updates',
    description_bn: 'শিক্ষামূলক সংবাদ, শেখার সম্পদ এবং একাডেমিক আপডেট',
    keywords: 'education, learning, school, university, academic',
    keywords_bn: 'শিক্ষা, শেখা, স্কুল, বিশ্ববিদ্যালয়, একাডেমিক',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Education', url: '/education' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'শিক্ষা', url: '/education' }],
    is_active: true,
    is_hot: true,
    rating: 8
  },
  {
    title: 'Food',
    title_bn: 'খাদ্য',
    slug: 'food',
    description: 'Food recipes, restaurant reviews, and culinary trends',
    description_bn: 'খাবারের রেসিপি, রেস্তোরাঁর রিভিউ এবং রন্ধনশৈলীর ট্রেন্ড',
    keywords: 'food, recipes, cooking, restaurant, cuisine',
    keywords_bn: 'খাদ্য, রেসিপি, রান্না, রেস্তোরাঁ, রন্ধনশৈলী',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Food', url: '/food' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'খাদ্য', url: '/food' }],
    is_active: true,
    is_hot: true,
    rating: 7
  },
  {
    title: 'Fashion',
    title_bn: 'ফ্যাশন',
    slug: 'fashion',
    description: 'Fashion trends, style guides, and designer updates',
    description_bn: 'ফ্যাশন ট্রেন্ড, স্টাইল গাইড এবং ডিজাইনার আপডেট',
    keywords: 'fashion, style, clothing, trends, designer',
    keywords_bn: 'ফ্যাশন, স্টাইল, পোশাক, ট্রেন্ড, ডিজাইনার',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Fashion', url: '/fashion' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'ফ্যাশন', url: '/fashion' }],
    is_active: true,
    is_hot: false,
    rating: 6
  },
  {
    title: 'Lifestyle',
    title_bn: 'জীবনযাত্রা',
    slug: 'lifestyle',
    description: 'Lifestyle tips, home decor, and personal development',
    description_bn: 'জীবনযাত্রার টিপস, ঘর সাজানো এবং ব্যক্তিগত উন্নয়ন',
    keywords: 'lifestyle, home, decor, personal development, tips',
    keywords_bn: 'জীবনযাত্রা, ঘর, সাজসজ্জা, ব্যক্তিগত উন্নয়ন, টিপস',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Lifestyle', url: '/lifestyle' }],
    breadcrumb_bn: [{ name: 'হোম', url: '/' }, { name: 'জীবনযাত্রা', url: '/lifestyle' }],
    is_active: true,
    is_hot: true,
    rating: 7
  }
];

// Tags
const tags = [
  { title: 'Breaking News', title_bn: 'জরুরি সংবাদ', is_active: true },
  { title: 'Trending', title_bn: 'ট্রেন্ডিং', is_active: true },
  { title: 'Analysis', title_bn: 'বিশ্লেষণ', is_active: true },
  { title: 'Review', title_bn: 'রিভিউ', is_active: true },
  { title: 'Opinion', title_bn: 'মতামত', is_active: true },
  { title: 'Interview', title_bn: 'সাক্ষাৎকার', is_active: true },
  { title: 'Feature', title_bn: 'ফিচার', is_active: true },
  { title: 'Update', title_bn: 'আপডেট', is_active: true }
];

// Function to generate posts for each category
function generatePostsForCategory(categorySlug, categoryTitle, categoryTitle_bn) {
  const postTemplates = {
    technology: [
      { en: 'The Future of Artificial Intelligence in 2024', bn: '২০২৪ সালে কৃত্রিম বুদ্ধিমত্তার ভবিষ্যৎ' },
      { en: 'Quantum Computing Breakthrough Changes Everything', bn: 'কোয়ান্টাম কম্পিউটিং এর যুগান্তকারী আবিষ্কার' },
      { en: 'Smartphone Technology Reaches New Heights', bn: 'স্মার্টফোন প্রযুক্তি নতুন উচ্চতায়' },
      { en: 'Cloud Computing Revolution in Business', bn: 'ব্যবসায়ে ক্লাউড কম্পিউটিং বিপ্লব' },
      { en: 'Cybersecurity Threats and Solutions 2024', bn: '২০২ৄ সালে সাইবার নিরাপত্তা হুমকি ও সমাধান' },
      { en: 'Internet of Things Transforms Daily Life', bn: 'ইন্টারনেট অব থিংস দৈনন্দিন জীবন পরিবর্তন করছে' },
      { en: 'Blockchain Technology Beyond Cryptocurrency', bn: 'ক্রিপ্টোকারেন্সির বাইরে ব্লকচেইন প্রযুক্তি' },
      { en: '5G Network Expansion Accelerates Globally', bn: '৫জি নেটওয়ার্ক সম্প্রসারণ বিশ্বব্যাপী ত্বরান্বিত' },
      { en: 'Virtual Reality Gaming Takes Center Stage', bn: 'ভার্চুয়াল রিয়েলিটি গেমিং কেন্দ্রবিন্দুতে' },
      { en: 'Machine Learning Algorithms Improve Healthcare', bn: 'মেশিন লার্নিং অ্যালগরিদম স্বাস্থ্যসেবা উন্নত করছে' }
    ],
    sports: [
      { en: 'World Cup Football Championship Finals', bn: 'বিশ্বকাপ ফুটবল চ্যাম্পিয়নশিপ ফাইনাল' },
      { en: 'Olympic Games Breaking Records This Year', bn: 'এ বছর অলিম্পিক গেমসে রেকর্ড ভাঙছে' },
      { en: 'Cricket Tournament Thrills Millions of Fans', bn: 'ক্রিকেট টুর্নামেন্ট লাখো ভক্তদের রোমাঞ্চিত করছে' },
      { en: 'Basketball League Reaches New Popularity', bn: 'বাস্কেটবল লিগ নতুন জনপ্রিয়তায় পৌঁছেছে' },
      { en: 'Tennis Championships Showcase Amazing Talent', bn: 'টেনিস চ্যাম্পিয়নশিপে অসাধারণ প্রতিভা প্রদর্শন' },
      { en: 'Swimming Competition Sets New Standards', bn: 'সাঁতার প্রতিযোগিতা নতুন মানদণ্ড স্থাপন করেছে' },
      { en: 'Marathon Running Gains Global Momentum', bn: 'ম্যারাথন দৌড় বিশ্বব্যাপী গতি পাচ্ছে' },
      { en: 'Badminton Players Dominate International Scene', bn: 'ব্যাডমিন্টন খেলোয়াড়রা আন্তর্জাতিক অঙ্গনে আধিপত্য বিস্তার' },
      { en: 'Hockey Tournament Brings Nations Together', bn: 'হকি টুর্নামেন্ট জাতিগুলোকে একসাথে নিয়ে আসছে' },
      { en: 'Athletics Championship Inspires Young Athletes', bn: 'অ্যাথলেটিক্স চ্যাম্পিয়নশিপ তরুণ ক্রীড়াবিদদের অনুপ্রাণিত করছে' }
    ],
    politics: [
      { en: 'Election Results Shape Future Policies', bn: 'নির্বাচনের ফলাফল ভবিষ্যৎ নীতি নির্ধারণ করছে' },
      { en: 'Government Announces New Economic Reforms', bn: 'সরকার নতুন অর্থনৈতিক সংস্কার ঘোষণা করেছে' },
      { en: 'International Relations Strengthen Cooperation', bn: 'আন্তর্জাতিক সম্পর্ক সহযোগিতা শক্তিশালী করছে' },
      { en: 'Parliamentary Session Discusses Key Issues', bn: 'সংসদীয় অধিবেশনে গুরুত্বপূর্ণ বিষয় আলোচনা' },
      { en: 'Political Leaders Meet for Peace Talks', bn: 'রাজনৈতিক নেতারা শান্তি আলোচনায় মিলিত' },
      { en: 'Constitutional Amendment Proposal Debated', bn: 'সংবিধান সংশোধনী প্রস্তাব নিয়ে বিতর্ক' },
      { en: 'Foreign Policy Changes Impact Relations', bn: 'পররাষ্ট্র নীতির পরিবর্তন সম্পর্কে প্রভাব ফেলছে' },
      { en: 'Democratic Process Strengthens Institutions', bn: 'গণতান্ত্রিক প্রক্রিয়া প্রতিষ্ঠানগুলো শক্তিশালী করছে' },
      { en: 'Public Opinion Influences Policy Decisions', bn: 'জনমত নীতিগত সিদ্ধান্তকে প্রভাবিত করছে' },
      { en: 'Coalition Government Forms New Alliance', bn: 'জোট সরকার নতুন জোট গঠন করেছে' }
    ],
    entertainment: [
      { en: 'Hollywood Blockbuster Breaks Box Office Records', bn: 'হলিউড ব্লকবাস্টার বক্স অফিস রেকর্ড ভেঙেছে' },
      { en: 'Music Festival Attracts Global Audiences', bn: 'সঙ্গীত উৎসব বিশ্বব্যাপী দর্শকদের আকর্ষণ করছে' },
      { en: 'Celebrity Wedding Becomes Social Media Sensation', bn: 'সেলিব্রিটি বিয়ে সোশ্যাল মিডিয়া সেনসেশন হয়েছে' },
      { en: 'Award Show Celebrates Outstanding Performances', bn: 'পুরস্কার অনুষ্ঠান অসাধারণ পারফরম্যান্স উদযাপন করছে' },
      { en: 'Television Series Gains International Recognition', bn: 'টেলিভিশন সিরিজ আন্তর্জাতিক স্বীকৃতি পেয়েছে' },
      { en: 'Concert Tour Sells Out in Record Time', bn: 'কনসার্ট ট্যুর রেকর্ড সময়ে সোল্ড আউট' },
      { en: 'Film Festival Showcases Independent Cinema', bn: 'চলচ্চিত্র উৎসব স্বাধীন সিনেমা প্রদর্শন করছে' },
      { en: 'Streaming Platform Launches Original Content', bn: 'স্ট্রিমিং প্ল্যাটফর্ম মৌলিক কন্টেন্ট চালু করেছে' },
      { en: 'Theater Production Receives Critical Acclaim', bn: 'থিয়েটার প্রোডাকশন সমালোচকদের প্রশংসা পেয়েছে' },
      { en: 'Documentary Film Wins International Awards', bn: 'তথ্যচিত্র আন্তর্জাতিক পুরস্কার জিতেছে' }
    ],
    health: [
      { en: 'Medical Breakthrough Offers New Hope', bn: 'চিকিৎসা বিজ্ঞানের অগ্রগতি নতুন আশা দিচ্ছে' },
      { en: 'Fitness Trends Transform Wellness Industry', bn: 'ফিটনেস ট্রেন্ড সুস্থতা শিল্পকে রূপান্তরিত করছে' },
      { en: 'Mental Health Awareness Campaigns Succeed', bn: 'মানসিক স্বাস্থ্য সচেতনতা প্রচারণা সফল হয়েছে' },
      { en: 'Nutrition Research Reveals Surprising Facts', bn: 'পুষ্টি গবেষণা আশ্চর্যজনক তথ্য প্রকাশ করেছে' },
      { en: 'Vaccine Development Reaches New Milestone', bn: 'ভ্যাকসিন উন্নয়ন নতুন মাইলফলক অর্জন করেছে' },
      { en: 'Healthcare Technology Improves Patient Care', bn: 'স্বাস্থ্যসেবা প্রযুক্তি রোগীর যত্ন উন্নত করছে' },
      { en: 'Exercise Programs Show Remarkable Results', bn: 'ব্যায়াম কর্মসূচি উল্লেখযোগ্য ফলাফল দেখাচ্ছে' },
      { en: 'Medical Research Advances Treatment Options', bn: 'চিকিৎসা গবেষণা চিকিৎসার বিকল্প এগিয়ে নিয়ে যাচ্ছে' },
      { en: 'Wellness Programs Promote Healthy Living', bn: 'সুস্থতা কর্মসূচি স্বাস্থ্যকর জীবনযাত্রা প্রচার করছে' },
      { en: 'Preventive Medicine Reduces Disease Risk', bn: 'প্রতিরোধমূলক চিকিৎসা রোগের ঝুঁকি কমাচ্ছে' }
    ],
    business: [
      { en: 'Stock Market Reaches All-Time High', bn: 'শেয়ার বাজার সর্বকালের উচ্চতায় পৌঁছেছে' },
      { en: 'Startup Companies Attract Major Investments', bn: 'স্টার্টআপ কোম্পানিগুলো বড় বিনিয়োগ আকর্ষণ করছে' },
      { en: 'Economic Growth Exceeds Expectations', bn: 'অর্থনৈতিক প্রবৃদ্ধি প্রত্যাশা ছাড়িয়ে গেছে' },
      { en: 'Corporate Mergers Reshape Industry Landscape', bn: 'কর্পোরেট একীভূতকরণ শিল্পের চেহারা পরিবর্তন করছে' },
      { en: 'International Trade Agreements Boost Commerce', bn: 'আন্তর্জাতিক বাণিজ্য চুক্তি বাণিজ্য বৃদ্ধি করছে' },
      { en: 'Technology Sector Leads Market Innovation', bn: 'প্রযুক্তি খাত বাজার উদ্ভাবনে নেতৃত্ব দিচ্ছে' },
      { en: 'Small Business Growth Drives Local Economy', bn: 'ছোট ব্যবসার প্রবৃদ্ধি স্থানীয় অর্থনীতি চালিত করছে' },
      { en: 'Financial Markets Show Strong Performance', bn: 'আর্থিক বাজার শক্তিশালী পারফরম্যান্স দেখাচ্ছে' },
      { en: 'E-commerce Platforms Revolutionize Retail', bn: 'ই-কমার্স প্ল্যাটফর্ম খুচরা বিক্রয়ে বিপ্লব এনেছে' },
      { en: 'Sustainable Business Practices Gain Momentum', bn: 'টেকসই ব্যবসায়িক অনুশীলন গতি পাচ্ছে' }
    ],
    science: [
      { en: 'Space Exploration Mission Discovers New Planet', bn: 'মহাকাশ অনুসন্ধান মিশন নতুন গ্রহ আবিষ্কার করেছে' },
      { en: 'Climate Research Reveals Important Findings', bn: 'জলবায়ু গবেষণা গুরুত্বপূর্ণ আবিষ্কার প্রকাশ করেছে' },
      { en: 'Genetic Engineering Breakthrough in Medicine', bn: 'চিকিৎসায় জেনেটিক ইঞ্জিনিয়ারিং এর যুগান্তকারী অগ্রগতি' },
      { en: 'Renewable Energy Technology Advances Rapidly', bn: 'নবায়নযোগ্য শক্তি প্রযুক্তি দ্রুত এগিয়ে চলেছে' },
      { en: 'Archaeological Discovery Rewrites History', bn: 'প্রত্নতাত্ত্বিক আবিষ্কার ইতিহাস পুনর্লিখন করছে' },
      { en: 'Ocean Research Uncovers Marine Mysteries', bn: 'সমুদ্র গবেষণা সামুদ্রিক রহস্য উন্মোচন করছে' },
      { en: 'Artificial Intelligence Enhances Scientific Research', bn: 'কৃত্রিম বুদ্ধিমত্তা বৈজ্ঞানিক গবেষণা উন্নত করছে' },
      { en: 'Biotechnology Innovation Transforms Agriculture', bn: 'জৈবপ্রযুক্তি উদ্ভাবন কৃষিকে রূপান্তরিত করছে' },
      { en: 'Physics Experiment Confirms New Theory', bn: 'পদার্থবিজ্ঞান পরীক্ষা নতুন তত্ত্ব নিশ্চিত করেছে' },
      { en: 'Environmental Science Proposes Solutions', bn: 'পরিবেশ বিজ্ঞান সমাধান প্রস্তাব করছে' }
    ],
    travel: [
      { en: 'Hidden Destinations Become Tourist Hotspots', bn: 'লুকানো গন্তব্যগুলো পর্যটন হটস্পট হয়ে উঠেছে' },
      { en: 'Sustainable Tourism Practices Gain Popularity', bn: 'টেকসই পর্যটন অনুশীলন জনপ্রিয়তা পাচ্ছে' },
      { en: 'Adventure Travel Experiences Thrill Seekers', bn: 'অ্যাডভেঞ্চার ভ্রমণ রোমাঞ্চপ্রেমীদের অভিজ্ঞতা দিচ্ছে' },
      { en: 'Cultural Heritage Sites Attract Visitors', bn: 'সাংস্কৃতিক ঐতিহ্যবাহী স্থানগুলো দর্শকদের আকর্ষণ করছে' },
      { en: 'Luxury Resorts Offer Unique Experiences', bn: 'বিলাসবহুল রিসোর্ট অনন্য অভিজ্ঞতা প্রদান করছে' },
      { en: 'Budget Travel Tips Help Explore More', bn: 'বাজেট ভ্রমণ টিপস আরো অন্বেষণে সাহায্য করছে' },
      { en: 'Food Tourism Combines Taste and Travel', bn: 'খাদ্য পর্যটন স্বাদ এবং ভ্রমণ একত্রিত করছে' },
      { en: 'Digital Nomad Lifestyle Transforms Work', bn: 'ডিজিটাল যাযাবর জীবনধারা কাজকে রূপান্তরিত করছে' },
      { en: 'Eco-friendly Transportation Options Expand', bn: 'পরিবেশবান্ধব পরিবহন বিকল্প সম্প্রসারিত হচ্ছে' },
      { en: 'Travel Technology Enhances Journey Planning', bn: 'ভ্রমণ প্রযুক্তি যাত্রা পরিকল্পনা উন্নত করছে' }
    ],
    education: [
      { en: 'Online Learning Platforms Transform Education', bn: 'অনলাইন শিক্ষা প্ল্যাটফর্ম শিক্ষাকে রূপান্তরিত করছে' },
      { en: 'University Research Leads to Breakthrough', bn: 'বিশ্ববিদ্যালয় গবেষণা যুগান্তকারী আবিষ্কারে নেতৃত্ব দিচ্ছে' },
      { en: 'Student Innovation Projects Win Recognition', bn: 'ছাত্র উদ্ভাবন প্রকল্প স্বীকৃতি জিতেছে' },
      { en: 'Educational Technology Improves Learning Outcomes', bn: 'শিক্ষা প্রযুক্তি শেখার ফলাফল উন্নত করছে' },
      { en: 'Scholarship Programs Support Talented Students', bn: 'বৃত্তি কর্মসূচি প্রতিভাবান ছাত্রদের সহায়তা করছে' },
      { en: 'Teacher Training Programs Enhance Quality', bn: 'শিক্ষক প্রশিক্ষণ কর্মসূচি গুণমান বৃদ্ধি করছে' },
      { en: 'International Exchange Programs Foster Understanding', bn: 'আন্তর্জাতিক বিনিময় কর্মসূচি বোঝাপড়া বৃদ্ধি করছে' },
      { en: 'STEM Education Initiatives Prepare Future Leaders', bn: 'STEM শিক্ষা উদ্যোগ ভবিষ্যৎ নেতা তৈরি করছে' },
      { en: 'Adult Learning Programs Expand Opportunities', bn: 'প্রাপ্তবয়স্ক শিক্ষা কর্মসূচি সুযোগ সম্প্রসারিত করছে' },
      { en: 'Educational Assessment Methods Evolve', bn: 'শিক্ষামূলক মূল্যায়ন পদ্ধতি বিকশিত হচ্ছে' }
    ],
    food: [
      { en: 'Culinary Trends Revolutionize Restaurant Industry', bn: 'রন্ধনশৈলী ট্রেন্ড রেস্তোরাঁ শিল্পে বিপ্লব এনেছে' },
      { en: 'Healthy Eating Habits Gain Global Attention', bn: 'স্বাস্থ্যকর খাদ্যাভ্যাস বিশ্বব্যাপী মনোযোগ পাচ্ছে' },
      { en: 'Local Cuisine Celebrates Cultural Heritage', bn: 'স্থানীয় রন্ধনশৈলী সাংস্কৃতিক ঐতিহ্য উদযাপন করছে' },
      { en: 'Food Delivery Services Transform Dining', bn: 'খাদ্য সরবরাহ সেবা খাওয়ার অভ্যাস পরিবর্তন করছে' },
      { en: 'Organic Farming Produces Quality Ingredients', bn: 'জৈব চাষাবাদ মানসম্পন্ন উপাদান উৎপাদন করছে' },
      { en: 'Celebrity Chefs Inspire Home Cooking', bn: 'সেলিব্রিটি শেফরা ঘরোয়া রান্নায় অনুপ্রাণিত করছেন' },
      { en: 'Food Festivals Showcase Diverse Flavors', bn: 'খাদ্য উৎসব বৈচিত্র্যময় স্বাদ প্রদর্শন করছে' },
      { en: 'Plant-Based Diet Options Increase Rapidly', bn: 'উদ্ভিদভিত্তিক খাদ্য বিকল্প দ্রুত বৃদ্ধি পাচ্ছে' },
      { en: 'Cooking Shows Educate and Entertain', bn: 'রান্নার অনুষ্ঠান শিক্ষা ও বিনোদন দিচ্ছে' },
      { en: 'Food Safety Standards Ensure Consumer Protection', bn: 'খাদ্য নিরাপত্তা মান ভোক্তা সুরক্ষা নিশ্চিত করছে' }
    ],
    fashion: [
      { en: 'Fashion Week Showcases Latest Designer Collections', bn: 'ফ্যাশন সপ্তাহ সর্বশেষ ডিজাইনার সংগ্রহ প্রদর্শন করছে' },
      { en: 'Sustainable Fashion Movement Gains Momentum', bn: 'টেকসই ফ্যাশন আন্দোলন গতি পাচ্ছে' },
      { en: 'Street Style Influences High Fashion Trends', bn: 'স্ট্রিট স্টাইল উচ্চ ফ্যাশন ট্রেন্ডকে প্রভাবিত করছে' },
      { en: 'Vintage Clothing Experiences Revival', bn: 'ভিনটেজ পোশাক পুনরুজ্জীবন অনুভব করছে' },
      { en: 'Fashion Technology Creates Smart Clothing', bn: 'ফ্যাশন প্রযুক্তি স্মার্ট পোশাক তৈরি করছে' },
      { en: 'Cultural Fashion Celebrates Global Diversity', bn: 'সাংস্কৃতিক ফ্যাশন বিশ্বব্যাপী বৈচিত্র্য উদযাপন করছে' },
      { en: 'Fashion Influencers Shape Consumer Choices', bn: 'ফ্যাশন প্রভাবশালীরা ভোক্তার পছন্দ গঠন করছেন' },
      { en: 'Luxury Brands Embrace Digital Innovation', bn: 'বিলাসবহুল ব্র্যান্ডগুলো ডিজিটাল উদ্ভাবন গ্রহণ করছে' },
      { en: 'Fashion Education Programs Train Future Designers', bn: 'ফ্যাশন শিক্ষা কর্মসূচি ভবিষ্যৎ ডিজাইনার প্রশিক্ষণ দিচ্ছে' },
      { en: 'Ethical Fashion Practices Promote Fair Trade', bn: 'নৈতিক ফ্যাশন অনুশীলন ন্যায্য বাণিজ্য প্রচার করছে' }
    ],
    lifestyle: [
      { en: 'Minimalist Living Simplifies Modern Life', bn: 'ন্যূনতমবাদী জীবনযাত্রা আধুনিক জীবনকে সরল করছে' },
      { en: 'Home Decor Trends Transform Living Spaces', bn: 'ঘর সাজানোর ট্রেন্ড বাসস্থানকে রূপান্তরিত করছে' },
      { en: 'Work-Life Balance Becomes Priority', bn: 'কাজ-জীবনের ভারসাম্য অগ্রাধিকার হয়ে উঠেছে' },
      { en: 'Wellness Practices Improve Quality of Life', bn: 'সুস্থতার অনুশীলন জীবনের মান উন্নত করছে' },
      { en: 'Digital Detox Helps Mental Health', bn: 'ডিজিটাল ডিটক্স মানসিক স্বাস্থ্যে সাহায্য করছে' },
      { en: 'Sustainable Living Reduces Environmental Impact', bn: 'টেকসই জীবনযাত্রা পরিবেশগত প্রভাব কমাচ্ছে' },
      { en: 'Personal Development Programs Enhance Skills', bn: 'ব্যক্তিগত উন্নয়ন কর্মসূচি দক্ষতা বৃদ্ধি করছে' },
      { en: 'Smart Home Technology Increases Convenience', bn: 'স্মার্ট হোম প্রযুক্তি সুবিধা বৃদ্ধি করছে' },
      { en: 'Hobby Communities Connect Like-minded People', bn: 'শখের সম্প্রদায় সমমনা মানুষদের সংযুক্ত করছে' },
      { en: 'Time Management Strategies Boost Productivity', bn: 'সময় ব্যবস্থাপনা কৌশল উৎপাদনশীলতা বৃদ্ধি করছে' }
    ]
  };

  const templates = postTemplates[categorySlug] || postTemplates.technology;
  
  return templates.map((template, index) => ({
    title: template.en,
    title_bn: template.bn,
    slug: template.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: `Comprehensive coverage of ${template.en.toLowerCase()}`,
    description_bn: `${template.bn} এর বিস্তৃত কভারেজ`,
    keywords: `${categorySlug}, news, update, ${template.en.toLowerCase()}`,
    keywords_bn: `${categorySlug}, সংবাদ, আপডেট, ${template.bn}`,
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: categoryTitle, url: `/${categorySlug}` },
      { name: template.en, url: `/${categorySlug}/${template.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` }
    ],
    breadcrumb_bn: [
      { name: 'হোম', url: '/' },
      { name: categoryTitle_bn, url: `/${categorySlug}` },
      { name: template.bn, url: `/${categorySlug}/${template.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` }
    ],
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
    is_active: true,
    top_post: index < 3, // First 3 posts are top posts
    recent_post: index < 5, // First 5 posts are recent posts
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: `This comprehensive article explores ${template.en.toLowerCase()} and its significant impact on our daily lives. The detailed analysis covers various aspects and provides valuable insights for readers interested in this topic.`
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: `Recent developments in this field have shown remarkable progress, with experts predicting continued growth and innovation. This article examines the key factors driving these changes and their implications for the future.`
          }
        ]
      }
    ],
    content_first_bn: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: `এই বিস্তৃত নিবন্ধটি ${template.bn} এবং আমাদের দৈনন্দিন জীবনে এর গুরুত্বপূর্ণ প্রভাব অন্বেষণ করে। বিস্তারিত বিশ্লেষণ বিভিন্ন দিক কভার করে এবং এই বিষয়ে আগ্রহী পাঠকদের জন্য মূল্যবান অন্তর্দৃষ্টি প্রদান করে।`
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: `এই ক্ষেত্রে সাম্প্রতিক উন্নয়নগুলি উল্লেখযোগ্য অগ্রগতি দেখিয়েছে, বিশেষজ্ঞরা অব্যাহত বৃদ্ধি এবং উদ্ভাবনের পূর্বাভাস দিচ্ছেন। এই নিবন্ধটি এই পরিবর্তনগুলি চালিত করার মূল কারণগুলি এবং ভবিষ্যতের জন্য তাদের প্রভাব পরীক্ষা করে।`
          }
        ]
      }
    ],
    content_sec: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: `The implications of these developments extend far beyond immediate applications, potentially reshaping entire industries and creating new opportunities for innovation and growth.`
          }
        ]
      }
    ],
    content_sec_bn: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: `এই উন্নয়নগুলির প্রভাব তাৎক্ষণিক প্রয়োগের চেয়ে অনেক বেশি বিস্তৃত, সম্ভাব্যভাবে সম্পূর্ণ শিল্পকে নতুন আকার দিচ্ছে এবং উদ্ভাবন ও বৃদ্ধির জন্য নতুন সুযোগ তৈরি করছে।`
          }
        ]
      }
    ]
  }));
}

// Generate all posts
const posts = [];
categories.forEach(category => {
  const categoryPosts = generatePostsForCategory(category.slug, category.title, category.title_bn);
  posts.push(...categoryPosts);
});

async function clearExistingData(strapiInstance) {
  try {
    console.log('🧹 Clearing existing data...');
    
    // Clear posts first (due to foreign key constraints)
    const posts = await strapiInstance.entityService.findMany('api::post.post', {
      populate: '*'
    });
    for (const post of posts) {
      await strapiInstance.entityService.delete('api::post.post', post.id);
    }
    console.log(`🗑️ Cleared ${posts.length} posts`);

    // Clear tags
    const tags = await strapiInstance.entityService.findMany('api::tag.tag', {
      populate: '*'
    });
    for (const tag of tags) {
      await strapiInstance.entityService.delete('api::tag.tag', tag.id);
    }
    console.log(`🗑️ Cleared ${tags.length} tags`);

    // Clear categories
    const categories = await strapiInstance.entityService.findMany('api::category.category', {
      populate: '*'
    });
    for (const category of categories) {
      await strapiInstance.entityService.delete('api::category.category', category.id);
    }
    console.log(`🗑️ Cleared ${categories.length} categories`);

  } catch (error) {
    console.error('❌ Error clearing data:', error.message);
    throw error;
  }
}

async function seedData(strapiInstance) {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Create categories for both locales
    console.log('📁 Creating categories...');
    const createdCategories = [];
    
    for (const categoryData of categories) {
      try {
        // Create English version
        const categoryEn = await strapiInstance.entityService.create('api::category.category', {
          data: {
            title: categoryData.title,
            slug: categoryData.slug,
            description: categoryData.description,
            keywords: categoryData.keywords,
            breadcrumb: categoryData.breadcrumb,
            is_active: categoryData.is_active,
            is_hot: categoryData.is_hot,
            rating: categoryData.rating,
            publishedAt: new Date(),
            locale: 'en'
          }
        });
        
        // Create Bengali version
        const categoryBn = await strapiInstance.entityService.create('api::category.category', {
          data: {
            title: categoryData.title_bn,
            slug: categoryData.slug + '-bn',
            description: categoryData.description_bn,
            keywords: categoryData.keywords_bn,
            breadcrumb: categoryData.breadcrumb_bn,
            is_active: categoryData.is_active,
            is_hot: categoryData.is_hot,
            rating: categoryData.rating,
            publishedAt: new Date(),
            locale: 'bn'
          }
        });
        
        createdCategories.push({ en: categoryEn, bn: categoryBn, slug: categoryData.slug });
        console.log(`✅ Created category: ${categoryData.title} (EN/BN)`);
      } catch (error) {
        console.error(`❌ Error creating category ${categoryData.title}:`, error.details || error.message);
        throw error;
      }
    }

    // Create tags for both locales
    console.log('🏷️ Creating tags...');
    const createdTags = [];
    for (const tagData of tags) {
      try {
        // Create English version
        const tagEn = await strapiInstance.entityService.create('api::tag.tag', {
          data: {
            title: tagData.title,
            is_active: tagData.is_active,
            publishedAt: new Date(),
            locale: 'en'
          }
        });
        
        // Create Bengali version
        const tagBn = await strapiInstance.entityService.create('api::tag.tag', {
          data: {
            title: tagData.title_bn,
            is_active: tagData.is_active,
            publishedAt: new Date(),
            locale: 'bn'
          }
        });
        
        createdTags.push({ en: tagEn, bn: tagBn });
        console.log(`✅ Created tag: ${tagData.title} (EN/BN)`);
      } catch (error) {
        console.error(`❌ Error creating tag ${tagData.title}:`, error.details || error.message);
        throw error;
      }
    }

    // Create posts for both locales
    console.log('📝 Creating posts...');
    let postCount = 0;
    
    for (const postData of posts) {
      try {
        // Find the corresponding category
        const categorySlug = postData.breadcrumb[1].url.replace('/', '');
        const categoryPair = createdCategories.find(cat => cat.slug === categorySlug);
        
        if (!categoryPair) {
          console.error(`❌ Category not found for slug: ${categorySlug}`);
          continue;
        }

        // Get random tags
        const randomTags = createdTags.slice(0, Math.floor(Math.random() * 3) + 1);

        // Create English version
        const postEn = await strapiInstance.entityService.create('api::post.post', {
          data: {
            title: postData.title,
            slug: postData.slug,
            description: postData.description,
            keywords: postData.keywords,
            breadcrumb: postData.breadcrumb,
            rating: postData.rating,
            is_active: postData.is_active,
            top_post: postData.top_post,
            recent_post: postData.recent_post,
            content_first: postData.content_first,
            content_sec: postData.content_sec,
            category: categoryPair.en.id,
            tags: randomTags.map(tag => tag.en.id),
            publishedAt: new Date(),
            locale: 'en'
          }
        });

        // Create Bengali version
        const postBn = await strapiInstance.entityService.create('api::post.post', {
          data: {
            title: postData.title_bn,
            slug: postData.slug + '-bn',
            description: postData.description_bn,
            keywords: postData.keywords_bn,
            breadcrumb: postData.breadcrumb_bn,
            rating: postData.rating,
            is_active: postData.is_active,
            top_post: postData.top_post,
            recent_post: postData.recent_post,
            content_first: postData.content_first_bn,
            content_sec: postData.content_sec_bn,
            category: categoryPair.bn.id,
            tags: randomTags.map(tag => tag.bn.id),
            publishedAt: new Date(),
            locale: 'bn'
          }
        });

        postCount += 2; // EN + BN
        console.log(`✅ Created post: ${postData.title} (EN/BN)`);
      } catch (error) {
        console.error(`❌ Error creating post ${postData.title}:`, error.details || error.message);
        throw error;
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Categories: ${createdCategories.length * 2} (${createdCategories.length} EN + ${createdCategories.length} BN)`);
    console.log(`   - Tags: ${createdTags.length * 2} (${createdTags.length} EN + ${createdTags.length} BN)`);
    console.log(`   - Posts: ${postCount} (${posts.length} EN + ${posts.length} BN)`);

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    throw error;
  }
}

async function main() {
  try {
    const app = await strapi.createStrapi().load();
    await clearExistingData(app);
    await seedData(app);
    await app.destroy();
    console.log('✨ Seeding process completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { seedData };