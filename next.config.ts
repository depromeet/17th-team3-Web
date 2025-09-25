import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /** Next 빌드 아웃풋 최적화 (standalone) */
  output: 'standalone',
  // Unsplash 이미지 사용을 위한 도메인 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
