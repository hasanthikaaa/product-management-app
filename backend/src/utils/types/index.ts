import {IProduct} from "../../models/product";

export interface ISendMessageInput {
    productId: string;
    sellerId: string;
    category: string;
}

export interface IDbProduct extends IProduct {
    pk: string;
    sk: string;
    createdAt: string;
    updatedAt: string;
}
