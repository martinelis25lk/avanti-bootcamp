import jwt from "jsonwebtoken";
import { MENSAGEM } from "../config/contants.js";

const privateKey = process.env.PRIVATE_KEY;

 async function authMiddleware(request, response, next) {


  if (!request.headers.authorization) {
    return response.status(401).send({
      error: MENSAGEM.TOKEN_INVALIDO,
    });
  }

  if (!privateKey) {
    return response.status(500).send({
      erro: MENSAGEM.PRIVATE_KEY_AUSENTE,
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
    const payload = jwt.verify(split[1], privateKey);

    if(!request.body){
      request.body = {}
    }

    request.body.usuario_id = payload.idUsuario;
    request.body.email = payload.email;
    next();
  } catch (error) {
    console.error(error)

    return response.status(401).send({
      error: MENSAGEM.TOKEN_INVALIDO,
    });
  }
}

export { authMiddleware }
