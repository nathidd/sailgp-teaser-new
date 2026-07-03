import { ImageResponse } from "next/og";

// Branded social-share image (link unfurl thumbnail).
export const alt = "SailGP x hansgrohe Teaser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: 90,
          background: "#03050F",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#E7FF00",
          }}
        >
          SailGP × hansgrohe
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          Exclusive Partnership Teaser
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Germany SailGP Team
        </div>
      </div>
    ),
    { ...size }
  );
}
