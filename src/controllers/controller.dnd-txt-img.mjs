import DndTxtImg from "../models/model.dnd-txt-img.mjs";

export async function insertarTextos(req, res) {
  const { titulo, instrucciones, retroCorrecta, retroIncorrecta } = req.body;
  const { idApp } = req.params;

  console.log("idApp", idApp);
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

export async function insertarCajaArea(req, res) {
  const { idApp } = req.params;
  const { texto, alt} = req.body;  
  const nombreArchivo = req.file.filename;
console.log(req.file.filename);


const nuevaCaja = {texto, alt, nombreArchivo};
console.log("Documento a insertar", nuevaCaja);

  const dndTxtImg = await DndTxtImg.findOneAndUpdate(
    { _id: idApp },
    { $push: { cajasAreas: nuevaCaja } },
    { new: true }
  );

  res.status(201).json({
    isOk: true,
    cajasAreas: dndTxtImg.cajasAreas
  });
}

export async function eliminarCaja(req, res) {
  const { idApp, _id } = req.params;

  try {
    const dndTxtImg = await DndTxtImg.findOneAndUpdate(
      { _id: idApp },
      { $pull: { cajasAreas: { _id } } },
      { new: true }
    );
    
    res.json( {  isOk: true, cajasAreas: dndTxtImg.cajasAreas }  );
  } catch (error) {
    console.log(error);
    res.status(500).json({isOk: false,   msj: "Error en el servidor" });
  }
  
}


