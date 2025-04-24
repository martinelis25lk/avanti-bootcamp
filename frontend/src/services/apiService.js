import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const login = async (dados) => {
  try {
    const response = await api.post("/auth/login", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar logar: ", error);
    throw error;
  }
};

// Função para pegar os itens do usuário
export const getItensDoUsuario = async () => {
  // Aqui, podemos pegar o token diretamente do localStorage
  const token = localStorage.getItem("token");

  // Verifica se o token existe antes de tentar fazer a requisição
  if (!token) {
    throw new Error("Token não encontrado. O usuário precisa estar autenticado.");
  }

  try {
    // Fazendo a requisição para obter os itens do usuário
    const response = await api.get("/item/meu", {
      headers: {
        Authorization: `Bearer ${token}`,  // Passando o token diretamente no header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os itens do usuario:", error);
    throw error;
  }
};
