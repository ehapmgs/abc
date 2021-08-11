import { Request, Response } from 'express';
import Customer from '../models/Customer';
import bcrypt from 'bcrypt';
import bcryptConfig from '../config/bcrypt';
import jwt from "jsonwebtoken"
import {ENVIRONMENT_VARIABLES} from "../config/enviroment"



const customerController = {
    create: async (req: Request, res: Response) => {
        try {
            const { name, email, password: passwordBody } = req.body;
            if (!name || !email || !passwordBody) return res.status(400).json({ message: "Missing data" });

            const isCustomerExists = await Customer.findOne({ email }).exec();

            if (isCustomerExists) return res.status(401).json({ message: "Customer Already Exists" })

            const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);

            const newCustomer = await new Customer({
                name,
                email,
                password,
            }).save();

            return res.status(201).json(newCustomer);

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) return res.status(400).json({ message: "Missing Data" });

            const customer = await Customer.findOne({ email }).exec();

            if (!customer) return res.status(401).json({ message: "Email or Password is Wrong!" })

            const isPasswordValid = await bcrypt.compare(password, customer.password);

            if (!isPasswordValid) return res.status(401).json({ message: "Email or Password is Wrong!" })

            return res.status(200).json({
                token: jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email: customer.email,
                    role: 'customer',
                }, ENVIRONMENT_VARIABLES.PRIVET_KEY)
            })

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
    },
};

export default customerController;
