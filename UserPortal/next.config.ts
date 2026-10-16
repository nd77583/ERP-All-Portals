import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/dashboard/:path*",
        destination: "/api/Dashboard/:path*",
      },
      {
        source: "/api/about/:path*",
        destination: "/api/About/:path*",
      },
      {
        source: "/api/sportsinfrastructure/:path*",
        destination: "/api/SportsInfrastructure/:path*",
      },
      {
        source: "/api/researchAndLabs/:path*",
        destination: "/api/researchandlabs/:path*",
      },
      {
        source: "/api/ResearchAndLabs/:path*",
        destination: "/api/researchandlabs/:path*",
      },
    ];
  },
};

export default nextConfig;
