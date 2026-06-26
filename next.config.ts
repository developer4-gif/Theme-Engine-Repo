import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  outputFileTracingExcludes: {
    '/api/*': [
      './references/**/*',
      './references-resized/**/*',
      './public/references/**/*',
    ],
  },
};

export default nextConfig;
