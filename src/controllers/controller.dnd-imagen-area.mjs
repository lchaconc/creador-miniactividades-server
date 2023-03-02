import {buildDev, buildProd} from "../../plantillas/dnd_imagen_area/builder.js"

const idApp = "63fd14642400e59c6411bc50";
const urlZip = "http://localhost:3500/descarga/"+idApp+".zip";
const urlPreview = "http://localhost:3500/prevista/"+idApp;

export async function generarBuild(req, res) {
    const stats = await buildProd(idApp);
    //console.log(stats);
    res.json({isOk:true, url: urlZip })    
}

export async function generarPreview (req, res) {
    const stats = await buildProd(idApp);
    //console.log(stats);
    res.json({isOk:true, url: urlPreview })    
}