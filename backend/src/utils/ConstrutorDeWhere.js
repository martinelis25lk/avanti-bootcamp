export function construirWhere({categoria, cidade, status, data_inicio, data_fim, nome, id, estado}) {

    const filtro = {}

    if(categoria){
      filtro.categoria = {
        id:parseInt(categoria)
      }
    }

    if(cidade){
      filtro.cidade = cidade;
    }

    if(data_inicio || data_fim){
      filtro.data_ocorrido = {}

      if(data_inicio)
        filtro.data_ocorrido.gte = new Date(data_inicio)
      if(data_fim)
        filtro.data_ocorrido.lte = new Date(data_fim)
    }

    if(status){
      filtro.status = status;
    }

    if(nome){
      filtro.nome = {
        contains: nome,
        mode: "insensitive"
      }
    }

    if(id){
      filtro.id = parseInt(id);
    }

    if(estado){
      filtro.estado = estado;
    }

    return filtro;
  }
