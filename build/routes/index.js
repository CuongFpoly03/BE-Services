"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountRoutes_1 = __importDefault(require("./accountRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
function routers(app) {
    app.use("/api/account", accountRoutes_1.default);
    app.use("/api/product", productRoutes_1.default);
}
exports.default = routers;
