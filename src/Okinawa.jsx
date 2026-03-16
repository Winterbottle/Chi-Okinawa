import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const gmaps = (name) =>
  `https://www.google.com/maps/search/${encodeURIComponent(name + " Okinawa Japan")}`;

const BOOKMARKS = [
  {
    id: "cafe", title: "Café & Drinks", emoji: "☕",
    color: "#92400e", light: "#fef8ed", border: "#f5d5a0",
    places: [
      { name: "Zhyvago Coffee Roastery",    coord: [26.301, 127.746], hours: "7:00–22:00" },
      { name: "PST Okinawa by the Sea",     coord: [26.521, 127.898], hours: "12:00–15:00, 17:00–22:00" },
      { name: "BURUNO",                     coord: [26.527, 127.984], hours: "9:00–17:00" },
      { name: "Bookcafe Okinawa Rail",      coord: [26.244, 127.713], hours: "11:00–17:00 (closed Mon & Tue)" },
    ],
  },
  {
    id: "food", title: "Food & Restaurants", emoji: "🍜",
    color: "#b91c1c", light: "#fff5f5", border: "#fca5a5",
    places: [
      { name: "Takaesu Soba",                              coord: [26.341, 127.764], hours: "10:00–15:45 (closed Sun)" },
      { name: "Miyazato Soba",                             coord: [26.155, 127.669], hours: "10:00–sold out (closed Wed)" },
      { name: "Pizzeria da Enzo",                          coord: [26.449, 127.804], hours: "11:30–15:00, 17:30–22:00" },
      { name: "Hamanoya Restaurant",                       coord: [26.421, 127.822], hours: "11:00–21:30 (L.O. 20:00)" },
      { name: "Nagumagai Restaurant",                      coord: [26.680, 128.270], hours: "Call ahead (closed Thu)" },
      { name: "Restaurant Flipper",                        coord: [26.652, 128.100], hours: "10:30–22:00 (closed Wed)" },
      { name: "Umi-to-Mugi-to",                            coord: [26.668, 127.875], hours: "Call ahead (closed Tue)" },
      { name: "Sunrise Higashi",                           coord: [26.697, 128.271], hours: "7:00–21:00" },
      { name: "Itoman Fishing Cooperative Fish Center",    coord: [26.117, 127.665], hours: "10:00–19:00" },
    ],
  },
  {
    id: "shopping", title: "Shopping", emoji: "🛍️",
    color: "#7c3aed", light: "#faf5ff", border: "#c4b5fd",
    places: [
      { name: "AEON MALL Okinawa Rycom",      coord: [26.308, 127.797], hours: "8:00–23:00 (varies by floor)" },
      { name: "Pokemon Center Okinawa",       coord: [26.308, 127.797], hours: "10:00–21:00" },
      { name: "Modeler's Core",               coord: [26.380, 127.803], hours: "10:00–20:00" },
      { name: "Rider's Shop Stec5",           coord: [26.322, 127.793], hours: "10:00–19:00" },
      { name: "2nd LIFE",                     coord: [26.247, 127.717], hours: "11:00–19:00" },
      { name: "Tsukumo",                      coord: [26.219, 127.688], hours: "10:00–21:00" },
      { name: "Surugaya Naha Okiei-dori",     coord: [26.216, 127.689], hours: "11:00–20:00" },
      { name: "Nuchima-su Salt Factory",      coord: [26.386, 127.972], hours: "9:00–18:00" },
    ],
  },
  {
    id: "culture", title: "History & Culture", emoji: "🏯",
    color: "#b45309", light: "#fffbeb", border: "#fcd34d",
    places: [
      { name: "Katsuren Castle Ruins",                      coord: [26.331, 127.879], hours: "9:00–18:00" },
      { name: "Peace Memorial Park",                        coord: [26.095, 127.725], hours: "8:00–22:00 (museum 9:00–17:00)" },
      { name: "Okinawa World",                              coord: [26.171, 127.742], hours: "9:00–17:30 (last entry 16:00)" },
      { name: "Yanbaru Kuina Ecological Exhibition Center", coord: [26.712, 128.254], hours: "9:00–17:00 (closed Wed)" },
      { name: "Higashi-son Fureai Hirugi Park",             coord: [26.699, 128.170], hours: "9:00–18:00" },
    ],
  },
  {
    id: "nature", title: "Nature & Scenery", emoji: "🌊",
    color: "#0369a1", light: "#f0f9ff", border: "#7dd3fc",
    places: [
      { name: "Cape Hedo",             coord: [26.867, 128.261], hours: "24 hr" },
      { name: "Cape Maeda",            coord: [26.444, 127.763], hours: "24 hr (diving ops 8:00–17:00)" },
      { name: "Blue Cave",             coord: [26.444, 127.773], hours: "Dive tours 8:00–17:00" },
      { name: "Cape Chinen Park",      coord: [26.153, 127.795], hours: "24 hr" },
      { name: "Kayauchi Banta",        coord: [26.854, 128.249], hours: "24 hr" },
      { name: "Bise-Fukugi Tree Road", coord: [26.704, 127.881], hours: "24 hr" },
      { name: "Kanucha Beach",         coord: [26.549, 128.076], hours: "24 hr" },
    ],
  },
  {
    id: "attractions", title: "Attractions & Theme Parks", emoji: "🎡",
    color: "#15803d", light: "#f0fdf4", border: "#86efac",
    places: [
      { name: "Okinawa Churaumi Aquarium",      coord: [26.694, 127.878], hours: "8:30–18:30 (L.O. 17:30)" },
      { name: "DMM Kariyushi Aquarium Okinawa", coord: [26.156, 127.650], hours: "9:00–20:00" },
      { name: "Junglia Okinawa",                coord: [26.642, 127.974], hours: "10:00–19:00 (hours vary)" },
      { name: "Nago Pineapple Park",            coord: [26.616, 127.970], hours: "10:00–18:00" },
      { name: "Orion Happy Park",               coord: [26.589, 127.983], hours: "9:30–17:00 (closed Wed & Thu)" },
      { name: "Ryujin Hot Springs",             coord: [26.193, 127.669], hours: "6:00–24:00" },
      { name: "PARCO CITY Observation Deck",    coord: [26.289, 127.737], hours: "10:00–23:00" },
      { name: "ricoland Okinawa",               coord: [26.247, 127.736], hours: "11:00–20:00 (10:00–19:30 weekend)" },
    ],
  },
  {
    id: "roadside", title: "Roadside Stations & Markets", emoji: "🛣️",
    color: "#ea580c", light: "#fff7ed", border: "#fdba74",
    places: [
      { name: "Yuiyui Kunigami (Michi no Eki)",              coord: [26.732, 128.169], hours: "9:00–18:00" },
      { name: "Ogimi Roadside Station / Yambaru-no-mori",    coord: [26.698, 128.151], hours: "9:00–18:00" },
      { name: "Road Station Yanbaru Pineapple Hill Aha",     coord: [26.705, 128.166], hours: "9:00–18:00" },
      { name: "Roadside Station Kyoda",                      coord: [26.552, 127.969], hours: "9:00–18:00" },
      { name: "Ginoza Roadside Station",                     coord: [26.474, 127.952], hours: "9:00–18:00" },
    ],
  },
  {
    id: "bath", title: "Baths & Showers", emoji: "🛁",
    color: "#0d9488", light: "#f0fdfa", border: "#99f6e4",
    places: [
      { name: "Ryujin Hot Springs (Day Use)",    coord: [26.193, 127.669], hours: "6:00–24:00" },
      { name: "Terme VILLA Chura-yu (Chatan)",  coord: [26.317, 127.759], hours: "7:00–23:00 (L.O. 22:00)" },
      { name: "Rikkarikkayu (Naha)",            coord: [26.213, 127.684], hours: "6:00–23:00" },
      { name: "Kouri Beach Coin Showers",       coord: [26.695, 128.022], hours: "9:00–18:00" },
      { name: "Okuma Beach Shower Facilities",  coord: [26.729, 128.134], hours: "9:00–18:00" },
    ],
  },
  {
    id: "toilet", title: "Public Toilets", emoji: "🚻",
    color: "#475569", light: "#f8fafc", border: "#cbd5e1",
    places: [
      { name: "Naminoue Beach Park Toilet",      coord: [26.223, 127.681], hours: "24 hr" },
      { name: "Cape Zanpa Park Toilet",          coord: [26.408, 127.719], hours: "24 hr" },
      { name: "Emerald Beach / Ocean Expo Park", coord: [26.697, 127.867], hours: "24 hr" },
      { name: "Okuma Beach Park Toilet",         coord: [26.729, 128.135], hours: "24 hr" },
      { name: "Cape Hedo Toilet",                coord: [26.865, 128.260], hours: "24 hr" },
    ],
  },
  {
    id: "petrol", title: "Petrol Stations", emoji: "⛽",
    color: "#dc2626", light: "#fef2f2", border: "#fca5a5",
    places: [
      { name: "ENEOS Urasoe (near Asoviva Works)",        coord: [26.249, 127.721], hours: "24 hr" },
      { name: "ENEOS Nago (Route 58)",                    coord: [26.597, 127.975], hours: "24 hr" },
      { name: "Last Station before Cape Hedo (Kunigami)", coord: [26.729, 128.151], hours: "7:00–20:00" },
    ],
  },
  {
    id: "campsite", title: "Campsites", emoji: "⛺",
    color: "#4d7c0f", light: "#f7fee7", border: "#bef264",
    places: [
      { name: "Yagaji Beach Campsite (Nago) 🚿🚻",         coord: [26.659, 128.015], hours: "Check-in 13:00 / Out 11:00" },
      { name: "Hiji Waterfall Campsite (Kunigami) 🚿🚻",   coord: [26.719, 128.180], hours: "Check-in 14:00 / Out 10:00" },
      { name: "Kunigami Forest Park Campsite 🚿🚻",        coord: [26.789, 128.205], hours: "Check-in 14:00 / Out 10:00" },
      { name: "Tonokiya Camp (Ogimi) 🚿🚻",               coord: [26.715, 128.088], hours: "Check-in 13:00 / Out 11:00" },
      { name: "Okuma Beach Campsite (Kunigami) 🚿🚻",     coord: [26.729, 128.134], hours: "Check-in 14:00 / Out 11:00" },
      { name: "Okinawa Sports Park Auto Campjo 🚿🚻",     coord: [26.357, 127.808], hours: "Check-in 15:00 / Out 10:00" },
    ],
  },
];

const DAYS = [
  {
    id: "may7", label: "May 7 (Thu)", type: "arrive",
    headline: "Arrival + South Okinawa Loop", color: "#0369a1",
    drive: "Asoviva Works → Naha → Itoman → Cape Chinen → camp",
    schedule: [
      { time: "08:00", icon: "✈️", activity: "Land at Naha Airport" },
      { time: "09:00", icon: "🚐", activity: "Pick up campervan @ Asoviva Works (Urasoe)" },
      { time: "10:30", icon: "🛍️", activity: "Naha — Tsukumo / Surugaya / 2nd LIFE (Kokusai Dori area)" },
      { time: "12:30", icon: "🍜", activity: "Lunch @ Miyazato Soba (Itoman)" },
      { time: "14:00", icon: "🐟", activity: "Itoman Fishing Cooperative Fish Center" },
      { time: "15:30", icon: "🕊️", activity: "Peace Memorial Park" },
      { time: "17:00", icon: "🌅", activity: "Cape Chinen Park (sunset views over Pacific)" },
      { time: "19:00", icon: "🌺", activity: "Okinawa World (Gyokusendo Cave area)" },
      { time: "21:00", icon: "⛺", activity: "Camp @ Okinawa Sports Park Auto Campjo 🚿🚻" },
    ],
  },
  {
    id: "may8", label: "May 8 (Fri)", type: "free",
    headline: "Blue Cave Diving + Chatan", color: "#0891b2",
    drive: "Camp → Cape Maeda (Blue Cave) → Chatan → AEON Rycom",
    schedule: [
      { time: "08:30", icon: "🚐", activity: "Drive north to Cape Maeda (~45 min from camp)" },
      { time: "10:00", icon: "🤿", activity: "DIVING — Blue Cave at Cape Maeda ⭐ (book in advance!)" },
      { time: "13:00", icon: "☕", activity: "Lunch & coffee near Cape Maeda / Onna village" },
      { time: "14:30", icon: "🛁", activity: "Terme VILLA Chura-yu, Chatan — shower & soak" },
      { time: "16:00", icon: "☕", activity: "Zhyvago Coffee Roastery (American Village)" },
      { time: "17:30", icon: "🛍️", activity: "AEON Mall Rycom — Pokemon Center, Modeler's Core" },
      { time: "19:30", icon: "🍕", activity: "Dinner @ Pizzeria da Enzo or Hamanoya Restaurant" },
      { time: "21:30", icon: "⛺", activity: "Camp @ Yagaji Beach Campsite 🚿🚻" },
    ],
  },
  {
    id: "may9", label: "May 9 (Sat)", type: "free",
    headline: "Nago + Motobu + Churaumi", color: "#15803d",
    drive: "Yagaji → Nago → Motobu Peninsula → Churaumi → camp north",
    schedule: [
      { time: "09:00", icon: "🍍", activity: "Nago Pineapple Park" },
      { time: "10:30", icon: "🍺", activity: "Orion Happy Park — brewery tour + tasting" },
      { time: "12:00", icon: "🍜", activity: "Lunch @ Umi-to-Mugi-to (noodles, northern Okinawa)" },
      { time: "13:30", icon: "🐟", activity: "Okinawa Churaumi Aquarium + Emerald Beach (free)" },
      { time: "16:30", icon: "🌿", activity: "Bise-Fukugi Tree Road — walk through ancient trees" },
      { time: "18:00", icon: "🎡", activity: "Junglia Okinawa (optional — book tickets ahead)" },
      { time: "20:00", icon: "⛺", activity: "Camp @ Okuma Beach Campsite 🚿🚻 (Kunigami)" },
    ],
  },
  {
    id: "may10", label: "May 10 (Sun)", type: "free",
    headline: "Cape Hedo + Yanbaru East Coast", color: "#7c3aed",
    drive: "Okuma → Cape Hedo → East coast south (Route 329) → camp",
    schedule: [
      { time: "08:00", icon: "🚐", activity: "Drive to Cape Hedo (~1 hr from Okuma)" },
      { time: "09:00", icon: "🌊", activity: "Cape Hedo — northernmost tip of Okinawa ⭐" },
      { time: "10:30", icon: "🏔️", activity: "Kayauchi Banta — dramatic 70m cliffs" },
      { time: "11:30", icon: "🛣️", activity: "Yuiyui Kunigami roadside station — lunch & local goods" },
      { time: "13:00", icon: "🐦", activity: "Yanbaru Kuina Ecological Exhibition Center" },
      { time: "14:30", icon: "💦", activity: "Hiji Waterfall hike" },
      { time: "16:30", icon: "🌿", activity: "Higashi-son Fureai Hirugi Park (mangroves)" },
      { time: "18:30", icon: "🍽️", activity: "Dinner @ Nagumagai or Sunrise Higashi" },
      { time: "21:00", icon: "⛺", activity: "Camp @ Hiji Waterfall Campsite or Tonokiya 🚿🚻" },
    ],
  },
  {
    id: "may11", label: "May 11 (Mon)", type: "free",
    headline: "East Coast South + Last Naha", color: "#b45309",
    drive: "Camp → Ginoza → Katsuren → Naha (south on Route 329/13)",
    schedule: [
      { time: "09:00", icon: "🛣️", activity: "Ogimi Roadside Station & Ginoza Roadside Station (coffee stop)" },
      { time: "10:30", icon: "🏯", activity: "Katsuren Castle Ruins (UNESCO World Heritage)" },
      { time: "12:00", icon: "🍜", activity: "Lunch @ Takaesu Soba (central Okinawa)" },
      { time: "13:30", icon: "🎡", activity: "DMM Kariyushi Aquarium (Toyosaki)" },
      { time: "15:30", icon: "🛍️", activity: "Kokusai Dori & Tsuboya Yachimun Street (last Naha browse)" },
      { time: "17:30", icon: "🗼", activity: "PARCO CITY Observation Deck — sunset over Naha" },
      { time: "19:00", icon: "🍶", activity: "Dinner @ Urizun (awamori & Okinawan cuisine)" },
      { time: "21:00", icon: "⛺", activity: "Camp near Urasoe / Asoviva Works area 🚿🚻" },
    ],
  },
  {
    id: "may12", label: "May 12 (Tue)", type: "depart",
    headline: "Departure Day", color: "#c2410c",
    drive: "Camp → Asoviva Works → Naha Airport",
    schedule: [
      { time: "09:00", icon: "☕", activity: "Morning coffee & last browse near Naha" },
      { time: "11:00", icon: "🛍️", activity: "Last-minute shopping — Bookcafe Okinawa Rail or ricoland" },
      { time: "12:30", icon: "🍜", activity: "Final Okinawa lunch (soba or nearby spot)" },
      { time: "13:00", icon: "🚐", activity: "Return campervan to Asoviva Works" },
      { time: "13:30", icon: "⏰", activity: "Deadline — van returned ✅" },
      { time: "14:00", icon: "🛫", activity: "Head to Naha Airport" },
      { time: "15:00", icon: "✈️", activity: "Spring Airlines 9C6978 departs Naha → Shanghai" },
      { time: "16:35", icon: "🏙️", activity: "Arrive Shanghai Pudong ✅" },
    ],
  },
];

// Per-day driving routes with color matching the day
const DAY_ROUTES = [
  {
    id: "may7", label: "May 7", color: "#0369a1",
    path: [
      [26.249, 127.721], // Asoviva Works / start
      [26.217, 127.687], // Naha city
      [26.158, 127.673], // Naha south
      [26.117, 127.665], // Itoman (Fish Center, Soba)
      [26.097, 127.725], // Peace Memorial Park
      [26.153, 127.795], // Cape Chinen
      [26.171, 127.742], // Okinawa World
      [26.217, 127.687], // back through Naha
      [26.249, 127.721], // Urasoe
      [26.357, 127.808], // Sports Park camp ⛺
    ],
  },
  {
    id: "may8", label: "May 8", color: "#0891b2",
    path: [
      [26.357, 127.808], // Sports Park camp start
      [26.249, 127.721], // through Urasoe
      [26.317, 127.759], // Chatan
      [26.408, 127.719], // Cape Zanpa coast
      [26.444, 127.763], // Cape Maeda / Blue Cave ⭐
      [26.490, 127.820], // Onna village
      [26.317, 127.759], // back to Chatan (Terme VILLA)
      [26.308, 127.797], // AEON Rycom
      [26.400, 127.820], // heading north
      [26.500, 127.870], // Route 58 north
      [26.591, 127.978], // Nago
      [26.659, 128.015], // Yagaji Beach camp ⛺
    ],
  },
  {
    id: "may9", label: "May 9", color: "#15803d",
    path: [
      [26.659, 128.015], // Yagaji camp start
      [26.616, 127.970], // Pineapple Park
      [26.589, 127.983], // Orion Happy Park
      [26.591, 127.978], // Nago
      [26.668, 127.875], // Umi-to-Mugi-to
      [26.694, 127.878], // Churaumi Aquarium
      [26.704, 127.881], // Bise-Fukugi Tree Road
      [26.680, 127.930], // Nakijin area
      [26.642, 127.974], // Junglia Okinawa
      [26.680, 128.020], // heading northeast
      [26.729, 128.134], // Okuma Beach camp ⛺
    ],
  },
  {
    id: "may10", label: "May 10", color: "#7c3aed",
    path: [
      [26.729, 128.134], // Okuma camp start
      [26.780, 128.165], // northwest Kunigami coast
      [26.800, 128.200], // further north
      [26.867, 128.261], // Cape Hedo ⭐
      [26.854, 128.249], // Kayauchi Banta
      [26.789, 128.205], // Kunigami forest
      [26.732, 128.169], // Yuiyui Kunigami
      [26.719, 128.180], // Hiji Waterfall
      [26.715, 128.088], // Tonokiya / Ogimi
      [26.699, 128.170], // Higashi-son (mangroves)
      [26.697, 128.271], // Sunrise Higashi (dinner)
      [26.719, 128.180], // camp ⛺ (Hiji/Tonokiya)
    ],
  },
  {
    id: "may11", label: "May 11", color: "#b45309",
    path: [
      [26.719, 128.180], // camp start
      [26.698, 128.151], // Ogimi Roadside Station
      [26.474, 127.952], // Ginoza Roadside
      [26.400, 127.860], // Route 329 south
      [26.331, 127.879], // Katsuren Castle
      [26.308, 127.797], // AEON Rycom
      [26.280, 127.750], // heading to Naha
      [26.156, 127.650], // DMM Kariyushi Aquarium
      [26.219, 127.688], // Kokusai Dori / Naha
      [26.289, 127.737], // PARCO CITY
      [26.249, 127.721], // Urasoe / camp ⛺
    ],
  },
  {
    id: "may12", label: "May 12", color: "#c2410c",
    path: [
      [26.249, 127.721], // camp / Asoviva Works
      [26.217, 127.687], // Naha city (shopping)
      [26.209, 127.647], // Naha Airport ✈️
    ],
  },
];

const makeIcon = (emoji, color) =>
  L.divIcon({
    html: `<div style="background:${color};width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);">${emoji}</div>`,
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });

export default function Okinawa() {
  const [activeTab, setActiveTab] = useState("may7");
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeDayRoutes, setActiveDayRoutes] = useState(null); // null = show all

  const day = DAYS.find(d => d.id === activeTab);

  const visibleCats = activeFilter
    ? BOOKMARKS.filter(c => c.id === activeFilter)
    : BOOKMARKS;

  const visibleRoutes = activeDayRoutes
    ? DAY_ROUTES.filter(r => r.id === activeDayRoutes)
    : DAY_ROUTES;

  const tabBtn = (id, label, isActive) => (
    <button key={id} onClick={() => setActiveTab(id)} style={{
      padding: "12px 14px", background: "none", border: "none",
      borderBottom: isActive ? "3px solid #0891b2" : "3px solid transparent",
      color: isActive ? "#0891b2" : "#6b7280",
      fontWeight: isActive ? 700 : 400,
      cursor: "pointer", fontSize: 12, fontFamily: "inherit", whiteSpace: "nowrap",
    }}>{label}</button>
  );

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#fafaf8", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0891b2 100%)",
        color: "white", padding: "28px 24px 20px", textAlign: "center",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", opacity: 0.65, marginBottom: 6 }}>
          Travel Itinerary
        </div>
        <h1 style={{ fontSize: 26, fontWeight: "bold", margin: "0 0 4px" }}>
          Singapore → Okinawa 🌺
        </h1>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 16 }}>May 7–12, 2026 · Campervan Adventure</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {["✈️ Arrive ~08:00 May 7", "🚐 ASOVIVAN Type 4 Camper", "✈️ Depart 15:00 May 12"].map((t, i) => (
            <span key={i} style={{ background: "rgba(255,255,255,0.15)", padding: "5px 13px", borderRadius: 20, fontSize: 12 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", overflowX: "auto" }}>
        <div style={{ display: "flex", minWidth: "max-content", padding: "0 12px" }}>
          {DAYS.map(d =>
            tabBtn(
              d.id,
              `${d.type === "arrive" ? "✈️ " : d.type === "depart" ? "🛫 " : ""}${d.label}`,
              activeTab === d.id
            )
          )}
          {tabBtn("map", "🗺️ Map & Bookmarks", activeTab === "map")}
        </div>
      </div>

      {/* Day content */}
      {activeTab !== "map" && day && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
          {/* Day header */}
          <div style={{
            background: day.color, color: "white",
            borderRadius: 14, padding: "16px 20px", marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, opacity: 0.75, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>
              {day.label}
            </div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{day.headline}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>🚐 {day.drive}</div>
          </div>

          {/* Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {day.schedule.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 0, position: "relative" }}>
                {/* Line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "white", border: `2px solid ${day.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, zIndex: 1, flexShrink: 0,
                  }}>{item.icon}</div>
                  {i < day.schedule.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 12, background: `${day.color}30` }} />
                  )}
                </div>
                {/* Content */}
                <div style={{
                  flex: 1, background: "white", borderRadius: 10,
                  padding: "8px 12px", marginBottom: 6, marginLeft: 8,
                  border: "1px solid #e5e7eb",
                }}>
                  <div style={{ fontSize: 10, color: day.color, fontWeight: 700, marginBottom: 2 }}>{item.time}</div>
                  <div style={{ fontSize: 13, color: "#111827" }}>{item.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map & Bookmarks tab */}
      {activeTab === "map" && (
        <>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#111827", textAlign: "center" }}>
              🗺️ Okinawa Bookmarks
            </div>

            {/* Category filter pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
              <button onClick={() => setActiveFilter(null)} style={{
                padding: "5px 12px", borderRadius: 20, border: "none",
                background: !activeFilter ? "#111827" : "#e5e7eb",
                color: !activeFilter ? "white" : "#374151",
                fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: !activeFilter ? 700 : 400,
              }}>All</button>
              {BOOKMARKS.map(cat => (
                <button key={cat.id} onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)} style={{
                  padding: "5px 12px", borderRadius: 20, border: "none",
                  background: activeFilter === cat.id ? cat.color : cat.light,
                  color: activeFilter === cat.id ? "white" : cat.color,
                  fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                  fontWeight: activeFilter === cat.id ? 700 : 400,
                  border: `1px solid ${cat.border}`,
                }}>{cat.emoji} {cat.title}</button>
              ))}
            </div>

            {/* Route day filter */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center", marginBottom: 6, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
                Route Filter
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
                <button onClick={() => setActiveDayRoutes(null)} style={{
                  padding: "4px 10px", borderRadius: 20, border: "none",
                  background: !activeDayRoutes ? "#111827" : "#e5e7eb",
                  color: !activeDayRoutes ? "white" : "#374151",
                  fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: !activeDayRoutes ? 700 : 400,
                }}>All Days</button>
                {DAY_ROUTES.map(r => (
                  <button key={r.id} onClick={() => setActiveDayRoutes(activeDayRoutes === r.id ? null : r.id)} style={{
                    padding: "4px 10px", borderRadius: 20,
                    background: activeDayRoutes === r.id ? r.color : "white",
                    color: activeDayRoutes === r.id ? "white" : r.color,
                    fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                    fontWeight: activeDayRoutes === r.id ? 700 : 400,
                    border: `1.5px solid ${r.color}`,
                  }}>{r.label}</button>
                ))}
              </div>
            </div>

            {/* Route legend */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
              {DAY_ROUTES.map(r => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#374151" }}>
                  <div style={{
                    width: 24, height: 3, background: r.color, borderRadius: 2,
                    opacity: !activeDayRoutes || activeDayRoutes === r.id ? 1 : 0.25,
                  }} />
                  <span style={{ opacity: !activeDayRoutes || activeDayRoutes === r.id ? 1 : 0.4 }}>{r.label}</span>
                </div>
              ))}
            </div>

            {/* Leaflet Map */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1.5px solid #d1d5db", height: 700 }}>
                <MapContainer
                  center={[26.49, 127.97]}
                  zoom={9}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {visibleRoutes.map(r => (
                    <Polyline
                      key={r.id}
                      positions={r.path}
                      pathOptions={{ color: r.color, weight: 3.5, opacity: 0.85, dashArray: "8 5" }}
                    />
                  ))}
                  {visibleCats.map(cat =>
                    cat.places.map((place, i) => (
                      <Marker
                        key={`${cat.id}-${i}`}
                        position={place.coord}
                        icon={makeIcon(cat.emoji, cat.color)}
                      >
                        <Popup>
                          <div style={{ minWidth: 160 }}>
                            <div style={{
                              background: cat.color, color: "white",
                              margin: "-7px -7px 8px", padding: "6px 10px",
                              borderRadius: "4px 4px 0 0", fontSize: 12, fontWeight: 700,
                            }}>{cat.emoji} {cat.title}</div>
                            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{place.name}</div>
                            {place.hours && (
                              <div style={{ fontSize: 11, color: "#374151", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                                <span>🕐</span><span>{place.hours}</span>
                              </div>
                            )}
                            <a href={gmaps(place.name)} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 11, color: "#16a34a", textDecoration: "none" }}>
                              📍 Open in Google Maps
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    ))
                  )}
                </MapContainer>
            </div>
          </div>

          {/* Bookmarks list */}
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {visibleCats.map(cat => (
                <div key={cat.id} style={{
                  background: cat.light, border: `1.5px solid ${cat.border}`,
                  borderRadius: 14, overflow: "hidden",
                }}>
                  <div style={{
                    background: cat.color, color: "white",
                    padding: "10px 16px", display: "flex", alignItems: "center", gap: 8,
                    fontWeight: 700, fontSize: 14,
                  }}>
                    <span style={{ fontSize: 16 }}>{cat.emoji}</span>
                    {cat.title}
                    <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.75, fontWeight: 400 }}>
                      {cat.places.length} places
                    </span>
                  </div>
                  <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
                    {cat.places.map((place, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "white", borderRadius: 8, padding: "8px 12px",
                        border: `1px solid ${cat.border}`,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                          <span style={{
                            color: "white", background: cat.color, fontWeight: 700, fontSize: 11,
                            minWidth: 20, height: 20, borderRadius: 10, flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{i + 1}</span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 13 }}>{place.name}</div>
                            {place.hours && (
                              <div style={{ fontSize: 10, color: "#6b7280", marginTop: 1 }}>🕐 {place.hours}</div>
                            )}
                          </div>
                        </div>
                        <a href={gmaps(place.name)} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 3, flexShrink: 0,
                          fontSize: 11, color: "#16a34a", background: "#f0fdf4",
                          padding: "3px 8px", borderRadius: 6, textDecoration: "none",
                          border: "1px solid #bbf7d0", whiteSpace: "nowrap", marginLeft: 8,
                        }}>📍 Maps</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
