import { DEFAULT, MENSAGEM } from "../config/contants.js";
import { prismaClient } from "../database/PrismaClient.js";
import path from "path";
import * as fs from "fs";

export class ImgController {
  async uploadImgItem(request, response) {
    const appURL = process.env.APP_URL || DEFAULT.APP_URL;
    const itemId = parseInt(request.params.id);

    if (!request.file) {
      return response
        .status(400)
        .send({ erro: MENSAGEM.NENHUMA_IMAGEM_ENVIADA });
    }
    try {
      const nomeImg = request.file.filename;
      const item = await prismaClient.item.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        const caminho = "imagens/" + nomeImg;
        fs.unlinkSync(caminho);

        return response.status(400).send({
          erro: MENSAGEM.ITEM_ID_NAO_ENCONTRADO(itemId),
        });
      }

      if (item.foto_url) {
        fs.unlinkSync("imagens/" + item.foto_url);
      }

      await prismaClient.item.update({
        data: { foto_url: nomeImg },
        where: { id: itemId },
      });

      const link = appURL + "/item/img/" + nomeImg;

      response
        .status(200)
        .send({ Mensagem: MENSAGEM.UPLOAD_IMAGEM_SUCESSO, Link: link });
    } catch (error) {
      console.error(error);
      response.status(500).send({ Mensagem: MENSAGEM.ERRO_INTERNO });
    }
  }

  async downloadImgItem(request, response) {
    try {
      const nomeArquivo = request.params.nome;
      const caminho = path.join(process.cwd(), "imagens", nomeArquivo);

      if (!fs.existsSync(caminho))
        return response
          .status(400)
          .send({ erro: MENSAGEM.IMAGEM_NAO_ENCONTRADA });

      response.sendFile(caminho);
    } catch (error) {
      console.error(error);
      response.status(500).send({ erro: MENSAGEM.ERRO_INTERNO });
    }
  }
}
