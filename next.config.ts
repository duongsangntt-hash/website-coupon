import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  // Shared/cPanel hosting (CloudLinux LVE) caps how many OS processes an
  // account may fork, which breaks Next.js's build worker pool either way:
  // workerThreads:false forks child processes ("spawn EAGAIN"), and
  // workerThreads:true hits an unrelated Next.js worker_threads bug
  // (DataCloneError). Kept minimal (cpus:1, no webpack worker) so builds
  // are cheaper if ever run on a host like this, but the project is built
  // locally and the output committed — see README "Deploy" section.
  experimental: {
    workerThreads: false,
    cpus: 1,
    webpackBuildWorker: false,
  },
};

export default nextConfig;
