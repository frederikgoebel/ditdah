module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('file-loader')
      .loader('file-loader')
      .end()
  }
}
