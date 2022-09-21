module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/signin': { page: '/signin' },
      '/user': { page: '/user' },
      '/results': { page: '/results' }
    }
  }
}
