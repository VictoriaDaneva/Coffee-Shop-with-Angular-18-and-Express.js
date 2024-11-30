import { Router } from "express";
import coffeeService from "../services/coffeeService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const coffeeController = Router();

coffeeController.get("/", async (req, res) => {
  try {
    const data = await coffeeService.getAll();
    console.log(data);

    return res.json(data);
  } catch (err) {
    console.error(getErrrorMessage(err));
    return res.status(400).json({
      error: getErrrorMessage(err),
    });
  }
});
coffeeController.post("/", isAuth, async (req, res) => {
  const coffeeData = req.body;
  const userId = req.user;

  try {
    const createdProduct = await coffeeService.create(coffeeData, userId);
    await coffeeService.addPostToUser(userId, createdProduct._id);
    return res.status(201).json({ data: createdProduct });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default coffeeController;
