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
} from "@aws-sdk/lib-dynamodb";

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
}

export default DynamodbOperations;
