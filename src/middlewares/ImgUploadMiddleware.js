import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "imagens/");
  },
  filename: (request, file, cb) => {
    const uniqueName =
      "item_img_" +
      Date.now() *
      parseInt(request.params.id) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const imgUploadMiddleware = multer({
  storage,
  fileFilter: (request, file, cb) => {
    const tipos = /jpeg|jgp|png/;
    const valido = tipos.test(file.mimetype);
    cb(null, valido);
  },
});
