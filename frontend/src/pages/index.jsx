import React, { useState } from 'react';
import './style.css'; // Importe o arquivo CSS

function GerenciarConta() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para lidar com a exclusão da conta
  const excluirConta = () => {
    const confirmar = window.confirm('Tem certeza que deseja excluir sua conta?');
    if (confirmar) {
      alert('Conta excluída!');
      // Aqui você chamaria sua API para excluir a conta
      // e talvez redirecionar o usuário
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Informações salvas com sucesso!');
    // Aqui você chamaria sua API para salvar as informações
    console.log({ nome, telefone, senha, confirmarSenha });
    // Você também pode adicionar lógica de validação aqui
  };

  return (
    <div>
      {/* Cabeçalho principal */}
      <div className="header">
        <div className="breadcrumb">Portal \ Rastreia</div>
        <div className="menu">
          <a href="#">Meus Itens</a>
          <a href="#">Meu Perfil</a>
          <a href="#">Cadastrar item</a>
          <a href="#">Sair</a>
        </div>
      </div>

      <div className="container">
        <div className="form-box">
          <h2>Gerencie sua conta</h2>
          <form id="userForm" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="********"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <div className="button-group">
              <button type="submit" className="btn save">
                Salvar
              </button>
              <button type="button" className="btn delete" onClick={excluirConta}>
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