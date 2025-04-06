import { Router } from "express"
import { AuthController } from "../controllers/AuthController.js"
import authMiddleware from "../middlewares/authMiddleware.js"


const authRouter = Router()
const authController = new AuthController()

authRouter.post("/auth/registrar", authController.registrarUsuario)
authRouter.post("/auth/login", authController.autenticarUsuario)

export default authRouter
