const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][hash][ext]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract style string into css files
          "css-loader", // compile css into javascript
          "sass-loader", // transpile .scss into .css
        ],
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })],
});
