import React, { createContext, useContext, useState, useEffect } from 'react';

// Criar o Context
const AuthContext = createContext({});

// Provider que vai "abraçar" a aplicação
export const AuthProvider = ({ children }) => {
  // Estados compartilhados
  const [user, setUser] = useState(null);
  const [lojaId, setLojaId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se já está logado ao carregar a página
  useEffect(() => {
    checkAuth();
  }, []);

  // Função para verificar autenticação existente
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const savedLojaId = localStorage.getItem('lojaId');
      const savedUser = localStorage.getItem('user');

      if (token && savedLojaId && savedUser) {
        setUser(JSON.parse(savedUser));
        setLojaId(savedLojaId);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Se houver erro, limpar dados
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Função de LOGIN
  const login = async (lojaId, email, password) => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3001/auth/${lojaId}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      if (data.success) {
        // Salvar dados no localStorage
        localStorage.setItem('token', data.data.session.access_token);
        localStorage.setItem('refresh_token', data.data.session.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('lojaId', lojaId);

        // Atualizar estados
        setUser(data.data.user);
        setLojaId(lojaId);

        return { success: true, data: data.data };
      }

      return { success: false, error: data.error };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Função de CADASTRO
  const signup = async (lojaId, email, password, nome) => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3001/auth/${lojaId}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nome }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }

      return { success: data.success, message: data.message, data: data.data };
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Função de LOGOUT
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const savedLojaId = localStorage.getItem('lojaId');

      // Tentar fazer logout no backend
      if (token && savedLojaId) {
        await fetch(`http://localhost:5000/api/auth/${savedLojaId}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpar dados locais (sempre executa, mesmo se der erro)
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('lojaId');
      
      setUser(null);
      setLojaId(null);
    }
  };

  // Valores que serão compartilhados com toda aplicação
  const value = {
    user,                              // Dados do usuário logado
    lojaId,                            // ID da loja atual (ClosetChic ou Leonni)
    loading,                           // Estado de carregamento
    isAuthenticated: !!user,           // Se está autenticado (true/false)
    login,                             // Função para fazer login
    signup,                            // Função para criar conta
    logout,                            // Função para sair
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

export default AuthContext;
