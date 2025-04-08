import { prismaClient } from "../database/PrismaClient.js";

export class ItemController {

  async buscarItens(req, res) {
    try {
      const itens = await prismaClient.item.findMany({
        orderBy: { created_em: "desc" },
        include: { usuario: true},
      });
      return res.status(200).json(itens);
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  async criarItem(req, res) {
    const {
      usuario_id,
      nome,
      foto,
      data_ocorrido,
      data_entregue,
      email,
      telefone,
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
      status,
      prioridade,
    } = req.body;

    try {
      const novoItem = await prismaClient.item.create({
        data: {
          usuario_id,
          nome,
          foto,
          data_ocorrido: new Date(data_ocorrido),
          data_entregue: data_entregue ? new Date(data_entregue) : null,
          email,
          telefone,
          estado,
          cidade,
          bairro,
          logradouro,
          numero,
          status,
          prioridade,
        },
      });

      return res.status(201).json(novoItem);
    } catch (error) {
      console.error(error)

      return res.status(500).json({ error: error.message });
    }
  }

  async atualizarItem(req, res) {
    const { id } = req.params;
    const {
      nome,
      foto,
      data_ocorrido,
      data_entregue,
      email,
      telefone,
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
      status,
      prioridade,
    } = req.body;

    try {
      const itemAtualizado = await prismaClient.item.update({
        where: { id: Number(id) },
        data: {
          nome,
          foto,
          data_ocorrido: new Date(data_ocorrido),
          data_entregue: data_entregue ? new Date(data_entregue) : null,
          email,
          telefone,
          estado,
          cidade,
          bairro,
          logradouro,
          numero,
          status,
          prioridade,
        },
      });

      return res.status(200).json(itemAtualizado);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  }

  async deletarItem(req, res) {
    const { id } = req.params;

    try {
      await prismaClient.item.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
}
