module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/S4-FrontEnd/'
      : '/',

    router: {
        base: '/S4-FrontEnd/'
    }
  }