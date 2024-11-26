import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";

const routes = Router();

////add controllers
//routes.use(homeController);
routes.use("/auth", authController);
//
//routes.all("*", (req, res) => {
//  res.render("home/404", { tittle: "404 Page" });
//});
//
export default routes;
