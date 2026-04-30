export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      width: "100vw",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at center,#141827 0%,#07090f 62%,#020308 100%)"
    }}>
      <img
        src="/assets/device/shell-base.svg"
        alt="TamaSocial device shell"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
          display: "block"
        }}
      />
    </main>
  );
}
