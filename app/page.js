"use client";

import { useEffect, useMemo, useState } from "react";

const pages = [
  {
    sideText: ["CRESCI.", "GIOCA.", "CONNETTITI.", "", "QUESTO È", "IL TUO TAMA."],
    tagline: "IL TUO MONDO. IL TUO TAMA. LA TUA STORIA.",
    cta: "INIZIA LA TUA AVVENTURA",
  },
  {
    sideText: ["NUTRILO.", "CURALO.", "FALLO RIDERE.", "", "OGNI GIORNO", "CAMBIA."],
    tagline: "PRENDITI CURA DEL TUO PICCOLO MONDO.",
    cta: "DAI DA MANGIARE",
  },
  {
    sideText: ["ESPLORA.", "TROVA AMICI.", "SBLOCCA NEGOZI.", "", "LA CITTÀ", "È VIVA."],
    tagline: "PARCHI. ARCADE. SHOP. CREATOR MARKET.",
    cta: "APRI LA MAPPA",
  },
  {
    sideText: ["CREA.", "VENDI DROP.", "GUADAGNA COIN.", "", "IL TUO TAMA", "MONETIZZA."],
    tagline: "CONTENUTI, CAPSULE, OGGETTI E COMMUNITY.",
    cta: "CREA IL TUO DROP",
  },
];

const navItems = [
  { label: "ROOM", icon: "home" },
  { label: "MAP", icon: "pin" },
  { label: "SHOP", icon: "shop" },
  { label: "ARCADE", icon: "screen" },
  { label: "SOCIAL", icon: "tama" },
  { label: "PASS", icon: "card" },
];

const iconMap = {
  heart: ["0110", "1111", "1111", "0110"],
  fork: ["1010", "1110", "0100", "0100"],
  game: ["0000", "1111", "1011", "1111"],
  bulb: ["0110", "1111", "0110", "0100"],
  home: ["00100", "01110", "11111", "10101", "11111"],
  pin: ["01110", "11111", "11111", "01110", "00100"],
  shop: ["11111", "10101", "11111", "10001", "11111"],
  screen: ["11111", "10001", "10101", "11111", "00100"],
  tama: ["01110", "11111", "10101", "11111", "01110"],
  card: ["11111", "10001", "11101", "10001", "11111"],
  star: ["00100", "10101", "01110", "10101", "00100"],
  plant: ["00100", "01110", "00100", "01110", "11111"],
  bed: ["10000", "11110", "11111", "11111", "10001"],
  shelf: ["11111", "10001", "11111", "10001", "11111"],
  window: ["11111", "10101", "11111", "10101", "11111"],
  bowl: ["00000", "01110", "11111", "01110", "00000"],
};

const tamaSprites = [
  [
    "0000111111000000",
    "0001111111100000",
    "0011111111110000",
    "0111111111111000",
    "0111001110011000",
    "1111001110011100",
    "1111111111111100",
    "1111110110111100",
    "1111111111111100",
    "0111111111111000",
    "0011111111110000",
    "0001100001100000",
    "0011100001110000",
    "0011000000110000",
  ],
  [
    "0000111111000000",
    "0001111111100000",
    "0011111111110000",
    "0111111111111000",
    "0111001110011000",
    "1111001110011100",
    "1111111111111100",
    "1111110110111100",
    "1111111111111100",
    "0111111111111000",
    "0011111111110000",
    "0000110011000000",
    "0001110011100000",
    "0001100001100000",
  ],
];

function PixelIcon({ type, size = 5 }) {
  const grid = iconMap[type] || iconMap.star;
  return (
    <span className="pixel-icon" style={{ gridTemplateColumns: `repeat(${grid[0].length}, ${size}px)`, gap: 1 }}>
      {grid.join("").split("").map((v, i) => (
        <span key={i} className={`px ${v === "1" ? "on" : ""}`} style={{ width: size, height: size }} />
      ))}
    </span>
  );
}

function PixelTama({ frame }) {
  const grid = tamaSprites[frame % tamaSprites.length];
  return (
    <div className="tama" aria-label="Pixel Tama character">
      {grid.join("").split("").map((v, i) => (
        <span key={i} className={`px ${v === "1" ? "on" : ""}`} style={{ width: 5, height: 5 }} />
      ))}
    </div>
  );
}

function Sticker({ type, className }) {
  return (
    <div className={`sticker ${className}`}>
      <PixelIcon type={type} size={5} />
    </div>
  );
}

function DeviceButton({ label, onClick, primary = false }) {
  return (
    <button className={`device-button ${primary ? "primary" : ""}`} onClick={onClick} type="button">
      <span className="button-cap" />
      <strong>{label}</strong>
    </button>
  );
}

function LcdRoom({ page, frame, onNext, onPrev }) {
  return (
    <div className="lcd-content">
      <div className="lcd-top">
        <div className="stat"><PixelIcon type="heart" size={5} /><span>100%<br />LOVE</span></div>
        <div className="stat"><PixelIcon type="fork" size={5} /><span>100%<br />FOOD</span></div>
        <div className="stat"><PixelIcon type="game" size={5} /><span>100%<br />FUN</span></div>
        <div className="stat"><PixelIcon type="bulb" size={5} /><span>100%<br />CARE</span></div>
      </div>

      <div className="scene">
        <button className="arrow left" onClick={onPrev} type="button">‹</button>
        <button className="arrow right" onClick={onNext} type="button">›</button>

        <div className="speech">
          {pages[page].sideText.map((line, i) => <div key={i}>{line || "\u00a0"}</div>)}
          <div style={{ textAlign: "right", marginTop: 8 }}><PixelIcon type="heart" size={4} /></div>
        </div>

        <div className="room-window"><PixelIcon type="window" size={8} /></div>
        <div className="room-shelf"><PixelIcon type="shelf" size={7} /></div>
        <div className="room-plant"><PixelIcon type="plant" size={8} /></div>
        <div className="room-bed"><PixelIcon type="bed" size={10} /></div>
        <div className="room-bowl"><PixelIcon type="bowl" size={8} /></div>
        <PixelTama frame={frame} />
        <div className="shadow" />
      </div>

      <div className="tagline">{pages[page].tagline}</div>
      <button className="cta" onClick={onNext} type="button">{pages[page].cta}</button>

      <div className="nav">
        {navItems.map((item) => (
          <button key={item.label} type="button" onClick={onNext}>
            <PixelIcon type={item.icon} size={5} />
            <label>{item.label}</label>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [frame, setFrame] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => f + 1), 420);
    return () => clearInterval(timer);
  }, []);

  const next = () => setPage((p) => (p + 1) % pages.length);
  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);
  const dots = useMemo(() => pages.map((_, i) => i), []);

  return (
    <main className="tama-page">
      <section className="device" aria-label="TamaSocial interactive Tamagotchi-style landing page">
        <div className="top-ridge" />

        <Sticker type="star" className="s1" />
        <Sticker type="heart" className="s2" />
        <Sticker type="star" className="s3" />
        <Sticker type="star" className="s4" />
        <Sticker type="heart" className="s5" />
        <Sticker type="tama" className="s6" />
        <Sticker type="star" className="s7" />
        <Sticker type="star" className="s8" />

        <div className="brand">
          <div className="brand-icon"><PixelIcon type="tama" size={5} /></div>
          <h1>TamaSocial</h1>
        </div>

        <div className="screen-bezel">
          <div className="lcd">
            <LcdRoom page={page} frame={frame} onNext={next} onPrev={prev} />
          </div>
        </div>

        <div className="device-buttons">
          <DeviceButton label="SELECT" onClick={prev} />
          <DeviceButton label="OK" onClick={next} primary />
          <DeviceButton label="MENU" onClick={next} />
        </div>

        <p className="microcopy">CRESCI IL TUO TAMA, ESPLORA IL MONDO, INCONTRA AMICI, GIOCA, VINCI PREMI E CREA RICORDI INDIMENTICABILI.</p>

        <div className="dots">
          {dots.map((dot) => <span key={dot} className={`dot ${dot === page ? "active" : ""}`} />)}
        </div>
      </section>
    </main>
  );
}
