import request from "supertest";
import express from "express";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../src/controllers/product";

const app = express();
app.use(express.json());
app.get("/products", listProducts);
app.post("/product", createProduct);
app.delete("/product/:productId", deleteProduct);

describe("Product API", () => {
  it("GET /products should return 200 and a list of products", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /products should create a product", async () => {
    const res = await request(app)
      .post("/product")
      .send({ name: "Test Product", price: 10 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Product");
  });

  it("DELETE /products/:id should delete a product", async () => {
    const res = await request(app).delete("/products/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it("POST /products with missing fields should return 400", async () => {
    const res = await request(app).post("/products").send({});
    expect(res.status).toBe(400);
  });
});
