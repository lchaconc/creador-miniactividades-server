import app from "./src/app.mjs";


app.listen(app.get("port"), () => {
  console.log(`API Server en puerto ${app.get("port")}`)
})