import {Router} from 'express'
//Middlewares
import {authenticateAdmin} from "./middlewares/authenticate-admin"
import {authenticateJWT} from "./middlewares/authenticate-jwt"
// Models
import customerController from './controllers/customer.controller'
import adminController from "./controllers/admin.controller"
import compliantController from "./controllers/complaint.controller"


const routes = Router()


// Customers
routes.post("/customers", customerController.create)

// Admin
routes.post("/admins", authenticateAdmin, adminController.create)


// Login
routes.post("/customers/session", customerController.login)
routes.post("/admins/session", adminController.login)

//Complaint
routes.get("/complaints", authenticateJWT, compliantController.select)
routes.post("/complaints", authenticateJWT, compliantController.create)
routes.put("/complaints", authenticateJWT, compliantController.update)

export default routes
