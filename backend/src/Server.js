import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";
import categoriaRouter from "./routes/CategoriaRoutes.js";
import imgRouter from "./routes/ImgRoutes.js";
import itemRouter from "./routes/ItemRoutes.js";
import usuarioRouter from "./routes/UsuarioRoutes.js";
import swaggerUI from "swagger-ui-express";
import * as fs from "fs"

const swaggerDocument = JSON.parse(fs.readFileSync("./src/swagger.json", "utf-8"))

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(authRouter);
app.use(usuarioRouter);
app.use(categoriaRouter);
app.use(itemRouter);
app.use(imgRouter);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${3000}`);
});
