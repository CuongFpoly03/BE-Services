"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAccessToken_1 = __importDefault(require("./verifyAccessToken"));
const verifyAdmin = async (req, res, next) => {
    (0, verifyAccessToken_1.default)(req, res, () => {
        if (req.user?.admin) {
            next();
        }
        else {
            res.status(401).json({ message: 'You have no right' });
        }
    });
};
exports.default = verifyAdmin;
