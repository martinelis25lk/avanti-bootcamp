import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController.js";

const categoriaRouter = Router();
const categoriaController = new CategoriaController();

categoriaRouter.get("/categoria", categoriaController.buscarCategorias);

export default categoriaRouter;
