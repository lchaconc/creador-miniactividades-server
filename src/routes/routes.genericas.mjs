import { Router } from "express";
import * as ctrGenericos from "../controllers/controller.genericos.mjs";

const routerGenericas = Router();

routerGenericas.post("/create/:username", ctrGenericos.crearProyecto);
routerGenericas.get("/proyects/:username", ctrGenericos.obtenerProyectos);
routerGenericas.get('/build/:tipo/:idApp', ctrGenericos.generarBuild );
routerGenericas.get('/preview/:tipo/:idApp', ctrGenericos.generarPreview );


export default routerGenericas;
