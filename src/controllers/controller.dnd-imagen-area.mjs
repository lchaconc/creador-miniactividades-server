import {buildDev, buildProd} from "../../plantillas/dnd_imagen_area/builder.js";
import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
import {writeJson} from "../utils/staticdata.mjs"




const idApp = "63fd14642400e59c6411bc50";
const urlZip = "http://localhost:3500/descarga/"+idApp+".zip";
const urlPreview = "http://localhost:3500/prevista/"+idApp;

export async function generarBuild(req, res) {
    const dndImagenArea = await DndImagenArea.find({});
    //console.log("dndImagenArea", dndImagenArea);
    const resEscritura = await writeJson (  dndImagenArea, "dnd_imagen_area"  );
    console.log(resEscritura);
    const stats = await buildProd(idApp);
    //console.log(stats);
    res.json({isOk:true, url: urlZip })    
}

export async function generarPreview (req, res) {
    const dndImagenArea = await DndImagenArea.find({});
    //console.log("dndImagenArea", dndImagenArea);
    const resEscritura = await writeJson (  dndImagenArea, "dnd_imagen_area"  );
    console.log(resEscritura);
    
    const stats = await buildDev(idApp);
    //console.log(stats);
    res.json({isOk:true, url: urlPreview })    
}