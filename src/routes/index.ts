import { Express } from "express";
import account from "./accountRoutes";
import product from "./productRoutes";
function routers(app: Express) {
  app.use("/api/account", account);
  app.use("/api/product", product);
}
export default routers;
