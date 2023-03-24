import {Router} from "express"
import * as ctrDndTxtImg from "../controllers/controller.dnd-txt-img.mjs";
import upload from "../utils/file-upload.mjs";


const routerDndTxtImg = Router();
routerDndTxtImg.post('/textos/:idApp', ctrDndTxtImg.insertarTextos);
routerDndTxtImg.post('/cajas-texto/:idApp', ctrDndTxtImg.insertarCajasTextos);

//routerDndImagenArea.post('/imagen/:idApp', upload.single('image'), ctrDndImagenArea.subirImagen );



export default routerDndTxtImg;