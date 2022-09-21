/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = {
  nextConfig,
  exportTrailingSlash: true,
  exportPathMap: function () {
    return { '/': { page: '/' } }
  }
}
