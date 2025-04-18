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
