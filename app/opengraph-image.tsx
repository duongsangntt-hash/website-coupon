import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE_NAME} - ${SITE_TAGLINE}`;
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
          background: "linear-gradient(135deg, #4f46e5 0%, #241e4e 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 84,
            height: 84,
            borderRadius: 20,
            background: "#ffffff",
            color: "#4f46e5",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          $
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 58,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 960,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#c7d2fe" }}>
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}
