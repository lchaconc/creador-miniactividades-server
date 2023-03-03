import {Router} from "express"
import * as ctrDndImagenArea from "../controllers/controller.dnd-imagen-area.mjs"


const routerDndImagenArea = Router()
routerDndImagenArea.get('/build', ctrDndImagenArea.generarBuild );
routerDndImagenArea.get('/preview', ctrDndImagenArea.generarPreview );
//Textos
routerDndImagenArea.get('/textos', ctrDndImagenArea.obtenerTextos );
routerDndImagenArea.put('/textos/:idApp', ctrDndImagenArea.editarTextos );





export default routerDndImagenArea;