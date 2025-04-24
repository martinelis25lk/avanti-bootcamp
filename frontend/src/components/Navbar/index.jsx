import { useContext } from "react";
import "./style.css"
import { AuthContext } from "../../context/AuthContext";
import Logo from "/Logo.png"

export function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav>
      <img src={Logo} alt="Logotipo do site"/>
      <ul>
        <li>
          Meus Itens
        </li>
        <li>
          Meu Perfil
        </li>
        <li>
          Cadastrar Item
        </li>
        <li onClick={logout}>
          Sair
        </li>
      </ul>
    </nav>
  )
}
