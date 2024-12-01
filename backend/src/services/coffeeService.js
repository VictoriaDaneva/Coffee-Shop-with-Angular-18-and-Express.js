import Product from "../models/product.js";
import user from "../models/user.js";

const coffeeService = {
  addToWishlistUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { wishlist: productId } },
      { new: true, runValidators: true }
    );
  },

  like(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $push: { likes: userId } },
      { new: true, runValidators: true }
    );
  },

  removeProduct(productId) {
    return Product.findByIdAndDelete(productId);
  },

  editProduct(coffeeParams, productId) {
    return Product.findByIdAndUpdate(productId, coffeeParams, {
      runValidators: true,
      new: true,
    });
  },

  getOne(productId) {
    return Product.findById(productId).lean();
  },

  getAll() {
    return Product.find();
  },

  addPostToUser(userId, productId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { posts: productId } },
      { new: true, runValidators: true }
    );
  },

  create(coffeeData, userId) {
    return Product.create({ ...coffeeData, owner: userId });
  },
};

export default coffeeService;
