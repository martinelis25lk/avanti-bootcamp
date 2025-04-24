import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [usuarioId, setUsuarioId] = useState(localStorage.getItem("id"));
    const [usuarioTelefone, setUsuarioTelefone] = useState(localStorage.getItem("telefone"));
    const [usuarioEmail, setUsuarioEmail] = useState(localStorage.getItem("email"))
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const sign = (data) => {
      setUsuarioId(data.usuario.id);
      setToken(data.token);
      localStorage.setItem("id", data.usuario.id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("telefone", data.usuario.telefone);
      localStorage.setItem("email", data.usuario.email);

      setIsAuthenticated(true)
    }

    const logout = () => {
      setUsuarioId(null);
      setToken(null);

      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("telefone");

      setIsAuthenticated(false)
    }

    useEffect(() => {
      const localToken = localStorage.getItem("token");
      const localId = localStorage.getItem("id");
      const localEmail = localStorage.getItem("email");
      const localTelefone = localStorage.getItem("telefone");

      if(localToken)
        setToken(localToken)
      if(localId)
        setUsuarioId(localId)
      if(localEmail)
        setUsuarioEmail(localEmail)
      if(localTelefone)
        setUsuarioTelefone(localTelefone)

      setIsAuthenticated(localToken && localId && localEmail && localTelefone)
    },[])

   return (
    <AuthContext.Provider value={({usuarioId, token, sign, logout, isAuthenticated, usuarioEmail, usuarioTelefone})}>
      {children}
    </AuthContext.Provider>
   )
}

export default AuthProvider;
