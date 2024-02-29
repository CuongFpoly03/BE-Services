import express from "express";
const routes = express.Router();
import controllerProduct from "../controllers/productController"
import verifyAdmin from "~/middlewares/verifyAdmin";

routes.get("/", controllerProduct.getAll)
routes.get("/:id", controllerProduct.getProduct);
routes.get("search/:info",controllerProduct.searchProduct )
routes.post("/create", verifyAdmin, controllerProduct.createProduct)
routes.patch("/update/:id", verifyAdmin, controllerProduct.uploadProduct)
routes.delete("/delete/:id", verifyAdmin, controllerProduct.deleteProduct)

export default routes