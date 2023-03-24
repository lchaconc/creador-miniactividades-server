import {Router} from "express"
import * as ctrDndTxtImg from "../controllers/controller.dnd-txt-img.mjs";
import upload from "../utils/file-upload.mjs";


const routerDndTxtImg = Router();
routerDndTxtImg.post('/textos/:idApp', ctrDndTxtImg.insertarTextos);
routerDndTxtImg.post('/cajas-areas/:idApp', upload.single('image'), ctrDndTxtImg.insertarCajaArea);



export default routerDndTxtImg;