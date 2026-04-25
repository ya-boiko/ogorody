import type { NextConfig } from "next";

/**
 * Static export config for GitHub Pages.
 * BASE_PATH is set by the GitHub Actions workflow to "/<repo>" for project pages.
 * Locally (dev/build) it stays empty so paths resolve from "/" as before.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
