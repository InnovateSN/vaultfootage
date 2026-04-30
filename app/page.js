"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => f + 1), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#07090f"
    }}>

      <div style={{ position: "relative", width: 600, height: 600 }}>

        {/* REAL ASSETS */}
        <img src="/assets/device/shell-base.svg" style={{ position:"absolute", width:"100%", height:"100%" }} />
        <img src="/assets/device/ears.svg" style={{ position:"absolute", top:-80, left:0, width:"100%" }} />

        {/* LCD */}
        <div style={{
          position:"absolute",
          top:180,
          left:"50%",
          transform:"translateX(-50%)",
          width:360,
          height:260,
          borderRadius:20,
          background:"#99aa73",
          border:"8px solid #172112"
        }}>

          <div style={{
            position:"absolute",
            top:90,
            left:"50%",
            transform:`translateX(-50%) translateY(${frame % 2 === 0 ? 0 : -4}px)`
          }}>
            <div style={{ width:50, height:50, background:"#172112", borderRadius:"50%" }} />
          </div>

        </div>

        {/* BUTTONS */}
        <div style={{ position:"absolute", bottom:60, left:"50%", transform:"translateX(-50%)", display:"flex", gap:50 }}>
          {["SELECT","OK","MENU"].map(label => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ width:70, height:70, borderRadius:"50%", background:"#c36bdc" }} />
              <div style={{ color:"#243322", fontWeight:"bold" }}>{label}</div>
            </div>
          ))}
        </div>

      </div>

    </main>
  );
}
