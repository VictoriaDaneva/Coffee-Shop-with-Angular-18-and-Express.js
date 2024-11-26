import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isGuest } from "../middleware/authMiddleware.js";

const authController = Router();

// Register
authController.post("/register", isGuest, async (req, res) => {
  const { username, email, phoneNumber, address, password, rePassword } =
    req.body;

  console.log({ username, email, phoneNumber, address, password, rePassword });

  try {
    const token = await authService.register(
      username,
      email,
      phoneNumber,
      address,
      password,
      rePassword
    );
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: true });
    res.json({ token });
    console.log("EVERYTHING IS OKAY");
  } catch (err) {
    console.log(getErrrorMessage(err));

    res.status(400).json({
      username,
      email,
      phoneNumber,
      address,
      error: getErrrorMessage(err),
    });
  }
});

// Login
authController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: getErrrorMessage(err) });
  }
});

// Logout
authController.get("/logout", (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
});

export default authController;
