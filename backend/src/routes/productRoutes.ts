import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  exportProducts,
  listProducts,
  updateProduct,
  importProducts,
} from "../controllers/product";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();
router.post("/product", createProduct);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);
router.get("/products", listProducts);
router.get("/products/export", exportProducts);
router.post("/products/import", upload.single("file"), importProducts);

export default router;
