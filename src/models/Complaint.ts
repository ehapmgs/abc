import {Document, Schema} from "mongoose"
import mongoose from "mongoose"

export enum ComplaintStatus{
    RESOLVED = 'RESOLVED', PENDING = "PENDING", RESOLUTION = "RESOLUTION" , DISMISSED = "DISMISSED"
}
interface IComplaint extends Document {
    _id: string;
    userID:string;
    status:ComplaintStatus
    message:string
}


const Complaint: Schema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum : ComplaintStatus,
        default: 'PENDING',
        required:true
    },
}, {
    timestamps: true,
});

export default mongoose.model<IComplaint>('Complaint', Complaint, 'complaints');
