import "./style.css"

export function ItemCard({item}) {

  const formatarData = (data) => {
    const novaData = new Date(data);
    return novaData.toLocaleDateString();
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
        <p><strong>Data do Ocorrido:</strong> {formatarData(item.data_ocorrido)}</p>
        <p><strong>Localização:</strong> {item.estado}, {item.cidade}</p>
        <p><strong>Contato:</strong> {item.telefone} | {item.email}</p>
      </div>
      <div className="item-actions">
      </div>
    </div>
  )
}
