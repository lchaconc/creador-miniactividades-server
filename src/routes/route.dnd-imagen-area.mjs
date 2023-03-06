import {Router} from "express"
import * as ctrDndImagenArea from "../controllers/controller.dnd-imagen-area.mjs"
import upload from "../utils/file-upload.mjs";


const routerDndImagenArea = Router();
routerDndImagenArea.get('/build/:idApp', ctrDndImagenArea.generarBuild );
routerDndImagenArea.get('/preview/:idApp', ctrDndImagenArea.generarPreview );
//Textos
routerDndImagenArea.get('/textos/:idApp', ctrDndImagenArea.obtenerTextos );
routerDndImagenArea.put('/textos/:idApp', ctrDndImagenArea.editarTextos );

//areas
routerDndImagenArea.get('/areas/:idApp', ctrDndImagenArea.obtenerAreas );
routerDndImagenArea.put('/areas/:idApp', ctrDndImagenArea.editaAreas );

//imagen
routerDndImagenArea.post('/imagen/:idApp', upload.single('image'), ctrDndImagenArea.subirImagen );
routerDndImagenArea.delete('/imagen/:idApp/:idCaja', ctrDndImagenArea.eliminarCaja );
routerDndImagenArea.get("/imagen/:idApp", ctrDndImagenArea.obtenerCajas);







export default routerDndImagenArea;
