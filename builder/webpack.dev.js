const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const rules = [ruleForStyles];

module.exports = (idApp) => {
  console.log(`Iniciando ${idApp} en modo de desarrollo...`);

  return {
    entry: `../proy/${idApp}/main.js`,
    output: {
      path: path.resolve(__dirname, `../dev/${idApp}`),
      filename: "bundle.[contenthash].js",
    },
    mode: "development",
    resolve: {
      extensions: [".js", ".json"],
    },
    module: { rules },
    plugins: [
      new HtmlWebpackPlugin({
        title: idApp,
        template: `../proy/${idApp}/public/index.html`,
      }),
      new CopyPlugin({
        patterns: [{ from: `../proy/${idApp}/public/assets`, to: "./" }],
      }),
    ],
  };
};
