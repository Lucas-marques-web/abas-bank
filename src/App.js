
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicial from './pages/Inicial';
import Listagem from './pages/Listagem';
import Cadastro from './pages/Cadastro';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route index element={<Inicial />} />
          <Route path="listagem" element={<Listagem />} />
          <Route path="cadastro/:codigo" element={<Cadastro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
