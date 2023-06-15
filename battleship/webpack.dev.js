const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
  },
  devServer: {
    static: path.resolve(__dirname),
    port: 9000,
    client: {
      logging: "none",
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // inject <style> into DOM
          "css-loader", // compile css into javascript
          "sass-loader", // transpile .scss into .css
        ],
      },
    ],
  },
});
