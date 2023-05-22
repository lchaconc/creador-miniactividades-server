const webpack = require("webpack");
const configProd = require("./webpack.prod.js");
const configDev = require("./webpack.dev.js");
const configTest = require("./webpack.test.js");

function buildProd(idApp) {
  //console.log("iniciando el BUILD de producción con el valor de idApp:", idApp);
  return new Promise((resolve, reject) => {
    webpack(configProd(idApp), (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(
          err ||
            new Error(
              stats.compilation.errors.join("\n") || "Error en la construcción"
            )
        );
      } else {
        resolve(stats);
      }
    });
  });
}


function buildDev(idApp) {
   // console.log("iniciando el BUILD de desarrollo con el valor de idApp:", idApp);
    return new Promise((resolve, reject) => {
      //webpack(configDev(idApp), (err, stats) => {
      webpack(configTest(idApp), (err, stats) => {
        if (err || stats.hasErrors()) {
          reject(
            err ||
              new Error(
                stats.compilation.errors.join("\n") || "Error en la construcción"
              )
          );
        } else {
          resolve(stats);
        }
      });
    });
  }

module.exports = {buildProd, buildDev };
