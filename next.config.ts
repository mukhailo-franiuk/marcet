import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com', // 🔥 Дозволяємо відображення картинок із вашого сховища
      },
    ],
  },
};

export default nextConfig;
