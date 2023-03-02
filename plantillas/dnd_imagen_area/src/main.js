import * as utils from "./utils";
import eventHandlers from "./handlers";
import textos from "./data/textos.json";
import areas from "./data/areas.json";
import cajas from "./data/cajas.json";

onload = () => setup();

function setup() {
  console.log("setup");

  utils.eliminarElemento("divCargandoDatos");
  utils.renderTexto("divTitulo1", textos.titulo, "h1");
  utils.renderTexto(
    "divInstrucciones",
    textos.instruccion,
    "p",
    "alert alert-secondary"
  );
  utils.renderAreas(areas);
  utils.renderCajas(cajas);
  eventHandlers(cajas, textos);
}
