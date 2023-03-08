import {
  buildDev,
  buildProd,
} from "../../plantillas/dnd_imagen_area/builder.js";
import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
import { writeJson } from "../utils/staticdata.mjs";
import normalizar from "../utils/utils-normalize.mjs";
import fs from "fs";

export async function generarBuild(req, res) {
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  //console.log("dndImagenArea", dndImagenArea);
  const resEscritura = await writeJson(app, idApp);
  console.log(resEscritura);
  const stats = await buildProd(idApp);
  //console.log(stats);
  const urlZip = "http://localhost:3500/descarga/" + idApp + ".zip";
  res.json({ isOk: true, url: urlZip });
}

export async function generarPreview(req, res) {
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  //console.log("app", app);
  const resEscritura = await writeJson(app, idApp);
  console.log("resEscritura", resEscritura);

  const stats = await buildDev(idApp);
  //console.log(stats);
  const urlPreview = "http://localhost:3500/prevista/" + idApp;
  res.json({ isOk: true, url: urlPreview });
}

// **********TEXTOS *********************************//
export async function obtenerTextos(req, res) {
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  res.json({ isOk: true, data: app.textos });
}

export async function insertarTextos(req, res) {
  const { titulo, instrucciones, retroCorrecta, retroIncorrecta } = req.body;
  const { idApp } = req.params;

  console.log(idApp);
  console.log(titulo, instrucciones, retroCorrecta, retroIncorrecta);

  const app = await DndImagenArea.findById(idApp);
  app.textos = {
    titulo,
    instrucciones,
    retroCorrecta,
    retroIncorrecta,
  };
  await app.save();

  //console.log(app.textos);

  res.json({ isOk: true });
}

/***************   AREAS   */

export async function obtenerAreas(req, res) {
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  res.json({ isOk: true, data: app.areas });
}

export async function insertarArea(req, res) {
  const { idApp } = req.params;  

  const nuevaArea = {
    //idArea: normalizar(req.body.titulo),
    titulo: req.body.titulo,
    backgroundColor: req.body.backgroundColor,
    color: req.body.color,
  }

  const dndImagenArea = await DndImagenArea.findOneAndUpdate(
    { idApp: idApp },
    { $push: { areas: nuevaArea } },
    { new: true }
  );
  
  res.status(201).json({
    isOk: true,
    areas: dndImagenArea.areas
  });


}


export async function eliminarArea(req, res) {
  const { idApp } = req.params;
  //id de area a aleiminar enviada por el cliente:
  const {id} = req.body;

  try {
    const dndImagenArea = await DndImagenArea.findOneAndUpdate(
      { _id: idApp },
      { $pull: { areas: { _id: id } } },
      { new: true }
    );
    
    res.json( {  isOk: true, areas: dndImagenArea.areas }  );
  } catch (error) {
    console.log(error);
    res.status(500).json({isOk: false,   msj: "Error en el servidor" });
  }
}



export async function subirImagen(req, res) {
  const { alt, idArea } = req.body;

  console.log("alt, idArea", alt, idArea);

  try {
    if (!req.file) {
      throw new Error("Debe proporcionar un archivo de imagen");
    }
    const imageUrl =
      req.protocol + "://" + req.get("host") + "/" + req.file.path;
    console.log(req.file.filename);

    const { idApp } = req.params;
    const app = await DndImagenArea.findById(idApp);
    app.cajas.push({ id: req.file.filename, alt, idArea });
    await app.save();

    res.json({ isOk: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function eliminarCaja(req, res) {
  const { idApp, idCaja } = req.params;
  try {
    const documentoActualizado = await DndImagenArea.findOneAndUpdate(
      { _id: idApp },
      { $pull: { cajas: { id: idCaja } } },
      { new: true }
    );

    const imagePath = `./proy/${idApp}/public/assets/${idCaja}`;
    fs.unlinkSync(imagePath); // Elimina la imagen del sistema de archivos

    console.log(`Objeto actualizado: ${documentoActualizado.cajas}`);
    res.json({ isOk: true, msj: documentoActualizado.cajas });
  } catch (error) {
    console.error(error);
    res.json[{ isOk: false, msj: error }];
  }
}

export async function obtenerCajas(req, res) {
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  res.json({ isOk: true, data: app.cajas });
}
