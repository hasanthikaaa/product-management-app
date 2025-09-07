import { configurations } from "../../config";
import {
  EVENT_TYPE,
  IDeleteProductInput,
  ISendMessageDeleteInput,
} from "../../utils/types";
import DynamodbOperations from "../../utils/db";
import { getProductKeys } from "../../models/product/schema";
import { messages } from "../../utils/messages";
import SQSQueueOperations from "../../utils/queue";

class DeleteProduct {
  /* Delete from product table */
  private async deleteProductInTable(
    input: IDeleteProductInput,
    sellerId = configurations.sellerId,
  ): Promise<void> {
    try {
      const db = new DynamodbOperations();
      const keys = getProductKeys(sellerId, input?.productId);

      const params = {
        TableName: process.env.PRODUCT_TABLE,
        Key: keys,
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)",
      };
      console.log({ params });
      await db.deleteItem(params);
    } catch (error) {
      console.log("deleteProductInTable-ERROR", { error });
      if ((<{ name: string }>error).name === messages.conditionFailed) {
        throw "Product not exist";
      } else {
        throw error;
      }
    }
  }

  /* Send message to sqs queue */
  private async sendMessageToQueue(
    input: ISendMessageDeleteInput,
  ): Promise<void> {
    try {
      const queue = new SQSQueueOperations();

      const params = {
        QueueUrl: process.env.PRODUCT_QUEUE_URL,
        MessageBody: JSON.stringify({
          ...input,
          sellerId: configurations.sellerId,
          eventType: EVENT_TYPE.DELETE_PRODUCT,
        }),
      };
      console.log({ params });
      await queue.sendMessage(params);
    } catch (err) {
      console.log("sendMessageToQueue-Err", err);
      throw err;
    }
  }

  public async main(input: IDeleteProductInput) {
    try {
      await this.deleteProductInTable(input);
      await this.sendMessageToQueue(input);

      return messages.productDeleteSuccess(input?.productId);
    } catch (err) {
      console.log("DeleteProduct-Err", err);
      return "Internal Server Error";
    }
  }
}

export default DeleteProduct;
