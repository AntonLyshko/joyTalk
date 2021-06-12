const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GrpcWebPlugin = require("grpc-webpack-plugin");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "src");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "es2015",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
        include: defaultInclude,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        include: defaultInclude,
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" }],
        include: defaultInclude,
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({ title: "Graphic Auto File Interface" }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "bundle.css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new GrpcWebPlugin({
      protoPath: DIR,
      protoFiles: ["echo.proto"],
      outputType: "js",
      importStyle: "commonjs",
      binary: true,
      outDir: OUT_DIR,
    }),
    new GrpcWebPlugin({
      protoPath: DIR,
      protoFiles: ["echo.proto"],
      outputType: "grpc-web",
      importStyle: "commonjs+dts",
      mode: "grpcwebtext",
      outDir: OUT_DIR,
    }),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
  optimization: {
    minimize: true,
  },
  infrastructureLogging: {
    level: "error",
    debug: /GrpcWebPlugin/,
  },
};
