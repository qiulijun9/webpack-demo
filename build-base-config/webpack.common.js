const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  srcPath
} = require('./paths')

module.exports = {
  //多入口
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js'),
  },
  module: {
    rules: [ 
    //  {
    //     test: /.html$/,
    //     use: "html-withimg-loader" //在html中引入img
    //  },
      {
        test: /\.html$/,
        loader: "html-loader" // 引入 img 等资源将其交付给 url-loader
      },
    ]
  },
  plugins: [
    //多入口配置 每个入口都得写
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: 'index.html',
      chunks: ['index'] // 只引用 index.js
    }),

    new HtmlWebpackPlugin({
      template: "./public/other.html",
      filename: 'other.html',
      chunks: ['other'] // 只引用 other.js
    })
  ]
}