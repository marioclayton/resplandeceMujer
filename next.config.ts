import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle packages that might cause SSR issues
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
