const {buildProd, buildDev} = require ("./builder.js")

async function setup () {
    //const stats = await buildProd("641e0c6688b391a051cf17f4");
    const stats = await buildDev ("641e0c6688b391a051cf17f4");
    console.log(stats);    
}

setup()