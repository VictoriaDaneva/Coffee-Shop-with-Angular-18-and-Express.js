import Product from "../models/product.js";
import user from "../models/user.js";

const coffeeService = {
  async getOne(productId) {
    return Product.findById(productId).lean();
  },
  async getAll() {
    return Product.find();
  },
  async addPostToUser(userId, productId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { posts: productId } },
      { new: true, runValidators: true }
    );
  },
  async create(coffeeData, userId) {
    return Product.create({ ...coffeeData, owner: userId });
  },
};

export default coffeeService;
