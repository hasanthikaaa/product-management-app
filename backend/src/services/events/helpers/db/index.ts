import DynamodbOperations from "../../../../utils/db";
import { configurations } from "../../../../config";
import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { messages } from "../../../../utils/messages";

class EventDbHelper {
  public async updateAnalytics(
    sellerId: string,
    type: "Increment" | "Decrement",
  ): Promise<Record<string, string | number> | undefined> {
    try {
      const db = new DynamodbOperations();
      const params = {
        TableName: configurations.analyticsTable,
        Key: {
          sellerId,
        },
        UpdateExpression:
          type === "Increment"
            ? "set productCount= productCount + :productCount"
            : "set productCount= productCount - :productCount",
        ExpressionAttributeValues: {
          ":productCount": 1,
        },
        ReturnValues: ReturnValue.UPDATED_NEW,
        ConditionExpression: "attribute_exists(sellerId)",
      };
      console.log({ params });
      return await db.updateItem(params);
    } catch (error) {
      console.log("updateAnalytics-Err", error);
      if ((<{ name: string }>error).name === messages.conditionFailed) {
        await this.saveAnalytics(sellerId, type === "Increment" ? 1 : 0);
      } else {
        throw error;
      }
    }
  }

  private async saveAnalytics(
    sellerId: string,
    productCount: number,
  ): Promise<Record<string, string | number> | undefined> {
    try {
      const db = new DynamodbOperations();
      const params = {
        TableName: configurations.analyticsTable,
        Item: {
          sellerId,
          productCount,
        },
      };
      console.log({ params });
      return await db.saveItem(params);
    } catch (error) {
      console.error("saveAnalytics-ERROR", error);
      return;
    }
  }
}

export default EventDbHelper;
