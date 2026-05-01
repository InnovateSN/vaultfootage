export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        background: "#d8bd89",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 1700 960"
        preserveAspectRatio="xMidYMid slice"
        aria-label="TamaSocial full-screen hardware shell"
        role="img"
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          userSelect: "none",
        }}
      >
        <defs>
          <radialGradient id="body" cx="34%" cy="16%" r="96%">
            <stop offset="0%" stopColor="#fff7dd" />
            <stop offset="24%" stopColor="#f2ddb3" />
            <stop offset="58%" stopColor="#d0af7b" />
            <stop offset="84%" stopColor="#a48258" />
            <stop offset="100%" stopColor="#77583b" />
          </radialGradient>
          <radialGradient id="bodySpec" cx="28%" cy="12%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="purple" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#efc8ff" />
            <stop offset="34%" stopColor="#ba7be0" />
            <stop offset="72%" stopColor="#7b3fa3" />
            <stop offset="100%" stopColor="#47205f" />
          </linearGradient>
          <radialGradient id="button" cx="34%" cy="18%" r="76%">
            <stop offset="0%" stopColor="#f7dcff" />
            <stop offset="42%" stopColor="#b879dc" />
            <stop offset="75%" stopColor="#74399b" />
            <stop offset="100%" stopColor="#3f185c" />
          </radialGradient>
          <linearGradient id="lcd" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#b9c88c" />
            <stop offset="52%" stopColor="#8fa16d" />
            <stop offset="100%" stopColor="#62734c" />
          </linearGradient>
          <pattern id="lcdGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="transparent" />
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2f3b26" strokeWidth="0.8" opacity="0.22" />
            <rect x="2" y="2" width="2" height="2" fill="#202a1c" opacity="0.16" />
          </pattern>
          <filter id="plasticNoise" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="7" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.7  0 0 0 0 0.58  0 0 0 0 0.36  0 0 0 0.12 0" result="grain" />
            <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
          </filter>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.62" />
          </filter>
          <filter id="buttonShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="13" stdDeviation="11" floodColor="#000" floodOpacity="0.58" />
          </filter>
          <filter id="lcdInset" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#000" floodOpacity="0.75" />
          </filter>
        </defs>

        <rect width="1700" height="960" fill="url(#body)" />

        <g transform="translate(50 30)">
          <g filter="url(#plasticNoise)">
            <path
              d="M-105 455 C-105 120 230 -58 800 -58 C1370 -58 1705 120 1705 455 C1705 805 1365 982 800 982 C235 982 -105 805 -105 455 Z"
              fill="url(#body)"
            />
            <path
              d="M-105 455 C-105 120 230 -58 800 -58 C1370 -58 1705 120 1705 455 C1705 805 1365 982 800 982 C235 982 -105 805 -105 455 Z"
              fill="url(#bodySpec)"
            />
          </g>

          <path
            d="M-30 455 C-30 145 260 10 800 10 C1340 10 1630 145 1630 455 C1630 770 1336 905 800 905 C264 905 -30 770 -30 455 Z"
            fill="none"
            stroke="#b783e5"
            strokeWidth="34"
            opacity="0.78"
          />

          <path
            d="M130 460 C130 190 390 70 800 70 C1210 70 1470 190 1470 460 C1470 723 1210 835 800 835 C390 835 130 723 130 460 Z"
            fill="#fff7dd"
            opacity="0.20"
          />

          <path
            d="M225 125 C320 20 500 92 570 42 C620 6 980 6 1030 42 C1100 92 1280 20 1375 125 C1450 208 1440 705 1368 792 C1260 920 340 920 232 792 C160 705 150 208 225 125 Z"
            fill="url(#purple)"
            filter="url(#innerShadow)"
          />
          <path
            d="M245 146 C340 62 505 122 585 70 C635 38 965 38 1015 70 C1095 122 1260 62 1355 146"
            fill="none"
            stroke="#fff"
            strokeWidth="18"
            opacity="0.14"
          />

          <rect x="260" y="180" width="1080" height="555" rx="88" fill="#050606" filter="url(#lcdInset)" />
          <rect x="294" y="214" width="1012" height="487" rx="68" fill="url(#lcd)" />
          <rect x="294" y="214" width="1012" height="487" rx="68" fill="url(#lcdGrid)" />
          <rect x="294" y="214" width="1012" height="487" rx="68" fill="#26321f" opacity="0.10" />
          <ellipse cx="575" cy="263" rx="340" ry="64" fill="#fffbe0" opacity="0.10" />

          <g fill="#182316" fontFamily="monospace" fontWeight="700" opacity="0.92">
            <text x="350" y="285" fontSize="34">♥ 100%</text>
            <text x="540" y="285" fontSize="34">FOOD 100%</text>
            <text x="810" y="285" fontSize="34">FUN 100%</text>
            <text x="1075" y="285" fontSize="34">CARE 100%</text>
            <rect x="350" y="318" width="900" height="5" />
            <rect x="372" y="365" width="250" height="178" fill="none" stroke="#182316" strokeWidth="5" />
            <text x="405" y="410" fontSize="33">CRESCI.</text>
            <text x="405" y="455" fontSize="33">GIOCA.</text>
            <text x="405" y="500" fontSize="33">CONNETTITI.</text>
            <circle cx="802" cy="445" r="76" fill="#182316" opacity="0.92" />
            <circle cx="775" cy="430" r="10" fill="#8fa16d" />
            <circle cx="828" cy="430" r="10" fill="#8fa16d" />
            <path d="M770 475 Q802 503 834 475" fill="none" stroke="#8fa16d" strokeWidth="8" />
            <ellipse cx="802" cy="548" rx="150" ry="25" fill="none" stroke="#182316" strokeWidth="5" opacity="0.62" />
            <text x="425" y="632" fontSize="36">IL TUO MONDO. IL TUO TAMA.</text>
          </g>

          <path
            d="M1265 165 C1370 322 1374 628 1245 782"
            fill="none"
            stroke="#fff7df"
            strokeWidth="17"
            opacity="0.24"
          />
          <path
            d="M210 415 C220 245 315 118 485 55"
            fill="none"
            stroke="#fff7df"
            strokeWidth="32"
            opacity="0.20"
          />

          <circle cx="535" cy="818" r="61" fill="url(#button)" filter="url(#buttonShadow)" />
          <circle cx="800" cy="842" r="64" fill="url(#button)" filter="url(#buttonShadow)" />
          <circle cx="1065" cy="818" r="61" fill="url(#button)" filter="url(#buttonShadow)" />
          <ellipse cx="512" cy="795" rx="27" ry="13" fill="#ffffff" opacity="0.30" />
          <ellipse cx="777" cy="818" rx="28" ry="14" fill="#ffffff" opacity="0.30" />
          <ellipse cx="1042" cy="795" rx="27" ry="13" fill="#ffffff" opacity="0.30" />
        </g>
      </svg>
    </main>
  );
}
