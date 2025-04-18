import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/auth/login", authController.autenticarUsuario);

export default authRouter;
