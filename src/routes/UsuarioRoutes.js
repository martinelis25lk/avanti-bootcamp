import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post("/usuario", usuarioController.criarUsuario);

usuarioRouter.delete(
  "/usuario",
  authMiddleware,
  usuarioController.deletarUsuario
);

usuarioRouter.put(
  "/usuario",
  authMiddleware,
  usuarioController.atualizarUsuario
);

export default usuarioRouter;
