import path from 'path';
import { promises as fs } from 'fs';


export async function readJson( dir,  name) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const data = await fs.readFile(jsonDirectory + '/' +  dir +"/" + name +'.json', 'utf8');
  const parsedData = JSON.parse(data)
  return parsedData;
}


export async function writeJson(data, dir ) {
  const name = "data.json";
  const jsonDirectory = path.join(process.cwd(), 'plantillas');
  await fs.writeFile(jsonDirectory + '/' + dir + "/src/" + name, JSON.stringify(data));  
  const res = {isOk: true, msj: "Datos actualizados."};
  return (res);
}
