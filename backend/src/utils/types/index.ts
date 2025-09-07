import { IProduct } from "../../models/product";
import { ICategory } from "../../models/category";

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

export interface IUpdateProductInput extends IProduct {
  productId: string;
}

export interface ISendMessageUpdateInput {
  productId: string;
  sellerId: string;
  attributes: Record<string, string | number>;
}

export interface IDeleteProductInput {
  productId: string;
  categoryId: string;
}

export interface ISendMessageDeleteInput extends IDeleteProductInput {}

export interface IListProductInput {
  category?: ICategory;
}

export enum EVENT_TYPE {
  ADD_PRODUCT = "ADD_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
}

export interface ISQSAddProductInput extends ISendMessageInput {
  eventType: EVENT_TYPE;
}

export interface ISQSUpdateProductInput extends ISendMessageUpdateInput {
  eventType: EVENT_TYPE;
}

export interface ISQSDeleteProductInput {
  eventType: EVENT_TYPE;
  productId: string;
  sellerId: string;
}

export type IConsumerPayload =
  | ISQSDeleteProductInput
  | ISQSUpdateProductInput
  | ISQSAddProductInput;
