import React from 'react';
import './App.css';
import './style-leoni.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*Import do Layout Principal */
import MainLayout from './layouts/MainLayout';

/*Import das pages desenvolvidas*/
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';



function App() {
  return (
    <div>

      <Router>
        <Routes>

          {/* --- Grupo de Rotas com a Navbar e Footer --- */}
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} /> {/* 'index' é a rota padrão para a Home */}
          </Route>

           {/* --- Grupo de Rotas SEM a Navbar e Footer --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
        </Routes>
      </Router>


    </div>

  );
}


export default App;
