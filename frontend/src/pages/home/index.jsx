import "./style.css"
import { Navbar } from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getEstados, getMunicipios, listarCategoria, listarItens } from "../../services/apiService";
import { ItemCard } from "../../components/ItemCard";

export function Home() {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estado, setEstado] = useState();
  const [cidade, setCidade] = useState();
  const [status, setStatus] = useState();
  const [categoria, setCategoria] = useState();
  const [dataInicio, setDataInicio] = useState();
  const [dataFim, setDataFim] = useState();
  const [busca, setBusca] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [itens, setItens] = useState([]);
  const {token, isAuthenticated} = useContext(AuthContext);

  const navigate = useNavigate();

  if(!isAuthenticated)
    navigate("/login")

  useEffect(() => {
    async function fetchCategorias() {
      const categoriasData = await listarCategoria(token);
      setCategorias(categoriasData)
    }

    async function fetchEstados() {
      const estadosData = await getEstados();
      setEstados(estadosData)
    }

    async function fetchItens() {
      const itensData = await listarItens(token, "");
      setItens(itensData)
      setItensFiltrados(itensData)
    }

    fetchItens()
    fetchCategorias()
    fetchEstados()
  },[])

  useEffect(() => {
      async function fetchMunicipios() {
        const id = estados.filter(estd => {
          if (estado == estd.nome)
            return estd
        })[0].id
        const municipiosData = await getMunicipios(id)
        setCidades(municipiosData)
      }

      if(estados.length > 0)
        fetchMunicipios()

  }, [estado])

  const BuscarItensHandle = (e) => {
    const filtrados = itens.filter(item => (
      item.nome.toLowerCase().includes(e.target.value.toLowerCase())
    ))

    console.log(filtrados)

    setItensFiltrados(filtrados)
  }

  const MenuHandle = async (e) => {
    setIsMenuShow(prev => !prev)
  }

  const AplicarFiltroHandle = async (e) => {
    let query = "/?";

    if(estado)
      query += `estado=${estado}&`

    if(cidade)
      query += `cidade=${cidade}&`

    if(status)
      query += `status=${status}&`

    if(categoria)
      query += `categoria=${categoria}&`

    if(dataInicio)
      query += `data_inicio=${dataInicio}&`

    if(dataFim)
      query += `data_fim=${dataFim}&`

    const itensData = await listarItens(token, query);
    setItens(itensData);
    setItensFiltrados(itensData);
  }

  return (
    <div className="home-container">
      <Navbar/>
      <div className="content">
        <div className={isMenuShow ? "sidebar open" : "sidebar close"}>
          <div className="icone-wrapper">
            {
              isMenuShow ?
              <MdMenuOpen className="menu-float-icon" onClick={MenuHandle}/>
              :
              <MdMenu className="menu-float-icon" onClick={MenuHandle}/>
            }
          </div>
          <div className="search-bar">
            <IoIosSearch/>
            <input
              type="text"
              name="searchbar"
              id="searchbar"
              placeholder="Pesquisar item"
              onChange={BuscarItensHandle}
            />
          </div>

          <div className="filtros-container">
            <h3>Filtrar</h3>
            <hr />
            <div className="input-group">
              <label htmlFor="estado">Estado</label>
              <select
                name="estado"
                id="estado"
                onChange={e => { setEstado(e.target.value)}}
              >
                <option value="">Selecione um estado</option>
                {estados.map(estd => (
                  <option value={estd.nome} key={estd.id}>{estd.nome}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="cidade">Cidade</label>
              <select name="cidade" id="cidade" onChange={e => {setCidade(e.target.value)}}>
                <option value="">Selecione uma cidade</option>
                {
                  cidades.map(municipio => (
                    <option value={municipio.nome} key={municipio.id}>{municipio.nome}</option>
                  ))
                }
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="status">Status</label>
              <select name="status" id="status" onChange={e => setStatus(e.target.value)}>
                <option value="">Selecione um status</option>
                <option value="Perdido">Perdido</option>
                <option value="Encontrado">Encontrado</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="categoria">Categoria</label>
              <select name="categoria" id="categoria" onChange={e => setCategoria(e.target.value)}>
                <option value="">Selecione uma categoria</option>
                {categorias.map(ctg => (
                  <option value={ctg.id} key={ctg.id}>{ctg.nome}</option>
                ))}
              </select>
            </div>

            <hr />
            <p>Definir periodo de tempo</p>
            <div className="input-group2">
              <label htmlFor="data_inicio">Inicio</label>
              <input
                type="date"
                id="data_inicio"
                name="data_fim"
                onChange={e => {
                  setDataInicio(e.target.value)
                }}
              />
            </div>

            <div className="input-group2">
              <label htmlFor="data_fim">Fim</label>
              <input
                type="date"
                id="data_fim"
                name="data_fim"
                onChange={e => {
                  setDataFim(e.target.value)
                }}
              />
            </div>

            <div className="button-wrapper">
              <button onClick={AplicarFiltroHandle}>Aplicar Filtros</button>
            </div>
          </div>
        </div>
        <div className="itens-container">
          {
            itensFiltrados.length > 0
            ?
            itensFiltrados.map(item => (
              <ItemCard item={item}/>
            ))
            :
            <h3>Poxa vida! Não encontramos nenhum objeto :(</h3>
          }
        </div>
      </div>
    </div>
  )
}
