import CreateProduct from "../services/create-product";
import { IProduct } from "../models/product";
import { Request, Response } from "express";
import UpdateProduct from "../services/update-product";
import { IDeleteProductInput, IListProductInput } from "../utils/types";
import DeleteProduct from "../services/delete-product";
import ListProducts from "../services/list-products";

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

/* Delete Product */
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const categoryId = req.params?.categoryId!;
  const body = { productId, categoryId } as IDeleteProductInput;
  const product = await new DeleteProduct().main(body);
  res.json(product);
};

/* List Products */
export const listProducts = async (req: Request, res: Response) => {
  const body = req.body as IListProductInput;
  const product = await new ListProducts().main(body);
  res.json(product);
};
