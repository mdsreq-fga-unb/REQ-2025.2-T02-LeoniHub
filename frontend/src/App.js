import React from 'react';
import './App.css';
import './style-leoni.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProdutoProvider } from './contexts/ProdutoContext';
import { PedidoProvider } from './contexts/PedidoContext';

/*Import do Layout Principal */
import MainLayout from './layouts/MainLayout';
import CriarPedido from './pages/CriarPedido/CriarPedido'; 

/*Import das pages desenvolvidas*/
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';


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
              <Route element={<MainLayout />}>
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
