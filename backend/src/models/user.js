import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    minlength: [5, "Username must be at least 5 characters long!"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/g.test(v);
      },
      message: "Username must contain only Latin letters and digits!",
    },
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
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [5, "Password must be at least 5 characters long!"],
  },
  wishlist: [
    {
      type: Types.ObjectId,
      ref: "Wishlist",
    },
  ],
  posts: [
    {
      type: Types.ObjectId,
      ref: "Posts",
    },
  ],
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
});

const user = model("User", userSchema);

export default user;
