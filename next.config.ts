import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    const scriptSrc = process.env.NODE_ENV === 'development'
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
      : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: `default-src 'self'; ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.ctfassets.net https://ui-avatars.com; font-src 'self' data:; connect-src 'self' https://cdn.contentful.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://us18.list-manage.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://us18.list-manage.com; object-src 'none'; upgrade-insecure-requests` },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      ],
    }];
  },
  images: {
    qualities: [65, 75],
    minimumCacheTTL: 2678400,
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
