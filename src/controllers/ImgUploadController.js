import { MENSAGEM } from "../config/contants.js";

export class ImgController {
  upload(request, response) {
    if (!request.file) {
      return response
        .status(400)
        .send({ erro: MENSAGEM.NENHUMA_IMAGEM_ENVIADA });
    }

    response.status(200).send({ mensagem: MENSAGEM.UPLOAD_IMAGEM_SUCESSO });
  }
}
