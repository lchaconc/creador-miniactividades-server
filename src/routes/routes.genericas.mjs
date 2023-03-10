import { Router } from "express";
import * as ctrGenericos from "../controllers/controller.genericos.mjs";

const routerGenericas = Router();

routerGenericas.post("/create/:username", ctrGenericos.crearProyecto);

routerGenericas.get("/proyects/:username", ctrGenericos.obtenerProyectos);


export default routerGenericas;
