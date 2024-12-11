import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    minlength: [5, "Username must be at least 5 characters long!"],
    match: [
      /^[a-zA-Z0-9]+$/g,
      "Username must contain only Latin letters and digits!",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  total: {
    type: String,
    required: [true, "Price is requered!!"],
  },

  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  products: {
    type: Types.ObjectId,
    ref: "Products",
  },
});

const Order = model("Order", orderSchema);
export default Order;
