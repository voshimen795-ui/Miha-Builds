import { ImageResponse } from "next/og";

export const alt = "Miha Builds · Automatizacija poslovnih procesa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card: the hero line on paper, with the untangled thread.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f3efe6",
          color: "#15140f",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#5f5a4d" }}>
          MIHA BUILDS · AUTOMATIZACIJA POSLOVNIH PROCESA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1 }}>
          <span>Vaš tim radi posao</span>
          <span>koji mašina može.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 640, height: 2, background: "#15140f" }} />
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#e0491f" }} />
          <span style={{ fontSize: 30, fontStyle: "italic", color: "#2b2922" }}>sati, novac i mir</span>
        </div>
      </div>
    ),
    size,
  );
}
