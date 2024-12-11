import Product from "../models/product.js";
import user from "../models/user.js";

const coffeeService = {
  search(query) {
    return Product.find({ title: { $regex: query, $options: "i" } });
  },
  //Card functionality
  removeCard(productId, userId) {
    return user.findOneAndUpdate(
      { _id: userId },
      { $pull: { card: productId } },
      { runValidators: true, new: true }
    );
  },

  async getCard(userId) {
    const User = await user.findById(userId).populate("card");
    return User.card;
  },

  addToCard(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { card: productId } },
      { new: true, runValidators: true }
    );
  },

  //Wishlist Functionality
  removeWishlistUser(productId, userId) {
    return user.findOneAndUpdate(
      { _id: userId },
      { $pull: { wishlist: productId } },
      { runValidators: true, new: true }
    );
  },

  unlike(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $pull: { likes: userId } },
      { runValidators: true, new: true }
    );
  },

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

  //CRUD Operations

  removeFromUserProduct(userId, productId) {
    return user.findByIdAndDelete(
      userId,
      { $pull: { products: productId } },
      {
        runValidators: true,
        new: true,
      }
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
