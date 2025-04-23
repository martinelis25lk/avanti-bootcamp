import React from 'react';

function LeftPanel() {
  return (
    <div className="left-panel"> 
      <div className="left-image-panel"> 
     
        <img src="/computador.png" alt="Pessoas olhando para um laptop" />
        <img src="/pessoa.png" alt="Detalhe de mãos usando um laptop" />
        <div className="image-overlay"> 
          <div className="overlay-text"> 
            <div className="title-logo-container"> 
              <h1>Portal Rastreia</h1>
              
              <img src="/logo.png" alt="Logo Portal Rastreia" className="logo" /> 
            </div>
            <h2>Uma rede de ajuda voluntária</h2>
            <p>
              Bem-vindo(a) ao nosso espaço dedicado a conectar pessoas que encontraram algo com aqueles que perderam!
              Somos uma plataforma voluntária criada para facilitar a busca por itens perdidos e a devolução de objetos encontrados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel; 