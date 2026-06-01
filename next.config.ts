import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const storageHost = process.env.NEXT_STORAGE_HOST?.trim() || "localhost";
const storagePort = process.env.NEXT_STORAGE_PORT?.trim() || "8000";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
