import CreateProduct from "../services/create-product";
import { IProduct } from "../models/product";
import { Request, Response } from "express";

/* Create Product */
export const createProduct = async (req: Request, res: Response) => {
  const body = req.body as IProduct;
  const product = await new CreateProduct().main(body);
  res.json(product);
};
