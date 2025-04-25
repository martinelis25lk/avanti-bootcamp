import { useEffect, useState } from "react";
import { getItensDoUsuario } from "../../services/apiService";
import './style.css';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Ícones

export function MeusItens() {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const itensData = await getItensDoUsuario();
        setItens(itensData);
      } catch (error) {
        setErro("Erro ao carregar os itens");
      }
    };

    fetchItens();
  }, []);

  const formatarData = (data) => {
    const novaData = new Date(data);
    return novaData.toLocaleDateString();
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const editarItem = (id) => {
    navigate(`/editar-item/${id}`);
  };

  const excluirItem = (id) => {
    console.log("Excluir item com ID:", id);
    // pra mexer dps
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="top-bar-title">Meus Itens</h1>
        <div className="top-bar-buttons">
          <button onClick={() => navigateTo("/meus-itens")}>Meus Itens</button>
          <button onClick={() => navigateTo("/meu-perfil")}>Meu Perfil</button>
          <button onClick={() => navigateTo("/cadastrar-item")}>Cadastrar Item</button>
          <button onClick={() => navigateTo("/login")}>Sair</button>
        </div>
      </div>

      <div className="items-container">
        {erro && <p>{erro}</p>}
        {itens.length > 0 ? (
          itens.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <h2 className="item-name">{item.nome}</h2>
                <div className={`item-status ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
              </div>
              {item.foto_url && (
                <img
                  src={`http://localhost:3000/item/img/${item.foto_url}`}
                  alt={item.nome}
                  className="item-image"
                />
              )}
              <div className="item-details">
                <p><strong>Data do Ocorrido:</strong> {formatarData(item.data_ocorrido)}</p>
                <p><strong>Localização:</strong> {item.estado}, {item.cidade}</p>
                <p><strong>Contato:</strong> {item.telefone} | {item.email}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => editarItem(item.id)} className="edit-button">
                  <FaEdit />
                </button>
                <button onClick={() => excluirItem(item.id)} className="delete-button">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não cadastrou nenhum item.</p>
        )}
      </div>
    </div>
  );
}
