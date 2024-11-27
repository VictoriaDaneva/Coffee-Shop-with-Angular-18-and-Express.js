import Product from "../models/product.js";

const coffeeService = {
  create(coffeeData, userId) {
    return Product.create({ ...coffeeData, owner: userId });
  },
};

export default coffeeService;
