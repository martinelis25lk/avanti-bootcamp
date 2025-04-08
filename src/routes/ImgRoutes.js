import { Router } from "express";
import { ImgController } from "../controllers/ImgUploadController.js";
import { imgUploadMiddleware } from "../middlewares/ImgUploadMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"


const imgRouter = Router();
const imgController = new ImgController();

imgRouter.post("/itens/img-upload/:id", authMiddleware, imgUploadMiddleware.single("imagem"), imgController.upload)

export default imgRouter;
