import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import coffeeController from "./controllers/coffeeController.js";
import profileController from "./controllers/profileController.js";

const routes = Router();

////add controllers
//routes.use(homeController);
routes.use("/api/users/profile", profileController);
routes.use("/api", authController);
routes.use("/api/coffee", coffeeController);
//
//routes.all("*", (req, res) => {
//  res.render("home/404", { tittle: "404 Page" });
//});
//
export default routes;
