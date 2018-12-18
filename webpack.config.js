const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HOSPITAL = `${__dirname}/client/hospital`;

module.exports = {
  entry: {
    hospital: path.resolve(HOSPITAL, "scripts/index")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build")
  },
  context: path.resolve(__dirname, "client"),
  module: {
    rules: [
      { test: /\.tsx?$/, enforce: "pre", use: "tslint-loader" },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ],
        include: __dirname,
        exclude: /node_modules/
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "stylus-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "hospital.html",
      template: path.resolve(HOSPITAL, "index.html"),
      chunks: ["hospital"]
    })
  ]
};
