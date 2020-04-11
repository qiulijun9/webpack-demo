const {
  resolve
} = require("path");
const webpack = require("webpack");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpackCommonConf = require("./webpack.common.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const {
  smart
} = require("webpack-merge");
const {
  srcPath,
  distPath
} = require('./paths')


module.exports = smart(webpackCommonConf, {
  mode: "production",
  output: {
    // filename: "bundle.[contentHash:8].js", // 打包代码时，加上 hash 戳可以命中缓存
    filename: '[name].[contentHash:8].js',
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],//开启缓存babel-loader?cacheDirectory
        exclude: /node_modules/ //忽略那些文件
     },
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,
            // 打包到 img 目录下
            outputPath: '/imgs/',
          }
        }
      },
      // 抽离 css
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'postcss-loader'
        ]
      },
      // 抽离 less --> css
      {
        test: /\.less$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
    ],
    noParse:[/react\.min\.js$/]
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify("production"),
    }),
    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css'
    }),
    // 忽略moment 下的local 文件
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    //开启多进程打包
    new HappyPack({
      id:"babel",
      loaders:['babel-loader?cacheDirectory']
    }),
    //优化loadsh,但没有做到实质性的优化
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
      uglifyJS: {
          output: {
              beautify: true, // 最紧凑的输出
              comments: true, // 删除所有的注释
          },
          compress: {
              // 删除所有的 `console` 语句，可以兼容ie浏览器
              drop_console: true,
              // 内嵌定义了但是只用到一次的变量
              collapse_vars: true,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true,
          }
      }
  })
  ],
  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    //分割代码块
    // splitChunks:{
    //    chunks:"all",//全部chunk
    //      /**
    //          * initial 入口 chunk，对于异步导入的文件不处理
    //             async 异步 chunk，只对异步导入的文件处理
    //             all 全部 chunk
    //          */
    //    //第三方模块
    //    vendor:{
    //      name:"vendor",
    //      priority: 1, // 权限更高，优先抽离
    //      test:/node_modules/,
    //      minSize: 0,  // 大小限制
    //      minChunks: 1  // 最少复用过几次
    //    },
    //     // 公共的模块
    //     common: {
    //       name: 'common', // chunk 名称
    //       priority: 0, // 优先级
    //       minSize: 0,  // 公共模块的大小限制
    //       minChunks: 2  // 公共模块最少复用过几次
    //   }
    // }
  }
});