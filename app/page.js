export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        aria-label="TamaSocial hardware shell"
        role="img"
        style={{
          width: "100vmin",
          height: "100vmin",
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "block",
          userSelect: "none",
        }}
      >
        <defs>
          <radialGradient id="body" cx="38%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#fff0cc" />
            <stop offset="42%" stopColor="#eed7ad" />
            <stop offset="80%" stopColor="#c6a77a" />
            <stop offset="100%" stopColor="#92704d" />
          </radialGradient>
          <linearGradient id="purple" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e0b5ff" />
            <stop offset="48%" stopColor="#9b5fc5" />
            <stop offset="100%" stopColor="#5c2b82" />
          </linearGradient>
          <radialGradient id="button" cx="35%" cy="22%" r="75%">
            <stop offset="0%" stopColor="#f2d1ff" />
            <stop offset="52%" stopColor="#a96bd2" />
            <stop offset="100%" stopColor="#4b1f6d" />
          </radialGradient>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="28" stdDeviation="30" floodColor="#000" floodOpacity="0.65" />
          </filter>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.75" />
          </filter>
        </defs>

        <rect width="1000" height="1000" fill="#000" />

        <g filter="url(#softShadow)">
          <path
            d="M140 490 C140 220 286 85 500 85 C714 85 860 220 860 490 C860 760 712 875 500 875 C288 875 140 760 140 490 Z"
            fill="url(#body)"
          />
          <path
            d="M145 490 C145 220 286 90 500 90 C714 90 855 220 855 490 C855 760 710 868 500 868 C290 868 145 760 145 490 Z"
            fill="none"
            stroke="#b47ce1"
            strokeWidth="22"
            opacity="0.75"
          />
          <path
            d="M215 510 C215 310 328 210 500 210 C672 210 785 310 785 510 C785 708 675 792 500 792 C325 792 215 708 215 510 Z"
            fill="#d9c09a"
            opacity="0.22"
          />

          <path
            d="M285 245 C335 185 428 225 455 175 C468 152 532 152 545 175 C572 225 665 185 715 245 C752 290 748 665 712 705 C660 762 340 762 288 705 C252 665 248 290 285 245 Z"
            fill="url(#purple)"
            filter="url(#innerShadow)"
          />

          <rect x="292" y="286" width="416" height="320" rx="48" fill="#070707" />
          <rect x="310" y="304" width="380" height="284" rx="38" fill="#0c0e0e" />
          <ellipse cx="420" cy="342" rx="150" ry="42" fill="#ffffff" opacity="0.08" />
          <path d="M720 255 C770 350 780 560 714 708" fill="none" stroke="#fff7dd" strokeWidth="11" opacity="0.22" />
          <path d="M214 465 C214 330 245 235 325 180" fill="none" stroke="#fff8de" strokeWidth="20" opacity="0.20" />

          <circle cx="365" cy="755" r="47" fill="url(#button)" filter="url(#innerShadow)" />
          <circle cx="500" cy="775" r="47" fill="url(#button)" filter="url(#innerShadow)" />
          <circle cx="635" cy="755" r="47" fill="url(#button)" filter="url(#innerShadow)" />
          <ellipse cx="350" cy="735" rx="20" ry="11" fill="#fff" opacity="0.26" />
          <ellipse cx="485" cy="755" rx="20" ry="11" fill="#fff" opacity="0.26" />
          <ellipse cx="620" cy="735" rx="20" ry="11" fill="#fff" opacity="0.26" />
        </g>
      </svg>
    </main>
  );
}
