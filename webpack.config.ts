// const path = require("path");
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import path from "path";

module.exports = {
  entry: "./src/index.tsx", // Modify the entry point according to your project
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Modify the output path according to your project
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      dns: require.resolve("dns-then"),
      fs: require.resolve("browserify-fs"),
      tls: require.resolve("browserify-tls"),
    },
  },
  plugins: [new NodePolyfillPlugin()],
};
