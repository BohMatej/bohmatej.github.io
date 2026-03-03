import type { NextConfig } from 'next';

const repo = 'personal-website'; // e.g. personal-site
const isProjectPage = false; // false if repo is username.github.io

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProjectPage ? `/${repo}` : '',
  assetPrefix: isProjectPage ? `/${repo}/` : '',
};

export default nextConfig;
