import { useCallback, useEffect, useState } from "react";
import type { IDbProduct, IProduct } from "../utils/types";
import { createProductApi, listProductApi } from "../services/api.ts";
import { mockCategories } from "../utils/data/mock-data.ts";

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IDbProduct[]>([]);

  useEffect(() => {
    listProducts().catch((err) => console.log(err));
  }, []);

  const saveProduct = useCallback(async (product: IProduct) => {
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

  return {
    loading,
    saveProduct,
    products,
  };
};

export default useProduct;
