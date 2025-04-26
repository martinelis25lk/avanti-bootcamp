import "./style.css"
import { Navbar } from "../Navbar"
import { MdOutlineFileUpload } from "react-icons/md"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { GiConfirmed } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import { atualizarItem, cadastrarItem, enviarImagem, getEstados, getMunicipios, listarCategoria, listarItemPorId } from "../../services/apiService.js";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

export function ItemForm({isEdit}) {

  const [item, setItem] = useState(null);
  const [imgNome, setImgNome] = useState("Escolher arquivo");
  const [readOnly, setReadOnly] = useState(false);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [categorias, setCategorias]=  useState([])
  const [estado, setEstado] = useState("");
  const [imagem, setImagem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isItemCreated, setIsItemCreated] = useState(false);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const { token, isAuthenticated, usuario, logout } = useContext(AuthContext);
  const {itemId} = useParams();

  const navigate = useNavigate();

  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  if (!isAuthenticated) {
    navigate("/login")
  }

  useEffect(() => {
    async function fetchEstados() {
      const estadosData = await getEstados();
      setEstados(estadosData)
    }

    async function fetchItem() {
      const item = await listarItemPorId(token, itemId);
      setItem(item)
    }
    async function fetchCategorias() {
          const categoriasData = await listarCategoria(token);
          setCategorias(categoriasData)
        }

    if(isEdit)
      fetchItem()

    fetchCategorias()
    fetchEstados()
  }, [])

  useEffect(()=> {
    if(item){
      setValue("nome", item.nome);
      setValue("data_ocorrido", item.data_ocorrido.split("T")[0]);
      setValue("data_entregue", item.data_entregue && item.data_entregue.split("T")[0]);
      setValue("categoria_id", item.categoria_id);
      setValue("status", item.status);
      item.foto_url && setImgNome(item.foto_url);
      setValue("email", item.email);
      setValue("telefone", item.telefone);
      setValue("bairro", item.bairro);
      setValue("logradouro", item.logradouro);
      setValue("numero", item.numero && item.numero);
    }
  }, [item])

  useEffect(() => {
    async function fetchMunicipios() {
      const id = estados.filter(estd => {
        if (estado == estd.nome)
          return estd
      })[0].id
      const municipiosData = await getMunicipios(id)
      setMunicipios(municipiosData)
    }

    if(estados.length > 0)
      fetchMunicipios()
  }, [estado])

  const handleEstadoChange = (e) => {
    e.preventDefault()
    setEstado(e.target.value)
  }

  const handleAutopreencher = (e) => {
    setReadOnly(e.target.checked)
    if(e.target.checked){
      setValue("telefone", usuario.telefone)
      setValue("email", usuario.email)
    } else {
      setValue("telefone", "")
      setValue("email", "")
    }
  }

  const onSubmit = async (data) => {
    setIsItemCreated(false)
    setIsLoading(true)

    const itemData = {
      nome: data.nome,
      bairro: data.bairro,
      categoria_id: parseInt(data.categoria_id),
      data_ocorrido: data.data_ocorrido + " 00:00",
      email: data.email,
      estado: data.estado,
      logradouro: data.logradouro,
      numero: parseInt(data.numero),
      status: data.status,
      telefone: data.telefone,
      cidade: data.cidade
    }
    try {
      if(isEdit){
      data.data_entregue && (itemData.data_entregue = (data.data_entregue + " 00:00"))

      await atualizarItem(token, itemId, itemData);

      if(imagem)
        await enviarImagem(token, itemId, imagem);

      setIsItemCreated(true);
      await sleep(2000);
      setIsLoading(false);

      } else {
        const itemCadastrado = await cadastrarItem(token, itemData);

        if(imagem)
          await enviarImagem(token, itemCadastrado.id, imagem);

        setIsItemCreated(true);
        await sleep(2000);
        setIsLoading(false);
      }
    } catch (error) {
      if(error.response.status == 401){
        logout()
        navigate("/login")
      }
    }

  }

  return (
    <div className="item-form-container">
      <Navbar />

      <div className={isLoading ? "modal" : "modal hidden"}>
        <div className="mensagem">
          {
            isItemCreated ?
            <>
              <GiConfirmed
                size={24}
              />
              <p>{isEdit? "Item atualizado" : "Item criado"}</p>
            </>
            :
            <>
              <AiOutlineLoading3Quarters
                className="loading-icon"
                size={24}
              />
              <p>{isEdit ? "Atualizando item" : "Editando item"}</p>
            </>
          }
        </div>
      </div>

      <form className="item-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="col-3">
          Cadastre seu objeto que foi perdido ou encontrado
        </h1>

        <fieldset className="dados-container col-2">
          <legend className="col-2">Dados do objeto</legend>

          <div className="input-group col-3">
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              name="nome"
              id="nome"
              className={errors.nome ? "input-erro" : "input"}
              placeholder="Nome do objeto perdido/encontrado"
              {...register("nome", { required: "O nome é obrigatorio" })}
            />
            {errors.nome && <p className="erro">{errors.nome.message}</p>}
          </div>

          <div className={isEdit ? "input-group col-1":"input-group col-3"}>
            <label htmlFor="data_ocorrido">Data em que foi encontrado/perdido*</label>
            <input
              type="date"
              name="data_ocorrido"
              id="data_ocorrido"
              className={errors.data_ocorrido ? "input-erro" : "input"}
              {...register("data_ocorrido", { required: "A data em que foi encontrado/perido é obrigatória" })}
            />
            {errors.data_ocorrido && <p className="erro">{errors.data_ocorrido.message}</p>}
          </div>

          {
            isEdit
            &&
            <div className="input-group col-2">
              <label htmlFor="data_entregue">Data em que foi entregue*</label>
              <input
                type="date"
                name="data_entregue"
                id="data_entregue"
                className={errors.data_entregue ? "input-erro" : "input"}
                {...register("data_entregue", { required: "A data em que foi encontrado/perido é obrigatória" })}
              />
              {errors.data_entregue && <p className="erro">{errors.data_entregue.message}</p>}
            </div>
          }

          <div className="input-group">
            <label htmlFor="categoria">Categoria*</label>
            <select
              name="categoria"
              id="categoria"
              className={errors.categoria_id ? "input-erro" : "input"}
              {...register("categoria_id", { required: "O objeto precisa ter uma categoria" })}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(ctg => (
                  <option value={ctg.id} key={ctg.id}>{ctg.nome}</option>
              ))}
            </select>
            {errors.categoria_id && <p className="erro">{errors.categoria_id.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="status">Status*</label>
            <select
              name="status"
              id="status"
              className={errors.status ? "input-erro" : "input"}
              {...register("status", { required: "O objeto precisa ter um status" })}
            >
              <option value="">Selecionar status</option>
              <option value="Perdido">Perdido</option>
              <option value="Encontrado">Encontrado</option>
            </select>
            {errors.status && <p className="erro">{errors.status.message}</p>}
          </div>

          <div className="input-group">
            <label>Imagem</label>
            <label htmlFor="imagem" className="file-input">
              <MdOutlineFileUpload size={20} />
              {imgNome}
              <input
                type="file"
                name="imagem"
                id="imagem"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  setImagem(e.target.files[0])
                  setImgNome(e.target.files[0].name)
                }}
              />
            </label>
          </div>
        </fieldset>


        <fieldset className="contato-container col-1">
          <legend>Dados para contato</legend>

          <div className="input-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              id="email"
              className={errors.email ? "input-erro" : "input"}
              placeholder="Email@exemplo.com"
              {...register("email", {
                required: "O campo email é obrigatório",
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
                  message: "Email inválido"
                }
              })}
              readOnly={readOnly}
            />
            {errors.email && <p className="erro">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="text"
              className={errors.telefone ? "input-erro" : "input"}
              placeholder="(00) 00000-0000"
              {...register("telefone", {
                required: "O campo telefone é obrigatório",
                pattern: {
                  value: /^\(\d{2}\) \d{5}-\d{4}$/,
                  message: "Formato inválido. Use (00) 00000-0000"
                }
              })}
              readOnly={readOnly}
            />
            {errors.telefone && <p className="erro">{errors.telefone.message}</p>}
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              name="autopreencher"
              id="autopreencher"
              onChange={handleAutopreencher}
            />
            Usar dados da conta para preencher os campos de contato
          </label>

        </fieldset>

        <fieldset className="localizacao-container col-3">
          <legend>Localização</legend>

          <div className="input-group">
            <label htmlFor="estado">Estado*</label>
            <Controller
              name="estado"
              control={control}
              defaultValue=""
              rules={{ required: "O campo estado é obrigatório" }}
              render={({ field }) => (
                <select
                  id="estado"
                  className={errors.estado ? "input-erro" : "input"}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleEstadoChange(e);
                  }}
                >
                  <option value="">Selecione um estado</option>
                  {
                    estados.map(estado => (
                      <option value={estado.nome} key={estado.id}>{estado.nome}</option>
                    ))
                  }
                </select>
              )}
            />
            {errors.estado && <p className="erro">{errors.estado.message}</p>}
          </div>

          <div className="input-group col-2">
            <label htmlFor="cidade">Cidade*</label>
            <select
              name="cidade"
              id="cidade"
              className={errors.cidade ? "input-erro" : "input"}
              {...register("cidade", { required: "O campo cidade é obrigatorio" })}
            >
              <option value="">Selecione uma cidade</option>
              {
                municipios.map(municipio => (
                  <option value={municipio.nome} key={municipio.id}>{municipio.nome}</option>
                ))
              }
            </select>
            {errors.cidade && <p className="erro">{errors.cidade.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="bairro">Bairro*</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              placeholder="Bairro"
              className={errors.bairro ? "input-erro" : "input"}
              {...register("bairro", { required: "O campo bairro é obrigatório" })}
            />
            {errors.bairro && <p className="erro">{errors.bairro.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="logradouro">Logradouro*</label>
            <input
              type="text"
              name="logradouro"
              id="logradoudo"
              placeholder="Rua, Avenida, etc..."
              className={errors.logradouro ? "input-erro" : "input"}
              {...register("logradouro", { required: "O campo logradouro é obrigatório" })}
            />
            {errors.logradouro && <p className="erro">{errors.logradouro.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="numero">Número*</label>
            <input
              type="number"
              name="numero"
              id="numero"
              placeholder="00"
              className={errors.numero ? "input-erro" : "input"}
              {...register("numero", { required: "preencha o número" })}
            />
            {errors.numero && <p className="erro">{errors.numero.message}</p>}
          </div>
        </fieldset>

        <input type="submit" value="Enviar" className="submit-button" />
      </form>
    </div>
  )
}
