import { Schema, model } from "mongoose";

const dndTextoImagenSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9.@]+$/,
    maxlength: 128,
  },
  tipo: {
    type: String,
    default: "dnd_txt_img",
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
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
    }   
  },
  cajasTexto: [
    {  
      texto: {
        type: String,
        trim: true,
        maxlength: 512,
      },
      idArea: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      tituloArea: {
        type: String,
        trim: true,
        maxlength: 32
      }
  
    }
  ],
  areasImagen: [
    {
      alt: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      urlArchivo: {
        type: String,
        trim: true,
        maxlength: 32,
      },
      titulo: {
        type: String,
        trim: true,
        maxlength: 32
      }
    }
  ]
});

export default model("DndTxtImg", dndTextoImagenSchema, "dnd-txt-img");
