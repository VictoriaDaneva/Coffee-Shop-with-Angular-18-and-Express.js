import { Router } from "express";
import authController from "./controllers/authController.js";
import coffeeController from "./controllers/coffeeController.js";
import profileController from "./controllers/profileController.js";
import cardController from "./controllers/cartController.js";

const routes = Router();

routes.use("/api/card", cardController);
routes.use("/api/users/profile", profileController);
routes.use("/api", authController);
routes.use("/api/products", coffeeController);

export default routes;
