import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
import DndTxtImg from "../models/model.dnd-txt-img.mjs";
import {copiarCarpeta} from "../utils/utils-fs-extra.mjs";


export async function crearProyecto(req, res) {
    const {nombrePlantilla} = req.body;
    const {username} = req.params;
    let nuevoDocumento;    
    
    nombrePlantilla == "dnd_imagen_area" &&  (nuevoDocumento = new DndImagenArea({  username }))
    nombrePlantilla == "dnd_txt_img" &&  (nuevoDocumento = new DndTxtImg({  username }))


    const tmp = await nuevoDocumento.save ();   
    console.log("tmp", tmp);
      
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