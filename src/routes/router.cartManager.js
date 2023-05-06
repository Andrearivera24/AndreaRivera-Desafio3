
import CartManager from "../../cartManager.js";
import { Router } from "express";

//---------------------------------¡IMPORTANTE!,CAMBIAR TODO A CART --------------------------------------------------------------------------------------------------------------------

const cartRouter = Router() // <-- creo el router 
const cartManager = new CartManager("./carts.json"); // <-- Instancio la clase con el path.


//--> EndPoint ‘/products’ (lee el archivo de productos los devuelve dentro de un objeto con límite por req.query de cuantos elementos devolver).
cartRouter.get('/', async (req, res) => {
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
cartRouter.get('/', async (req, res) => {
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

export {cartRouter}; // --> Exporto la ruta 