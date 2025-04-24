import './App.css'
import { MeusItens } from "./pages/MeusItems";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MeusItens />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;