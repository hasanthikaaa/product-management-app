import DdbDocClient from "../../config/dynamodb";
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  PutCommandInput,
  UpdateCommandInput,
  DeleteCommandInput,
  GetCommandInput,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  TransactWriteCommand,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { IDbProduct } from "../types";

class DynamodbOperations {
  /* Dynamodb new item method */
  public async saveItem(params: PutCommandInput) {
    try {
      const result = await DdbDocClient.send(new PutCommand(params));
      console.log({ result });

      return result?.Attributes;
    } catch (err) {
      console.log("saveItem-Err", err);
      throw err;
    }
  }

  /* Dynamodb update item method */
  public async updateItem(params: UpdateCommandInput) {
    try {
      const result = await DdbDocClient.send(new UpdateCommand(params));
      console.log({ result });

      return result?.Attributes;
    } catch (err) {
      console.log("updateItem-Err", err);
      throw err;
    }
  }

  /* Dynamodb delete item method */
  public async deleteItem(params: DeleteCommandInput) {
    try {
      const result = await DdbDocClient.send(new DeleteCommand(params));
      console.log({ result });

      return result?.Attributes;
    } catch (err) {
      console.log("deleteItem-Err", err);
      throw err;
    }
  }

  /* Dynamodb get item method */
  public async getItem(params: GetCommandInput) {
    try {
      const result = await DdbDocClient.send(new GetCommand(params));
      console.log({ result });

      return result;
    } catch (err) {
      console.log("getItem-Err", err);
      throw err;
    }
  }

  /* Dynamodb query item method */
  public async queryItem(params: QueryCommandInput) {
    try {
      const result = await DdbDocClient.send(new QueryCommand(params));
      console.log({ result });

      return result;
    } catch (err) {
      console.log("queryItem-Err", err);
      throw err;
    }
  }

  /* Dynamodb query item method */
  public async scanTable(params: ScanCommandInput) {
    try {
      let execute = true;
      let exclusiveKey;
      let results: IDbProduct[] = [];

      while (execute) {
        if (exclusiveKey) {
          params.ExclusiveStartKey = exclusiveKey;
        }
        const response = await DdbDocClient.send(new ScanCommand(params));

        results = [...results, ...(response?.Items as IDbProduct[])];
        if (!response?.LastEvaluatedKey) {
          execute = false;
        } else {
          exclusiveKey = response?.LastEvaluatedKey;
        }
      }

      return results;
    } catch (err) {
      console.log("scanTable-Err", err);
      throw err;
    }
  }

  /* Batch write item method */
  public async batchWrite(params: TransactWriteCommandInput) {
    try {
      const result = await DdbDocClient.send(new TransactWriteCommand(params));
      console.log({ result });

      return result;
    } catch (err) {
      console.log("batchWrite-Err", err);
      throw err;
    }
  }
}

export default DynamodbOperations;
