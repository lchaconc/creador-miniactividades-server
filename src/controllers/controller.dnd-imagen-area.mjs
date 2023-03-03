import {
  buildDev,
  buildProd,
} from "../../plantillas/dnd_imagen_area/builder.js";
import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
import { writeJson } from "../utils/staticdata.mjs";



export async function generarBuild(req, res) {
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  //console.log("dndImagenArea", dndImagenArea);
  const resEscritura = await writeJson(app, "dnd_imagen_area");
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
  const resEscritura = await writeJson(app, "dnd_imagen_area");
  console.log(resEscritura);

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

export async function editarTextos(req, res) {
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

export async function editaAreas(req, res) {    
  const { idApp } = req.params;
  const app = await DndImagenArea.findById(idApp);
  
  //console.log(req.body);
  app.areas = req.body;  
  await app.save();
  
  res.json({ isOk: true, msj: "areas editadas" });

}



export async function subirImagen (req, res)  {
    const {alt, idArea} = req.body;

    console.log("alt, idArea", alt, idArea);

    try {
      if (!req.file) {
        throw new Error('Debe proporcionar un archivo de imagen');
      }
      const imageUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path;
      console.log(req.file.filename);

      const { idApp } = req.params;
      const app = await DndImagenArea.findById(idApp);      
      app.cajas.push({ id: req.file.filename, alt, idArea})
      await app.save();      

      res.json({ isOk: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }


export async function eliminarCaja (req, res) {    
    const { idApp, idCaja } = req.params;
    try {
        const documentoActualizado = await DndImagenArea.findOneAndUpdate(
          { _id: idApp },
          { $pull: { cajas: { id: idCaja } } },
          { new: true }
        );
        console.log(`Objeto actualizado: ${documentoActualizado}`);
        res.json({isOk: true, msj: documentoActualizado})
      } catch (error) {
        console.error(error);
        res.json[{isOk:false, msj: error }]
      }
    
}

