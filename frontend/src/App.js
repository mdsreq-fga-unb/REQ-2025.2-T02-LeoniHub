import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';

/*Import do Layout Principal */
import { MainLayout } from './components/layouts/MainLayout';

/*Import das pages desenvolvidas*/
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Clientes from './pages/Clientes/Clientes';
import NovoCliente from './pages/Clientes/NovoCliente';
import ClienteDetalhes from './pages/Clientes/ClienteDetalhes';
import EditarCliente from './pages/Clientes/EditarCliente';
import Produtos from './pages/Produtos/Produtos';
import NovoProduto from './pages/Produtos/NovoProduto';
import ProdutoDetalhes from './pages/Produtos/ProdutoDetalhes';
import EditarProduto from './pages/Produtos/EditarProduto';
import DashboardPage from './pages/DashboardPage/DashboardPage';



function App() {
  return (
    <div>

      <Router>
        <StoreProvider>
          <Routes>

          {/* --- Rotas SEM Navbar e Footer --- */}
          <Route index element={<LoginPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* --- Grupo de Rotas COM Navbar e Footer --- */}
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            
            <Route path='/clientes' element={<Clientes />} />
            <Route path='/clientes/novo' element={<NovoCliente />} />
            <Route path='/clientes/:id' element={<ClienteDetalhes />} />
            <Route path='/clientes/:id/editar' element={<EditarCliente />} />
            
            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produtos/novo' element={<NovoProduto />} />
            <Route path='/produtos/:id' element={<ProdutoDetalhes />} />
            <Route path='/produtos/:id/editar' element={<EditarProduto />} />
          </Route>
          
        </Routes>
        </StoreProvider>
      </Router>



    </div>

  );
}


export default App;
