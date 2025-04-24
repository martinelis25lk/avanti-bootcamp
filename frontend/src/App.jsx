import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { Login } from "./pages/login"
import { ItemForm } from "./components/ItemForm"
import { CadastroUsuario } from "./pages/cadastro-usuario"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastrar-usuario" element={<CadastroUsuario/>}/>
        <Route path="/cadastrar-item" element={<ItemForm isEdit={false}/>}/>
        <Route path="/atualizar-item/:itemId" element={<ItemForm isEdit={true}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
