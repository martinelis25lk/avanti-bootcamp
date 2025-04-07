import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";
import categoriaRouter from "./routes/CategoriaRoutes.js";
import imgRouter from "./routes/ImgRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(categoriaRouter);
app.use(imgRouter)

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${3000}`);
});
