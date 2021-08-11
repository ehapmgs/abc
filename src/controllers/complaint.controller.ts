import {Request, Response} from 'express'
import Complaint, {ComplaintStatus} from "../models/Complaint"

const compliantController = {
    create: async (req: Request, res: Response) => {
        try {
            const email = req.user?.email
            const {message} = req.body
            if (!message || !email) return res.status(400).json({message: "Missing data"})

            await new Complaint({
                email,
                message
            }).save()

            return res.status(201).json("Complaint submitted")

        } catch (err) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    },


    select: async (req: Request, res: Response) => {
        try {
            const email = req.user?.email
            const role = req.user?.role
            if (role === 'customer' && email) {
                const complaint = await Complaint.find({email}).exec()
                return res.status(200).json(complaint)
            } else if (role === 'admin') {
                const complaints = await Complaint.find({}).exec()
                return res.status(200).json(complaints)
            } else {
                return res.status(401).json({"message":"Unauthorized"})
            }
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    },


    update: async (req: Request, res: Response) => {
        try {
            const {id: _id, status} = req.params
            const getStatus = () => {
                switch (status) {
                    case 'resolved' :
                        return ComplaintStatus.RESOLVED
                    case 'resolution':
                        return ComplaintStatus.RESOLUTION
                    case 'dismissed' :
                        return ComplaintStatus.DISMISSED
                    default :
                        return ComplaintStatus.PENDING
                }
            }

            const role = req.user?.role
            if (role && role === 'admin') {
                const complaint = await Complaint.findOneAndUpdate({_id}, {status: getStatus()}).exec()
                return res.status(200).json(complaint)
            } else {
                return res.status(401).json('Unauthorized')
            }
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    },
}

export default compliantController
