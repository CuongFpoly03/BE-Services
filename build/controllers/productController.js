"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("~/models/productModel"));
const productServices_1 = __importDefault(require("~/services/productServices"));
class product {
    async getAll(req, res) {
        const query = req.query;
        try {
            const response = await productModel_1.default.find(query);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
    async createProduct(req, res) {
        const data = req.body;
        try {
            const response = await productServices_1.default.create(data);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
    async uploadProduct(req, res) {
        const id = req.params.id;
        try {
            const response = await productModel_1.default.updateOne({
                _id: id,
            }, req.body);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const response = await productModel_1.default.deleteOne({ _id: id });
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async getProduct(req, res) {
        try {
            const response = await productServices_1.default.findOne(req.params.id);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
    async searchProduct(req, res) {
        try {
            const response = await productServices_1.default.findOne(req.params.id);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
}
exports.default = new product();
