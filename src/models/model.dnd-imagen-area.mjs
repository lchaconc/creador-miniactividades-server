import { Schema, model } from "mongoose";

const dndImagenAreaSchema = new Schema({  
  username: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9.@]+$/,
    maxlength: 128

  },
  textos: {
    titulo:  {
      type: String,
      required: true,
      trim: true,
      maxlength: 128
    },
    instrucciones:  {
      type: String,
      required: true,
      trim: true,
      maxlength: 256
    },
    retroCorrecta:  {
      type: String,
      required: true,
      trim: true,
      maxlength: 64
    },
    retroIncorrecta:  {
      type: String,
      required: true,
      trim: true,
      maxlength: 64
    }
  },
  areas: [
    {
      idArea:  {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      },
      titulo:  {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      },
      backgroundColor:  {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      },
      color:  {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      }
    }
   
  ],
  cajas: [
    {
      id: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      },
      alt: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      },
      idArea: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      }
    }   
  ],
});

export default  model("DndImagenArea", dndImagenAreaSchema, "dnd-imagen-area");