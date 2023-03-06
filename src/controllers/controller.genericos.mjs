import {copiarCarpeta} from "../utils/utils-fs-extra.mjs";



const idApp = "123456789x"


export async function crearProyecto(req, res) {
    const {nombrePlantilla} = req.body;
    const msj = await copiarCarpeta ( nombrePlantilla, idApp );   
    res.json({isOk: true, nsj: msj });
    
}