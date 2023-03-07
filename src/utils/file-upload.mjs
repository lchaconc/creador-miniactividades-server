import  multer from 'multer';

// Configuración de Multer para almacenar el archivo en la carpeta "images"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //console.log(file);
    const {idApp} = req.params;
    //console.log("paramas", req.params );    
    cb(null, `./proy/${idApp}/public/assets`);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + filename);
  }
});

// Crea un middleware de Multer para manejar la carga de archivos
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(new Error('El archivo debe ser una imagen'), false);
    }
  }
});

export default upload;