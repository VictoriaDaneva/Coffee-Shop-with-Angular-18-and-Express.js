import { Router } from "express";
import coffeeService from "../services/coffeeService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const coffeeController = Router();

coffeeController.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    await coffeeService.removeProduct(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(getErrrorMessage(err));
    return res.status(400).json({
      error: getErrrorMessage(err),
    });
  }
});

coffeeController.post("/:id/edit", async (req, res) => {
  const productId = req.params.id;
  const coffeeParams = req.body;
  try {
    const data = await coffeeService.editProduct(coffeeParams, productId);
    return res.json(data);
  } catch (err) {
    console.log(getErrrorMessage(err));
    return res.status(400).json({
      error: getErrrorMessage(err),
    });
  }
});
coffeeController.get("/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  try {
    const data = await coffeeService.getOne(productId);
    return res.json(data);
  } catch (err) {
    console.log(getErrrorMessage(err));
    return res.status(400).json({
      error: getErrrorMessage(err),
    });
  }
});
coffeeController.get("/", async (req, res) => {
  try {
    const data = await coffeeService.getAll();
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
