/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable compression for better performance on Vercel
  compress: true,
  // Add performance optimizations
  experimental: {
    optimizePackageImports: ['three', 'lucide-react'],
  },
  // Cache static assets
  headers: async () => [
    {
      source: '/gallery/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}

export default nextConfig
