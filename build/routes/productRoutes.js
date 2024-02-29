"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const productController_1 = __importDefault(require("../controllers/productController"));
const verifyAdmin_1 = __importDefault(require("~/middlewares/verifyAdmin"));
routes.get("/", productController_1.default.getAll);
routes.get("/:id", productController_1.default.getProduct);
routes.get("search/:info", productController_1.default.searchProduct);
routes.post("/create", verifyAdmin_1.default, productController_1.default.createProduct);
routes.patch("/update/:id", verifyAdmin_1.default, productController_1.default.uploadProduct);
routes.delete("/delete/:id", verifyAdmin_1.default, productController_1.default.deleteProduct);
exports.default = routes;
