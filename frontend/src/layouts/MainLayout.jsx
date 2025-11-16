import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom'; 
import Footer from '../components/Footer/Footer'; 
import Navbar from '../components/Navbar/Navbar'; 
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth(); 
  const location = useLocation();

  if (loading) return null;

  // se não autenticado, redireciona para login (preserva lojaId salvo ou usa 'Leonni' como fallback)
  // isso garante que apenas usuários autenticados vejam o layout principal
  if (!isAuthenticated) {
    const loja = localStorage.getItem('lojaId') || 'Leonni';
    return <Navigate to={`/login/${loja}`} state={{ from: location }} replace />;
  }

  return (
    <div className="app-container">
      <Navbar />

      <main className="main">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;