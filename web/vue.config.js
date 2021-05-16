module.exports = {
      // 公共路径
      publicPath: "./",
      chainWebpack: () => {},
      // 配置 webpack-dev-server 行为。
      devServer: {
          open: true, //编译后默认打开浏览器
          host: 'localhost',
          port: 1688,
          https: false,  //是否https
          //显示警告和错误
          overlay: {
              warnings: false,
              errors: true
          },
          /*proxy: {
              '/api': {
                  target: 'http://test.api',
                  changeOrigin: true, 
                  ws: false, 
                  secure: false,
                  pathRewrite: {
                      '^/api': ''
                  }
              }
          }*/
      }
}