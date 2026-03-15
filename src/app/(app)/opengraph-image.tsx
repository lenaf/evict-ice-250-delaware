import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Evict ICE from 250 Delaware - Buffalo, NY Community Campaign";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "logo-transparent.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFD600",
          padding: "60px",
        }}
      >
        <img src={logoSrc} width={800} height={194} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "36px",
            fontWeight: 900,
            color: "#0F172A",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Buffalo, NY Community Campaign
        </div>
      </div>
    ),
    { ...size }
  );
}
