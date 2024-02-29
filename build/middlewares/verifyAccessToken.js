"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken = (req, res, next) => {
    const token = req.headers.token;
    const accessTokenKey = process.env.accessTokenKey;
    if (typeof token === 'string' && accessTokenKey) {
        const accessToken = token.split(' ')[1];
        jsonwebtoken_1.default.verify(accessToken, accessTokenKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Mã thông báo không hợp lệ' });
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(404).json({ message: "Bạn không xác thực" });
    }
};
exports.default = verifyAccessToken;
