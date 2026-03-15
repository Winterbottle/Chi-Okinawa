const FLIGHTS = [
  {
    leg: "Singapore → Okinawa",
    date: "May 7 (Thu)",
    depart: "~02:00",
    arrive: "~08:00",
    from: "Singapore Changi Airport (SIN)",
    to: "Naha Airport (OKA)",
    airline: "—",
    flight: "—",
    booking: "—",
    baggage: "—",
    eticket: "—",
    color: "#0369a1",
    light: "#f0f9ff",
    border: "#7dd3fc",
    note: "Arrive ~08:00. Pick up campervan at Asoviva Works 09:00.",
  },
  {
    leg: "Okinawa → Shanghai",
    date: "May 12 (Tue)",
    depart: "15:00",
    arrive: "16:35",
    from: "Naha Airport (OKA)",
    to: "Shanghai Pudong T2 (PVG)",
    airline: "Spring Airlines",
    flight: "9C6978",
    booking: "BJMEJEA",
    baggage: "Carry-on: 1pc 7kg (40×30×20cm) · Checked: 20kg (100×60×40cm)",
    eticket: "—",
    color: "#0891b2",
    light: "#ecfeff",
    border: "#a5f3fc",
    note: "Arrive at Naha Airport by 12:00 (3hrs before). Return campervan by 13:30.",
  },
  {
    leg: "Shanghai → Chongqing",
    date: "May 14 (Thu)",
    depart: "18:10",
    arrive: "21:00",
    from: "Shanghai Pudong T2 (PVG)",
    to: "Chongqing Jiangbei T3 (CKG)",
    airline: "Spring Airlines",
    flight: "9C8867",
    booking: "BJMEJRC",
    baggage: "Carry-on: 1pc 7kg (20×40×30cm) · Checked: 20kg, no piece limit (40×60×100cm)",
    eticket: "—",
    color: "#ea580c",
    light: "#fff7ed",
    border: "#fdba74",
    note: "Arrive at Pudong Airport by 16:10 (2hrs before).",
  },
  {
    leg: "Chongqing → Singapore",
    date: "May 18 (Mon)",
    depart: "02:35",
    arrive: "07:30",
    from: "Chongqing Jiangbei T3 (CKG)",
    to: "Singapore Changi Airport (SIN)",
    airline: "Singapore Airlines",
    flight: "SQ819",
    booking: "DI8NIM",
    baggage: "Personal item: 1pc (≤80cm) · Carry-on: 1pc 7kg (≤115cm) · Checked: 1pc 25kg (≤158cm)",
    eticket: "Rachel: 618-2473387392 · Jeslyn: 618-2473387393 · Wei Cheng: 618-2473387394",
    color: "#1d4ed8",
    light: "#eff6ff",
    border: "#bfdbfe",
    note: "Arrive airport by 23:35 (3hrs before). Arrange Didi by 00:30.",
  },
];

const HOTELS = [
  {
    name: "Shanghai Bund Yiwan Hotel",
    chinese: null,
    location: "3/F, 521 Henan Middle Rd, Huangpu District, Shanghai",
    dates: "May 12–14 · 2 nights",
    emoji: "🏨",
    color: "#2563eb",
    light: "#eff6ff",
    border: "#bfdbfe",
    link: "https://www.trip.com/w/ZSmE5udIlT2",
  },
  {
    name: "浩廷·高空江景酒店",
    chinese: "Haoting Sky River View Hotel",
    location: "29F, Tower B, Caihui Plaza, No.5 Bayi Rd, Yuzhong District, Chongqing",
    dates: "May 14–18 · 4 nights",
    emoji: "🌆",
    color: "#7c3aed",
    light: "#faf5ff",
    border: "#c4b5fd",
    link: null,
  },
  {
    name: "Chengdu Hotel",
    chinese: null,
    location: "Chengdu",
    dates: "—",
    emoji: "🏩",
    color: "#15803d",
    light: "#f0fdf4",
    border: "#86efac",
    link: "https://www.trip.com/w/pQ5xV2iGTT2",
  },
];

const CAR = {
  company: "Asoviva Works",
  vehicle: "ASOVIVAN Type 4 (ハイエース) — Camper Blue",
  pickup: "May 7, 2026 · 09:00",
  dropoff: "May 12, 2026 · 13:30",
  options: "Badminton · Frisbee · Mölkky",
  nav: "Fully Integrated Car Navigation",
  etc: "ETC-equipped · AT · Non-Smoking",
  price: "¥99,000 (tax included)",
};

const PASSENGERS = ["Rachel Jee Fang Ling", "Jeslyn Ho Ka Yan", "Tan Wei Cheng"];

export default function Logistics() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#fafaf8", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #111827 0%, #1e3a5f 100%)",
        color: "white", padding: "28px 24px 20px", textAlign: "center",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", opacity: 0.65, marginBottom: 6 }}>
          Bookings & Logistics
        </div>
        <h1 style={{ fontSize: 24, fontWeight: "bold", margin: "0 0 4px" }}>
          ✈️ Flights · 🚐 Car · 🏨 Hotels
        </h1>
        <div style={{ fontSize: 13, opacity: 0.65, marginBottom: 14 }}>May 7–18, 2026</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          {PASSENGERS.map((p, i) => (
            <span key={i} style={{
              background: "rgba(255,255,255,0.12)", padding: "4px 12px",
              borderRadius: 20, fontSize: 12,
            }}>👤 {p}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 16px 48px" }}>

        {/* ── Flights ── */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: "#111827" }}>
          ✈️ Flights
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {FLIGHTS.map((f, i) => (
            <div key={i} style={{
              background: f.light, border: `1.5px solid ${f.border}`,
              borderRadius: 14, overflow: "hidden",
            }}>
              {/* Flight header */}
              <div style={{
                background: f.color, color: "white",
                padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>✈️ {f.leg}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{f.date}</div>
              </div>
              {/* Flight body */}
              <div style={{ padding: "14px 16px" }}>
                {/* Time row */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  marginBottom: 10, flexWrap: "wrap",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: f.color }}>{f.depart}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{f.from}</div>
                  </div>
                  <div style={{ flex: 1, borderTop: `2px dashed ${f.border}`, minWidth: 24 }} />
                  <div style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap" }}>
                    {f.airline !== "—" ? `${f.airline} ${f.flight}` : "Flight TBD"}
                  </div>
                  <div style={{ flex: 1, borderTop: `2px dashed ${f.border}`, minWidth: 24 }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: f.color }}>{f.arrive}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{f.to}</div>
                  </div>
                </div>
                {/* Details */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: f.note ? 8 : 0 }}>
                  {f.booking !== "—" && (
                    <span style={{
                      fontSize: 11, background: "white", border: `1px solid ${f.border}`,
                      padding: "3px 8px", borderRadius: 6, color: "#374151",
                    }}>🔖 Ref: <strong>{f.booking}</strong></span>
                  )}
                  {f.eticket !== "—" && (
                    <span style={{
                      fontSize: 11, background: "white", border: `1px solid ${f.border}`,
                      padding: "3px 8px", borderRadius: 6, color: "#374151",
                    }}>🎫 {f.eticket}</span>
                  )}
                  {f.baggage !== "—" && (
                    <span style={{
                      fontSize: 11, background: "white", border: `1px solid ${f.border}`,
                      padding: "3px 8px", borderRadius: 6, color: "#374151",
                    }}>🧳 {f.baggage}</span>
                  )}
                </div>
                {f.note && (
                  <div style={{
                    fontSize: 12, color: "#374151", background: "rgba(255,255,255,0.6)",
                    padding: "6px 10px", borderRadius: 8, borderLeft: `3px solid ${f.color}`,
                  }}>
                    ⚠️ {f.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Car Rental ── */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: "#111827" }}>
          🚐 Car Rental
        </div>
        <div style={{
          background: "#fefce8", border: "1.5px solid #fde68a",
          borderRadius: 14, overflow: "hidden", marginBottom: 32,
        }}>
          <div style={{
            background: "#d97706", color: "white",
            padding: "10px 16px", fontWeight: 700, fontSize: 14,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>🚐 Asoviva Works — Campervan</span>
            <span style={{ fontSize: 12, opacity: 0.85 }}>{CAR.price}</span>
          </div>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{CAR.vehicle}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[
                `📅 Pick-up: ${CAR.pickup}`,
                `📅 Drop-off: ${CAR.dropoff}`,
                `🧭 ${CAR.nav}`,
                `⚙️ ${CAR.etc}`,
                `🎒 Extras: ${CAR.options}`,
              ].map((item, i) => (
                <span key={i} style={{
                  fontSize: 12, background: "white", border: "1px solid #fde68a",
                  padding: "4px 10px", borderRadius: 6, color: "#374151",
                }}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hotels ── */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: "#111827" }}>
          🏨 Hotels
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {HOTELS.map((h, i) => (
            <div key={i} style={{
              background: h.light, border: `1.5px solid ${h.border}`,
              borderRadius: 14, overflow: "hidden",
            }}>
              <div style={{
                background: h.color, color: "white",
                padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{h.emoji} {h.name}</span>
                <span style={{ fontSize: 12, opacity: 0.85 }}>{h.dates}</span>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                {h.chinese && (
                  <span style={{ fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>{h.chinese}</span>
                )}
                <span style={{
                  fontSize: 12, background: "white", border: `1px solid ${h.border}`,
                  padding: "4px 10px", borderRadius: 6, color: "#374151",
                }}>📍 {h.location}</span>
                {h.link && (
                  <a href={h.link} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 12, color: h.color, background: "white",
                    border: `1px solid ${h.border}`,
                    padding: "4px 10px", borderRadius: 6, textDecoration: "none", fontWeight: 600,
                  }}>🔗 Trip.com Booking</a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
