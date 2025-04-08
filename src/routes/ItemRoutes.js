import { Router } from "express";
import { ItemController } from "../controllers/ItemController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const itemRouter = Router();
const itemController = new ItemController();

itemRouter.get("/itens", authMiddleware, itemController.buscarItens);
itemRouter.post("/itens", authMiddleware, itemController.criarItem);
itemRouter.put("/itens/:id", authMiddleware, itemController.atualizarItem);
itemRouter.delete("/itens/:id", authMiddleware, itemController.deletarItem);

export default itemRouter;
