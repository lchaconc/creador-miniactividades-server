import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerGenericas from "./routes/routes.genericas.mjs";
import routerDndImagenArea from "./routes/routes.dnd-imagen-area.mjs";
import routerDndTxtImg from "./routes/routes.dnd-txt-img.mjs";

import conectDB from "../db.conexion.mjs";


const app = express();
dotenv.config();

conectDB().catch(err => console.log(err));

app.set("port", process.env.PORT || 3700);
app.use(express.json());
app.use(cors());

app.use(express.static("./public"));

//bild:
app.use("/descarga/", express.static("./zips"));

//dev:
app.use("/prevista/", express.static("./dev"));

//proyectos
app.use("/proy/", express.static("./proy"));

//CRUD
app.use( "/api/", routerGenericas );
app.use("/api/dnd-imagen-area", routerDndImagenArea );
app.use("/api/dnd-txt-img", routerDndTxtImg);



export default app;