import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DEFAULT, MENSAGEM } from "../config/contants.js";
import { AutenticarUsuarioDto } from "../dtos/AutenticarUsuarioDto.js";
import { validarDto } from "../validators/validarDto.js";

const privateKey = process.env.PRIVATE_KEY;
const expiresIn = process.env.EXPIRES_IN || DEFAULT.EXPIRES_IN;

export class AuthController {
  async autenticarUsuario(request, response) {
    const autenticarUsuarioDto = new AutenticarUsuarioDto(request.body);

    const eValido = await validarDto(autenticarUsuarioDto, response);
    if (!eValido) {
      return;
    }

    if (!privateKey) {
      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }

    try {
      const usuario = await prismaClient.usuario.findUnique({
        where: { email: autenticarUsuarioDto.email },
      });

      if (!usuario) {
        return response.status(401).send({
          erro: MENSAGEM.EMAIL_OU_SENHA_INVALIDOS,
        });
      }

      const validarSenha = await bcrypt.compare(
        autenticarUsuarioDto.senha,
        usuario.senha
      );

      if (!validarSenha) {
        return response.status(401).send({
          erro: MENSAGEM.EMAIL_OU_SENHA_INVALIDOS,
        });
      }

      const token = jwt.sign({ usuarioId: usuario.id }, privateKey, {
        expiresIn: expiresIn,
      });

      return response.status(200).send({
        token: token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          telefone: usuario.telefone,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }
}
