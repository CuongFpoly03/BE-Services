"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const accountController_1 = __importDefault(require("../controllers/accountController"));
routes.post("/register", accountController_1.default.register);
routes.post("/login", accountController_1.default.login);
routes.post("/logout", accountController_1.default.logout);
routes.get("/refreshtoken", accountController_1.default.refreshToken);
exports.default = routes;
