/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    reactCompiler: false,
  },
  async redirects() {
    return [
      {
        source: '/types',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig