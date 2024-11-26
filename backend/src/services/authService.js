import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";

const authService = {
  async register(username, email, phoneNumber, address, password, rePassword) {
    const User = await user.findOne({ $or: [{ email }, { username }] });

    if (rePassword !== password) {
      throw new Error("Passwords missmatch!!!");
    }
    if (User) {
      throw new Error("User already exists!!!");
    }
    const newUser = await user.create({
      username,
      email,
      phoneNumber,
      address,
      password,
    });
    return this.generateToken(newUser);
  },

  async login(email, password) {
    const User = await user.findOne({ email });

    if (!User) {
      throw new Error("Invalid user!");
    }

    const valid = await bcrypt.compare(password, User.password);

    if (!valid) {
      throw new Error("Invalid password!!!");
    }

    return this.generateToken(User);
  },

  async generateToken(User) {
    //token
    const payload = {
      _id: User._id,
      email: User.email,
      username: User.username,
    };

    const header = { expiresIn: "2h" };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, header);
    return token;
  },
};

export default authService;
