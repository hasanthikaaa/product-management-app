import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../controllers/product";

const router = Router();
router.post("/product", createProduct);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);
router.get("/products", listProducts);

export default router;
