import { useState } from "react";

const gmap = (placeId, fallbackName) =>
  placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : `https://www.google.com/maps/search/${encodeURIComponent(fallbackName)}`;

const amap = (name) =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(name)}`;

const didi = (name) =>
  `diditaxi://open?destAddress=${encodeURIComponent(name)}`;

// Search queries per place key — used when user taps 📸
const PHOTO_QUERIES = {
  pudong:         "Pudong International Airport Shanghai terminal interior",
  bund:           "The Bund Shanghai night skyline Pudong view",
  insland:        "INS LAND 新乐园 Shanghai entertainment complex Fuxing Park",
  xintiandi:      "Xintiandi Shanghai stone gate houses street",
  central_plaza:  "Central Plaza 中环广场 Shanghai Huaihai Road",
  yugarden:       "Yu Garden Yuyuan Shanghai classical garden",
  tianzifang:     "Tianzifang 田子坊 Shanghai art alley shops",
  hongyadong:     "Hongyadong 洪崖洞 Chongqing night stilted buildings",
  ring_mall:      "Chongqing Ring Mall 光环购物公园 indoor cloud forest",
  jiefangbei:     "Jiefangbei 解放碑 Chongqing pedestrian street CBD night",
  ciqikou:        "Ciqikou ancient town 磁器口 Chongqing old street",
  theatre_1949:   "Chongqing 1949 Grand Theatre show performance",
  geocentric:     "A Gathering Place Geocentric Exploration 地心说 Chongqing",
  starry_st:      "Starry Street 星光街 Guanyinqiao Chongqing Pokemon",
  longhu_pokemon: "Longhu Times Starry Sky 龙湖时代天街 Chongqing Pokemon",
  cruise:         "Yangtze River night cruise Chongqing Chaotianmen",
  ckg_airport:    "Chongqing Jiangbei International Airport terminal",
  hotel_cq:       "Chongqing riverside hotel Jiefangbei Hongyadong view",
  liyan:          "Li Yan Ba Guo 礼宴巴国 Chongqing court feast banquet",
};


const days = [
  {
    id: "may12",
    date: "May 12 (Tue)",
    title: "Arrive Shanghai",
    subtitle: "Okinawa → Shanghai | 15:00–16:35",
    emoji: "✈️",
    color: "#e8f4fd",
    accent: "#2563eb",
    events: [
      {
        time: "16:35", type: "arrive", icon: "🛬",
        title: "Arrive Pudong International Airport",
        note: "Clear immigration, collect baggage",
        transport: "🚇 Metro Line 2 → hotel ~50min, or taxi ~45min (¥150–180)",
        mapUrl: gmap(null, "Pudong International Airport Shanghai"),
        photoKey: "pudong",
      },
      {
        time: "18:00", type: "hotel", icon: "🏨",
        title: "Check-in: Shanghai Bund Yiwan Hotel",
        note: "3/F, 521 Henan Middle Rd, Huangpu District",
        mapUrl: gmap("ChIJJwvyc1pwsjURJquqptD9NtM"),
        photoKey: "bund",
      },
      {
        time: "19:00", type: "food", icon: "🦀",
        title: "Dinner: Li Bai Crab Roe Noodles",
        note: "3/F, Xintiandi South Block, 123 Xingye Lu — iconic crab roe + yellow croaker noodles. Arrive early, queue likely.",
        transport: "🚶 ~15min walk from hotel",
        mapUrl: gmap("ChIJBw2jBHJwsjURIpLXAmXw7jI"),
        photoKey: "xintiandi",
      },
      {
        time: "20:30", type: "explore", icon: "🌃",
        title: "Evening: The Bund Night Walk",
        note: "Stroll along the Bund and take in the Pudong skyline",
        transport: "🚶 ~20min walk from Xintiandi",
        mapUrl: gmap("ChIJYUiHi1dwsjURZK_REO37Vk0"),
        photoKey: "bund",
      },
    ],
  },
  {
    id: "may13",
    date: "May 13 (Wed)",
    title: "Shanghai Explore",
    subtitle: "Full Day",
    emoji: "🏙️",
    color: "#fef3c7",
    accent: "#d97706",
    events: [
      {
        time: "10:00", type: "explore", icon: "🎪",
        title: "INS LAND 新乐园",
        note: "East side of Fuxing Park — multi-level entertainment complex. Buy ticket in advance online. Best on weekdays to avoid long queues.",
        transport: "🚇 Metro Line 1 → Changshu Rd, ~15min from hotel",
        mapUrl: gmap("ChIJG66k73RwsjUREw5sPBxvjYw"),
        photoKey: "insland",
      },
      {
        time: "13:00", type: "food", icon: "🍜",
        title: "Lunch: Xintiandi area",
        note: "Browse restaurants around Xintiandi South Block — Din Tai Fung or local Shanghai cuisine",
        transport: "🚶 ~10min walk from INS Land",
        mapUrl: gmap("ChIJcVgGUHFwsjURDPLrdEiQT1Q"),
        photoKey: "xintiandi",
        suggested: true,
      },
      {
        time: "14:30", type: "explore", icon: "🏬",
        title: "Central Plaza 中环广场",
        note: "381 Huaihai Middle Rd — upscale shopping, retro red brick aesthetic. Good for a stroll + window shopping.",
        transport: "🚶 ~10min walk from Xintiandi",
        mapUrl: gmap("ChIJwWJHCnJwsjURYJW9C1htrbE"),
        photoKey: "central_plaza",
      },
      {
        time: "16:30", type: "optional", icon: "⭐",
        title: "(Optional) Longemont Mall — Pokémon Center",
        note: "1018 Changning Rd — Pokémon Center on upper floors. Worth the trip if you're a fan!",
        transport: "🚇 Metro Line 2 → Weining Rd, ~25min. Or taxi ~20min (¥40–55)",
        optional: true,
        mapUrl: gmap("ChIJN4LC02VlsjURud2rWuVADUE"),
        photoKey: "longhu_pokemon",
      },
      {
        time: "19:00", type: "food", icon: "🍽️",
        title: "Dinner: Din Tai Fung or local Shanghainese",
        note: "Many options around Xintiandi or Huaihai Rd",
        mapUrl: gmap("ChIJcVgGUHFwsjURDPLrdEiQT1Q"),
        photoKey: "xintiandi",
        suggested: true,
      },
      {
        time: "20:30", type: "explore", icon: "🌆",
        title: "Evening: Yu Garden Bazaar & Old Town",
        note: "Lantern-lit bazaar and old Shanghai vibes — the outdoor bazaar is open late even after garden hours",
        transport: "🚇 Metro Line 10 → Yu Garden, ~20min",
        mapUrl: gmap("ChIJidPZMUGHrTUR29eIuHbpoIQ"),
        photoKey: "yugarden",
      },
    ],
  },
  {
    id: "may14",
    date: "May 14 (Thu)",
    title: "Shanghai → Chongqing",
    subtitle: "Flight 18:10–21:00",
    emoji: "✈️",
    color: "#f0fdf4",
    accent: "#16a34a",
    events: [
      {
        time: "10:00", type: "explore", icon: "🛍️",
        title: "Tianzifang Alley Art District",
        note: "田子坊 — indie shops, cafés, street art, vintage finds. Great for last-minute unique souvenirs.",
        transport: "🚇 Metro Line 9 → Dapuqiao, ~20min",
        mapUrl: gmap("ChIJ2-UI76F6sjURj_HAeG5PMhE"),
        photoKey: "tianzifang",
      },
      {
        time: "13:00", type: "food", icon: "🍱",
        title: "Lunch: Sinan Mansions area",
        note: "Garden restaurants in the French Concession — relaxed outdoor dining",
        mapUrl: gmap(null, "Sinan Mansions Shanghai"),
        photoKey: "tianzifang",
        suggested: true,
      },
      {
        time: "15:00", type: "transport", icon: "🚌",
        title: "Head to Pudong Airport (PVG)",
        note: "Allow at least 2.5–3hrs before departure",
        transport: "🚇 Metro Line 2 direct to airport ~50min, or taxi ~45min (¥150–200)",
        mapUrl: gmap(null, "Pudong International Airport Shanghai"),
        photoKey: "pudong",
      },
      {
        time: "18:10", type: "depart", icon: "✈️",
        title: "Depart Shanghai → Chongqing",
        note: "Flight duration ~2h50min",
      },
      {
        time: "21:00", type: "arrive", icon: "🛬",
        title: "Arrive Chongqing Jiangbei Airport (CKG)",
        transport: "🚇 Airport Rail Line 10 ~35min, or Didi ~40min (¥80–120)",
        mapUrl: gmap(null, "Chongqing Jiangbei International Airport"),
        photoKey: "ckg_airport",
      },
      {
        time: "22:00", type: "hotel", icon: "🏨",
        title: "Check-in: 浩廷·高空江景酒店",
        note: "29F, Tower B, Caihui Plaza, No.5 Bayi Rd, Yuzhong District — 2025 opened river view hotel near Jiefangbei & Hongyadong",
        mapUrl: gmap(null, "浩廷高空江景酒店解放碑洪崖洞店 Chongqing Caihui Plaza Bayi Road"),
        photoKey: "hotel_cq",
      },
    ],
  },
  {
    id: "may15",
    date: "May 15 (Fri)",
    title: "Ring Mall + Hongyadong Night",
    subtitle: "Shopping, Court Feast & Iconic Night Views",
    emoji: "🌉",
    color: "#fdf2f8",
    accent: "#9333ea",
    events: [
      {
        time: "09:30", type: "transport", icon: "🚇",
        title: "Travel → Chongqing Ring Mall (光环购物公园)",
        note: "Head to the Ring Mall — inspired by Singapore's Cloud Forest, lush indoor gardens and greenery-filled atrium",
        transport: "🚇 Metro Line 6 → Daping (~25min from Jiefangbei). Or Didi ~20min (¥25–35)",
        mapUrl: gmap("ChIJpbJs0IY0kzYR2Z-wxPJgJl8"),
        photoKey: "ring_mall",
      },
      {
        time: "10:45", type: "explore", icon: "💍",
        title: "Chongqing Ring Shopping Mall (光环购物公园)",
        note: "Explore the cloud forest-style indoor gardens, take photos in the atrium, browse unique shops. Allow ~2hrs here.",
        mapUrl: gmap("ChIJpbJs0IY0kzYR2Z-wxPJgJl8"),
        photoKey: "ring_mall",
      },
      {
        time: "13:00", type: "food", icon: "🍱",
        title: "Lunch inside Ring Mall",
        note: "Plenty of restaurant options inside the mall — try something local or sit by the garden area",
        mapUrl: gmap("ChIJpbJs0IY0kzYR2Z-wxPJgJl8"),
        photoKey: "ring_mall",
        suggested: true,
      },
      {
        time: "14:15", type: "transport", icon: "🚇",
        title: "Travel → Jiefangbei / hotel area",
        note: "Head back towards the city centre to freshen up before dinner",
        transport: "🚇 Metro Line 6 back (~25min). Or Didi ~20min (¥25–35)",
        mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg"),
      },
      {
        time: "15:00", type: "explore", icon: "🌆",
        title: "Jiefangbei Walking Street & free time",
        note: "Browse shops, grab a coffee, pick up snacks — relax before the evening banquet",
        mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg"),
        photoKey: "jiefangbei",
      },
      {
        time: "17:30", type: "transport", icon: "🚕",
        title: "Travel → Li Yan Ba Guo venue",
        note: "Confirm exact venue address when booking — allow 20–30min travel",
        transport: "🚕 Didi ~20–30min depending on venue location",
        mapUrl: gmap(null, "Li Yan Ba Guo Chongqing court feast"),
      },
      {
        time: "18:00", type: "food", icon: "🍽️",
        title: "Dinner: Chongqing Li Yan Ba Guo — Thousand-Year Court Feast",
        note: "Banquet hours: 6:00–8:30 PM. Book on Klook (cheaper than Trip.com). Traditional court-style feast with performances.",
        mapUrl: gmap(null, "Li Yan Ba Guo Chongqing court feast dinner"),
        photoKey: "hongyadong",
      },
      {
        time: "20:45", type: "transport", icon: "🚕",
        title: "Travel → Hongyadong",
        note: "Head straight to Hongyadong after dinner — perfect timing as the lights fully come on around 8PM",
        transport: "🚕 Didi ~15–20min to Hongyadong. Or taxi from venue.",
        mapUrl: gmap("ChIJmahOdYE0kzYRdS8vX21M4go"),
      },
      {
        time: "21:00", type: "explore", icon: "🏮",
        title: "🌟 Hongyadong — Night Lights",
        note: "THIS is the best time to visit. The 11-level stilted buildings glow against the night sky and river. Walk up the levels, take photos from Qiansimen Bridge across the river, soak in the atmosphere. Allow at least 1.5hrs.",
        mapUrl: gmap("ChIJmahOdYE0kzYRdS8vX21M4go"),
        photoKey: "hongyadong",
      },
      {
        time: "22:30", type: "food", icon: "🍮",
        title: "Dessert: 熹玥盒子 (Xi Yue Box)",
        note: "Trending dessert spot near Jiefangbei — check WeChat mini-program for exact location and menu",
        transport: "🚶 ~10min walk from Hongyadong towards Jiefangbei",
        mapUrl: gmap(null, "熹玥盒子 Xi Yue Box Chongqing"),
        suggested: true,
      },
    ],
  },
  {
    id: "may18",
    date: "May 18 (Mon)",
    title: "Fly Home to Singapore",
    subtitle: "Chongqing → SG | 02:35–07:30",
    emoji: "🏠",
    color: "#fef9c3",
    accent: "#ca8a04",
    events: [
      {
        time: "00:30", type: "transport", icon: "🚕",
        title: "Didi to Jiangbei Airport",
        note: "Pre-book Didi! 30–40min ride, ~¥80–120. Allow extra buffer for late-night.",
        mapUrl: gmap(null, "Chongqing Jiangbei International Airport"),
        photoKey: "ckg_airport",
      },
      {
        time: "02:35", type: "depart", icon: "✈️",
        title: "Depart Chongqing → Singapore",
        note: "Safe travels! 🎉",
      },
      {
        time: "07:30", type: "arrive", icon: "🏠",
        title: "Arrive Singapore Changi Airport",
        note: "Welcome home! 🇸🇬",
      },
    ],
  },
];

const typeColors = {
  arrive: "#dbeafe",
  depart: "#dbeafe",
  hotel: "#ede9fe",
  food: "#fef3c7",
  explore: "#dcfce7",
  transport: "#f1f5f9",
  optional: "#fce7f3",
  note: "#fee2e2",
};

// Days shared across all plans
const sharedDays = days.filter(d => !["may16","may17"].includes(d.id));

const may16_geocentric = {
  id: "may16",
  date: "May 16 (Sat)",
  title: "Geocentric Exploration + 1949 Show",
  subtitle: "Morning adventure → Rest → 1949 Concert",
  emoji: "🌏",
  color: "#fff7ed",
  accent: "#ea580c",
  note: "Pre-book Didi for Geocentric 4 days in advance! ¥133.6 each way, 82min ride.",
  events: [
    { time: "08:00", type: "transport", icon: "🚕", title: "Didi → A Gathering Place for Geocentric Exploration", note: "Long ride out of the city — sit back and enjoy the scenery.", transport: "🚕 Pre-booked Didi — 82min (¥133.6)", mapUrl: gmap(null, "地心说聚集地 A Gathering Place Geocentric Exploration Chongqing"), photoKey: "geocentric" },
    { time: "09:20", type: "explore", icon: "🌏", title: "A Gathering Place for Geocentric Exploration", note: "Unique geological landmark — a one-of-a-kind experience. Allow 3–4hrs.", mapUrl: gmap(null, "地心说聚集地 A Gathering Place Geocentric Exploration Chongqing"), photoKey: "geocentric" },
    { time: "13:00", type: "transport", icon: "🚕", title: "Didi back → city centre", transport: "🚕 Didi ~82min (¥133.6)", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg") },
    { time: "14:30", type: "food", icon: "🍜", title: "Late Lunch: Jiefangbei area", note: "Back in the city — grab a meal near Jiefangbei or Hongyadong area", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg"), photoKey: "jiefangbei", suggested: true },
    { time: "15:30", type: "explore", icon: "🛋️", title: "Rest at hotel", note: "Big morning — relax and freshen up before the evening show", mapUrl: gmap(null, "浩廷高空江景酒店解放碑洪崖洞店 Chongqing") },
    { time: "17:00", type: "transport", icon: "🚕", title: "Travel → Ciqikou area (1949 Theatre)", transport: "🚕 Didi ~25–30min from hotel (¥35–50)", mapUrl: gmap("ChIJjYJETX8zkzYRzCjjUlnEovE") },
    { time: "17:45", type: "food", icon: "🌶️", title: "Early dinner / snacks near Ciqikou", note: "陈麻花, skewers, local bites before the show", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou", suggested: true },
    { time: "19:30", type: "explore", icon: "🎭", title: "Chongqing 1949 Grand Theatre Show", note: "Show time: 7:30 PM. Book on Trip.com or Klook (¥60–250). English translation device available. ~1.5hrs.", mapUrl: gmap("ChIJjYJETX8zkzYRzCjjUlnEovE"), photoKey: "theatre_1949" },
    { time: "21:15", type: "transport", icon: "🚕", title: "Didi back to hotel", transport: "🚕 ~25–30min (¥35–50)", mapUrl: gmap(null, "浩廷高空江景酒店解放碑洪崖洞店 Chongqing") },
  ],
};

const may17_withGeocentric = {
  id: "may17", date: "May 17 (Sun)", title: "Pokémon + Ciqikou + Final Day",
  subtitle: "Starry Street → Longhu Times → Ciqikou → Farewell", emoji: "⭐", color: "#f0f9ff", accent: "#0891b2",
  events: [
    { time: "09:30", type: "explore", icon: "⭐", title: "Starry Street (星光街) — Pokémon spot", note: "Pokémon-themed spots, street art and photo ops. Allow ~1.5hrs.", transport: "🚇 Metro Line 6 → Guanyinqiao (~20min), 🚶 ~5min walk", mapUrl: gmap(null, "星光街 Starry Street Guanyinqiao Chongqing"), photoKey: "starry_st" },
    { time: "11:00", type: "transport", icon: "🚇", title: "Travel → Longhu Times Starry Sky", transport: "🚇 Metro Line 6 → Daping (~20min). Or Didi ~20min (¥20–30)", mapUrl: gmap("ChIJ6311qCLL7DYRdlOBhUw5x5Q") },
    { time: "11:30", type: "explore", icon: "🌲", title: "Longhu Times Starry Sky (龙湖时代天街) — Pokémon", note: "Merch, photo spots, themed décor. Allow ~2hrs.", mapUrl: gmap("ChIJ6311qCLL7DYRdlOBhUw5x5Q"), photoKey: "longhu_pokemon" },
    { time: "13:30", type: "food", icon: "🍜", title: "Lunch inside Longhu Times", mapUrl: gmap("ChIJ6311qCLL7DYRdlOBhUw5x5Q"), photoKey: "longhu_pokemon", suggested: true },
    { time: "14:30", type: "transport", icon: "🚇", title: "Travel → Ciqikou Ancient Town", transport: "🚇 Metro Line 1 → Ciqikou (~25min). Or Didi ~20min (¥25–35)", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE") },
    { time: "15:00", type: "explore", icon: "🏯", title: "Ciqikou Ancient Town", note: "Historic riverside town — temples, mahjong museums, old architecture. Allow ~1.5hrs.", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou" },
    { time: "16:30", type: "food", icon: "🌶️", title: "Snacks in Ciqikou", note: "陈麻花, 毛血旺 and Ciqikou street specialties", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou", suggested: true },
    { time: "17:30", type: "transport", icon: "🚇", title: "Travel → Jiefangbei", transport: "🚇 Metro Line 1 → Xiaoshizi (~25min)", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg") },
    { time: "18:00", type: "explore", icon: "🛍️", title: "Souvenir Shopping: Jiefangbei", note: "Hotpot sauce packets, spices, 江小白 baijiu, local snacks", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg"), photoKey: "jiefangbei" },
    { time: "19:30", type: "food", icon: "🍜", title: "Farewell Dinner: Hotpot or 重庆小面", note: "Last proper Chongqing meal 🌶️", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg", "hotpot Jiefangbei Chongqing"), photoKey: "jiefangbei", suggested: true },
    { time: "22:00", type: "note", icon: "⚠️", title: "Back to hotel — prep for departure", note: "Flight 02:35 — pack tonight, Didi by 00:30. Set multiple alarms!" },
  ],
};

const may16_noGeo = {
  id: "may16", date: "May 16 (Sat)", title: "Pokémon Day + 1949 Show",
  subtitle: "Starry Street → Longhu Times → Ciqikou → 1949 Concert", emoji: "⭐", color: "#fff7ed", accent: "#ea580c",
  events: [
    { time: "09:30", type: "explore", icon: "⭐", title: "Starry Street (星光街) — Pokémon spot", note: "Pokémon-themed spots, street art and photo ops. Allow ~1.5hrs.", transport: "🚇 Metro Line 6 → Guanyinqiao (~20min), 🚶 ~5min walk", mapUrl: gmap(null, "星光街 Starry Street Guanyinqiao Chongqing"), photoKey: "starry_st" },
    { time: "11:00", type: "transport", icon: "🚇", title: "Travel → Longhu Times Starry Sky", transport: "🚇 Metro Line 6 → Daping (~20min). Or Didi ~20min (¥20–30)", mapUrl: gmap("ChIJ6311qCLL7DYRdlOBhUw5x5Q") },
    { time: "11:30", type: "explore", icon: "🌲", title: "Longhu Times Starry Sky (龙湖时代天街) — Pokémon", note: "Merch, photo spots, themed décor. Allow ~2hrs.", mapUrl: gmap("ChIJ6311qCLL7DYRdlOBhUw5x5Q"), photoKey: "longhu_pokemon" },
    { time: "13:30", type: "food", icon: "🍜", title: "Lunch inside Longhu Times", mapUrl: gmap("ChIJ6311qCLL7DYRdlOBhUw5x5Q"), photoKey: "longhu_pokemon", suggested: true },
    { time: "14:45", type: "transport", icon: "🚕", title: "Travel → Ciqikou area (1949 Theatre)", transport: "🚕 Didi from Daping ~25–30min (¥35–50)", mapUrl: gmap("ChIJjYJETX8zkzYRzCjjUlnEovE") },
    { time: "15:30", type: "explore", icon: "🏯", title: "Ciqikou Ancient Town", note: "Historic riverside town — temples, mahjong museums, architecture. Allow ~1.5hrs.", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou" },
    { time: "17:15", type: "food", icon: "🌶️", title: "Early dinner / snacks near Ciqikou", note: "陈麻花, skewers, local bites before the show", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou", suggested: true },
    { time: "19:30", type: "explore", icon: "🎭", title: "Chongqing 1949 Grand Theatre Show", note: "Show time: 7:30 PM. Book on Trip.com or Klook (¥60–250). English translation device available. ~1.5hrs.", mapUrl: gmap("ChIJjYJETX8zkzYRzCjjUlnEovE"), photoKey: "theatre_1949" },
    { time: "21:15", type: "transport", icon: "🚕", title: "Didi back to hotel", transport: "🚕 ~25–30min (¥35–50)", mapUrl: gmap(null, "浩廷高空江景酒店解放碑洪崖洞店 Chongqing") },
  ],
};

const may17_noGeo = {
  id: "may17", date: "May 17 (Sun)", title: "Ciqikou + Shopping + Final Day",
  subtitle: "Ciqikou → Jiefangbei → Farewell", emoji: "🏯", color: "#f0f9ff", accent: "#0891b2",
  events: [
    { time: "09:30", type: "explore", icon: "🏯", title: "Ciqikou Ancient Town (morning stroll)", note: "Take it slow — temples, snacks, old architecture at a relaxed pace.", transport: "🚇 Metro Line 1 → Ciqikou (~30min from hotel)", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou" },
    { time: "11:00", type: "food", icon: "🌶️", title: "Snacks in Ciqikou", note: "陈麻花, 毛血旺 and street specialties", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou", suggested: true },
    { time: "12:00", type: "food", icon: "🍱", title: "Lunch: local Ciqikou restaurant", note: "Chongqing chicken (口水鸡) or fish (水煮鱼)", mapUrl: gmap("ChIJ8xTyJvjL7DYRaxlsvpdbeTE"), photoKey: "ciqikou", suggested: true },
    { time: "13:30", type: "transport", icon: "🚇", title: "Travel → Jiefangbei", transport: "🚇 Metro Line 1 → Xiaoshizi (~25min)", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg") },
    { time: "14:00", type: "explore", icon: "🛍️", title: "Souvenir Shopping: Jiefangbei", note: "Hotpot sauce packets, spices, 江小白 baijiu, local snacks", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg"), photoKey: "jiefangbei" },
    { time: "16:00", type: "explore", icon: "🌆", title: "Free time / rest at hotel", mapUrl: gmap(null, "浩廷高空江景酒店解放碑洪崖洞店 Chongqing") },
    { time: "18:30", type: "food", icon: "🍜", title: "Farewell Dinner: Hotpot or 重庆小面", note: "Last proper Chongqing meal 🌶️", mapUrl: gmap("ChIJ1S7X6oY0kzYRIyiS3lG6Abg", "hotpot Jiefangbei Chongqing"), photoKey: "jiefangbei", suggested: true },
    { time: "20:30", type: "explore", icon: "🚢", title: "Optional: Yangtze River Night Cruise", note: "45-min cruise from Chaotianmen — lit-up city skyline. Tickets ¥138–158 at the dock.", optional: true, transport: "🚶 ~15min walk from Jiefangbei", mapUrl: gmap("ChIJ98QLoHg0kzYRYe0iViXmtGc"), photoKey: "cruise" },
    { time: "22:00", type: "note", icon: "⚠️", title: "Back to hotel — prep for departure", note: "Flight 02:35 — pack tonight, Didi by 00:30. Set multiple alarms!" },
  ],
};

const plans = {
  B: {
    label: "Plan B — With Geocentric 🌏",
    desc: "May 16: Geocentric Exploration + 1949 · May 17: Pokémon + Ciqikou",
    color: "#ea580c",
    light: "#fff7ed",
    days16_17: [may16_geocentric, may17_withGeocentric],
  },
  C: {
    label: "Plan C — City Only ⭐",
    desc: "May 16: Pokémon + Ciqikou + 1949 · May 17: Ciqikou + Shopping",
    color: "#7c3aed",
    light: "#f5f3ff",
    days16_17: [may16_noGeo, may17_noGeo],
  },
};

export default function Itinerary() {
  const [activePlan, setActivePlan] = useState("B");
  const [activeDay, setActiveDay] = useState("may12");
  const plan = plans[activePlan];
  const allDays = [
    ...sharedDays.filter(d => ["may12","may13","may14","may15"].includes(d.id)),
    ...plan.days16_17,
    sharedDays.find(d => d.id === "may18"),
  ];
  const currentDay = allDays.find(d => d.id === activeDay) || allDays[0];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#fafaf8", minHeight: "100vh" }}>


      <div style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 100%)",
        color: "white", padding: "32px 24px 20px", textAlign: "center",
      }}>
        <div style={{ fontSize: 13, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7, marginBottom: 8 }}>Travel Itinerary</div>
        <h1 style={{ fontSize: 28, fontWeight: "bold", margin: "0 0 4px", fontFamily: "'Georgia', serif" }}>
          Okinawa → Shanghai → Chongqing
        </h1>
        <div style={{ fontSize: 14, opacity: 0.75, marginBottom: 20 }}>May 12–18, 2025</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {Object.entries(plans).map(([key, p]) => (
            <button key={key} onClick={() => { setActivePlan(key); setActiveDay("may12"); }} style={{
              padding: "8px 18px", borderRadius: 24,
              border: activePlan === key ? "2px solid white" : "2px solid rgba(255,255,255,0.3)",
              background: activePlan === key ? "white" : "rgba(255,255,255,0.1)",
              color: activePlan === key ? p.color : "white",
              fontWeight: activePlan === key ? "700" : "400",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>{p.label}</button>
          ))}
        </div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 10, fontStyle: "italic" }}>{plan.desc}</div>
      </div>

      <div style={{ overflowX: "auto", background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", minWidth: "max-content", padding: "0 16px" }}>
          {allDays.map((d) => (
            <button key={d.id} onClick={() => setActiveDay(d.id)} style={{
              padding: "12px 16px", border: "none", background: "none", cursor: "pointer",
              borderBottom: activeDay === d.id ? `3px solid ${plan.color}` : "3px solid transparent",
              color: activeDay === d.id ? plan.color : "#6b7280",
              fontWeight: activeDay === d.id ? "700" : "400",
              fontSize: 13, whiteSpace: "nowrap", fontFamily: "inherit",
            }}>
              <span style={{ marginRight: 4 }}>{d.emoji}</span>{d.date}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
        {/* Day header */}
        <div style={{
          background: currentDay.color, borderLeft: `5px solid ${currentDay.accent}`,
          borderRadius: 12, padding: "16px 20px", marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 36 }}>{currentDay.emoji}</span>
            <div>
              <div style={{ fontSize: 12, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase" }}>{currentDay.date}</div>
              <div style={{ fontSize: 22, fontWeight: "bold", color: "#1f2937" }}>{currentDay.title}</div>
              <div style={{ fontSize: 13, color: currentDay.accent, marginTop: 2 }}>{currentDay.subtitle}</div>
              {currentDay.note && <div style={{ fontSize: 13, color: "#374151", marginTop: 8, fontStyle: "italic" }}>ℹ️ {currentDay.note}</div>}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 12, color: "#6b7280" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: "#fffbeb", border: "1.5px solid #f59e0b", display: "inline-block" }}></span>
            Suggested by Claude
          </span>
        </div>

        {/* Events */}
        <div>
          {currentDay.events.map((event, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 4 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 52, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace", marginTop: 16, whiteSpace: "nowrap" }}>{event.time}</div>
                <div style={{ width: 2, flex: 1, background: i < currentDay.events.length - 1 ? "#e5e7eb" : "transparent", marginTop: 4, minHeight: 20 }} />
              </div>

              <div style={{
                flex: 1,
                background: event.suggested ? "#fffbeb" : event.optional ? "#fdf4ff" : "#fff",
                border: event.suggested ? "1.5px solid #f59e0b" : event.optional ? "1px solid #e9d5ff" : "1px solid #f3f4f6",
                borderRadius: 10, padding: "12px 16px", marginBottom: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 22, lineHeight: 1, marginTop: 1, background: typeColors[event.type] || "#f3f4f6", borderRadius: 8, padding: "4px 6px" }}>
                    {event.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: "600", fontSize: 14, color: "#111827" }}>{event.title}</span>
                      {event.suggested && (
                        <span style={{ fontSize: 10, background: "#fef3c7", color: "#92400e", padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>✨ SUGGESTED</span>
                      )}
                      {event.optional && !event.suggested && (
                        <span style={{ fontSize: 10, background: "#ede9fe", color: "#6d28d9", padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>OPTIONAL</span>
                      )}
                    </div>
                    {event.note && <div style={{ fontSize: 13, color: "#374151", marginTop: 4, lineHeight: 1.5 }}>{event.note}</div>}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                      {event.transport && (
                        <div style={{ fontSize: 12, color: "#2563eb", background: "#eff6ff", padding: "4px 8px", borderRadius: 6 }}>{event.transport}</div>
                      )}
                      {event.mapUrl && (<>
                        <a href={amap(event.title)} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          fontSize: 12, color: "#16a34a", background: "#f0fdf4",
                          padding: "4px 8px", borderRadius: 6, textDecoration: "none", border: "1px solid #bbf7d0",
                        }}>📍 Maps</a>
                        <a href={didi(event.title)} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          fontSize: 12, color: "#d97706", background: "#fffbeb",
                          padding: "4px 8px", borderRadius: 6, textDecoration: "none", border: "1px solid #fde68a",
                        }}>🚕 Didi</a>
                      </>)}
                      {event.photoKey && !event.suggested && (
                        <a href={`https://www.google.com/search?q=${encodeURIComponent(PHOTO_QUERIES[event.photoKey] || event.title)}&tbm=isch`} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          fontSize: 12, color: "#7c3aed", background: "#f5f3ff",
                          padding: "4px 8px", borderRadius: 6, textDecoration: "none", border: "1px solid #ddd6fe",
                        }}>📸 Photos</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#1e3a5f", color: "white", padding: "24px", marginTop: 24 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", opacity: 0.7 }}>Key Reminders</div>
          {[
            "🎭 Book Chongqing 1949 show in advance on Trip.com or Klook",
            "🦀 Li Bai Crab Roe Noodles — go early to avoid long queues",
            "🍽️ Li Yan Ba Guo Court Feast — Klook is cheaper than Trip.com, book in advance",
            "🚕 Plan B: Pre-book Didi for Geocentric Exploration 4 days ahead (¥133.6, 82min each way)",
            "✈️ May 18 flight is 02:35 AM — arrange Didi by 00:30, set multiple alarms!",
          ].map((tip, i) => (
            <div key={i} style={{ fontSize: 13, marginBottom: 6, opacity: 0.88, lineHeight: 1.5 }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}


