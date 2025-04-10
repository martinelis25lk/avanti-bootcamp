import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post("/usuario/criar", usuarioController.criarUsuario);
usuarioRouter.delete(
  "/usuario/deletar",
  authMiddleware,
  usuarioController.deletarUsuario
);

export default usuarioRouter;
