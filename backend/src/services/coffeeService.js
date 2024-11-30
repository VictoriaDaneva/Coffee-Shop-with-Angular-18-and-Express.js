import Product from "../models/product.js";

const coffeeService = {
  async getAll() {
    return Product.find();
  },
  async create(coffeeData, userId) {
    return Product.create({ ...coffeeData, owner: userId });
  },
};

export default coffeeService;
