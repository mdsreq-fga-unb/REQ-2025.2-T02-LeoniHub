import React from 'react';
import './App.css';
import './style-leoni.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';

/*Import do Layout Principal */
import MainLayout from './layouts/MainLayout';

/*Import das pages desenvolvidas*/
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProductPage from './pages/ProductPage/ProductPage';



function App() {
  return (
    <div>

      <Router>
        <StoreProvider>
          <Routes>

            {/* --- Rotas SEM Navbar e Footer --- */}
            <Route index element={<HomePage />} />
            <Route path="/login/:lojaId" element={<LoginPage />} />
            <Route path="/register/:lojaId" element={<RegisterPage />} />
            {/* --- Grupo de Rotas COM Navbar e Footer --- */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard/:lojaId" element={<DashboardPage />} />
              <Route path="/products/:lojaId" element={<ProductPage />} />
            </Route>

          </Routes>
        </StoreProvider>
      </Router>



    </div>

  );
}


export default App;
