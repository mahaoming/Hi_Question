const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'hammond'

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        _c: resolve('src/components'),
        _u: resolve('src/utils'),
        api: resolve('src/api')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        data: `@import "~@/static/styles/variables.scss"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        // share global styles
        // https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
        data:[
          `@import "~@/assets/style/basic.scss";`,
          `@import "~@/assets/style/components.scss";`,
          `@import "~@/assets/style/mixin.scss";`,
          `@import "~@/static/styles/variables.scss";`
        ].join('')
      }
    }
  }
}
