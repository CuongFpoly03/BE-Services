import { ObjectId } from 'mongoose';
interface typeProduct {
    name: String;
    price: Number;
    code: String;
    thumbnail: String;
    list_img: Array;
    status?: String;
    color?: [{ type: String; amount: Number }];
    size?: Array;
    info: String;
}

interface typeUser {
    _id: ObjectId;
    username: string;
    password: string;
    phone?: string;
    avatar?: string;
    last_name?: string;
    first_name?: string;
    admin: boolean;
}

interface typeJwt {
    id: ObjectId;
    admin: boolean;
}

export { typeProduct, typeUser, typeJwt };
