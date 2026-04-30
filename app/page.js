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

      <div style={{ position: "relative", width: 500, height: 500 }}>

        {/* SHADOW */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 60,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.4)",
          filter: "blur(10px)"
        }} />

        {/* SHELL */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "linear-gradient(145deg,#ffe8c2,#d5b98d)",
          boxShadow: "inset 20px 20px 40px rgba(255,255,255,0.4), inset -20px -20px 40px rgba(0,0,0,0.2), 0 20px 60px rgba(0,0,0,0.5)"
        }} />

        {/* EARS */}
        <div style={{ position:"absolute", top:-40, left:60, width:120, height:120, borderRadius:"50%", background:"#a45dcc" }} />
        <div style={{ position:"absolute", top:-40, right:60, width:120, height:120, borderRadius:"50%", background:"#a45dcc" }} />

        {/* SCREEN */}
        <div style={{
          position:"absolute",
          top:100,
          left:"50%",
          transform:"translateX(-50%)",
          width:300,
          height:240,
          borderRadius:20,
          background:"#99aa73",
          border:"8px solid #172112"
        }}>

          {/* PIXEL TAMA */}
          <div style={{
            position:"absolute",
            top:80,
            left:"50%",
            transform:`translateX(-50%) translateY(${frame % 2 === 0 ? 0 : -4}px)`
          }}>
            <div style={{ width:40, height:40, background:"#172112", borderRadius:"50%" }} />
          </div>

        </div>

        {/* BUTTONS */}
        <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", display:"flex", gap:40 }}>
          {["SELECT","OK","MENU"].map(label => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ width:60, height:60, borderRadius:"50%", background:"#c36bdc" }} />
              <div style={{ color:"#243322", fontWeight:"bold" }}>{label}</div>
            </div>
          ))}
        </div>

      </div>

    </main>
  );
}
