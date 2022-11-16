const path = require("path");
const webpack = require("webpack");
const precss = require("precss");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
  },
  entry: [
    "babel-polyfill",
    "whatwg-fetch",
    "webpack-dev-server/client?http://localhost:4010/",
    "webpack/hot/only-dev-server",
    "./src/index",
  ],
  output: {
    path: path.join(__dirname, "../public"),
    publicPath: "/",
    filename: "app.[hash].js",
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/"),
    },
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/react"],
          plugins: [
            "transform-async-to-generator",
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-optional-chaining",
            [
              "@babel/plugin-proposal-class-properties",
              {
                loose: true,
              },
            ],
            require.resolve("react-refresh/babel"),
          ],
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false",
        ],
      },
      {
        test: /vendor\/.+\.(jsx|js)$/,
        loader: "imports-loader?jQuery=jquery,$=jquery,this=>window",
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: "./index.hbs" }),
    // eslint-disable-next-line no-useless-escape
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      debug: true,
      options: {
        postcss: function () {
          return [precss, autoprefixer];
        },
        context: path.join(__dirname, "src"),
        output: { path: path.join(__dirname, "dist") },
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
