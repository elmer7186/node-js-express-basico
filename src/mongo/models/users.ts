import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
    username: string;
    password: string;
    email: string;
    data: {
        age: number;
        isMale: boolean;
    }
    role: string;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    data: {
        age: Number,
        isMale: Boolean
    },
    role: { type: String, enum: ['admin', 'seller'], default: 'seller' }
});

export default model<User>('User', userSchema);