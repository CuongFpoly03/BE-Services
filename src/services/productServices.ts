import products from '../models/productModel';
import { typeProduct } from '../type';

const productsService = {
    create: async (product: typeProduct) => await products.create(product),
    findOne: async (_id: String) => await products.findOne({ _id }),
};

export default productsService;
