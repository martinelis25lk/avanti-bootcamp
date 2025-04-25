import './style.css';
import { useEffect, useState } from "react";
import { getItensDoUsuario } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Ícones
import { Navbar } from "../../components/Navbar";
import { ItemCard } from "../../components/ItemCard";

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
      <Navbar/>

      <div className="items-container">
        {erro && <p>{erro}</p>}
        {
          itens.length > 0
          ?
          itens.map((item) => (
          <ItemCard item={item}/>
          ))
          :
          <p>Você ainda não cadastrou nenhum item.</p>
        }
      </div>
    </div>
  );
}
