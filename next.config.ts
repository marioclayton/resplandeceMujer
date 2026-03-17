import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    // Empty turbopack config to silence the warning
    // Most applications work fine with Turbopack with no configuration
  },
  // Move contentful to external packages to help with server-side rendering
  serverExternalPackages: ['contentful'],
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
