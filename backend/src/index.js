import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

//setup db
const url = "mongodb://localhost:27017";
mongoose
  .connect(url, { dbName: "Volcanos" })
  .then(console.log(`DB Connected!`))
  .catch((err) => console.log(`DB Failed! ${err}`)); //setup the name based on the project

//setup handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("views", "src/views");
app.set("view engine", "hbs");

app.use("/static", express.static("src/public")); //remove the dots
app.use(express.urlencoded({ extended: false })); // to not have complex data (false)
app.use(cookieParser());
app.use(authMiddleware);

app.use(routes);

app.listen(3000, () =>
  console.log("server is running on http//localhost:3000")
);
