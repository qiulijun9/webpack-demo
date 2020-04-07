const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  srcPath,
  distPath
} = require('./paths')

module.exports = {
  //多入口
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /.html$/,
        use: "html-withimg-loader" //在html中引入img
      },
      // {
      //     test: /\.vue$/,
      //     loader: ['vue-loader'],
      //     include: srcPath
      // },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
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