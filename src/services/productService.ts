import Product, { IProduct } from "../models/product";
import { IProductCreate } from "../types/productTypes";

class ProductService {
  async createProduct(data: IProductCreate) {
    return Product.create(data);
  }

  async getProducts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return Product.find().skip(skip).limit(limit);
  }

  async getProductById(id: string) {
    return Product.findById(id);
  }

  async updateProduct(id: string, data: Partial<IProductCreate>) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
  }
}

export default new ProductService();
