import  { Schema, Document } from 'mongoose';
import * as mongoose from "mongoose"

interface IAdmin extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
}

const Admin: Schema = new mongoose.Schema({
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

export default mongoose.model<IAdmin>('Admin', Admin, 'admins');
