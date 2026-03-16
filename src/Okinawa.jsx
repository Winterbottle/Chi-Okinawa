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
      { name: "Zhyvago Coffee Roastery",    coord: [26.301, 127.746] },
      { name: "PST Okinawa by the Sea",     coord: [26.521, 127.898] },
      { name: "BURUNO",                     coord: [26.527, 127.984] },
      { name: "Bookcafe Okinawa Rail",      coord: [26.244, 127.713] },
    ],
  },
  {
    id: "food", title: "Food & Restaurants", emoji: "🍜",
    color: "#b91c1c", light: "#fff5f5", border: "#fca5a5",
    places: [
      { name: "Takaesu Soba",                              coord: [26.341, 127.764] },
      { name: "Miyazato Soba",                             coord: [26.155, 127.669] },
      { name: "Pizzeria da Enzo",                          coord: [26.449, 127.804] },
      { name: "Hamanoya Restaurant",                       coord: [26.421, 127.822] },
      { name: "Nagumagai Restaurant",                      coord: [26.680, 128.270] },
      { name: "Restaurant Flipper",                        coord: [26.652, 128.100] },
      { name: "Umi-to-Mugi-to",                            coord: [26.668, 127.875] },
      { name: "Sunrise Higashi",                           coord: [26.697, 128.271] },
      { name: "Itoman Fishing Cooperative Fish Center",    coord: [26.117, 127.665] },
    ],
  },
  {
    id: "shopping", title: "Shopping", emoji: "🛍️",
    color: "#7c3aed", light: "#faf5ff", border: "#c4b5fd",
    places: [
      { name: "AEON MALL Okinawa Rycom",      coord: [26.308, 127.797] },
      { name: "Pokemon Center Okinawa",       coord: [26.308, 127.797] },
      { name: "Modeler's Core",               coord: [26.380, 127.803] },
      { name: "Rider's Shop Stec5",           coord: [26.322, 127.793] },
      { name: "2nd LIFE",                     coord: [26.247, 127.717] },
      { name: "Tsukumo",                      coord: [26.219, 127.688] },
      { name: "Surugaya Naha Okiei-dori",     coord: [26.216, 127.689] },
      { name: "Nuchima-su Salt Factory",      coord: [26.386, 127.972] },
    ],
  },
  {
    id: "culture", title: "History & Culture", emoji: "🏯",
    color: "#b45309", light: "#fffbeb", border: "#fcd34d",
    places: [
      { name: "Katsuren Castle Ruins",                      coord: [26.331, 127.879] },
      { name: "Peace Memorial Park",                        coord: [26.095, 127.725] },
      { name: "Okinawa World",                              coord: [26.171, 127.742] },
      { name: "Yanbaru Kuina Ecological Exhibition Center", coord: [26.712, 128.254] },
      { name: "Higashi-son Fureai Hirugi Park",             coord: [26.699, 128.170] },
    ],
  },
  {
    id: "nature", title: "Nature & Scenery", emoji: "🌊",
    color: "#0369a1", light: "#f0f9ff", border: "#7dd3fc",
    places: [
      { name: "Cape Hedo",             coord: [26.867, 128.261] },
      { name: "Cape Maeda",            coord: [26.444, 127.763] },
      { name: "Blue Cave",             coord: [26.444, 127.773] },
      { name: "Cape Chinen Park",      coord: [26.153, 127.795] },
      { name: "Kayauchi Banta",        coord: [26.854, 128.249] },
      { name: "Bise-Fukugi Tree Road", coord: [26.704, 127.881] },
      { name: "Kanucha Beach",         coord: [26.549, 128.076] },
    ],
  },
  {
    id: "attractions", title: "Attractions & Theme Parks", emoji: "🎡",
    color: "#15803d", light: "#f0fdf4", border: "#86efac",
    places: [
      { name: "Okinawa Churaumi Aquarium",      coord: [26.694, 127.878] },
      { name: "DMM Kariyushi Aquarium Okinawa", coord: [26.156, 127.650] },
      { name: "Junglia Okinawa",                coord: [26.642, 127.974] },
      { name: "Nago Pineapple Park",            coord: [26.616, 127.970] },
      { name: "Orion Happy Park",               coord: [26.589, 127.983] },
      { name: "Ryujin Hot Springs",             coord: [26.193, 127.669] },
      { name: "PARCO CITY Observation Deck",    coord: [26.289, 127.737] },
      { name: "ricoland Okinawa",               coord: [26.247, 127.736] },
    ],
  },
  {
    id: "roadside", title: "Roadside Stations & Markets", emoji: "🛣️",
    color: "#ea580c", light: "#fff7ed", border: "#fdba74",
    places: [
      { name: "Yuiyui Kunigami (Michi no Eki)",              coord: [26.732, 128.169] },
      { name: "Ogimi Roadside Station / Yambaru-no-mori",    coord: [26.698, 128.151] },
      { name: "Road Station Yanbaru Pineapple Hill Aha",     coord: [26.705, 128.166] },
      { name: "Roadside Station Kyoda",                      coord: [26.552, 127.969] },
      { name: "Ginoza Roadside Station",                     coord: [26.474, 127.952] },
    ],
  },
  {
    id: "bath", title: "Baths & Showers", emoji: "🛁",
    color: "#0d9488", light: "#f0fdfa", border: "#99f6e4",
    places: [
      { name: "Ryujin Hot Springs (Day Use)",    coord: [26.193, 127.669] },
      { name: "Terme VILLA Chura-yu (Chatan)",  coord: [26.317, 127.759] },
      { name: "Rikkarikkayu (Naha)",            coord: [26.213, 127.684] },
      { name: "Kouri Beach Coin Showers",       coord: [26.695, 128.022] },
      { name: "Okuma Beach Shower Facilities",  coord: [26.729, 128.134] },
    ],
  },
  {
    id: "toilet", title: "Public Toilets", emoji: "🚻",
    color: "#475569", light: "#f8fafc", border: "#cbd5e1",
    places: [
      { name: "Naminoue Beach Park Toilet (24hr)",      coord: [26.223, 127.681] },
      { name: "Cape Zanpa Park Toilet (24hr)",          coord: [26.408, 127.719] },
      { name: "Emerald Beach / Ocean Expo Park (24hr)", coord: [26.697, 127.867] },
      { name: "Okuma Beach Park Toilet (24hr)",         coord: [26.729, 128.135] },
      { name: "Cape Hedo Toilet",                       coord: [26.865, 128.260] },
    ],
  },
  {
    id: "petrol", title: "Petrol Stations", emoji: "⛽",
    color: "#dc2626", light: "#fef2f2", border: "#fca5a5",
    places: [
      { name: "ENEOS Urasoe (near Asoviva Works)",       coord: [26.249, 127.721] },
      { name: "ENEOS Nago (Route 58)",                   coord: [26.597, 127.975] },
      { name: "Last Station before Cape Hedo (Kunigami)", coord: [26.729, 128.151] },
    ],
  },
  {
    id: "campsite", title: "Campsites", emoji: "⛺",
    color: "#4d7c0f", light: "#f7fee7", border: "#bef264",
    places: [
      { name: "Yagaji Beach Campsite (Nago) 🚿🚻",         coord: [26.659, 128.015] },
      { name: "Hiji Waterfall Campsite (Kunigami) 🚿🚻",   coord: [26.719, 128.180] },
      { name: "Kunigami Forest Park Campsite 🚿🚻",        coord: [26.789, 128.205] },
      { name: "Tonokiya Camp (Ogimi) 🚿🚻",               coord: [26.715, 128.088] },
      { name: "Okuma Beach Campsite (Kunigami) 🚿🚻",     coord: [26.729, 128.134] },
      { name: "Okinawa Sports Park Auto Campjo 🚿🚻",     coord: [26.357, 127.808] },
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

// Clockwise driving circuit: Urasoe → South → West coast north → Cape Hedo → East coast south → Urasoe
const ROUTE_PATH = [
  [26.249, 127.721], // Asoviva Works (start)
  [26.217, 127.687], // Naha
  [26.158, 127.673], // Naha south
  [26.117, 127.665], // Itoman
  [26.097, 127.725], // Peace Memorial Park
  [26.153, 127.795], // Cape Chinen
  [26.171, 127.742], // Okinawa World
  [26.217, 127.687], // back through Naha
  [26.249, 127.721], // Urasoe
  [26.317, 127.759], // Chatan / Blue Cave day
  [26.408, 127.719], // Cape Zanpa
  [26.444, 127.763], // Cape Maeda / Blue Cave ⭐
  [26.490, 127.840], // Onna village
  [26.552, 127.969], // Roadside Station Kyoda
  [26.591, 127.978], // Nago
  [26.694, 127.878], // Churaumi Aquarium (Motobu)
  [26.704, 127.881], // Bise Fukugi
  [26.680, 127.930], // Nakijin
  [26.729, 128.134], // Okuma (northwest)
  [26.800, 128.200], // northwest Kunigami coast
  [26.867, 128.261], // Cape Hedo ⭐
  [26.854, 128.249], // Kayauchi Banta
  [26.789, 128.205], // Kunigami forest
  [26.732, 128.169], // Yuiyui Kunigami
  [26.719, 128.180], // Hiji Waterfall
  [26.715, 128.088], // Tonokiya / Ogimi
  [26.699, 128.170], // Higashi-son
  [26.549, 128.076], // Kanucha Beach area
  [26.474, 127.952], // Ginoza
  [26.331, 127.879], // Katsuren
  [26.308, 127.797], // AEON Rycom / Uruma
  [26.249, 127.721], // back to Asoviva Works
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

  const day = DAYS.find(d => d.id === activeTab);

  const visibleCats = activeFilter
    ? BOOKMARKS.filter(c => c.id === activeFilter)
    : BOOKMARKS;

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
                  <Polyline
                    positions={ROUTE_PATH}
                    pathOptions={{ color: "#0891b2", weight: 3, opacity: 0.75, dashArray: "8 5" }}
                  />
                  {visibleCats.map(cat =>
                    cat.places.map((place, i) => (
                      <Marker
                        key={`${cat.id}-${i}`}
                        position={place.coord}
                        icon={makeIcon(cat.emoji, cat.color)}
                      >
                        <Popup>
                          <div style={{ minWidth: 140 }}>
                            <div style={{
                              background: cat.color, color: "white",
                              margin: "-7px -7px 8px", padding: "6px 10px",
                              borderRadius: "4px 4px 0 0", fontSize: 12, fontWeight: 700,
                            }}>{cat.emoji} {cat.title}</div>
                            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{place.name}</div>
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
                        background: "white", borderRadius: 8, padding: "7px 12px",
                        border: `1px solid ${cat.border}`,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{
                            color: "white", background: cat.color, fontWeight: 700, fontSize: 11,
                            minWidth: 20, height: 20, borderRadius: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{i + 1}</span>
                          <span style={{ fontSize: 13 }}>{place.name}</span>
                        </div>
                        <a href={gmaps(place.name)} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 3,
                          fontSize: 11, color: "#16a34a", background: "#f0fdf4",
                          padding: "3px 8px", borderRadius: 6, textDecoration: "none",
                          border: "1px solid #bbf7d0", whiteSpace: "nowrap", flexShrink: 0,
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
