import express from "express";
const routes = express.Router();
import controllerAccount from "../controllers/accountController"

routes.post("/register", controllerAccount.register)
routes.post("/login", controllerAccount.login); 
routes.post("/logout", controllerAccount.logout);
routes.get("/refreshtoken", controllerAccount.refreshToken);
export default routes