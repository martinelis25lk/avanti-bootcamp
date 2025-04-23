import React, { useState } from 'react'; 

function RightPanel() {
  
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault(); 

    console.log('Tentativa de envio do formulário de cadastro (React)...');

   
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem! Por favor, verifique.");
      return;
    }

   
    const dadosCadastro = {
      nomeCompleto,
      telefone,
      email,
      senha,
    };

    console.log('Dados do Cadastro:', dadosCadastro);

    

     alert('Formulário validado com sucesso (envio para backend simulado)!');
  };


  return (
    <div className="right-panel"> 
      <div className="cadastro-wrapper"> 
         <div className="cadastro-box"> 
           <h2>Realizar cadastro</h2>
         
           <form onSubmit={handleSubmit}>
               <div className="input-group"> 
                   <label htmlFor="nome-completo">Nome completo</label>
                   <input
                     type="text"
                     id="nome-completo"
                     name="nome-completo"
                     value={nomeCompleto} 
                     onChange={(e) => setNomeCompleto(e.target.value)} 
                     required
                   />
               </div>
               <div className="input-group"> 
                    <label htmlFor="telefone">Telefone</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
               </div>
               <div className="input-group"> 
                   <label htmlFor="email">E-mail</label>
                   <input
                     type="email"
                     id="email"
                     name="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                   />
               </div>
               <div className="input-group"> 
                   <label htmlFor="senha">Senha</label>
                   <input
                     type="password"
                     id="senha"
                     name="senha"
                     value={senha}
                     onChange={(e) => setSenha(e.target.value)}
                     required
                   />
               </div>
               <div className="input-group"> 
                   <label htmlFor="confirmar-senha">Confirmar senha</label>
                   <input
                     type="password"
                     id="confirmar-senha"
                     name="confirmar-senha"
                     value={confirmarSenha}
                     onChange={(e) => setConfirmarSenha(e.target.value)}
                     required
                   />
               </div>
               <button type="submit" className="btn-cadastrar"> 
                   Cadastrar
               </button>
           </form>
           <p className="login-link"> 
               Já possui uma conta? <a href="#">Faça login</a>
           </p>
           </div>
       </div> 
     </div> 
  );
}

export default RightPanel; // Exporta o componente