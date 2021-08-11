import {NextFunction, Request, Response } from "express"

export const authenticateAdmin = (req:Request, resp:Response, next:NextFunction) => {
    const key = req.header('ADMIN_KEY')
    if (!key || process.env["ADMIN_KEY"] !== key) {
        return resp.status(401).json('invalid admin key')
    }

    next()
}
