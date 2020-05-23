import { Schema, model, Document } from 'mongoose';
import { User } from './users';

export interface Product extends Document {
    title: string;
    desc: string;
    price: number;
    images: Array<string>;
    user: User | string;
}

const productSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true, unique: true }], default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},
    {
        timestamps: true
    }
);

export default model<Product>('Product', productSchema);