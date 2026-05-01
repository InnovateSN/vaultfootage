export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, #171923 0%, #090b12 58%, #04050a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(94vw, 1180px)",
          aspectRatio: "16 / 10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 1600 1000"
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <defs>
            <radialGradient id="shellGradient" cx="38%" cy="24%" r="78%">
              <stop offset="0%" stopColor="#fff2cf" />
              <stop offset="34%" stopColor="#ead3a5" />
              <stop offset="72%" stopColor="#c5a779" />
              <stop offset="100%" stopColor="#80613f" />
            </radialGradient>
            <filter id="shellShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="34" stdDeviation="28" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          <g filter="url(#shellShadow)">
            <path
              d="M250 220 C330 120 520 88 800 88 C1080 88 1270 120 1350 220 C1438 330 1442 650 1324 760 C1205 870 970 895 800 895 C630 895 395 870 276 760 C158 650 162 330 250 220 Z"
              fill="url(#shellGradient)"
            />
            <path
              d="M395 285 C455 228 535 210 800 210 C1065 210 1145 228 1205 285 C1268 346 1270 589 1202 646 C1135 703 1032 710 800 710 C568 710 465 703 398 646 C330 589 332 346 395 285 Z"
              fill="#11131a"
              opacity="0.92"
            />
            <path
              d="M413 302 C470 252 550 237 800 237 C1050 237 1130 252 1187 302 C1243 352 1245 574 1185 624 C1125 674 1015 681 800 681 C585 681 475 674 415 624 C355 574 357 352 413 302 Z"
              fill="#07090f"
            />
            <circle cx="575" cy="795" r="58" fill="#8a6f4b" opacity="0.72" />
            <circle cx="800" cy="795" r="58" fill="#8a6f4b" opacity="0.72" />
            <circle cx="1025" cy="795" r="58" fill="#8a6f4b" opacity="0.72" />
            <circle cx="575" cy="795" r="41" fill="#07090f" opacity="0.72" />
            <circle cx="800" cy="795" r="41" fill="#07090f" opacity="0.72" />
            <circle cx="1025" cy="795" r="41" fill="#07090f" opacity="0.72" />
            <ellipse cx="570" cy="150" rx="310" ry="58" fill="#fff8de" opacity="0.16" />
            <ellipse cx="342" cy="415" rx="52" ry="230" fill="#fff8de" opacity="0.14" />
          </g>
        </svg>
      </div>
    </main>
  );
}
