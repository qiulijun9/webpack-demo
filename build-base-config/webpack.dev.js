const path = require('path');
const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common.js');
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();
const LoggerPlugin = require('../public/plugin/LoggerPlugin.jsx');
const { smart } = require('webpack-merge');
const { srcPath, distPath } = require('./paths');

module.exports = smart(webpackCommonConf, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //开发环境下使用
  entry: {
    // index: path.join(srcPath, 'index.js'),
    index: [
      'webpack-dev-server/client?http://localhost:3501/',
      'webpack/hot/dev-server',
      path.join(srcPath, 'index.js'),
    ],
    other: path.join(srcPath, 'other.js'),
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        loader: ['babel-loader?cacheDirectory'], //开启缓存babel-loader?cacheDirectory
        // include:path.resolve(__dirname,'src'),//明确范围
        exclude: /node_modules/, //忽略那些文件
      },
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'], // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], //sass loader
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development'
      ENV: JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(), //开启热更新
    // new DashboardPlugin(dashboard.setData)
    new LoggerPlugin(
      () => {
        // Webpack 模块完成转换成功
        console.log('所有模块的转换和代码块对应的文件已经生成好~');
      },
      () => {
        // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
        console.log('模块构建完成~');
      }
    ),
  ],
  devServer: {
    host: 'localhost', //ip
    port: 3501,
    // progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
    hot: true, //热更新,
    //设置代理
    proxy: {
      '/api/': 'http://localhost:3000',
    },
    historyApiFallback: true,
  },
});
