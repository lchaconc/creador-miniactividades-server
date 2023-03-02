import * as utils from "./utils";
import eventHandlers from "./handlers";
import data from "./data.json";

const textos = data[0].textos;
const areas = data[0].areas;
const cajas = data[0].cajas;

onload = () => setup();

function setup() {
  console.log("setup");
  console.log("areas", areas);
  console.log("cajas",cajas);

  utils.eliminarElemento("divCargandoDatos");
  utils.renderTexto("divTitulo1", textos.titulo, "h1");
  utils.renderTexto(
    "divInstrucciones",
    textos.instrucciones,
    "p",
    "alert alert-secondary"
  );
  utils.renderAreas(areas);
  utils.renderCajas(cajas);
  eventHandlers(cajas, textos);
}
