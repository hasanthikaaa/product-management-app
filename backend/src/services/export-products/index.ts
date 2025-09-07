import { Readable, Transform } from "stream";
import { pipeline } from "stream/promises";
import DynamodbOperations from "../../utils/db";
import { Response } from "express";
import { IDbProduct } from "../../utils/types";

class ExportProducts {
  private jsonToCsv(): Transform {
    let headerEmitted = false;

    return new Transform({
      objectMode: true,
      transform(product: IDbProduct, _: BufferEncoding, cb: Function) {
        let output = "";

        if (!headerEmitted) {
          output += "id,name,description,price,quantity,category\n";
          headerEmitted = true;
        }

        output += `${product.sk},"${product.name}","${product.description}",${product.price},${product.quantity},${product.categoryId}\n`;

        cb(null, output);
      },
    });
  }

  public async main(res: Response) {
    try {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=products.csv");

      const db = new DynamodbOperations();
      const params = {
        TableName: process.env.PRODUCT_TABLE!,
      };

      await pipeline(
        Readable.from(await db.scanTable(params)),
        this.jsonToCsv(),
        res,
      );
    } catch (err) {
      console.log("ExportProducts-Err", err);
      return;
    }
  }
}

export default ExportProducts;
