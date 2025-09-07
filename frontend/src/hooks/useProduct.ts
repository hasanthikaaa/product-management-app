import { useCallback, useEffect, useState } from "react";
import type { IDbProduct } from "../utils/types";
import {
  createProductApi,
  deleteProductApi,
  listProductApi,
  updateProductApi,
} from "../services/api.ts";
import { mockCategories } from "../utils/data/mock-data.ts";

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IDbProduct[]>([]);

  useEffect(() => {
    listProducts().catch((err) => console.log(err));
  }, []);

  /* Save new product */
  const saveProduct = useCallback(async (product: IDbProduct) => {
    setLoading(true);
    try {
      const productId = await createProductApi(product);
      if (productId) {
        await listProducts();
      }
      return productId;
    } catch (error) {
      console.log("listProductsApi-error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* List products */
  const listProducts = async () => {
    try {
      setLoading(true);
      const products = await listProductApi();
      console.log({ products });
      const formattedProducts = products.map((product) => ({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        category: mockCategories.find((e) => e.id === product.categoryId)
          ?.name!,
      })) as unknown as IDbProduct[];

      setProducts(formattedProducts);
    } catch (error) {
      console.log("listProductsApi-error", error);
    } finally {
      setLoading(false);
    }
  };

  /* Update product */
  const updateProduct = useCallback(async (product: IDbProduct) => {
    try {
      setLoading(true);
      const response = await updateProductApi(product?.productId, product);
      console.log({ response });

      if (response) {
        await listProducts();
      }
      return response;
    } catch (error) {
      console.log("updateProduct-error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Delete product */
  const deleteProduct = useCallback(async (productId: string) => {
    try {
      setLoading(true);
      const response = await deleteProductApi(productId);
      console.log({ response });

      if (response) {
        await listProducts();
      }
      return response;
    } catch (error) {
      console.log("deleteProduct-error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    saveProduct,
    updateProduct,
    deleteProduct,
    products,
  };
};

export default useProduct;
