import { configurations } from "../../config";
import { IDbProduct, IListProductInput } from "../../utils/types";
import DynamodbOperations from "../../utils/db";
import { getProductTablePK } from "../../models/product/schema";

class ListProducts {
  /* Query products from table */
  private async queryProducts(
    input: IListProductInput,
    sellerId = configurations.sellerId,
  ): Promise<IDbProduct[]> {
    try {
      const db = new DynamodbOperations();
      const params = {
        TableName: configurations.productTable,
        KeyConditionExpression: "pk=:pk",
        ExpressionAttributeValues: {
          ":pk": getProductTablePK(sellerId),
        },
      };
      console.log({ params });
      const result = await db.queryItem(params);
      console.log({ result });

      return result?.Items as IDbProduct[];
    } catch (error) {
      console.log("deleteProductInTable-ERROR", { error });
      throw error;
    }
  }

  public async main(input: IListProductInput) {
    console.log({ input });
    try {
      return await this.queryProducts(input);
    } catch (err) {
      console.log("ListProducts-Err", err);
      return "Internal Server Error";
    }
  }
}

export default ListProducts;
