import { ReturnValue } from "@aws-sdk/client-dynamodb";
import {
  ISendMessageUpdateInput,
  IUpdateProductInput,
} from "../../utils/types";
import DynamodbOperations from "../../utils/db";
import { getProductKeys } from "../../models/product/schema";
import { configurations } from "../../config";
import { messages } from "../../utils/messages";
import SQSQueueOperations from "../../utils/queue";

class UpdateProduct {
  /* Generate update expressions dynamically */
  private generateUpdateParams(input: IUpdateProductInput) {
    let updateExpression = "set";
    const expressionAttributeValues: Record<string, any> = {};

    for (const key in input) {
      const typedKey = key as keyof IUpdateProductInput;
      const value = input[typedKey];
      if (value !== undefined) {
        if (typedKey === "name") {
          updateExpression += ` #${typedKey} = :${typedKey},`;
        } else {
          updateExpression += ` ${typedKey} = :${typedKey},`;
        }
        expressionAttributeValues[`:${typedKey}`] = value;
      }
    }

    updateExpression = `${updateExpression} updatedAt=:updatedAt`;
    expressionAttributeValues[":updatedAt"] = new Date().toISOString();

    return {
      updateExpression,
      expressionAttributeValues,
      expressionAttributeName: {
        "#name": "name",
      },
    };
  }

  /* Update product table */
  private async updateProductInTable(
    input: IUpdateProductInput,
  ): Promise<Record<string, string | number> | undefined> {
    try {
      const db = new DynamodbOperations();
      const keys = getProductKeys(configurations.sellerId, input?.productId);

      const attributes = this.generateUpdateParams(input);
      const params = {
        TableName: configurations.productTable,
        Key: keys,
        UpdateExpression: attributes?.updateExpression,
        ExpressionAttributeValues: attributes?.expressionAttributeValues,
        ExpressionAttributeNames: attributes?.expressionAttributeName,
        ReturnValues: ReturnValue.UPDATED_NEW,
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)",
      };
      console.log({ params });
      return await db.updateItem(params);
    } catch (error) {
      console.log("updateProductInTable-Err", error);

      if ((<{ name: string }>error).name === messages.conditionFailed) {
        throw "Product not exist";
      } else {
        throw error;
      }
    }
  }

  /* Send message to sqs queue */
  private async sendMessageToQueue(
    input: ISendMessageUpdateInput,
  ): Promise<void> {
    try {
      const queue = new SQSQueueOperations();

      const params = {
        QueueUrl: configurations.productQueueUrl,
        MessageBody: JSON.stringify(input),
      };
      console.log({ params });
      await queue.sendMessage(params);
    } catch (err) {
      console.log("sendMessageToQueue-Err", err);
      throw err;
    }
  }

  public async main(input: IUpdateProductInput) {
    try {
      const updatedAttributes = await this.updateProductInTable(input);
      console.log({ updatedAttributes });

      if (!updatedAttributes) {
        return "Error updating";
      }

      await this.sendMessageToQueue({
        attributes: updatedAttributes,
        productId: input.productId,
        sellerId: configurations.sellerId,
      });

      return messages.productUpdateSuccess(input?.productId);
    } catch (err) {
      console.log("UpdateProduct-Err", err);
      return "Internal Server Error";
    }
  }
}

export default UpdateProduct;
