import {Router} from "express"
import * as ctrDndImagenArea from "../controllers/controller.dnd-imagen-area.mjs"


const routerDndImagenArea = Router()
routerDndImagenArea.get('/build', ctrDndImagenArea.generarBuild );
routerDndImagenArea.get('/preview', ctrDndImagenArea.generarPreview );




export default routerDndImagenArea;