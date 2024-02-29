import { Response, Request } from "express";
import productModel from "~/models/productModel";
import productsService from "~/services/productServices";
import { typeProduct } from "~/type";

class product {
  async getAll(req: Request, res: Response) {
    const query = req.query;
    try {
      const response = await productModel.find(query);
      res.status(200).json(response);
    } catch (error) {
      res.json(error);
    }
  }
  async createProduct(req: Request, res: Response) {
    const data: typeProduct = req.body;
    try {
      const response = await productsService.create(data);
      res.status(200).json(response);
    } catch (error) {
      res.json(error);
    }
  }

  async uploadProduct(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const response = await productModel.updateOne(
        {
          _id: id,
        },
        req.body
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const response = await productModel.deleteOne({_id: id});
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProduct (req: Request, res: Response) {
    try {
      const response = await productsService.findOne(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.json(error)
    }
  }

  async searchProduct(req: Request, res: Response) {
    try {
      const response = await productsService.findOne(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.json(error)
    }
  }
}

export default new product();
