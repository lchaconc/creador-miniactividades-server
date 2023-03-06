import fse from "fs-extra";

export async function copiarCarpeta(nonbreCarpeta, idApp) {
  try {
    await fse.copy(`./plantillas/${nonbreCarpeta}`, `./proy/${idApp}`);
    console.log("Carpeta copiada exitosamente!");
  } catch (err) {
    console.error(err);
  }
}
