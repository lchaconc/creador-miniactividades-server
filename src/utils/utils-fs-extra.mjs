import fse from "fs-extra";

//Funcionalidad de copiado de carpeta de plantillas a "proy"
//esto se realiza mediante funcionalidad "File system" (fs)
export async function copiarCarpeta(nonbreCarpeta, idApp) {
  try {
    await fse.copy(`./plantillas/${nonbreCarpeta}`, `./proy/${idApp}`);
    return idApp;
  } catch (e) {
    return e;
  }
}
