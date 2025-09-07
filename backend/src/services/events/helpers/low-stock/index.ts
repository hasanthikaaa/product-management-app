import { ILowStockInput } from "../../../../utils/types";
import { configurations } from "../../../../config";
import express from "express";

class LowStock {
  private warnSeller(input: ILowStockInput, clients: express.Response[]) {
    try {
      const message = `data: ${JSON.stringify({ name: input?.productName, productId: input?.productId, quantity: input.quantity, message: "Quantity is low!" })}\n\n`;
      clients.forEach((client) => client.write(message));
    } catch (err) {
      console.log("warnSeller-ERROR", err);
      return;
    }
  }

  public async main(input: ILowStockInput, clients: express.Response[]) {
    console.log({ input });
    try {
      if (!input?.quantity) return;

      if (input.quantity < configurations.lowStockThreshold) {
        this.warnSeller(input, clients);
      }
    } catch (err) {
      console.log("LowStock-ERROR", err);
      return;
    }
  }
}

export default LowStock;
