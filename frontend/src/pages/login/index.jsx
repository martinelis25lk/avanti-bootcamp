import { useContext, useState } from "react"
import "./style.css"
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

export function Login () {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const {sign, isAuthenticated} = useContext(AuthContext);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({email, senha});
      sign(response);
      navigate("/cadastro-item")

    } catch (error) {
      setErro("Email ou senha inválidos");
    }
  }

  if(isAuthenticated){
    navigate("/cadastro-item")
  }

  return (
    <div className="login-container">
      <div className="banner-wrapper">
        <img src="./Logo.png" alt="Logo do website"/>
        <p>
          Bem-vindo(a) ao nosso espaço dedicado a conectar pessoas que encontraram algo com aqueles que perderam!
          Somos uma plataforma voluntária criada para facilitar a busca por itens perdidos e a devolução de objetos
          encontrados.
        </p>
      </div>
      <div className="form-wrapper">
        <img src="./Logo.png" alt="Logo do website"/>
        <div className="form-container">
          <form>
            <h1>Realizar login</h1>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <p className="erro">{erro}</p>
            <button onClick={handleLogin}>Entrar</button>
            <p>Não tem conta ?<a> Cadastre-se </a></p>
          </form>
        </div>
      </div>
    </div>
  )

}
