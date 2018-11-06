var debug = process.env.NODE_ENV !== "production";
var path = require('path');
var webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "main.min.js"
  },
  plugins: debug ? [] : [
    new BabiliPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};