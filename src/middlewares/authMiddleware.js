import jwt from "jsonwebtoken";
import { MENSAGEM } from "../config/contants.js";

const privateKey = process.env.PRIVATE_KEY;

async function authMiddleware(request, response, next) {
  const [bearer, token] = request.headers.authorization.split(" ");

  if (!token || bearer != "Bearer") {
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
