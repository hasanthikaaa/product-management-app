import CreateProduct from "../services/create-product";
import { IProduct } from "../models/product";
import { Request, Response } from "express";
import UpdateProduct from "../services/update-product";

/* Create Product */
export const createProduct = async (req: Request, res: Response) => {
  const body = req.body as IProduct;
  const product = await new CreateProduct().main(body);
  res.json(product);
};

/* Update Product */
export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params?.productId;
  const body = {
    ...req.body,
    productId,
  };
  const product = await new UpdateProduct().main(body);
  res.json(product);
};
