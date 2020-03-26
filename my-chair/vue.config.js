module.exports = {
  // devServer: {
  //   proxy: {
  //     // 对象名和 vue-cli2 中的 proxyTable 不同
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   },
  //   host: 'localhost',
  //   port: 80,
  //   // open: true
  // },
  "configureWebpack": {
    // for debugging in VSCode
    // see: https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html
    "devtool": "source-map"
  },
  "transpileDependencies": [
    "vuetify"
  ]
};
