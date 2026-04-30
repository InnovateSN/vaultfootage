export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        background: "#07090f",
        position: "relative",
      }}
    >
      <img
        src="/assets/device/generated-egg.svg?v=3"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 38%, rgba(7,9,15,0.18) 52%, rgba(7,9,15,0.72) 76%, #07090f 100%)",
          backdropFilter: "blur(0.6px)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-2%",
          pointerEvents: "none",
          boxShadow: "inset 0 0 160px 120px #07090f",
        }}
      />
    </main>
  );
}
