import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
      { name: "Ryujin Hot Springs",             coord: [26.228, 127.700] },
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
      { name: "Ryujin Hot Springs (Day Use)",     coord: [26.228, 127.700] },
      { name: "Terme VILLA Chura-yu (Chatan)",   coord: [26.317, 127.759] },
      { name: "Rikkarikkayu (Naha)",             coord: [26.213, 127.684] },
      { name: "Kouri Beach Coin Showers",        coord: [26.695, 128.022] },
      { name: "Okuma Beach Shower Facilities",   coord: [26.723, 128.143] },
    ],
  },
  {
    id: "toilet", title: "Public Toilets", emoji: "🚻",
    color: "#475569", light: "#f8fafc", border: "#cbd5e1",
    places: [
      { name: "Naminoue Beach Park Toilet (24hr)",     coord: [26.223, 127.681] },
      { name: "Cape Zanpa Park Toilet (24hr)",         coord: [26.408, 127.719] },
      { name: "Emerald Beach / Ocean Expo Park (24hr)", coord: [26.697, 127.868] },
      { name: "Okuma Beach Park Toilet (24hr)",        coord: [26.724, 128.144] },
      { name: "Cape Hedo Toilet",                      coord: [26.865, 128.260] },
    ],
  },
  {
    id: "petrol", title: "Petrol Stations", emoji: "⛽",
    color: "#dc2626", light: "#fef2f2", border: "#fca5a5",
    places: [
      { name: "ENEOS Urasoe (near Asoviva Works)", coord: [26.249, 127.721] },
      { name: "ENEOS Nago (Route 58)",             coord: [26.597, 127.975] },
      { name: "Apollostation Nago East",           coord: [26.604, 128.002] },
      { name: "Last Station before Cape Hedo (Kunigami)", coord: [26.729, 128.151] },
    ],
  },
];

const DAYS = [
  { id: "may7",  label: "May 7 (Thu)",  type: "arrive",  note: "Arrive Okinawa ~08:00. Pick up campervan at Asoviva Works 09:00." },
  { id: "may8",  label: "May 8 (Fri)",  type: "free",    note: null },
  { id: "may9",  label: "May 9 (Sat)",  type: "free",    note: null },
  { id: "may10", label: "May 10 (Sun)", type: "free",    note: null },
  { id: "may11", label: "May 11 (Mon)", type: "free",    note: null },
  { id: "may12", label: "May 12 (Tue)", type: "depart",  note: "Return campervan to Asoviva Works by 13:30 → Naha Airport → depart 15:00 Spring Airlines 9C6978 → Shanghai 16:35." },
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
  const [rotation, setRotation] = useState(0);

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
          {day.type === "free" ? (
            <div style={{
              background: "white", border: "2px dashed #d1d5db", borderRadius: 16,
              padding: "32px 24px", textAlign: "center", color: "#9ca3af",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🌺</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>Itinerary Coming Soon</div>
              <div style={{ fontSize: 12 }}>Switch to the Map & Bookmarks tab to explore places!</div>
            </div>
          ) : (
            <div style={{
              background: day.type === "arrive" ? "#f0f9ff" : "#fff7ed",
              border: `2px solid ${day.type === "arrive" ? "#7dd3fc" : "#fdba74"}`,
              borderRadius: 16, padding: "18px 20px",
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{day.type === "arrive" ? "🛬" : "🛫"}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: day.type === "arrive" ? "#0369a1" : "#c2410c", marginBottom: 4 }}>
                {day.type === "arrive" ? "Arrival Day" : "Departure Day"}
              </div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{day.note}</div>
            </div>
          )}
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

            {/* Rotate controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
              <button
                onClick={() => setRotation(r => (r - 90 + 360) % 360)}
                style={{
                  padding: "6px 16px", borderRadius: 20, border: "1.5px solid #d1d5db",
                  background: "white", cursor: "pointer", fontSize: 14, fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 4,
                }}>↺ Left</button>
              <span style={{ fontSize: 12, color: "#6b7280", minWidth: 36, textAlign: "center" }}>{rotation}°</span>
              <button
                onClick={() => setRotation(r => (r + 90) % 360)}
                style={{
                  padding: "6px 16px", borderRadius: 20, border: "1.5px solid #d1d5db",
                  background: "white", cursor: "pointer", fontSize: 14, fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 4,
                }}>↻ Right</button>
              {rotation !== 0 && (
                <button
                  onClick={() => setRotation(0)}
                  style={{
                    padding: "6px 12px", borderRadius: 20, border: "1.5px solid #d1d5db",
                    background: "white", cursor: "pointer", fontSize: 11, color: "#6b7280", fontFamily: "inherit",
                  }}>Reset</button>
              )}
            </div>

            {/* Leaflet Map */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1.5px solid #d1d5db", height: 700 }}>
              <div style={{
                width: "100%", height: "100%",
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center center",
                transition: "transform 0.4s ease",
              }}>
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
