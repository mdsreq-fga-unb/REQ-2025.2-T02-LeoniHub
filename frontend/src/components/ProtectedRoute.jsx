import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Verificar se existe token no localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Se não houver token e não estiver carregando, log para debug
    if (!loading && !token) {
      console.log('Acesso negado - Token não encontrado. Redirecionando para login...');
    }
  }, [loading, token]);

  // Aguardar verificação de autenticação
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px'
      }}>
        Carregando...
      </div>
    );
  }

  // Se não estiver autenticado OU não tiver token, redirecionar para login
  if (!isAuthenticated || !token) {
    // Salvar a rota tentada para redirecionar depois do login (opcional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver autenticado, renderizar o conteúdo
  return children;
};

export default ProtectedRoute;
