import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import {
  authMiddleware,
  isAuth,
  isGuest,
} from "../middleware/authMiddleware.js";

const profileController = Router();

profileController.get("/posts", isAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await authService.getPosts(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

profileController.get("/wishlist", isAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await authService.getWishlist(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Get Profile
profileController.get("/", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  try {
    const data = await authService.getProfile(userId);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(data); // Return the profile data directly
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Update Profile
profileController.post("/edit", isAuth, async (req, res) => {
  const userId = req.user._id;
  const userData = req.body;
  try {
    const data = await authService.editProfile(userId, userData);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default profileController;
