import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const login = async (dados) => {
  try {
    const response = await api.post("/auth/login", dados);
    return response.data

  } catch (error) {
    console.error("Erro ao tentar logar: ", error);
    throw error;
  }
}

export const cadastrarItem = async (token, itemData) => {
  let response

  try {
    response = await api.post("/item", itemData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;

  } catch(error) {
    console.error(error);
    throw error
  }

}

export const cadastrarUsuario = async (usuarioData) => {
  try {
    const response = await api.post("/usuario", usuarioData);
    return response.data;

  } catch(error) {
    console.error(error);
    throw error;
  }
}

export const atualizarItem = async (token, id, itemData) => {
  let response

  try {
    response = await api.put(`/item/${id}`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;

  } catch(error) {
    console.error(error);
    throw error
  }

}

export const listarItemPorId = async (token, id) => {
  try {
    const response = await api.get(`/item/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data[0]
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const enviarImagem = async (token, id, imagem) => {
  const formData = new FormData();
  formData.append("imagem", imagem);
  try {
    await api.post(`/item/img/${id}`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getEstados = async () => {
  let estados = []
  try{
    const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    estados = response.data;
  }catch(error){
    console.error(error);
    throw error
  }

  return estados
}

export const getMunicipios = async (UF) => {
  let municipios = []

  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`)
    municipios = response.data
  } catch (error) {
    console.error(error)
    throw error;
  }

  return municipios
}

