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
        viewBox="0 0 1600 900"
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
          <radialGradient id="body" cx="36%" cy="18%" r="92%">
            <stop offset="0%" stopColor="#fff3d3" />
            <stop offset="36%" stopColor="#ead2a2" />
            <stop offset="72%" stopColor="#c1a071" />
            <stop offset="100%" stopColor="#836344" />
          </radialGradient>
          <linearGradient id="purple" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e7bdff" />
            <stop offset="45%" stopColor="#a065ca" />
            <stop offset="100%" stopColor="#552678" />
          </linearGradient>
          <radialGradient id="button" cx="34%" cy="20%" r="76%">
            <stop offset="0%" stopColor="#f2d0ff" />
            <stop offset="52%" stopColor="#a96bd2" />
            <stop offset="100%" stopColor="#4a1d6b" />
          </radialGradient>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.62" />
          </filter>
          <filter id="buttonShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="13" stdDeviation="11" floodColor="#000" floodOpacity="0.58" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#body)" />

        <path
          d="M-105 455 C-105 120 230 -58 800 -58 C1370 -58 1705 120 1705 455 C1705 805 1365 982 800 982 C235 982 -105 805 -105 455 Z"
          fill="url(#body)"
        />

        <path
          d="M-30 455 C-30 145 260 10 800 10 C1340 10 1630 145 1630 455 C1630 770 1336 905 800 905 C264 905 -30 770 -30 455 Z"
          fill="none"
          stroke="#b783e5"
          strokeWidth="34"
          opacity="0.68"
        />

        <path
          d="M130 460 C130 190 390 70 800 70 C1210 70 1470 190 1470 460 C1470 723 1210 835 800 835 C390 835 130 723 130 460 Z"
          fill="#fff7dd"
          opacity="0.17"
        />

        <path
          d="M225 125 C320 20 500 92 570 42 C620 6 980 6 1030 42 C1100 92 1280 20 1375 125 C1450 208 1440 705 1368 792 C1260 920 340 920 232 792 C160 705 150 208 225 125 Z"
          fill="url(#purple)"
          filter="url(#innerShadow)"
        />

        <rect x="260" y="180" width="1080" height="555" rx="88" fill="#040505" />
        <rect x="294" y="214" width="1012" height="487" rx="68" fill="#101313" />
        <ellipse cx="570" cy="260" rx="315" ry="60" fill="#ffffff" opacity="0.075" />

        <path
          d="M1265 165 C1370 322 1374 628 1245 782"
          fill="none"
          stroke="#fff7df"
          strokeWidth="17"
          opacity="0.22"
        />
        <path
          d="M210 415 C220 245 315 118 485 55"
          fill="none"
          stroke="#fff7df"
          strokeWidth="32"
          opacity="0.18"
        />

        <circle cx="535" cy="818" r="61" fill="url(#button)" filter="url(#buttonShadow)" />
        <circle cx="800" cy="842" r="64" fill="url(#button)" filter="url(#buttonShadow)" />
        <circle cx="1065" cy="818" r="61" fill="url(#button)" filter="url(#buttonShadow)" />
        <ellipse cx="512" cy="795" rx="27" ry="13" fill="#ffffff" opacity="0.25" />
        <ellipse cx="777" cy="818" rx="28" ry="14" fill="#ffffff" opacity="0.25" />
        <ellipse cx="1042" cy="795" rx="27" ry="13" fill="#ffffff" opacity="0.25" />
      </svg>
    </main>
  );
}
