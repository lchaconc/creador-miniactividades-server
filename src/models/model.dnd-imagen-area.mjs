import { Schema, model } from "mongoose";

const dndImagenAreaSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9.@]+$/,
    maxlength: 128,
  },
  tipo: {
    type: String,
    default: "dnd_imagen_area"
  },
  textos: {
    titulo: {
      type: String,
      trim: true,
      maxlength: 128,
    },
    instrucciones: {
      type: String,
      trim: true,
      maxlength: 256,
    },
    retroCorrecta: {
      type: String,
      trim: true,
      maxlength: 64,
    },
    retroIncorrecta: {
      type: String,
      trim: true,
      maxlength: 64,
    },
  },
  areas: [
    {      
      titulo: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      backgroundColor: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      color: {
        type: String,
        trim: true,
        maxlength: 32,
      },
    },
  ],
  cajas: [
    {
      id: {
        type: String,
        trim: true,
        maxlength: 512,
      },
      alt: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      idArea: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      tituloArea: {
        type: String,
        trim: true,
        maxlength: 32,
      },
    },
  ],
});

export default model("DndImagenArea", dndImagenAreaSchema, "dnd-imagen-area");
