import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/auth/criar", authController.criarUsuario);
authRouter.post("/auth/login", authController.autenticarUsuario);
authRouter.delete(
  "/auth/deletar",
  authMiddleware,
  authController.deletarUsuario
);

export default authRouter;
