import {Router} from "express"
import * as ctrDndImagenArea from "../controllers/controller.dnd-imagen-area.mjs"
import upload from "../utils/file-upload.mjs";


const routerDndImagenArea = Router();
routerDndImagenArea.get('/build/:idApp', ctrDndImagenArea.generarBuild );
routerDndImagenArea.get('/preview/:idApp', ctrDndImagenArea.generarPreview );
//Textos
routerDndImagenArea.get('/textos/:idApp', ctrDndImagenArea.obtenerTextos );
routerDndImagenArea.post('/textos/:idApp', ctrDndImagenArea.insertarTextos );

//areas
routerDndImagenArea.get('/areas/:idApp', ctrDndImagenArea.obtenerAreas );
routerDndImagenArea.post('/areas/:idApp', ctrDndImagenArea.insertarArea );
routerDndImagenArea.delete('/areas/:idApp', ctrDndImagenArea.eliminarArea );

//imagen
routerDndImagenArea.post('/imagen/:idApp', upload.single('image'), ctrDndImagenArea.subirImagen );
routerDndImagenArea.delete('/imagen/:idApp', ctrDndImagenArea.eliminarCaja );
routerDndImagenArea.get("/imagen/:idApp", ctrDndImagenArea.obtenerCajas);







export default routerDndImagenArea;
