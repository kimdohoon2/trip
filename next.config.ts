import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['tong.visitkorea.or.kr'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
