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
      <img
        src="/assets/tamasocial-hardware/tamasocial-hardware-landing.jpg?v=1"
        alt="TamaSocial virtual pet hardware"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </main>
  );
}
