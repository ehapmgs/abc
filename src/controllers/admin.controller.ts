import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import bcryptConfig from '../config/bcrypt'
import Admin from "../models/Admin"
import {ENVIRONMENT_VARIABLES} from "../config/enviroment"


const adminController = {
    create: async (req: Request, res: Response) => {
        try {
            const {name, email, password: passwordBody} = req.body
            if (!name || !email || !passwordBody) return res.status(400).json({message: "Missing data"})
            const isAdminExists = await Admin.findOne({email}).exec()

            if (isAdminExists) return res.status(401).json({message: "Admin Already Exists"})
            const password = await bcrypt.hash(passwordBody, bcryptConfig.salt)

            const newAdmin = await new Admin({
                name,
                email,
                password,
            }).save()

            return res.status(201).json(newAdmin)

        } catch (err) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body

            if (!email || !password) return res.status(400).json({message: "Missing Data"})

            const admin = await Admin.findOne({email}).exec()

            if (!admin) return res.status(401).json({message: "Email or Password is Wrong!"})

            const isPasswordValid = await bcrypt.compare(password, admin.password)

            if (!isPasswordValid) return res.status(401).json({message: "Email or Password is Wrong!"})

            return res.status(200).json({
                token: jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email: admin.email,
                    role: 'admin',
                }, ENVIRONMENT_VARIABLES.PRIVET_KEY)
            })

        } catch (err) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    },
}

export default adminController
