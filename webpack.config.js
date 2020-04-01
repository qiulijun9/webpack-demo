const {
  resolve
} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //入口配置
  entry: "./src/index.js",
  //出口配置
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist") //绝对路径
  },
  //loader
  module: {
    rules: [{
        test: /\.css$/,
        // loader: ["style-loader", "css-loader"] //css loader
        loader: ExtractTextPlugin.extract({
          //把css打包到指定文件夹
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"],
          publicPath: "../" //css中文件的路径
        })
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader "] //less loader
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader "] //sass loader
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 4 * 1024, //超过4kb，转换成base64的图片
            outputPath: "imgs" //打包后输出的路径
          }
        }]
      },
      // {
      //   test: /\.(js|jsx)/,
      //   use: ["babel-loader"],
      //   exclude: /node_modules/
      // }
    ]
  },
  //插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //开启热更新
    //生成html模板
    new HtmlWebpackPlugin({
      template: "./public/index.html", //定义模板
      title: "webpack", //定义html title
      hash: true //缓存
    }),
    new ExtractTextPlugin("css/index.css") //打包css文件到指定文件夹和js 文件分离
  ],
  //开发服务器
  devServer: {
    contentBase: resolve(__dirname, "build"), //服务器访问的地址
    compress: true, // 启动 gzip
    host: "localhost", //ip
    port: 3000,
    open: true, // 自动打开浏览器
    hot: true //热更新
  },
  //模式 开发环境 development，生产环境 production
  mode: "development"
};