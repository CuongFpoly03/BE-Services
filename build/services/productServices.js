"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../models/productModel"));
const productsService = {
    create: async (product) => await productModel_1.default.create(product),
    findOne: async (_id) => await productModel_1.default.findOne({ _id }),
};
exports.default = productsService;
