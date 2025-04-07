import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagens/')
  },
  filename:(req, file, cb) => {
    const uniqueName = Date.now() + "-item" + req.params.id + path.extname(file.originalname);
    cb(null, uniqueName)
  }
})

export const imgUploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tipos = /jpeg|jgp|png/
    const valido = tipos.test(file.mimetype)
    cb(null, valido)
  }

});
