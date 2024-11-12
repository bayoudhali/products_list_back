import mongoose from "mongoose";
import request from "supertest";
import app from "../server";
import Product from "../models/product";

describe("Product API", () => {
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a product", async () => {
    const productData = {
      name: "Test Product",
      description: "A product description",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    };
    const response = await request(app).post("/api/products").send(productData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(productData.name);
  });

  it("should retrieve all products", async () => {
    await Product.create({
      name: "Test Product",
      description: "Description",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    });
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a product by ID", async () => {
    const product = await Product.create({
      name: "Test Product",
      description: "Description",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    });
    const response = await request(app).get(`/api/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Test Product");
  });

  it("should update a product by ID", async () => {
    const product = await Product.create({
      name: "Test Product",
      description: "Description",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    });
    const updatedData = { name: "Updated Product" };
    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Updated Product");
  });

  it("should delete a product by ID", async () => {
    const product = await Product.create({
      name: "Test Product",
      description: "Description",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    });
    const response = await request(app).delete(`/api/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product deleted successfully"
    );

    const deletedProduct = await Product.findById(product._id);
    expect(deletedProduct).toBeNull();
  });
});
