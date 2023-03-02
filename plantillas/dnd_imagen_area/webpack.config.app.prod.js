const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");



module.exports = (idApp)=> {
  
  console.log("idApp en modo producción", idApp);


  return {
    entry: "./plantillas/dnd_imagen_area/src/main.js",    
    output: {                
        path: path.resolve( __dirname,  `../../dist/${idApp}`),
        filename: "bundle.[contenthash].js"
    },
    mode: "production",
    resolve: {
      extensions: [".js", ".json"]
    },
    plugins: [new HtmlWebpackPlugin({template: "./plantillas/dnd_imagen_area/public/index.html"}),    
    new CopyPlugin({
        patterns: [
          { from: "./plantillas/dnd_imagen_area/public/assets", to: "./assets" },
          { from: "./plantillas/dnd_imagen_area/public/css", to: "./css" }              
        ],
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, "../../zips"),
        filename: `${idApp}.zip`,
        extension: "zip",
      })
   ]
  }

}