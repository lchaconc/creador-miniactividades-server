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
