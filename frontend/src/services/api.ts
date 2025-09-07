import axios from "axios";
import type { IDbProduct, IProduct } from "../utils/types";
import { configurations } from "../config";

/* Create product api */
export const createProductApi = async (
  product: IDbProduct,
): Promise<string> => {
  try {
    console.log("Creating new product api", product);
    const response = await axios.post(`${configurations.baseUrl}/api/product`, {
      categoryId: product?.categoryId,
      name: product?.name,
      quantity: product?.quantity,
      price: product?.price,
      description: product?.description,
    });
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

/* Update product api */
export const updateProductApi = async (
  productId: string,
  product: IProduct,
): Promise<string> => {
  try {
    const response = await axios.put(
      `${configurations.baseUrl}/api/product/${productId}`,
      {
        categoryId: product?.categoryId,
        name: product?.name,
        quantity: product?.quantity,
        price: product?.price,
        description: product?.description,
      },
    );

    return response?.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

/* Delete product api */
export const deleteProductApi = async (productId: string): Promise<string> => {
  try {
    const response = await axios.delete(
      `${configurations.baseUrl}/api/product/${productId}`,
    );
    console.log("Product deleted:", response.data);
    return response?.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

/* Exports product api */
export const exportsProductsApi = async () => {
  try {
    const response = await axios.get(
      `${configurations.baseUrl}/api/products/export`,
      {
        responseType: "blob",
      },
    );
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

/* Import products api */
export const importProductsApi = async (form: FormData): Promise<string> => {
  try {
    const response = await axios.post(
      `${configurations.baseUrl}/api/products/import`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response?.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
