"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDb() {
    const url = 'mongodb://localhost:27017/project1';
    try {
        mongoose_1.default.connect(url);
        console.log('Connect success mongooDb');
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = connectDb;
