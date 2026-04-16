const FLIGHTS = [
  {
    leg: "Singapore → Okinawa",
    date: "May 7 (Thu)",
    depart: "02:15",
    arrive: "08:35",
    from: "Singapore Changi Airport T1 (SIN)",
    to: "Naha Airport — International Terminal (OKA)",
    airline: "Scoot",
    flight: "—",
    booking: "—",
    baggage: "3x Check-in 20kg · Seats: 39F (Rachel), 39E (Wei Cheng)",
    eticket: "—",
    color: "#0369a1",
    light: "#f0f9ff",
    border: "#7dd3fc",
    note: "Arrive 08:35. Pick up rental Leaf car at airport → Asoviva Works by 10:00 to collect campervan.",
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
    chinese: null,
    location: "29F, Tower B, Caihui Plaza, No.5 Bayi Rd, Yuzhong District, Chongqing",
    dates: "May 14–18 · 4 nights",
    emoji: "🌆",
    color: "#7c3aed",
    light: "#faf5ff",
    border: "#c4b5fd",
    link: null,
  },
];

const CAR = {
  company: "Asoviva Works",
  link: "https://rental.asoviva-works.com/english/",
  vehicle: "ASOVIVAN Type 4 (ハイエース) — Camper Blue",
  pickup: "May 7, 2026 · 09:00",
  dropoff: "May 12, 2026 · 13:30",
  options: "Badminton · Frisbee · Mölkky",
  nav: "Fully Integrated Car Navigation",
  etc: "ETC-equipped · AT · Non-Smoking",
  price: "¥99,000 (tax included)",
};

const PASSENGERS = ["Rachel Jee Fang Ling", "Jeslyn Ho Ka Yan", "Tan Wei Cheng"];

const EMBASSIES = [
  {
    country: "Japan 🇯🇵",
    note: "For Okinawa — contact Osaka Honorary CG first; Tokyo Embassy for full consular services",
    color: "#dc2626",
    light: "#fff5f5",
    border: "#fca5a5",
    missions: [
      {
        name: "Singapore Embassy Tokyo",
        type: "Main Embassy",
        address: "5-12-3 Roppongi, Minato-ku, Tokyo 106-0032",
        phone: "+81-3-3586-9111",
        emergency: "+81-90-5949-6366 or +81-90-5258-3252 (24 hr)",
        email: "singemb_tyo@mfa.sg",
        hours: "Mon–Fri 09:00–12:30, 13:30–17:30",
        web: "https://tokyo.mfa.gov.sg/",
      },
      {
        name: "Singapore Honorary Consulate-General Osaka",
        type: "Covers Western Japan incl. Okinawa",
        address: "3-77 Oimatsu-cho, Sakai-ku, Sakai City, Osaka 590-8577",
        phone: "+81-72-223-6911",
        emergency: "—",
        email: "HCG-Osaka@sic.shimano.co.jp",
        hours: "Mon–Fri 09:00–11:30",
        web: "https://osaka.mfa.gov.sg/",
      },
    ],
  },
  {
    country: "China 🇨🇳",
    note: "Shanghai CG for Shanghai stay; Chengdu CG covers Chongqing (no CG in Chongqing)",
    color: "#b91c1c",
    light: "#fef2f2",
    border: "#fca5a5",
    missions: [
      {
        name: "Singapore Consulate-General Shanghai",
        type: "Shanghai & surrounds",
        address: "89 Wanshan Road, Shanghai 200336",
        phone: "+86-21-6278-5566",
        emergency: "+86-138-0194-9439 (after hours)",
        email: "singcg_sha@mfa.sg",
        hours: "Mon–Fri 08:30–12:00, 13:00–17:00",
        web: "https://shanghai.mfa.gov.sg/",
      },
      {
        name: "Singapore Consulate-General Chengdu",
        type: "Covers Chongqing",
        address: "Level 30-01 Yanlord Landmark, No.1 Sec 2 Renmin South Rd, Chengdu 610016",
        phone: "+86-28-8652-7222",
        emergency: "+86-139-0807-3562 (after hours)",
        email: "singcg_cgu@mfa.sg",
        hours: "Mon–Fri 08:30–12:00, 13:00–17:00",
        web: "https://chengdu.mfa.gov.sg/",
      },
    ],
  },
];

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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{CAR.vehicle}</div>
              <a href={CAR.link} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 12, color: "#d97706", background: "white",
                border: "1px solid #fde68a", padding: "4px 12px",
                borderRadius: 6, textDecoration: "none", fontWeight: 600,
              }}>🔗 Asoviva Works</a>
            </div>
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

        {/* ── Singapore Embassies ── */}
        <div style={{ fontWeight: 700, fontSize: 16, marginTop: 32, marginBottom: 14, color: "#111827" }}>
          🏛️ Singapore Embassies & Consulates
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EMBASSIES.map((grp, gi) => (
            <div key={gi} style={{
              background: grp.light, border: `1.5px solid ${grp.border}`,
              borderRadius: 14, overflow: "hidden",
            }}>
              <div style={{
                background: grp.color, color: "white",
                padding: "10px 16px",
              }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{grp.country}</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{grp.note}</div>
              </div>
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
                {grp.missions.map((m, mi) => (
                  <div key={mi} style={{
                    background: "white", borderRadius: 10,
                    border: `1px solid ${grp.border}`, padding: "12px 14px",
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 2 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: grp.color, fontWeight: 600, marginBottom: 8 }}>{m.type}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {[
                        `📍 ${m.address}`,
                        `📞 ${m.phone}`,
                        m.emergency !== "—" && `🚨 Emergency: ${m.emergency}`,
                        `📧 ${m.email}`,
                        `🕐 ${m.hours}`,
                      ].filter(Boolean).map((item, ii) => (
                        <span key={ii} style={{
                          fontSize: 11, background: grp.light,
                          border: `1px solid ${grp.border}`,
                          padding: "3px 8px", borderRadius: 6, color: "#374151",
                        }}>{item}</span>
                      ))}
                      <a href={m.web} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: 11, color: grp.color, background: "white",
                        border: `1px solid ${grp.border}`,
                        padding: "3px 8px", borderRadius: 6, textDecoration: "none", fontWeight: 600,
                      }}>🔗 Website</a>
                    </div>
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
