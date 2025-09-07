export interface IProduct {
  categoryId: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface IDbProduct extends IProduct {
  productId: string;
  category: string;
}
