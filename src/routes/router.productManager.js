
import ProductManager from "../../productManager.js";
import { Router } from "express";

//------------------------------------------------------------------------------- Product Router--------------------------------------------------------------------------------------------------------------------

const productRouter = Router(); // <-- Creo el router
const productManager = new ProductManager("./products.json"); // <-- Instancio la clase con el path.



//--> La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
productRouter.get('/', async (req, res) => {
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

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
productRouter.get('/:pid', async (req, res) => {
  try {
    const allProducts = await productManager.getProducts(); 
    let idFilter = allProducts.filter((product)=>{
        product.id === req.params.pid;
    }) 
    res.send(idFilter);    
  } catch (err) {
    res.send(err);
  }
});

// --> La ruta raíz POST / deberá agregar un nuevo producto
productRouter.post('/', async (req, res)=>{
try {
  const newProduct = req.body;
  res.status(201).send(await productManager.addProduct(newProduct))
} catch (err) {
  res.status(400).send(err);
}
 
})


export {productRouter}; // --> Exporto la ruta 