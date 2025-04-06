import { prismaClient } from "../database/PrismaClient.js";

export class CategoriaController {
  async buscarCategorias(request, response) {
    try {
      const categorias = await prismaClient.categoria.findMany({
        orderBy: {
          nome: "asc",
        },
      });

      response.status(200).json(categorias);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }
}
