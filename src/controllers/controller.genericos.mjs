import {
  buildDev,
  buildProd,
} from "../../builder/builder.js";
import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
import DndTxtImg from "../models/model.dnd-txt-img.mjs";
import {copiarCarpeta} from "../utils/utils-fs-extra.mjs";
import { writeJson } from "../utils/staticdata.mjs";


/**
 * crearProyecto
 * Crea un documento en la colección de la actividad respectiva.
 * @param {*} req 
 * @param {*} res 
 */
export async function crearProyecto(req, res) {
    const {nombrePlantilla} = req.body;
    const {username} = req.params;
    let nuevoDocumento;    
    
    nombrePlantilla == "dnd_imagen_area" &&  (nuevoDocumento = new DndImagenArea({  username }))
    nombrePlantilla == "dnd_txt_img" &&  (nuevoDocumento = new DndTxtImg({  username }))


    const tmp = await nuevoDocumento.save ();   
    console.log("tmp", tmp);
    
    //copiado de carpeta de plantillas a proy (proyecto)
    const msj = await copiarCarpeta ( nombrePlantilla, tmp._id );   
    res.json({isOk: true, idApp: msj });    
}

export async function obtenerProyectos (req, res) {
    const {username} = req.params;
    try {
        const dndImagenArea = await DndImagenArea.find({ username: username });
        res.json({
          isOk: true,
          dndImagenArea
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los documentos por username");
      }
    
}

export async function generarPreview(req, res) {
  const { idApp, tipo } = req.params;
  let app;  
   
  tipo == "dnd_img_area" && ( app = await DndImagenArea.findById(idApp));  
  tipo == "dnd_txt_img" && ( app = await DndTxtImg.findById(idApp));

  //console.log("app", app);
  const resEscritura = await writeJson(app, idApp);
  console.log("resEscritura", resEscritura);

  const stats = await buildDev(idApp);
  //console.log(stats);
  const urlPreview = "http://localhost:3500/prevista/" + idApp;
  res.json({ isOk: true, url: urlPreview });
}

export async function generarBuild(req, res) {
  const { idApp, tipo } = req.params;
  let app;
 
  tipo == "dnd_img_area" && ( app = await DndImagenArea.findById(idApp));  
  tipo == "dnd_txt_img" && ( app = await DndTxtImg.findById(idApp));  

  //console.log("dndImagenArea", dndImagenArea);
  const resEscritura = await writeJson(app, idApp);
  console.log(resEscritura);
  const stats = await buildProd(idApp);
  //console.log(stats);
  const urlZip = "http://localhost:3500/descarga/" + idApp + ".zip";
  res.json({ isOk: true, url: urlZip });
}