import './style.css';
import { useEffect, useState } from "react";
import { getItensDoUsuario } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
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

  const handleAtualizarItens = (id) => {
    const ItensAtualizado = itens.filter(item => (item.id != id))
    setItens(ItensAtualizado)
  }

  return (
    <div>
      <Navbar/>

      <div className="items-container">
        {erro && <p>{erro}</p>}
        {
          itens.length > 0
          ?
          itens.map((item) => (
            <ItemCard
              item={item}
              atualizarLista={handleAtualizarItens}
              key={item.id}
            />
          ))
          :
          <p>Você ainda não cadastrou nenhum item.</p>
        }
      </div>
    </div>
  );
}
