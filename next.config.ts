import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // For GitHub Pages deployment at https://badhope.github.io
  // basePath is empty since we deploy to root
  basePath: '',
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure all pages are statically generated
  // reactStrictMode: true,
};

export default nextConfig;
