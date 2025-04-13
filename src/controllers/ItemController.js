import { MENSAGEM } from "../config/contants.js";
import { prismaClient } from "../database/PrismaClient.js";
import { CriarItemDto } from "../dtos/CriarItemDto.js";
import { EditarItemDto } from "../dtos/EditarItemDto.js";
import { validarDto } from "../validators/validarDto.js";
import { construirWhere } from "../utils/ConstrutorDeWhere.js";

export class ItemController {

  async buscarItens(request, response) {
    try {
      const filtro = !request.query ? {} : construirWhere(request.query)

      const itens = await prismaClient.item.findMany({
        orderBy: [{ categoria: { prioridade: "desc" } }, { criado_em: "desc" }],
        include: { categoria: true },
        where: filtro
      });

      return response.status(200).send(itens);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }

  async buscarMeusItens(request, response) {
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
        return response.status(400).send({
          erro: MENSAGEM.USUARIO_ID_NAO_ENCONTRADO(usuarioId),
        });
      }

      const meusItens = await prismaClient.item.findMany({
        where: { usuario_id: usuarioId },
        orderBy: [{ categoria: { prioridade: "desc" } }, { criado_em: "desc" }],
        include: { categoria: true },
      });

      return response.status(200).send(meusItens);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
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
      const usuario = await prismaClient.usuario.findUnique({
        where: { id: usuarioId },
      });

      if (!usuario) {
        return response.status(401).send({
          erro: MENSAGEM.USUARIO_ID_NAO_ENCONTRADO(usuarioId),
        });
      }

      const categoria = await prismaClient.categoria.findUnique({
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

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }

  async editarItem(request, response) {
    const editarItemDto = new EditarItemDto(request.body);
    const usuarioId = request.usuarioId;
    const { itemId } = request.params;

    const eValido = await validarDto(editarItemDto, response);
    if (!eValido) {
      return;
    }

    if (!usuarioId) {
      return response.status(401).send({
        erro: MENSAGEM.USUARIO_ID_NAO_INFORMADO,
      });
    }

    if (!itemId) {
      return response.status(400).send({
        erro: MENSAGEM.ITEM_ID_NAO_INFORMADO,
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

      const item = await prismaClient.item.findUnique({
        where: { id: parseInt(itemId), usuario_id: usuarioId },
      });

      if (!item) {
        return response.status(400).send({
          erro: MENSAGEM.ITEM_ID_NAO_ENCONTRADO(itemId),
        });
      }

      const categoria = await prismaClient.categoria.findUnique({
        where: { id: editarItemDto.categoria_id },
      });

      if (!categoria) {
        return response.status(400).send({
          erro: MENSAGEM.CATEGORIA_ID_NAO_ENCONTRADO(
            editarItemDto.categoria_id
          ),
        });
      }

      const itemAtualizado = await prismaClient.item.update({
        where: { id: parseInt(itemId) },
        data: {
          categoria_id: editarItemDto.categoria_id,
          nome: editarItemDto.nome,
          foto_url: editarItemDto.foto_url ? editarItemDto.foto_url : null,
          data_ocorrido: new Date(editarItemDto.data_ocorrido),
          data_entregue: editarItemDto.data_entregue
            ? new Date(editarItemDto.data_entregue)
            : null,
          email: editarItemDto.email ? editarItemDto.email : null,
          telefone: editarItemDto.telefone ? editarItemDto.telefone : null,
          estado: editarItemDto.estado,
          cidade: editarItemDto.cidade,
          bairro: editarItemDto.bairro,
          logradouro: editarItemDto.logradouro,
          numero: editarItemDto.numero ? editarItemDto.numero : null,
        },
      });

      return response.status(200).send(itemAtualizado);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }

  async deletarItem(request, response) {
    const usuarioId = request.usuarioId;
    const { itemId } = request.params;

    if (!usuarioId) {
      return response.status(401).send({
        erro: MENSAGEM.USUARIO_ID_NAO_INFORMADO,
      });
    }

    if (!itemId) {
      return response.status(400).send({
        erro: MENSAGEM.ITEM_ID_NAO_INFORMADO,
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

      const item = await prismaClient.item.findUnique({
        where: { id: parseInt(itemId), usuario_id: usuarioId },
      });

      if (!item) {
        return response.status(400).send({
          erro: MENSAGEM.ITEM_ID_NAO_ENCONTRADO(itemId),
        });
      }

      await prismaClient.item.delete({
        where: { id: parseInt(itemId) },
      });

      return response.status(204).send();
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }


}
