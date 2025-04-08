import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CriarUsuarioDto } from "../dtos/CriarUsuarioDto.js";
import { DEFAULT, MENSAGEM, PRISMA_CODE_ERROR } from "../config/contants.js";
import { AutenticarUsuarioDto } from "../dtos/AutenticarUsuarioDto.js";
import { validarDto } from "../validators/validarDto.js";

const privateKey = process.env.PRIVATE_KEY;
const expiresIn = process.env.EXPIRES_IN || DEFAULT.EXPIRES_IN;

export class AuthController {
  async criarUsuario(request, response) {
    const criarUsuarioDto = new CriarUsuarioDto(request.body);

    const eValido = await validarDto(criarUsuarioDto, response);
    if (!eValido) {
      return;
    }

    if (!privateKey) {
      return response.status(500).send({
        erro: MENSAGEM.PRIVATE_KEY_AUSENTE,
      });
    }

    try {
      const senhaCriptografada = await bcrypt.hash(criarUsuarioDto.senha, 5);

      const usuario = await prismaClient.usuario.create({
        data: {
          nome: criarUsuarioDto.nome,
          telefone: criarUsuarioDto.telefone,
          email: criarUsuarioDto.email,
          senha: senhaCriptografada,
        },
      });

      const token = jwt.sign(
        { idUsuario: usuario.id, email: usuario.email },
        privateKey,
        { expiresIn: expiresIn }
      );

      response.status(200).send({
        data: {
          token,
          id: usuario.id,
          email: usuario.email,
          nome: usuario.nome,
          telefone: usuario.telefone,
        },
      });
    } catch (error) {
      if (error.code === PRISMA_CODE_ERROR.RESTRICAO_DE_UNICIDADE) {
        return response.status(400).send({
          erro: MENSAGEM.EMAIL_EXISTENTE,
        });
      }
      console.error(error);
      return response.status(500).json({ error: error });
    }
  }

  async deletarUsuario(request, response){
    const {idUsuario} = request.body;

    try{
      const usuario = await prismaClient.usuario.findUnique({
        where:{id: idUsuario},
      });

      if(!usuario){
        return response.status(404).json({erro: "Usuario não encontrado."});
      }

      await prismaClient.usuario.delete({
        where:{id: idUsuario},
      });

      return response.status(200).json({MENSAGEM: "Usuario deletado com sucesso."});
  
    } catch (error){
      console.log(error);
      return response.status(500).json({erro: "Erro ao deletar usuário.", detalhes: error});
    }
  }



  

  async autenticarUsuario(request, response) {
    const autenticarUsuarioDto = new AutenticarUsuarioDto(request.body);

    const eValido = await validarDto(autenticarUsuarioDto, response);
    if (!eValido) {
      return;
    }

    if (!privateKey) {
      return response.status(500).send({
        erro: MENSAGEM.PRIVATE_KEY_AUSENTE,
      });
    }

    try {
      const usuario = await prismaClient.usuario.findFirst({
        where: { email: autenticarUsuarioDto.email },
      });

      if (!usuario) {
        return response.status(400).send({
          erro: MENSAGEM.EMAIL_OU_SENHA_INVALIDOS,
        });
      }

      const validarSenha = await bcrypt.compare(
        autenticarUsuarioDto.senha,
        usuario.senha
      );

      if (!validarSenha) {
        return response.status(400).send({
          erro: MENSAGEM.EMAIL_OU_SENHA_INVALIDOS,
        });
      }

      const token = jwt.sign(
        { idUsuario: usuario.id, email: usuario.email },
        privateKey,
        { expiresIn: expiresIn }
      );

      return response.status(200).send({
        data: {
          token,
          id: usuario.id,
          email: usuario.email,
          nome: usuario.nome,
          telefone: usuario.telefone,
        },
      });
    } catch (error) {
      return response.send(500).send({
        error: error,
      });
    }
  }
}
