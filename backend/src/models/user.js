import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is requered!!"],
  },
  email: {
    type: String,
    required: [true, "Email is requered!!"],
  },
  password: {
    type: String,
    required: [true, "Password is requered!!"],
  },
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
});

const user = model("User", userSchema);

export default user;
