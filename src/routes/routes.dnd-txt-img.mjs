import {Router} from "express"
import * as ctrDndTxtImg from "../controllers/controller.dnd-txt-img.mjs";


const routerDndTxtImg = Router();
routerDndTxtImg.post('/textos/:idApp', ctrDndTxtImg.insertarTextos);
routerDndTxtImg.post('/cajas/:idApp', ctrDndTxtImg.insertarCajasTextos);



export default routerDndTxtImg;