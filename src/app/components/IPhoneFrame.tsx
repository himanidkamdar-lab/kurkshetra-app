import { ReactNode } from "react";

export default function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Outer phone body */}
      <div
        style={{
          width: 430,
          height: 932,
          borderRadius: 54,
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)",
          boxShadow:
            "0 0 0 1.5px #444, 0 0 0 2.5px #222, inset 0 0 0 1px #333, 0 40px 80px rgba(0,0,0,0.7), 0 10px 30px rgba(0,0,0,0.5)",
          position: "relative",
          padding: "14px 10px",
          flexShrink: 0,
        }}
      >
        {/* Side buttons - left: silent switch + volume */}
        <div style={{ position: "absolute", left: -3, top: 120, width: 3, height: 32, background: "#3a3a3a", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -3, top: 168, width: 3, height: 60, background: "#3a3a3a", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -3, top: 240, width: 3, height: 60, background: "#3a3a3a", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.5)" }} />
        {/* Side button - right: power */}
        <div style={{ position: "absolute", right: -3, top: 190, width: 3, height: 90, background: "#3a3a3a", borderRadius: "0 2px 2px 0", boxShadow: "1px 0 2px rgba(0,0,0,0.5)" }} />

        {/* Screen bezel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 44,
            overflow: "hidden",
            background: "#000",
            position: "relative",
          }}
        >
          {/* Status bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 54,
              background: "rgba(0,0,0,0.01)",
              zIndex: 50,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              paddingTop: 14,
              paddingLeft: 24,
              paddingRight: 24,
              pointerEvents: "none",
            }}
          >
            {/* Time */}
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "-apple-system, sans-serif", lineHeight: 1 }}>
              9:41
            </span>

            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 34,
                background: "#000",
                borderRadius: 20,
                boxShadow: "0 0 0 1px #1a1a1a",
              }}
            />

            {/* Right status icons */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="6" width="3" height="6" rx="1" opacity="0.4" />
                <rect x="4.5" y="4" width="3" height="8" rx="1" opacity="0.6" />
                <rect x="9" y="2" width="3" height="10" rx="1" opacity="0.8" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                <path d="M3.5 6.5a6.5 6.5 0 0 1 9 0" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M1 4a10 10 0 0 1 14 0" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" opacity="0.3" />
              </svg>
              {/* Battery */}
              <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                <div style={{ width: 25, height: 12, border: "1px solid rgba(255,255,255,0.7)", borderRadius: 3, padding: "1.5px", position: "relative" }}>
                  <div style={{ width: "75%", height: "100%", background: "#fff", borderRadius: 1.5 }} />
                </div>
                <div style={{ width: 2, height: 5, background: "rgba(255,255,255,0.5)", borderRadius: "0 1px 1px 0" }} />
              </div>
            </div>
          </div>

          {/* App content — scrollable area */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch" as never,
            }}
          >
            {children}
          </div>

          {/* Home indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 130,
              height: 5,
              background: "rgba(255,255,255,0.4)",
              borderRadius: 3,
              zIndex: 50,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
