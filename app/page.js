"use client";

import { useEffect, useState } from "react";

const pages = [
  { title: "CRESCI.", text: "GIOCA.\nCONNETTITI.\nQUESTO È\nIL TUO TAMA.", cta: "INIZIA LA TUA AVVENTURA" },
  { title: "NUTRILO.", text: "CURALO.\nFALLO RIDERE.\nOGNI GIORNO\nCAMBIA.", cta: "DAI DA MANGIARE" },
  { title: "ESPLORA.", text: "TROVA AMICI.\nSBLOCCA NEGOZI.\nLA CITTÀ\nÈ VIVA.", cta: "APRI LA MAPPA" },
  { title: "CREA.", text: "VENDI DROP.\nGUADAGNA COIN.\nIL TUO TAMA\nMONETIZZA.", cta: "CREA IL TUO DROP" },
];

function PixelGrid({ pattern, size = 4 }) {
  return (
    <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${pattern[0].length}, ${size}px)`, gap: 1 }}>
      {pattern.join("").split("").map((v, i) => (
        <span key={i} style={{ width: size, height: size, background: v === "1" ? "#172112" : "transparent" }} />
      ))}
    </div>
  );
}

function PixelTama({ frame }) {
  const sprites = [
    ["0001111000","0011111100","0111111110","1110110111","1111111111","0111011110","0011111100","0001001000"],
    ["0001111000","0011111100","0111111110","1110110111","1111111111","0111111110","0001111000","0010010000"],
  ];
  return <PixelGrid pattern={sprites[frame % 2]} size={6} />;
}

function MiniIcon({ type }) {
  const icons = {
    heart: ["0110","1111","1111","0110"],
    fork: ["1010","1110","0100","0100"],
    game: ["1111","1001","1111","0100"],
    bulb: ["0110","1111","0110","0100"],
    home: ["00100","01110","11111","10101","11111"],
    map: ["01110","11111","01110","00100","00100"],
    shop: ["11111","10101","11111","10001","11111"],
    arcade: ["11111","10001","10101","11111","00100"],
    social: ["01110","11111","10101","11111","01110"],
    pass: ["11111","10001","11101","10001","11111"],
  };
  return <PixelGrid pattern={icons[type]} size={4} />;
}

export default function Home() {
  const [frame, setFrame] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => f + 1), 460);
    return () => clearInterval(t);
  }, []);

  const next = () => setPage(p => (p + 1) % pages.length);
  const prev = () => setPage(p => (p + pages.length - 1) % pages.length);

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center,#151827,#07090f 65%)", overflow: "hidden" }}>
      <div style={{ position: "relative", width: "min(90vmin, 880px)", aspectRatio: "1 / 1", transform: "translateY(3vh)" }}>
        <img src="/assets/device/shell-base.svg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
        <img src="/assets/device/ears.svg" alt="" style={{ position: "absolute", top: "-10%", left: 0, width: "100%", pointerEvents: "none" }} />

        <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "#4f367b", fontWeight: 900, letterSpacing: "-0.08em", fontSize: "clamp(40px, 6vmin, 70px)", textShadow: "0 2px rgba(255,255,255,.35)" }}>
          TamaSocial
        </div>

        <div style={{ position: "absolute", top: "23%", left: "50%", transform: "translateX(-50%)", width: "63%", height: "49%", borderRadius: 42, background: "radial-gradient(circle at 35% 25%,#b47ee0,#6e3f92 60%,#321848)", padding: 16, boxShadow: "inset 8px 8px 12px rgba(255,255,255,.22), inset -8px -10px 18px rgba(0,0,0,.45), 0 18px 24px rgba(0,0,0,.35)" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 30, border: "7px solid #172112", background: "#99aa73", boxShadow: "inset 0 0 35px rgba(0,0,0,.55)" }}>
            <div style={{ position: "absolute", inset: 0, opacity: .16, backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "5px 5px" }} />
            <div style={{ position: "relative", height: "100%", color: "#172112", fontWeight: 900, fontSize: 10, padding: "12px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #172112", paddingBottom: 6 }}>
                {[['heart','LOVE'],['fork','FOOD'],['game','FUN'],['bulb','CARE']].map(([ic, lab]) => <div key={lab} style={{ display: "flex", gap: 6, alignItems: "center" }}><MiniIcon type={ic}/><span>100%<br/>{lab}</span></div>)}
              </div>

              <div style={{ position: "relative", height: "54%", borderBottom: "2px solid #172112" }}>
                <button onClick={prev} style={{ position: "absolute", left: -8, top: "42%", background: "transparent", border: 0, fontSize: 32, color: "#172112", fontWeight: 900 }}>‹</button>
                <button onClick={next} style={{ position: "absolute", right: -8, top: "42%", background: "transparent", border: 0, fontSize: 32, color: "#172112", fontWeight: 900 }}>›</button>

                <div style={{ position: "absolute", left: 28, top: 25, width: 105, border: "2px solid #172112", padding: 8, whiteSpace: "pre-line", fontSize: 12, lineHeight: 1.35 }}>
                  {pages[page].title}\n{pages[page].text}
                </div>

                <div style={{ position: "absolute", left: "50%", top: "45%", transform: `translate(-50%, -50%) translateY(${frame % 2 ? -4 : 0}px)` }}>
                  <PixelTama frame={frame} />
                </div>
                <div style={{ position: "absolute", left: "43%", bottom: 10, width: 120, height: 28, border: "2px solid #172112", borderRadius: "50%", opacity: .55 }} />
              </div>

              <div style={{ textAlign: "center", fontSize: 13, paddingTop: 8 }}>IL TUO MONDO. IL TUO TAMA. LA TUA STORIA.</div>
              <button onClick={next} style={{ display: "block", width: "72%", margin: "8px auto 0", border: "2px solid #172112", background: "transparent", color: "#172112", padding: 6, fontWeight: 900 }}>{pages[page].cta}</button>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginTop: 8 }}>
                {[['ROOM','home'],['MAP','map'],['SHOP','shop'],['ARCADE','arcade'],['SOCIAL','social'],['PASS','pass']].map(([label, icon]) => (
                  <button key={label} onClick={next} style={{ height: 42, border: "2px solid #172112", background: "transparent", color: "#172112", fontWeight: 900, fontSize: 8 }}><MiniIcon type={icon}/><div>{label}</div></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6vmin" }}>
          {[['SELECT', prev], ['OK', next], ['MENU', next]].map(([label, fn]) => (
            <button key={label} onClick={fn} style={{ background: "transparent", border: 0, textAlign: "center", color: "#243322", fontWeight: 900 }}>
              <div style={{ width: 66, height: 66, borderRadius: "50%", border: "6px solid #5e2d72", background: "radial-gradient(circle at 33% 25%,#f1b6ff,#c36bdc 48%,#6d2e8e)", boxShadow: "inset 10px 10px 16px rgba(255,255,255,.35), inset -8px -10px 14px rgba(54,15,71,.45), 0 10px 18px rgba(0,0,0,.45)" }} />
              <div>{label}</div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
