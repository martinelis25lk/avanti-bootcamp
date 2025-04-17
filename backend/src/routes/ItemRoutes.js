import { Router } from "express";
import { ItemController } from "../controllers/ItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const itemRouter = Router();
const itemController = new ItemController();

itemRouter.get("/item", authMiddleware, itemController.buscarItens);
itemRouter.get("/item/meu", authMiddleware, itemController.buscarMeusItens);
itemRouter.post("/item", authMiddleware, itemController.criarItem);
itemRouter.put("/item/:itemId", authMiddleware, itemController.editarItem);
itemRouter.delete("/item/:itemId", authMiddleware, itemController.deletarItem);

export default itemRouter;
