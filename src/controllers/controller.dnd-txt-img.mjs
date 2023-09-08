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

export async function obtenerTextos (req, res) {
  const {idApp} = req.params;
  const app = await DndTxtImg.findById(idApp);
  res.json({ isOk: true, data: app.textos });  
}

export async function insertarCajaArea(req, res) {
  const { idApp } = req.params;
  const { texto, alt} = req.body;  
  
    // Obtener el nombre del archivo de la imagen y del audio
    const urlImg = req.files.image[0].filename;
    const urlAudio = req.files.audio[0].filename;
  
    console.log("Nombre del archivo de imagen:", urlImg);
    console.log("Nombre del archivo de audio:", urlAudio);


const nuevaCaja = {texto, alt, urlImg, urlAudio };
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

export async function obtenerCajas (req, res) {
  const {idApp} = req.params;
  const app = await DndTxtImg.findById(idApp);
  res.json({ isOk: true, data: app.cajasAreas });  
}


