import { Router } from "express";
import * as ctrGenericos from "../controllers/controller.genericos.mjs";

const routerGenericas = Router();

routerGenericas.post("/create/:username", ctrGenericos.crearProyecto);
routerGenericas.get("/proyects/:username", ctrGenericos.obtenerProyectos);
routerGenericas.get('/build/:idApp/:tipo', ctrGenericos.generarBuild );
routerGenericas.get('/preview/:idApp/:tipo', ctrGenericos.generarPreview );


export default routerGenericas;
