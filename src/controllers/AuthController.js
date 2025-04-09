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
          telefone: criarUsuarioDto.telefone ? criarUsuarioDto.telefone : null,
          email: criarUsuarioDto.email,
          senha: senhaCriptografada,
        },
      });

      const token = jwt.sign({ usuarioId: usuario.id }, privateKey, {
        expiresIn: expiresIn,
      });

      response.status(200).send({
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

      if (error.code === PRISMA_CODE_ERROR.RESTRICAO_DE_UNICIDADE) {
        return response.status(400).send({
          erro: MENSAGEM.EMAIL_EXISTENTE,
        });
      }

      return response.status(500).send({ erro: MENSAGEM.ERRO_INTERNO });
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

      return response.send(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }
}
