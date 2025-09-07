import { v4 as uuidv4 } from "uuid";
import { getProductKeys } from "../../models/product/schema";
import { configurations } from "../../config";
import { IProduct } from "../../models/product";
import DynamodbOperations from "../../utils/db";
import { EVENT_TYPE, ISendMessageInput } from "../../utils/types";
import SQSQueueOperations from "../../utils/queue";
import { messages } from "../../utils/messages";

class CreateProduct {
  private async saveProductInTable(input: IProduct): Promise<string> {
    try {
      const db = new DynamodbOperations();

      const productId = uuidv4();
      const dateTime = new Date().toLocaleDateString();
      const keys = getProductKeys(configurations.sellerId, productId);

      const params = {
        TableName: process.env.PRODUCT_TABLE,
        Item: {
          ...input,
          ...keys,
          productId,
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      };
      console.log({ params });
      await db.saveItem(params);
      return productId;
    } catch (err) {
      console.log("saveProductInTable-Err", err);
      throw err;
    }
  }

  private async sendMessageToQueue(input: ISendMessageInput): Promise<void> {
    try {
      const queue = new SQSQueueOperations();

      const params = {
        QueueUrl: process.env.PRODUCT_QUEUE_URL,
        MessageBody: JSON.stringify({
          ...input,
          eventType: EVENT_TYPE.ADD_PRODUCT,
        }),
      };
      console.log({ params });
      await queue.sendMessage(params);
    } catch (err) {
      console.log("sendMessageToQueue-Err", err);
      throw err;
    }
  }

  public async main(input: IProduct) {
    try {
      const productId = await this.saveProductInTable(input);
      if (!productId) {
        return;
      }

      await this.sendMessageToQueue({
        productId,
        category: input?.categoryId,
        sellerId: configurations.sellerId,
      });

      return messages.productCreationSuccess(productId);
    } catch (err) {
      console.log("CreateProduct-Err", err);
      return "Internal Server Error";
    }
  }
}

export default CreateProduct;
