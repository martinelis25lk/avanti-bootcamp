import { createContext, useState } from "react"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
   const [usuarioId, setUsuarioId] = useState(localStorage.getItem("id"));
   const [token, setToken] = useState(localStorage.getItem("token"));
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const sign = (data) => {
      setUsuarioId(data.usuario.id);
      setToken(data.token);

      localStorage.setItem("id", data.usuario.id);
      localStorage.setItem("token", data.token);

      setIsAuthenticated(true)
   }

   const logout = () => {
      setUsuarioId(null);
      setToken(null);

      localStorage.removeItem("id");
      localStorage.removeItem("token");

      setIsAuthenticated(false)
   }

   return (
    <AuthContext.Provider value={({usuarioId, token, sign, logout})}>
      {children}
    </AuthContext.Provider>
   )
}

export default AuthProvider;
