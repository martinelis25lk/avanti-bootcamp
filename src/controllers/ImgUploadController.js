export class ImgController{
  upload(req, res) {
    if(!req.file){
      return res.status(400).json({error: 'Nenhum arquivo foi enviado'});
    }

    res.status(200).send({message: "Upload de imagem realizado com sucesso"});
  }
}
