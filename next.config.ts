import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const storageHost = process.env.NEXT_STORAGE_HOST?.trim() || "localhost";
const storagePort = process.env.NEXT_STORAGE_PORT?.trim() || "8000";

const nextConfig: NextConfig = {
  images: {
    // Serve /public and remote images directly — works on Cloudflare Workers
    // without /_next/image or /cdn-cgi/image (both fail without extra CF setup).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: storageHost,
        port: storagePort,
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: storageHost,
        port: storagePort,
        pathname: "/storage/**",
      },
    ],
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
