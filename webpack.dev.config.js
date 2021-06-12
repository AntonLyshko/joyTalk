const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { spawn } = require("child_process");

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
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "postcss-loader" }],
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
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@actions": path.resolve(__dirname, "src/actions"),
    },
    extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".png", ".jpg", ".gif", ".jpeg", ".otf", ".ttf", ".svg"],
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({ title: "Graphic Auto File Interface" }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  devtool: "cheap-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      spawn("electron", ["."], { shell: true, env: process.env, stdio: "inherit" })
        .on("close", (code) => process.exit(0))
        .on("error", (spawnError) => console.error(spawnError));
    },
  },
};
