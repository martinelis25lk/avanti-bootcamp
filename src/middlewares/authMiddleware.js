import jwt from "jsonwebtoken";
import { MENSAGEM } from "../config/contants.js";

const privateKey = process.env.PRIVATE_KEY;

async function authMiddleware(request, response, next) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).send({
      erro: MENSAGEM.TOKEN_INVALIDO,
    });
  }

  if (!privateKey) {
    return response.status(500).send({
      erro: MENSAGEM.PRIVATE_KEY_AUSENTE,
    });
  }

  try {
    const payload = jwt.verify(token, privateKey);

    request.usuarioId = payload.usuarioId;

    next();
  } catch (error) {
    console.error(error);

    return response.status(401).send({
      erro: MENSAGEM.TOKEN_INVALIDO,
    });
  }
}

export { authMiddleware };
