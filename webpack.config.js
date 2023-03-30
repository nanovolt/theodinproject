const path = require("path");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "docs"),
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "docs"),
    port: 9000,
    client: {
      logging: "none",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
