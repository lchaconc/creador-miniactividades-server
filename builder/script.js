const {buildProd, buildDev} = require ("./builder.js")

async function setup () {
    //const stats = await buildProd("123456789");
    const stats = await buildDev ("123456789");
    //console.log(stats);    
}

setup()