import  { Schema, Document } from 'mongoose';
import * as mongoose from "mongoose"

interface ICustomer extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    access_token: string;
}

const Customer: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<ICustomer>('Customer', Customer, 'customers');
