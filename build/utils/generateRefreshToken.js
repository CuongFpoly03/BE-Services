"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (data) => {
    const refreshTokenKey = process.env.refreshTokenKey;
    if (refreshTokenKey) {
        return jsonwebtoken_1.default.sign(data, refreshTokenKey, {
            expiresIn: '365d',
        });
    }
    else {
        return '';
    }
};
exports.default = generateRefreshToken;
