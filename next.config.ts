import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Aquí agregaríamos 'res.cloudinary.com' en el futuro
    ],
  },
};

export default nextConfig;