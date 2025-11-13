import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

/*Import do Layout Principal */
import { MainLayout } from './components/layouts/MainLayout';
import { ProdutoProvider } from './contexts/ProdutoContext';
import { PedidoProvider } from './contexts/PedidoContext';


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

import CriarPedido from './pages/CriarPedido/CriarPedido'; 



function App() {
  return (
    <Router>
      <AuthProvider> 
        <ProdutoProvider>
          <PedidoProvider>

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

                <Route path="/pedido/criar" element={<CriarPedido />} />  
              </Route>

            </Routes>
            
          </PedidoProvider>
        </ProdutoProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
