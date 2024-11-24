import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isGuest } from "../middleware/authMiddleware.js";

const authController = Router();

authController.get("/register", isGuest, (req, res) => {
  res.render("auth/register", { tittle: "Register Page" });
});

authController.post("/register", isGuest, async (req, res) => {
  const { email, username, password, rePassword } = req.body;

  try {
    const token = await authService.register(
      username,
      email,
      password,
      rePassword
    );
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const error = getErrrorMessage(err);
    res.render("auth/register", {
      tittle: "Register Page",
      username,
      email,
      error,
    });
  }
});

authController.get("/login", isGuest, (req, res) => {
  res.render("auth/login", { tittle: "Login Page" });
});

authController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const error = getErrrorMessage(err);
    res.render("auth/login", { tittle: "Login Page", email, error });
  }
});

authController.get("/logout", (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect("/");
});

export default authController;
