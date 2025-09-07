export const analyticsSchema = {
  TableName: "analytics",
  AttributeDefinitions: [{ AttributeName: "productCount", AttributeType: "N" }],
  KeySchema: [{ AttributeName: "sellerId", KeyType: "HASH" }],
};
