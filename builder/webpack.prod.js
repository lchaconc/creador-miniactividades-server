const path = require('path');
const HtmlWebpackPlugin = require ("html-webpack-plugin");
const  CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require( "zip-webpack-plugin" );


const ruleForStyles = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
} 

const rules = [ruleForStyles]
//const idApp = argv.idApp;
module.exports = (idApp) => {    
    console.log(`Iniciando el empaquetado en modo "PRODUCCIÓN" de la aplicación ${idApp}`);    


    return  {
    entry: `../proy/${idApp}/main.js`,
    output: {
        path: path.resolve(__dirname,  `../dist/${idApp}`),
        filename: "bundle.[contenthash].js"
    },
    mode: "production",
    resolve: {
        extensions: [".js", ".json"]
      },
      module : {rules},
    plugins: [ 
    new HtmlWebpackPlugin ({
        title: idApp,
        template: `../proy/${idApp}/public/index.html`,
    }),
    new CopyPlugin ({
        patterns: [
            {from: `../proy/${idApp}/public/assets`, to: "./" }            
        ]
    }),
    new ZipPlugin ({
        path: path.resolve(__dirname, "../zips"),
        filename: idApp,
        extension: "zip",
    })
 ]
}

}
