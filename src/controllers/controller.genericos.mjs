import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
import {copiarCarpeta} from "../utils/utils-fs-extra.mjs";


export async function crearProyecto(req, res) {
    const {nombrePlantilla} = req.body;
    const {username} = req.params;
    

    const nuevoDocumento = new DndImagenArea({  username }); 
    const tmp = await nuevoDocumento.save ();   
    console.log("tmp", tmp);
      
    const msj = await copiarCarpeta ( nombrePlantilla, tmp._id );   
    res.json({isOk: true, idApp: msj });    
}

export async function obtenerProyectos (req, res) {
    const {username} = req.params;
    try {
        const apps = await DndImagenArea.find({ username: username });
        res.json(apps);
      } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los documentos por username");
      }
    
}