import "./style.css"
import { Banner } from "../../components/Banner";
import { useForm } from "react-hook-form";
import { cadastrarUsuario } from "../../services/apiService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export function CadastroUsuario() {
  const { register, handleSubmit, formState: { errors }, watch} = useForm();
  const [cmfSenhaVisivel, setCmfSenhaVisivel] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [responseError, setResponseError] = useState("");
  const {sign, isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  const senha = watch("senha");

  if(isAuthenticated)
      navigate("/")

  const onSubmit = async (data) => {
    try {
      const user = await cadastrarUsuario(data)
      sign(user)
      navigate("/")

    } catch (error) {
      if(error.status == 409){
        setResponseError(error.response.data.erro)
      }
    }
  };

  const handleCfmSenhaVisibilidade = () => {
    setCmfSenhaVisivel(prev => !prev)
  }

  const handleSenhaVisibilidade = () => {
    setSenhaVisivel(prev => !prev)
  }
  return (
    <div className="cadastro-container">
      <Banner/>
      <div className="cadastro-wrapper">
        <img src="./Logo.png"/>
        <div className="cadastro-box">
           <h1>Realizar cadastro</h1>
            <p className="cadastro-error">{responseError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <label htmlFor="nome-completo">Nome completo*</label>
                <input
                  type="text"
                  id="nome-completo"
                  name="nome-completo"
                  placeholder="Digite seu nome"
                  className={errors.nome ? "input-erro" : "input"}
                  {...register("nome", {
                    required: "O nome é obrigatório",
                    minLength: {
                      value: 8,
                      message: "O nome precisa ter pelo menos 8 caracteres"
                    }})}
                />
                {errors.nome && <p className="error">{errors.nome.message}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="telefone">Telefone*</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  className={errors.telefone ? "input-erro" : "input"}
                  {...register("telefone", {
                    required: "O telefone é obrigatório",
                    pattern: {
                      value: /^\(\d{2}\) \d{5}-\d{4}$/,
                      message: "Formato inválido. Use (00) 00000-0000"
                    }
                  })}
                />
                {errors.telefone && <p className="error">{errors.telefone.message}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="email">E-mail*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  className={errors.email? "input-erro" : "input"}
                  {...register("email", {
                    required: "O campo email é obrigatório",
                    pattern: {
                      value: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
                      message: "Email inválido"
                    }
                  })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="senha">Senha</label>
                <div className={errors.senha ? "senha-container input-erro" : "senha-container input"}>
                  <input
                    type={senhaVisivel ? "text" : "password"}
                    id="senha"
                    name="senha"
                    placeholder="informe a sua senha"
                    {...register("senha", {required: "A senha é obrigatória"})}
                  />

                  {
                    senhaVisivel
                    ?
                    <FaRegEyeSlash size={24} onClick={handleSenhaVisibilidade}/>
                    :
                    <FaRegEye size={24} onClick={handleSenhaVisibilidade}/>
                  }
                </div>
                {errors.senha && <p className="error">{errors.senha.message}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="confirmar-senha">Confirmar senha</label>
                <div className={errors.confirmarSenha ? "senha-container input-erro" : "senha-container input"}>
                  <input
                    type={cmfSenhaVisivel ? "text" : "password"}
                    id="confirmar-senha"
                    name="confirmar-senha"
                    placeholder="confirme a senha passada"
                    {...register("confirmarSenha", {
                      required: "Confirme a senha",
                      validate: value => value === senha || "As senhas não coincidem"
                    })}
                  />
                  {
                    cmfSenhaVisivel
                    ?
                    <FaRegEyeSlash size={24} onClick={handleCfmSenhaVisibilidade}/>
                    :
                    <FaRegEye size={24} onClick={handleCfmSenhaVisibilidade}/>
                  }
                </div>

                {errors.confirmarSenha && <p className="error">{errors.confirmarSenha.message}</p>}
              </div>

              <button type="submit" className="btn-cadastrar">
                Cadastrar
              </button>
              <p className="login-link">
                Já possui uma conta? <a href="/login">Faça login</a>
              </p>
           </form>
        </div>
      </div>
    </div>
  )
}
