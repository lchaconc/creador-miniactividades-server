import { Router } from "express";
import * as ctrGenericos from "../controllers/controller.genericos.mjs";

const routerGenericas = Router();

routerGenericas.post("/create", ctrGenericos.crearProyecto);

export default routerGenericas;
