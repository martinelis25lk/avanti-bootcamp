import jwt from "jsonwebtoken"

const publicKey = process.env.PUBLIC_KEY

export default async function authMiddleware(request, response, next) {

  if(!request.headers.authorization) {
    return response.status(401).send({
      error: "Token faltando"
    })
  }

  const split = request.headers.authorization.split(" ")

  if(!split){
    return response.status(401).send({
      error: "Token faltando"
    })
  }

  const regex = new RegExp("Bearer");

  if(!regex.test(split[0])){
    return response.status(401).send({
      error: "Token inválido"
    })
  }

  try {

    const payload = jwt.verify(split[1], publicKey, {algorithms:["RS256"]});
    request.body.idUsuario = payload.idUsuario
    request.body.email = payload.email
    next()

  } catch (error) {

    console.error(error)

    return response.status(401).send({
      erro: "Token inválido ou expirado"
    })
  }
}
