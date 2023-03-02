import mongoose from 'mongoose';



const conectDB = async function () {
mongoose.set('strictQuery', true);
 const db =  await mongoose.connect(process.env.DB_PATH);

 console.log( `Conexión a base de datos <<${db.connections[0].name}>> realizada de forma satisfactoria.`);  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

export default conectDB;