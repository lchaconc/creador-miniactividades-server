import fse from "fs-extra";

export async function copiarCarpeta(nonbreCarpeta, idApp) {
  try {
    await fse.copy(`./plantillas/${nonbreCarpeta}`, `./proy/${idApp}`);
    return idApp;
  } catch (e) {
    return e;
  }
}
