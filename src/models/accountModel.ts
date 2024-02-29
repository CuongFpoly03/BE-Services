import mongoose, { Schema } from 'mongoose';
import { typeUser } from '../type';

const account = new Schema<typeUser>(
    {
        username: { type: String, require, unique: true },
        password: { type: String, require },
        phone: { type: String },
        avatar: { type: String },
        last_name: { type: String },
        first_name: { type: String },
        admin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('user', account);
