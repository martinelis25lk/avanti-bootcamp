import jwt from "jsonwebtoken";
import { MENSAGEM } from "../config/contants";

const publicKey = process.env.PUBLIC_KEY;

export default async function authMiddleware(request, response, next) {
  if (!request.headers.authorization) {
    return response.status(401).send({
      error: MENSAGEM.TOKEN_INVALIDO,
    });
  }

  if (!publicKey) {
    return response.status(500).send({
      erro: MENSAGEM.PUBLIC_KEY_AUSENTE,
    });
  }

  const split = request.headers.authorization.split(" ");

  if (!split) {
    return response.status(401).send({
      error: MENSAGEM.TOKEN_INVALIDO,
    });
  }

  const regex = new RegExp("Bearer");

  if (!regex.test(split[0])) {
    return response.status(401).send({
      error: MENSAGEM.TOKEN_INVALIDO,
    });
  }

  try {
    const payload = jwt.verify(split[1], publicKey);
    request.body.idUsuario = payload.idUsuario;
    request.body.email = payload.email;
    next();
  } catch (error) {
    return response.status(401).send({
      error: MENSAGEM.TOKEN_INVALIDO,
    });
  }
}
