const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Silences the next-pwa webpack-config conflict in Next.js 16
  turbopack: {},

  // Serve Brotli / Gzip compressed responses from the Node server
  compress: true,

  // Prefer AVIF then WebP; cache optimised images for 60 s minimum
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Tree-shake large packages so only imported icons/components are bundled
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "three"],
  },
};

module.exports = withPWA(nextConfig);
