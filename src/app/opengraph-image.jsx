import { ImageResponse } from "next/og";
import { site } from "@/libs/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1f1a08 55%, #0a0a0a 100%)",
          border: "12px solid rgba(255, 215, 0, 0.35)",
        }}
      >
        <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: 22, color: "#ffd700" }}>SOFT ROOTS</div>
        <div style={{ width: 160, height: 4, margin: "28px 0", background: "#ffd700" }} />
        <div style={{ fontSize: 42, letterSpacing: 6, color: "#fff8dc" }}>{site.tagline.toUpperCase()}</div>
      </div>
    ),
    size
  );
}
