import { useCallback, useState } from "react";
import type { IProduct } from "../utils/types";
import { createProductApi } from "../services/api.ts";

const useProduct = () => {
  const [loading, setLoading] = useState(false);

  const saveProduct = useCallback(async (product: IProduct) => {
    setLoading(true);
    try {
      const productId = await createProductApi(product);
      console.log("product id", productId);
      return productId;
    } catch (error) {
      console.log("listProductsApi-error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    saveProduct,
  };
};

export default useProduct;
