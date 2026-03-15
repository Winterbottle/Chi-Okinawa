import { useState } from "react";
import Okinawa from "./Okinawa.jsx";
import Itinerary from "./itinerary.jsx";
import Logistics from "./Logistics.jsx";

const TABS = [
  { id: "okinawa",   label: "🌺 Okinawa",   color: "#0891b2" },
  { id: "china",     label: "🏙️ China",      color: "#2d6a4f" },
  { id: "logistics", label: "✈️ Logistics",  color: "#1d4ed8" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("okinawa");

  return (
    <div>
      {/* Top nav */}
      <div style={{
        background: "#111827",
        display: "flex", justifyContent: "center", gap: 6,
        padding: "10px 16px",
        position: "sticky", top: 0, zIndex: 200,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "7px 18px", borderRadius: 20, border: "none",
              background: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.1)",
              color: "white",
              fontWeight: activeTab === tab.id ? 700 : 400,
              cursor: "pointer", fontSize: 13,
              fontFamily: "'Georgia', serif",
              transition: "background 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "okinawa"   && <Okinawa />}
      {activeTab === "china"     && <Itinerary />}
      {activeTab === "logistics" && <Logistics />}
    </div>
  );
}
