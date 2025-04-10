import { Router } from "express";
import { ImgController } from "../controllers/ImgController.js";
import { imgUploadMiddleware } from "../middlewares/ImgUploadMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"


const imgRouter = Router();
const imgController = new ImgController();

imgRouter.post("/item/img/:id", authMiddleware, imgUploadMiddleware.single("imagem"), imgController.uploadImgItem)
imgRouter.get("/item/img/:nome", authMiddleware, imgController.downloadImgItem)
export default imgRouter;
