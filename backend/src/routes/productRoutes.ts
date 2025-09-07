import { Router } from "express";
import { createProduct } from "../controllers/product";

const router = Router();
router.post("/product", createProduct);

export default router;
