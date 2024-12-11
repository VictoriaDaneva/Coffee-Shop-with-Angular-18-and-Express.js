import { Router } from "express";
import coffeeService from "../services/coffeeService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const cardController = Router();
cardController.get("/", isAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await coffeeService.getCard(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//Add to card
cardController.get("/add/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await coffeeService.addToCard(productId, userId);
    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

export default cardController;
