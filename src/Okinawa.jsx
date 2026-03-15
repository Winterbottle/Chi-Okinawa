import { useState } from "react";

const gmaps = (name) =>
  `https://www.google.com/maps/search/${encodeURIComponent(name + " Okinawa Japan")}`;

const BOOKMARKS = [
  {
    id: "cafe",
    title: "Café & Drinks",
    emoji: "☕",
    color: "#92400e",
    light: "#fef8ed",
    border: "#f5d5a0",
    places: [
      "Zhyvago Coffee Roastery",
      "PST Okinawa by the Sea",
      "BURUNO",
      "Bookcafe Okinawa Rail",
    ],
  },
  {
    id: "food",
    title: "Food & Restaurants",
    emoji: "🍜",
    color: "#b91c1c",
    light: "#fff5f5",
    border: "#fca5a5",
    places: [
      "Takaesu Soba",
      "Miyazato Soba",
      "Pizzeria da Enzo",
      "Hamanoya Restaurant",
      "Nagumagai Restaurant",
      "Restaurant Flipper",
      "Umi-to-Mugi-to",
      "Sunrise Higashi",
      "Itoman Fishing Cooperative Fish Center",
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    color: "#7c3aed",
    light: "#faf5ff",
    border: "#c4b5fd",
    places: [
      "AEON MALL Okinawa Rycom",
      "Pokemon Center Okinawa",
      "Modeler's Core",
      "Rider's Shop Stec5",
      "2nd LIFE",
      "Tsukumo",
      "Surugaya Naha Okiei-dori",
      "Nuchima-su Salt Factory",
    ],
  },
  {
    id: "culture",
    title: "History & Culture",
    emoji: "🏯",
    color: "#b45309",
    light: "#fffbeb",
    border: "#fcd34d",
    places: [
      "Katsuren Castle Ruins",
      "Peace Memorial Park",
      "Okinawa World",
      "Yanbaru Kuina Ecological Exhibition Center",
      "Higashi-son Fureai Hirugi Park",
    ],
  },
  {
    id: "nature",
    title: "Nature & Scenery",
    emoji: "🌊",
    color: "#0369a1",
    light: "#f0f9ff",
    border: "#7dd3fc",
    places: [
      "Cape Hedo",
      "Cape Maeda",
      "Cape Chinen Park",
      "Kayauchi Banta",
      "Bise-Fukugi Tree Road",
      "Kanucha Beach",
    ],
  },
  {
    id: "attractions",
    title: "Attractions & Theme Parks",
    emoji: "🎡",
    color: "#15803d",
    light: "#f0fdf4",
    border: "#86efac",
    places: [
      "Okinawa Churaumi Aquarium",
      "DMM Kariyushi Aquarium Okinawa",
      "Junglia Okinawa",
      "Nago Pineapple Park",
      "Orion Happy Park",
      "Ryujin Hot Springs",
      "PARCO CITY Observation Deck",
      "ricoland Okinawa",
    ],
  },
  {
    id: "roadside",
    title: "Roadside Stations & Markets",
    emoji: "🛣️",
    color: "#ea580c",
    light: "#fff7ed",
    border: "#fdba74",
    places: [
      "Yuiyui Kunigami (Michi no Eki)",
      "Ogimi Roadside Station / Yambaru-no-mori",
      "Road Station Yanbaru Pineapple Hill Aha",
      "Roadside Station Kyoda",
      "Ginoza Roadside Station",
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

export default function Okinawa() {
  const [activeDay, setActiveDay] = useState("may7");
  const day = DAYS.find(d => d.id === activeDay);

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
        <h1 style={{ fontSize: 26, fontWeight: "bold", margin: "0 0 4px", fontFamily: "'Georgia', serif" }}>
          Singapore → Okinawa 🌺
        </h1>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 16 }}>May 7–12, 2026 · Campervan Adventure</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {[
            "✈️ Arrive ~08:00 May 7",
            "🚐 ASOVIVAN Type 4 Camper",
            "✈️ Depart 15:00 May 12",
          ].map((t, i) => (
            <span key={i} style={{
              background: "rgba(255,255,255,0.15)", padding: "5px 13px",
              borderRadius: 20, fontSize: 12,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Day tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", overflowX: "auto" }}>
        <div style={{ display: "flex", minWidth: "max-content", padding: "0 12px" }}>
          {DAYS.map(d => (
            <button key={d.id} onClick={() => setActiveDay(d.id)} style={{
              padding: "12px 14px", background: "none", border: "none",
              borderBottom: activeDay === d.id ? "3px solid #0891b2" : "3px solid transparent",
              color: activeDay === d.id ? "#0891b2" : "#6b7280",
              fontWeight: activeDay === d.id ? 700 : 400,
              cursor: "pointer", fontSize: 12, fontFamily: "inherit", whiteSpace: "nowrap",
            }}>
              {d.type === "arrive" ? "✈️ " : d.type === "depart" ? "🛫 " : ""}
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Day content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px 8px" }}>
        {day.type === "free" ? (
          <div style={{
            background: "white", border: "2px dashed #d1d5db", borderRadius: 16,
            padding: "36px 24px", textAlign: "center", color: "#9ca3af",
          }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🌺</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#6b7280", marginBottom: 6 }}>
              Itinerary Coming Soon
            </div>
            <div style={{ fontSize: 13 }}>
              Check the bookmarks below for places to explore!
            </div>
          </div>
        ) : (
          <div style={{
            background: day.type === "arrive" ? "#f0f9ff" : "#fff7ed",
            border: `2px solid ${day.type === "arrive" ? "#7dd3fc" : "#fdba74"}`,
            borderRadius: 16, padding: "20px 24px",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>
              {day.type === "arrive" ? "🛬" : "🛫"}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: day.type === "arrive" ? "#0369a1" : "#c2410c" }}>
              {day.type === "arrive" ? "Arrival Day" : "Departure Day"}
            </div>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{day.note}</div>
          </div>
        )}
      </div>

      {/* Bookmarks */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{
          textAlign: "center", fontWeight: 700, fontSize: 18,
          marginBottom: 20, color: "#111827",
        }}>
          🗺️ Okinawa Bookmarks
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {BOOKMARKS.map(cat => (
            <div key={cat.id} style={{
              background: cat.light,
              border: `1.5px solid ${cat.border}`,
              borderRadius: 14, overflow: "hidden",
            }}>
              {/* Category header */}
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
              {/* Places list */}
              <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
                {cat.places.map((place, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "white", borderRadius: 8, padding: "7px 12px",
                    border: `1px solid ${cat.border}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        color: "white", background: cat.color,
                        fontWeight: 700, fontSize: 11,
                        minWidth: 20, height: 20, borderRadius: 10,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{i + 1}</span>
                      <span style={{ fontSize: 13 }}>{place}</span>
                    </div>
                    <a href={gmaps(place)} target="_blank" rel="noopener noreferrer" style={{
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
    </div>
  );
}
