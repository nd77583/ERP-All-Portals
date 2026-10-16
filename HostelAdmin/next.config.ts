import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow mobile phones and local network devices to access Next.js dev resources without 403 Forbidden
  allowedDevOrigins: [
    "192.168.1.20",
    "192.168.1.*",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
};

export default nextConfig;
