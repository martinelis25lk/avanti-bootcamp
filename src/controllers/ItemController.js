import { MENSAGEM } from "../config/contants.js";
import { prismaClient } from "../database/PrismaClient.js";
import { CriarItemDto } from "../dtos/CriarItemDto.js";
import { validarDto } from "../validators/validarDto.js";

export class ItemController {
  async buscarItens(request, response) {
    try {
      const itens = await prismaClient.item.findMany({
        orderBy: [{ categoria: { prioridade: "desc" } }, { criado_em: "desc" }],
        include: { categoria: true },
      });

      return response.status(200).send(itens);
    } catch (error) {
      console.error(error);

      return response.send(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }

  async criarItem(request, response) {
    const criarItemDto = new CriarItemDto(request.body);
    const usuarioId = request.usuarioId;

    const eValido = await validarDto(criarItemDto, response);
    if (!eValido) {
      return;
    }

    if (!usuarioId) {
      return response.status(401).send({
        erro: MENSAGEM.USUARIO_ID_NAO_INFORMADO,
      });
    }

    try {
      const usuario = await prismaClient.usuario.findFirst({
        where: { id: usuarioId },
      });

      if (!usuario) {
        return response.status(400).send({
          erro: MENSAGEM.USUARIO_ID_NAO_ENCONTRADO(usuarioId),
        });
      }

      const categoria = await prismaClient.categoria.findFirst({
        where: { id: criarItemDto.categoria_id },
      });

      if (!categoria) {
        return response.status(400).send({
          erro: MENSAGEM.CATEGORIA_ID_NAO_ENCONTRADO(criarItemDto.categoria_id),
        });
      }

      const item = await prismaClient.item.create({
        data: {
          usuario_id: usuarioId,
          categoria_id: criarItemDto.categoria_id,
          nome: criarItemDto.nome,
          foto_url: criarItemDto.foto_url ? criarItemDto.foto_url : null,
          data_ocorrido: new Date(criarItemDto.data_ocorrido),
          data_entregue: null,
          email: criarItemDto.email ? criarItemDto.email : null,
          telefone: criarItemDto.telefone ? criarItemDto.telefone : null,
          estado: criarItemDto.estado,
          cidade: criarItemDto.cidade,
          bairro: criarItemDto.bairro,
          logradouro: criarItemDto.logradouro,
          numero: criarItemDto.numero ? criarItemDto.numero : null,
          status: criarItemDto.status,
        },
      });

      return response.status(201).send(item);
    } catch (error) {
      console.error(error);

      return response.send(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }

  // async atualizarItem(request, response) {
  //   const { id } = request.params;
  //   const {
  //     nome,
  //     foto,
  //     data_ocorrido,
  //     data_entregue,
  //     email,
  //     telefone,
  //     estado,
  //     cidade,
  //     bairro,
  //     logradouro,
  //     numero,
  //     status,
  //     prioridade,
  //   } = request.body;

  //   try {
  //     const itemAtualizado = await prismaClient.item.update({
  //       where: { id: Number(id) },
  //       data: {
  //         nome,
  //         foto,
  //         data_ocorrido: new Date(data_ocorrido),
  //         data_entregue: data_entregue ? new Date(data_entregue) : null,
  //         email,
  //         telefone,
  //         estado,
  //         cidade,
  //         bairro,
  //         logradouro,
  //         numero,
  //         status,
  //         prioridade,
  //       },
  //     });

  //     return response.status(200).send(itemAtualizado);
  //   } catch (error) {
  //   }
  // }

  // async deletarItem(request, response) {
  //   const { id } = request.params;

  //   try {
  //     await prismaClient.item.delete({
  //       where: { id: Number(id) },
  //     });

  //     return response.status(204).send();
  //   } catch (error) {
  //   }
  // }
}
