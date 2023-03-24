import DndTxtImg from "../models/model.dnd-txt-img.mjs";

export async function insertarTextos(req, res) {
  const { titulo, instrucciones, retroCorrecta, retroIncorrecta } = req.body;
  const { idApp } = req.params;

  console.log(idApp);
  console.log(titulo, instrucciones, retroCorrecta, retroIncorrecta);

  const app = await DndTxtImg.findById(idApp);
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

export async function insertarCajasTextos(req, res) {
  const { idApp } = req.params;
  const { texto, idArea } = req.body;


const nuevaCaja = {texto, idArea}


  const dndTxtImg = await DndTxtImg.findOneAndUpdate(
    { _id: idApp },
    { $push: { cajasTexto: nuevaCaja } },
    { new: true }
  );


  res.status(201).json({
    isOk: true,
    cajasTexto: dndTxtImg.cajasTexto
  });
}


export async function insertarCajaImagen(req, res) {
  const { alt,  } = req.body;
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