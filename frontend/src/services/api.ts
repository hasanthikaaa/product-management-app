import axios from "axios";
import type { IDbProduct, IProduct } from "../utils/types";
import { configurations } from "../config";

/* Create product api */
export const createProductApi = async (product: IProduct): Promise<string> => {
  try {
    console.log("Creating new product api", product);
    const response = await axios.post(
      `${configurations.baseUrl}/api/product`,
      product,
    );
    console.log(response?.data);

    return response?.data as string;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

/* List product api */
export const listProductApi = async (): Promise<IDbProduct[]> => {
  try {
    const response = await axios.get(`${configurations.baseUrl}/api/products`);
    console.log({ products: response?.data });
    return response?.data as IDbProduct[];
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
