import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CriarUsuarioDto } from "../dtos/CriarUsuarioDto.js";
import { DEFAULT, MENSAGEM, PRISMA_CODE_ERROR } from "../config/contants.js";
import { validarDto } from "../validators/validarDto.js";
import { EditarUsuarioDto } from "../dtos/EditarUsuarioDto.js";

const privateKey = process.env.PRIVATE_KEY;
const expiresIn = process.env.EXPIRES_IN || DEFAULT.EXPIRES_IN;

export class UsuarioController {
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

      response.status(201).send({
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
        return response.status(409).send({
          erro: MENSAGEM.EMAIL_EXISTENTE,
        });
      }

      return response.status(500).send({ erro: MENSAGEM.ERRO_INTERNO });
    }
  }

  async deletarUsuario(request, response) {
    const usuarioId = request.usuarioId;

    if (!usuarioId) {
      return response.status(401).send({
        erro: MENSAGEM.USUARIO_ID_NAO_INFORMADO,
      });
    }

    try {
      const usuario = await prismaClient.usuario.findUnique({
        where: { id: usuarioId },
      });

      if (!usuario) {
        return response.status(401).send({
          erro: MENSAGEM.USUARIO_ID_NAO_ENCONTRADO(usuarioId),
        });
      }

      await prismaClient.usuario.delete({
        where: { id: parseInt(usuarioId) },
      });

      return response.status(204).send();
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }

  async atualizarUsuario(request, response) {
    const id = request.usuarioId;
    const editarUsuarioDto = new EditarUsuarioDto(request.body);

    const eValido = await validarDto(editarUsuarioDto, response);
    if (!eValido){
      return;
    }

    if(!id){
      return response.status(401).send({
        erro: MENSAGEM.USUARIO_ID_NAO_INFORMADO
      })
    }


    try {
      const usuario = await prismaClient.usuario.findFirst({
        where: {id}
      })

      if (!usuario) {
        return response.status(401).send({
          erro: MENSAGEM.USUARIO_ID_NAO_ENCONTRADO(id)
        })
      }

      const senhaCriptografada = await bcrypt.hash(
        editarUsuarioDto.senha,
        5
      )

      const usuarioAtualizado = await prismaClient.Usuario.update({
          where: {id},
          data: {
            nome: editarUsuarioDto.nome,
            telefone: editarUsuarioDto.telefone,
            senha: senhaCriptografada
          }
      })
      return response.status(200).json({
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        telefone: usuarioAtualizado.telefone,
        criado_em: usuario.criado_em,
        atualizadoem: usuario.atualizado_em
      })

    } catch (error) {
      console.error(error)
      return response.status(500).json({ erro: MENSAGEM.ERRO_INTERNO})
    }
  }
}
