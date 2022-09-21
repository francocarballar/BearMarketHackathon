/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/index' },
      '/results': { page: '/results' },
      '/signin': { page: '/signin' },
      '/user': { page: '/user' }
    }
  }
}

module.exports = {
  nextConfig
}
