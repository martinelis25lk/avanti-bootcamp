import { Router } from "express";
import { ImgController } from "../controllers/ImgUploadController.js";
import { imgUploadMiddleware } from "../middlewares/ImgUploadMiddleware.js";


const imgRouter = Router();
const imgController = new ImgController();

imgRouter.post("/itens/img-upload/:id", imgUploadMiddleware.single("imagem"), imgController.upload)

export default imgRouter;
