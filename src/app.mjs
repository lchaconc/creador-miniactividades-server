import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerDndImagenArea from "./routes/route.dnd-imagen-area.mjs";
import routerGenericas from "./routes/routes.genericas.mjs";
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
app.use("/prevista/", express.static("./builds"));

//proyectos
app.use("/proy/", express.static("./proy"));



app.use("/api/dnd-imagen-area", routerDndImagenArea );
app.use( "/api/", routerGenericas );



//app.use("/api/dnd-imagen-area", routesDndImagenArea);

export default app;