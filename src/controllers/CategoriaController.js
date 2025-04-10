import { MENSAGEM } from "../config/contants.js";
import { prismaClient } from "../database/PrismaClient.js";

export class CategoriaController {
  async buscarCategorias(request, response) {
    try {
      const categorias = await prismaClient.categoria.findMany({
        orderBy: {
          nome: "asc",
        },
      });

      response.status(200).send(categorias);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        erro: MENSAGEM.ERRO_INTERNO,
      });
    }
  }
}
