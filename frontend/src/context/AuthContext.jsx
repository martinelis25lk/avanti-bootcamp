import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [usuario, setUsuario] = useState({
    id: localStorage.getItem("id"),
    telefone: localStorage.getItem("telefone"),
    email: localStorage.getItem("email"),
    nome: localStorage.getItem("nome")

  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const sign = (data) => {
    setUsuario(data.usuario);
    setToken(data.token);
    localStorage.setItem("id", data.usuario.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("telefone", data.usuario.telefone);
    localStorage.setItem("email", data.usuario.email);
    localStorage.setItem("nome", data.usuario.nome);

    setIsAuthenticated(true)
  }

  const logout = () => {
    setUsuario(null)
    setToken(null);

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("telefone");
    localStorage.removeItem("nome")

    setIsAuthenticated(false)
  }

  useEffect(() => {
    const localUsuario = {
      id: localStorage.getItem("id"),
      telefone: localStorage.getItem("telefone"),
      email: localStorage.getItem("email"),
      nome: localStorage.getItem("nome")
    }

    const localToken = localStorage.getItem("token");


    if(localToken)
      setToken(localToken)
    if(localUsuario.nome && localUsuario.email && localUsuario.id && localUsuario.telefone)
      setUsuario(localUsuario)

    setIsAuthenticated(localToken && localUsuario.nome && localUsuario.email && localUsuario.id && localUsuario.telefone)
  },[])

  return (
  <AuthContext.Provider value={({usuario, setUsuario, token, sign, logout, isAuthenticated})}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider;
