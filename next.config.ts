import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

export default nextConfig;
