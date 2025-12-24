/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Esto permite que el build termine exitosamente incluso si hay errores de TypeScript.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto permite que el build termine exitosamente incluso si hay advertencias de ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;