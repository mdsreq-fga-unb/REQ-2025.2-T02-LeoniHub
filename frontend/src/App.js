import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

/*Import do Layout Principal */
import { MainLayout } from './components/layouts/MainLayout';

/*Import das pages desenvolvidas*/
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';

import Clientes from './pages/Clientes/Clientes';
import NovoCliente from './pages/Clientes/NovoCliente';
import ClienteDetalhes from './pages/Clientes/ClienteDetalhes';
import EditarCliente from './pages/Clientes/EditarCliente';

import Produtos from './pages/Produtos/Produtos';
import NovoProduto from './pages/Produtos/NovoProduto';
import ProdutoDetalhes from './pages/Produtos/ProdutoDetalhes';
import EditarProduto from './pages/Produtos/EditarProduto';

import CriarPedido from './pages/Pedidos/CriarPedido'; 
import PedidoDetalhes from './pages/Pedidos/PedidoDetalhes'; 
import Pedidos from './pages/Pedidos/Pedidos'; 

import Agenda from './pages/Agenda/Agenda'; 

function App() {
  return (
    <Router>
      <AuthProvider> 
        <Routes>
          {/* --- Rotas SEM Navbar e Footer --- */}
          <Route index element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<UpdatePassword />} />
          

          {/* --- Grupo de Rotas COM Navbar e Footer --- */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path='/clientes' element={<Clientes />} />
            <Route path='/clientes/novo' element={<NovoCliente />} />
            <Route path='/clientes/:id' element={<ClienteDetalhes />} />
            <Route path='/clientes/:id/editar' element={<EditarCliente />} />

            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produtos/novo' element={<NovoProduto />} />
            <Route path='/produtos/:id' element={<ProdutoDetalhes />} />
            <Route path='/produtos/:id/editar' element={<EditarProduto />} />

            <Route path="/pedidos/criar" element={<CriarPedido />} />  
            <Route path="/pedidos/" element={<Pedidos/>} />  
            <Route path="/pedidos/:id" element={<PedidoDetalhes/>} />  

            <Route path="/agenda/" element={<Agenda/>} />  
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;
