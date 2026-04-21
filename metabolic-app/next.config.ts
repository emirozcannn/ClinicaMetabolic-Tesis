import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL?.trim() ||
      (process.env.NODE_ENV === "production"
        ? "https://clinicametabolic-tesis.onrender.com"
        : "http://127.0.0.1:8000");

    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;

