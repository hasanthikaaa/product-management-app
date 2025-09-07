import fs from "fs";
import csvParser from "csv-parser";
import { v4 as uuidv4 } from "uuid";
import DynamodbOperations from "../../utils/db";
import { TransactWriteItem } from "@aws-sdk/client-dynamodb/dist-types/models/models_0";
import { configurations } from "../../config";

const BATCH_SIZE = 25;

class ImportProduct {
  public async main(filePath: string) {
    return new Promise<void>((resolve, reject) => {
      const itemsBatch: TransactWriteItem[] = [];
      const stream = fs.createReadStream(filePath).pipe(csvParser());
      const dateTime = new Date().toLocaleDateString();
      const db = new DynamodbOperations();

      stream.on("data", (row) => {
        const productId = uuidv4();
        itemsBatch.push({
          Put: {
            TableName: process.env.PRODUCT_TABLE!,
            Item: {
              pk: configurations.sellerId,
              sk: productId,
              productId,
              name: row.name,
              price: row.price,
              quantity: row.quantity,
              description: row.description,
              createdAt: dateTime,
              updatedAt: dateTime,
              categoryId: row.category,
            },
          },
        } as unknown as TransactWriteItem);

        if (itemsBatch.length === BATCH_SIZE) {
          stream.pause();
          db.batchWrite({ TransactItems: itemsBatch.splice(0, BATCH_SIZE) })
            .then(() => stream.resume())
            .catch(reject);
        }
      });

      stream.on("end", async () => {
        if (itemsBatch.length > 0)
          await db.batchWrite({ TransactItems: itemsBatch });
        resolve();
      });

      stream.on("error", reject);
    });
  }
}

export default ImportProduct;
