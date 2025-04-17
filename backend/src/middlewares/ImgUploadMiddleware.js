import multer from "multer";
import path from "path";
import * as fs from "fs";

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    const caminhoDiretorio = path.join(process.cwd(), "imagens");

    if(!fs.existsSync(caminhoDiretorio))
      fs.mkdirSync(caminhoDiretorio, {recursive:true});

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
