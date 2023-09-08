import {Router} from "express"
import * as ctrDndTxtImg from "../controllers/controller.dnd-txt-img.mjs";
import upload from "../utils/file-upload.mjs";




const routerDndTxtImg = Router();
routerDndTxtImg.post('/textos/:idApp', ctrDndTxtImg.insertarTextos);
routerDndTxtImg.get('/textos/:idApp', ctrDndTxtImg.obtenerTextos);
//routerDndTxtImg.post('/cajas-areas/:idApp', upload.single('image'), ctrDndTxtImg.insertarCajaArea);
routerDndTxtImg.post('/cajas-areas/:idApp', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), ctrDndTxtImg.insertarCajaArea);

routerDndTxtImg.delete('/cajas-areas/:idApp/:_id', ctrDndTxtImg.eliminarCaja );
routerDndTxtImg.get('/cajas-areas/:idApp', ctrDndTxtImg.obtenerCajas);

export default routerDndTxtImg;