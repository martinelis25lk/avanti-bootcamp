import "./style.css"
import { Banner } from "../../components/Banner";
import { useForm } from "react-hook-form";
import { cadastrarUsuario } from "../../services/apiService";
import { useState } from "react";

export function CadastroUsuario() {
  const { register, handleSubmit, formState: { errors }, watch} = useForm();
  const [responseError, setResponseError] = useState("");
  const senha = watch("senha");

  const onSubmit = async (data) => {
    try {
      const user = await cadastrarUsuario(data)
    } catch (error) {
      console.log(error.status == 409)
      if(error.status == 409){
        console.log("Errrrouuuuu")
        setResponseError(error.response.data.erro)
      }
    }
  };


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
                  className={errors.nome ? "input-erro" : "input"}
                  {...register("nome", {required: "O nome é obrigatório"})}
                />
                {errors.nome && <p className="error">{errors.nome.message}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="telefone">Telefone*</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
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
                <input
                  type="password"
                  className={errors.senha ? "input-erro" : "input"}
                  id="senha"
                  name="senha"
                  {...register("senha", {required: "A senha é obrigatória"})}
                />
                {errors.senha && <p className="error">{errors.senha.message}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="confirmar-senha">Confirmar senha</label>
                <input
                  type="password"
                  id="confirmar-senha"
                  name="confirmar-senha"
                  className={errors.confirmarSenha ? "input-erro" : "input"}
                  {...register("confirmarSenha", {
                    required: "Confirme a senha",
                    validate: value => value === senha || "As senhas não coincidem"
                  })}
                />
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
