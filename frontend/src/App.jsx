import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { Login } from "./pages/login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
