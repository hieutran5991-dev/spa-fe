import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_STORAGE_HOST!,
        port: process.env.NEXT_STORAGE_PORT!,
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_STORAGE_HOST!,
        port: process.env.NEXT_STORAGE_PORT!,
        pathname: "/storage/**",
      },
    ],
    // Optimize images for better performance
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async () => [
    {
      source: "/treatment-menu",
      destination: "/en/menu-prices",
    },
    {
      source: "/:locale/treatment-menu",
      destination: "/:locale/menu-prices",
    },
  ],
};

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
