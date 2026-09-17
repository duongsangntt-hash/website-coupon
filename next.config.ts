import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (no DB, no API routes) — export plain HTML/CSS/JS so
  // shared hosting can serve it with Apache directly, no Node.js process
  // required. See README "Deploy" section.
  output: "export",
  images: {
    formats: ["image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
