import ProductService from "../services/productService";
import Product from "../models/product";
import { IProductCreate } from "../types/productTypes";

jest.mock("../models/product");

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a product", async () => {
    const productData: IProductCreate = {
      name: "Test Product",
      description: "A product description",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    };

    Product.create = jest.fn().mockResolvedValue(productData);

    const result = await ProductService.createProduct(productData);
    expect(result).toEqual(productData);
    expect(Product.create).toHaveBeenCalledWith(productData);
  });

  it("should get all products", async () => {
    const mockProducts = [
      {
        name: "Test Product 1",
        category: "Category1",
        createdBy: "User1",
        updatedBy: "User1",
      },
      {
        name: "Test Product 2",
        category: "Category2",
        createdBy: "User2",
        updatedBy: "User2",
      },
    ];

    const skipMock = jest.fn().mockReturnThis();
    const limitMock = jest.fn().mockResolvedValue(mockProducts);

    Product.find = jest
      .fn()
      .mockReturnValue({ skip: skipMock, limit: limitMock });

    const result = await ProductService.getProducts(1, 10);

    expect(result).toEqual(mockProducts);
    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(skipMock).toHaveBeenCalledWith(0);
    expect(limitMock).toHaveBeenCalledWith(10);
  });

  it("should get a product by ID", async () => {
    const product = {
      name: "Test Product",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    };

    Product.findById = jest.fn().mockResolvedValue(product);

    const result = await ProductService.getProductById("123");
    expect(result).toEqual(product);
    expect(Product.findById).toHaveBeenCalledWith("123");
  });

  it("should update a product by ID", async () => {
    const updatedProduct = {
      name: "Updated Product",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    };

    Product.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProduct);

    const result = await ProductService.updateProduct("123", {
      name: "Updated Product",
    });
    expect(result).toEqual(updatedProduct);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { name: "Updated Product" },
      { new: true }
    );
  });

  it("should delete a product by ID", async () => {
    const product = {
      name: "Test Product",
      category: "Category1",
      createdBy: "User1",
      updatedBy: "User1",
    };

    Product.findByIdAndDelete = jest.fn().mockResolvedValue(product);

    const result = await ProductService.deleteProduct("123");
    expect(result).toEqual(product);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith("123");
  });
});
