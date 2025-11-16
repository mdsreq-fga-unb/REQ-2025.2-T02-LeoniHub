import React from 'react';
import './App.css';
import './style-leoni.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

/*Import do Layout Principal */
import MainLayout from './layouts/MainLayout';
import CreateOrder from './pages/CreateOrder/CreateOrder'; 

/*Import das pages desenvolvidas*/
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* --- Rotas SEM Navbar e Footer --- */}
          <Route index element={<HomePage />} /> 
          <Route path="/login/:lojaId" element={<LoginPage />} />
          <Route path="/register/:lojaId" element={<RegisterPage />} />

          <Route path="/forgotpassword/:lojaId" element={<ForgotPassword />} />
          <Route path="/forgotpassword/:lojaId/updatepassword" element={<UpdatePassword />} />

          {/* --- Grupo de Rotas COM Navbar e Footer --- */}
          <Route element={<MainLayout />}>
            <Route path="/pedidos/criar" element={<CreateOrder />} />  
          </Route>
          
        </Routes>
      </Router>
    </AuthProvider>

  );
}


export default App;
