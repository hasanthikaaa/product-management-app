import {
    DeleteMessageCommand,
    DeleteMessageCommandInput,
    ReceiveMessageCommand,
    ReceiveMessageCommandInput,
    SendMessageCommand,
    SendMessageCommandInput,
} from "@aws-sdk/client-sqs";
import { sqsClient } from "../../config/sqs";

class SQSQueueOperations {
    /* Send message to queue */
    public async sendMessage(params: SendMessageCommandInput) {
        try {
            const command = new SendMessageCommand(params);
            const response = await sqsClient.send(command);
            console.log({ response: response?.MessageId });

            return response;
        } catch (error) {
            console.error("sendMessage-ERROR", { error });
            return;
        }
    }

    /* Receive message from queue */
    public async receiveMessages(params: ReceiveMessageCommandInput) {
        try {
            const command = new ReceiveMessageCommand(params);
            const response = await sqsClient.send(command);
            console.log({ response: response?.Messages });

            return response?.Messages;
        } catch (error) {
            console.error("receiveMessages-ERROR", { error });
            return;
        }
    }

    /* Delete message from queue */
    public async deleteMessage(params: DeleteMessageCommandInput) {
        try {
            const command = new DeleteMessageCommand(params);
            const response = await sqsClient.send(command);
            console.log({ response });

            return response;
        } catch (error) {
            console.error("sendMessage-ERROR", { error });
            return;
        }
    }
}

export default SQSQueueOperations;
