import { prismaClient } from "../database/PrismaClient.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as fs from "fs"

const privatekey = fs.readFileSync("keys/private.key")

export class AuthController {
  async registrarUsuario(request, response) {
    const {email, senha, nome, telefone, } = request.body

    if(!email || !senha || !nome)
    return response.status(400).send({
      erro: "Requisição com parâmetros faltando"
    })

    try{
      const senhaCriptografada = await bcrypt.hash(senha, 5)

      const usuario = await prismaClient.usuario.create({
        data:{
          email,
          senha:senhaCriptografada,
          nome,
          telefone,
          criado_em: new Date()
        }
      })

      const token = jwt.sign(
        {idUsuario: usuario.id, email:usuario.email},
        privatekey,
        {expiresIn:"5h"}
      )

      response.status(200).send({
        data:{
          token,
          id:usuario.id,
          email:usuario.email,
          nome:usuario.nome,
          telefone:usuario.telefone
        }
      })


    } catch(error) {
      if(error.code == 'P2002')
        return response.status(400).send({
        erro: "Já existe uma conta com o email informado"
      })

      console.error(error)
      return response.status(500)
    }
  }

  autenticarUsuario(request, response) {
    console.log(request.body)
    return response.status(200)
  }
}
