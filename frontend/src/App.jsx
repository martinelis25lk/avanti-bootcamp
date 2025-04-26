import './App.css'
import { MeusItens } from "./pages/meus-itens";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Login } from "./pages/login"
import { ItemForm } from "./components/ItemForm"
import { CadastroUsuario } from "./pages/cadastro-usuario"
import { Home } from "./pages/home"
import GerenciarConta from "./pages/gerenciar-usuario"
import { ProtectedRoute } from "./route/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/cadastrar-usuario" element={<CadastroUsuario/>}/>

        <Route path="/" element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>

        <Route path="/meus-itens" element={<ProtectedRoute>
          <MeusItens/>
        </ProtectedRoute>}/>

        <Route path="/cadastrar-item" element={<ProtectedRoute>
          <ItemForm isEdit={false}/>
        </ProtectedRoute>}/>

        <Route path="/atualizar-item/:itemId" element={<ProtectedRoute>
          <ItemForm isEdit={true}/>
        </ProtectedRoute>}/>

        <Route path="/editar-perfil" element={<ProtectedRoute>
          <GerenciarConta/>
        </ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
