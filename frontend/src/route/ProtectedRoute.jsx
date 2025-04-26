import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const {isAuthenticated, isLoadingAuthentication} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingAuthentication && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoadingAuthentication, navigate]);

  if(isLoadingAuthentication){
    return <div>Carregando...</div>
  }

  return children;
}
