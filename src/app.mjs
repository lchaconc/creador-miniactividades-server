import express from "express";
import dotenv from "dotenv";

//import indexRoutes from "./routes/index.routes.js";
//import conectDB from "./db.conexion.js" ;


const app = express();
dotenv.config();

//conectDB().catch(err => console.log(err));

app.set("port", process.env.PORT || 3700);
app.use(express.json());

app.use(express.static("./public"));

//app.use("/descargas", express.static("./zips"));

//app.use("/api/dnd-imagen-area", routesDndImagenArea);

export default app;