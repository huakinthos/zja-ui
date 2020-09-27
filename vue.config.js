const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'theme': '@/style/theme.scss'
      }
    }
  },
  /* css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/theme.scss";`
      },
    }
  } */
}
