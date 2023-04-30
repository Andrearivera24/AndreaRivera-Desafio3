import express from "express";
import ProductManager from "../productManager.js";

//------------------------------------------------------------------------------- DESAFIO 3 --------------------------------------------------------------------------------------------------------------------

const app = express(); // <-- Creo la aplicación.
const productManager = new ProductManager("./products.json"); // <-- Instancio la clase con el path.
app.use(express.urlencoded({ extended: true })); // Uso el middleware para parsear los datos de la petición.

//--> EndPoint ‘/products’ (lee el archivo de productos los devuelve dentro de un objeto con límite por req.query de cuantos elementos devolver).
app.get("/products", async (req, res) => {
  try {
    const limite = req.query.limite; // <-- /products ? limite = x
    const allProducts = await productManager.getProducts();
    if (!limite) {
      res.send(allProducts);
    } else {
      res.send(allProducts.slice(0, limite));
    }
  } catch (err) {
    res.send(err);
  }
});

//Ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.
app.get('product/:id', async (req, res) => {
  try {
    const allProducts = await productManager.getProducts(); 
    let idFilter = allProducts.filter((product)=>{
        product.id === req.params.id;
    }) 
    res.send(idFilter);    
  } catch (err) {
    res.send(err);
  }
});


// Escucho a mi aplicación con un puerto.s

app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080.");
});
