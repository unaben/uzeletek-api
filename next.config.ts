import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the static client (e.g. http://localhost/uzletek) to call the API
  async headers() {
    return [
      {
        source: "/web/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Accept" },
        ],
      },
    ];
  },
};

export default nextConfig;
