import express from "express";
import { productRouter } from "./routes/router.productManager.js";
import { cartRouter} from "./routes/router.cartManager.js";

const app = express();

app.use(express.static('public')) // Expongo como un sitio estático la carpeta public. acá vinculo la carpeta public
app.use(express.json())// Middelare que parsea json
app.use(express.urlencoded({extended:true})) // middleware para parsear los datos de la petición

// Utilizo ruta de products para "/api/products"
app.use ('/api/products', productRouter);  
// Utilizo ruta de carts para "/api/carts"
app.use ('/api/carts', cartRouter);  


// Escucho a mi aplicación con un puerto.s

app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080.");
});
