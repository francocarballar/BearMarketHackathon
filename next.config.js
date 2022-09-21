module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
}
