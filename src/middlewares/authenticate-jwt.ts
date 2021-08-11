import jwt from "express-jwt"
import {ENVIRONMENT_VARIABLES} from "../config/enviroment"

export const authenticateJWT = jwt({
    secret: ENVIRONMENT_VARIABLES.PRIVET_KEY,
    algorithms: ['HS256']
})
