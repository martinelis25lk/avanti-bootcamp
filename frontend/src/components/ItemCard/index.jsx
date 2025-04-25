import "./style.css"
import { RiMapPin2Line, RiPhoneLine } from "react-icons/ri";
import { MdOutlineMailOutline, MdEdit} from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function ItemCard({item}) {
  const {usuario, isAuthenticaded} = useContext(AuthContext);

  const formatarData = (data) => {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const novaData = new Date(data);

    return `${novaData.getDate()} de ${meses[novaData.getMonth()]} de ${novaData.getFullYear()}`;
  };

  return (
    <div key={item.id} className="item-card">
      <div className="item-header">
        <h2 className="item-name">{item.nome}</h2>
        <div className={`item-status ${item.status.toLowerCase()}`}>
          {item.status}
        </div>
      </div>
        <img
          src={item.foto ? `http://localhost:3000/item/img/${item.foto_url}` : "/item-fallback.png"}
          alt={item.nome}
          onError={(e) => {
            e.target.src = "/item-fallback.png"
          }}
          className="item-image"
        />
      <div className="item-details">
        <div className="date-location">
          <p className="item-data">{formatarData(item.data_ocorrido)}</p>
          <p className="item-localizacao">{`${item.estado}-${item.cidade}`}</p>
        </div>
        <p className="localizacao"><RiMapPin2Line/> {item.logradouro}, {item.numero ? "SN" : item.numero}, Bairro {item.bairro}</p>
        <div className="item-contact">
          <p><RiPhoneLine/> {item.telefone}</p>
          <p><MdOutlineMailOutline/> {item.email}</p>
        </div>
      </div>

      <div className="item-categoria">
        <p>{item.categoria.nome}</p>
      </div>
      <div className={usuario.id == item.usuario_id ? "item-actions" : "hidden"}>
        <FaTrashAlt className="delete-button"/>
        <MdEdit className="edit-button"/>
      </div>
    </div>
  )
}
