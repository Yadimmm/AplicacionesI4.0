import { Router } from "express";
import { createProduct, getProducts,updateProduct,deleteProduct } from "../controllers/product.controller";

const router = Router();

//crear un producto
router.post('/', (req, res, next) => {
  createProduct(req, res).catch(next);
});
//router.post("/", createProduct);

//lista de productos
router.get('/', (req, res, next) => {
  getProducts(req, res).catch(next);
});
//router.get("/", getProducts);

//actualizar un producto
router.patch('/:id', (req, res, next) => {
  updateProduct(req, res).catch(next);
});
//router.patch("/:id", updateProduct);

//Eliminar producto
router.delete('/:id', (req, res, next) => {
  deleteProduct(req, res).catch(next);
});
//router.delete("/:id", deleteProduct);
export default router;