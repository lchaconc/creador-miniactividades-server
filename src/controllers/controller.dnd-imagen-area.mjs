import DndImagenArea from "../models/model.dnd-imagen-area.mjs";
//import normalizar from "../utils/utils-normalize.mjs";
import fs from "fs";


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
    { _id: idApp },
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
  let tituloArea;

  //console.log("alt, idArea", alt, idArea);

  try {
    if (!req.file) {
      throw new Error("Debe proporcionar un archivo de imagen");
    }
    const imageUrl =
      req.protocol + "://" + req.get("host") + "/" + req.file.path;
    console.log(req.file.filename);

    const { idApp } = req.params;
    const app = await DndImagenArea.findById(idApp);

    //busca el nombre del area:
    
    app.areas.forEach(area => {
      if (area._id  == idArea ) {
        tituloArea = area.titulo
      }
    });

    app.cajas.push({ id: req.file.filename, alt, idArea, tituloArea });    
    await app.save();
        
    
    
    res.json({ isOk: true, imagenes: app.cajas });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function eliminarCaja(req, res) {
  const { idApp } = req.params;
  const {idCaja} =  req.body;
  try {
    const documentoActualizado = await DndImagenArea.findOneAndUpdate(
      { _id: idApp },
      { $pull: { cajas: { id: idCaja } } },
      { new: true }
    );

    const imagePath = `./proy/${idApp}/public/assets/${idCaja}`;
    fs.unlinkSync(imagePath); // Elimina la imagen del sistema de archivos

    console.log(`Objeto actualizado: ${documentoActualizado.cajas}`);
    res.json({ isOk: true, imagenes: documentoActualizado.cajas });
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
