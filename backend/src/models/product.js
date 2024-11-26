import { Schema, model, Types } from "mongoose";

//const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, "An image is requered!!"],
  },
  title: {
    type: String,
    required: [true, "The product tittle is requered!!"],
  },
  price: {
    type: String,
    required: [true, "Price is requered!!"],
  },
  type: {
    type: String,
    required: [true, "The product type is requered!!"],
  },
  author: {
    type: String,
    required: [true, "Author is requered!!"],
  },
  description: {
    type: String,
    required: [true, "Description is requered!!"],
  },
  //  likes: [
  //    {
  //      type: ObjectId,
  //      ref: "User",
  //    },
  //  ],
  //  userId: {
  //    type: ObjectId,
  //    ref: "User",
  //  },
});

const Product = model("Product", productSchema);
export default Product;
