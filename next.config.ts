import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /** Next 빌드 아웃풋 최적화 (standalone) */
  output: 'standalone',
  // (옵션) 이미지 외부 도메인 쓰면 domains 등록 필요
  // images: { remotePatterns: [{ protocol: 'https', hostname: '...'}] },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.momuzzi.site/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
