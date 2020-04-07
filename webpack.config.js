const {
  resolve
} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
  //入口配置
  entry: "./src/index.js",
  //多入口配置：
  // entry: {
  //  index:"./src/index.js",
  // other:"./src/other.js"

  //}
  //出口配置
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist") //必须是绝对路径
  },
  //loader
  module: {
    rules: [{
        test: /.html$/,
        use: "html-withimg-loader" //在html中引入img
      },
      {
        test: /\.css$/,
        // loader: ["style-loader", "css-loader"] //css loader
        loader: ExtractTextPlugin.extract({
          //把css打包到指定文件夹
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"], //执行顺序，从后往前postcss-loader 兼容浏览器， css-loader变成css ,style-loader插入head中
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
            limit: 4 * 1024, //超过4k，转换成base64的图片
            outputPath: "imgs", //打包后输出的路径
            esModule: false
          }
        }]
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      }
    ],
    noParse: [/react\.min\.js$/]
  },
  //插件
  plugins: [
    new webpack.ProvidePlugin({
      //全局引入第三方库
      React: "react",
      Component: ["react", "Component"]
    }),
    new CleanWebpackPlugin(), //每次打包前清空dist目录
    new webpack.HotModuleReplacementPlugin(), //开启热更新
    //生成html模板
    new HtmlWebpackPlugin({
      template: "./public/index.html", //定义模板
      title: "webpack", //定义html title
      hash: true, //缓存,
      filename: "index.html" //打包后的文件名
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
  // devtool: "cheap-module-eval-source-map" //开发环境下使用
};