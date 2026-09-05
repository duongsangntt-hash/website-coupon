import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  // Shared/cPanel hosting (CloudLinux LVE) caps how many processes/threads
  // an account may spawn. Next.js's default build worker pool exceeds that
  // and fails with "spawn EAGAIN" — force a single-process build instead.
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
