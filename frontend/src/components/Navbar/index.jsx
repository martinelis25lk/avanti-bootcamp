import { useContext } from "react";
import "./style.css"
import { AuthContext } from "../../context/AuthContext";
import Logo from "/Logo.png"
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav>
      <img
        src={Logo}
        alt="Logotipo do site"
        onClick={() => {navigate("/")}}
      />
      <ul>
        <li>
          <a href="/meus-itens">Meus Itens</a>
        </li>
        <li>
          <a href="/editar-perfil">Meu Perfil</a>
        </li>
        <li>
          <a href="/cadastrar-item">Cadastrar Item</a>
        </li>
        <li onClick={handleLogout}>
          Sair
        </li>
      </ul>
    </nav>
  )
}
