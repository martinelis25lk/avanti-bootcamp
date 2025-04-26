import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Navbar } from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { GiConfirmed } from "react-icons/gi";
import { deletarUsuario, editarUsuario } from "../../services/apiService";
import { Modal } from "../../components/Modal";

function GerenciarConta() {
  const { register, handleSubmit, formState: { errors }, watch, setValue} = useForm();
  const {logout, usuario, setUsuario, token} = useContext(AuthContext);
  const [cmfSenhaVisivel, setCmfSenhaVisivel] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserEdited, setIsUserEdited] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate()
  const senha = watch("senha");

  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const usuarioAtualizado = await editarUsuario(token, data);
      setUsuario({
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        id: usuarioAtualizado.id,
        telefone: usuarioAtualizado.id
      })

      setIsUserEdited(true)
      await sleep(2000)
      setIsLoading(false)
    } catch (error) {
      if(error.response.status == 401){
        logout()
        navigate("/login")
      }
    }

  }

  const deleteHandle = async () => {
    console.log("Apagou")
    await deletarUsuario(token)
    logout()
    navigate("/login")
  }

  const handleCfmSenhaVisibilidade = () => {
    setCmfSenhaVisivel(prev => !prev)
  }

  const handleSenhaVisibilidade = () => {
    setSenhaVisivel(prev => !prev)
  }

  useEffect(()=>{
    setValue("nome", usuario.nome);
    setValue("telefone", usuario.telefone);
  },[])

  return (
    <div className="page-container">
      <Navbar/>
      <Modal
        children={
          <div className="mensagem">
                {
                  isUserEdited ?
                  <>
                    <GiConfirmed
                      size={24}
                    />
                    <p>Usuário atualizado</p>
                  </>
                  :
                  <>
                    <AiOutlineLoading3Quarters
                      className="loading-icon"
                      size={24}
                    />
                    <p>Atualizando usuário</p>
                  </>
                }
              </div>
        }
        isVisible={isLoading}
      />
      <Modal
        children={
          <div className="mensagem-exclusao">
            <p>Tem certeza de que deseja excluir sua conta?</p>
            <div className="botoes-modal">
              <button id="sim" onClick={() => deleteHandle()}>Sim</button>
              <button id="nao" onClick={() => setIsDeleting(false)}>Não</button>
            </div>
          </div>
        }
        isVisible={isDeleting}
      />
      <div className="container">
        <div className="form-box">
          <h2>Gerencie sua conta</h2>
          <form id="userForm" onSubmit={handleSubmit(onSubmit)}>

            <div className="input-group">
              <label htmlFor="nome-usuario">Nome</label>
              <input
                type="text"
                id="nome-usuario"
                name="nome"
                placeholder="Seu nome"
                className={errors.nome ? "input-erro" : "input"}
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 8,
                    message: "O nome precisa ter pelo menos 8 caracteres"
                  }
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="telefone">Telefone</label>
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
                    placeholder="confirme a senha informada"
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

            <div className="button-group">
              <button type="submit" className="btn save">
                Salvar
              </button>
              <button type="button" className="btn delete" onClick={() => {setIsDeleting(prev => !prev)}}>
                Excluir Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GerenciarConta;
