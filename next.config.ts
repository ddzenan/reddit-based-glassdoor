import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_URL as string,
      "firebasestorage.googleapis.com",
      "logo.clearbit.com",
    ],
  },
};

export default nextConfig;
