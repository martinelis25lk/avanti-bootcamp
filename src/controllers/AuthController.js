import { prismaClient } from "../database/PrismaClient.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const privateKey = process.env.PRIVATE_KEY

export class AuthController {
  async registrarUsuario(request, response) {
    const {email, senha, nome, telefone, } = request.body

    if(!email || !senha || !nome){
      return response.status(400).send({
        erro: "Requisição com parâmetros faltando"
      })
    }


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
        privateKey,
        {expiresIn:"5h", algorithm:"HS256"}
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

  async autenticarUsuario(request, response) {
    const {email, senha} = request.body

    if(!email || !senha) {
      return response.status(400).send({
        erro: "Requisição com parâmetros faltando"
      })
    }

    try {
      const usuario = await prismaClient.usuario.findUnique({where: {email:email}})

      if(!usuario){
        return response.status(400).send({
          erro:"Email ou senha inválidos"
        })
      }

      const compare = await bcrypt.compare(senha, usuario.senha)

      if(!compare){
        return response.status(400).send({
          erro:"Email ou senha inválidos"
        })
      }

      const token = jwt.sign(
        {idUsuario: usuario.id, email:usuario.email},
        privateKey,
        {expiresIn:"5h", algorithm:"RS256"}
      )

      return response.status(200).send({
        data: {
          token,
          email: usuario.email,
          nome: usuario.nome,
          telefone: usuario.telefone
        }
      })

    } catch (error) {

      console.error(error)

      return response.send(500).send({
        error: "Ocorreu um erro interno"
      })
    }
  }
}
