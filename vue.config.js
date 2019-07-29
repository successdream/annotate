module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/style/variables.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168',
        changeOrigin: true,
      },
    }
  },
}