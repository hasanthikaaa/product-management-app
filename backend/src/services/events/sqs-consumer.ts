import { Consumer } from "sqs-consumer";
import { configurations } from "../../config";
import { sqsClient } from "../../config/sqs";
import {
  EVENT_TYPE,
  IConsumerPayload,
  ISQSAddProductInput,
  ISQSDeleteProductInput,
  ISQSUpdateProductInput,
} from "../../utils/types";
import EventDbHelper from "./helpers/db";
import SQSQueueOperations from "../../utils/queue";

class SQSConsumer {
  /* Add product event */
  private async handleAddProductEvent(input: ISQSAddProductInput) {
    console.log({ input });
    try {
      const sellerId = input?.sellerId;
      return await new EventDbHelper().updateAnalytics(sellerId, "Increment");
    } catch (error) {
      console.error("handleAddProductEvent-ERROR", error);
    }
  }

  /* Delete product event */
  private async handleDeleteProductEvent(input: ISQSDeleteProductInput) {
    console.log({ input });
    try {
      const sellerId = input?.sellerId;
      return await new EventDbHelper().updateAnalytics(sellerId, "Decrement");
    } catch (error) {
      console.error("handleDeleteProductEvent-ERROR", error);
    }
  }

  /* Update product event */
  private handleUpdateProductEvent(input: ISQSUpdateProductInput) {
    console.log({ input });
    try {
      /* Calculate product quantity and notify user */
      return;
    } catch (error) {
      console.error("handleUpdateProductEvent-ERROR", error);
    }
  }

  public main() {
    try {
      const consumer = Consumer.create({
        queueUrl: configurations.productQueueUrl,
        handleMessage: async (message) => {
          console.log("Received SQS message:", message.Body);
          console.log("Received SQS message:", message);
          if (!message?.Body) return;

          const payload = JSON.parse(message?.Body) as IConsumerPayload;
          switch (payload?.eventType) {
            case EVENT_TYPE.ADD_PRODUCT:
              await this.handleAddProductEvent(payload as ISQSAddProductInput);
              break;
            case EVENT_TYPE.UPDATE_PRODUCT:
              this.handleUpdateProductEvent(payload as ISQSUpdateProductInput);
              break;
            case EVENT_TYPE.DELETE_PRODUCT:
              await this.handleDeleteProductEvent(
                payload as ISQSDeleteProductInput,
              );
              break;
          }
          await new SQSQueueOperations().deleteMessage({
            QueueUrl: configurations.productQueueUrl,
            ReceiptHandle: message?.ReceiptHandle,
          });
        },
        sqs: sqsClient,
      });

      consumer.start();
    } catch (err) {
      console.error("SQSConsumer-ERR", err);
      return;
    }
  }
}

export default SQSConsumer;
