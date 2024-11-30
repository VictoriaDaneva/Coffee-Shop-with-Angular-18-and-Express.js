import { Router } from "express";
import coffeeService from "../services/coffeeService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const coffeeController = Router();

coffeeController.post("/", isAuth, async (req, res) => {
  const coffeeData = req.body;
  const userId = req.user;
  console.log(coffeeData, userId);

  try {
    const data = await coffeeService.create(coffeeData, userId);
    res.json({ data });
  } catch (err) {
    console.log(getErrrorMessage(err));
    res.status(400).json({
      error: getErrrorMessage(err),
    });
  }
});

export default coffeeController;
