import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const categoriaRouter = Router();
const categoriaController = new CategoriaController();

categoriaRouter.get(
  "/categoria",
  authMiddleware,
  categoriaController.buscarCategorias
);

export default categoriaRouter;
