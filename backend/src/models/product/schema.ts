export const productSchema = {
    TableName: "Products",
    AttributeDefinitions: [
        { AttributeName: "name", AttributeType: "S" },
        { AttributeName: "description", AttributeType: "S" },
        { AttributeName: "quantity", AttributeType: "N" },
        { AttributeName: "price", AttributeType: "N" },
        { AttributeName: "productId", AttributeType: "S" },
        { AttributeName: "category", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "S" },
        { AttributeName: "updatedAt", AttributeType: "S" },
    ],
    KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" }, // Partition Key
        { AttributeName: "sk", KeyType: "RANGE" }, // Sort Key
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "SortByUpdatedAt",
            KeySchema: [
                { AttributeName: "pk", KeyType: "HASH" },
                { AttributeName: "updatedAt", KeyType: "RANGE" },
            ],
            Projection: { ProjectionType: "ALL" },
        },
    ],
};

export const getProductTablePK = (sellerId: string) => sellerId;
export const getProductTableSK = (productId: string) => productId;

export const getProductKeys = (
    sellerId: string,
    productId: string,
) => {
    return {
        pk: getProductTablePK(sellerId),
        sk: getProductTableSK(productId),
    };
};
