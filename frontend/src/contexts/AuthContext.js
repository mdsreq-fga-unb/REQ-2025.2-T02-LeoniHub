import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Criar o Context
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  // Estados compartilhados
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para verificar autenticação existente
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        // Validar token no backend
        const response = await fetch('http://localhost:5000/auth/session', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.data.user);
          } else {
            // Token inválido, limpar dados
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } else {
          // Token inválido ou expirado
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Se houver erro, limpar dados
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar se já está logado ao carregar a página
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Função de LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/auth/login`, {
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

        // Atualizar estados
        setUser(data.data.user);

        return { success: true, data: data.data };
      }

      return { success: false, error: data.error };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message };
    } 
    finally {
      setLoading(false);
    }
  };

  // Função de CADASTRO
  const signup = async (email, password, nome, cpf) => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nome, cpf }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }

      return { success: data.success, message: data.message, data: data.data };
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { success: false, error: error.message };
    } 
    finally {
      setLoading(false);
    }
  };

  // Função de RECUPERAR a senha
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar email de recuperação');
      }

      return { success: data.success, message: data.data.message };
    } 
    catch (error) {
      console.error(`Erro na recuperação de senha:${error}`);
      return { success: false, error: error.message };
    } 
    finally {
      setLoading(false);
    }
  };
    
  // Função de MUDAR a senha
  const changePassword = async (token, newPassword, newPasswordConfirmation) => {
    try {
      setLoading(true);
  
      const response = await fetch('http://localhost:5000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword, newPasswordConfirmation }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao alterar senha');
      }
      
      return { success: data.success, message: data.message };
    } 
    catch (error) {
      console.error(`Erro na troca de senha: ${error}`);
      return { success: false, error: error.message };
    } 
    finally {
      setLoading(false);
    }
  };

  // Função de LOGOUT
  const logout = async () => {
    // Pegar o token ANTES de limpar
    const token = localStorage.getItem('token');
    
    // Limpar TODOS os dados locais PRIMEIRO
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('lojaId'); // Remover campo antigo
    sessionStorage.clear();
    
    setUser(null);
    
    try {
      // Tentar fazer logout no backend com o token salvo
      if (token) {
        await fetch(`http://localhost:5000/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    
    // Forçar reload COMPLETO da página (sem cache) após limpar
    window.location.replace('/login');
  };


  // Valores que serão compartilhados com toda aplicação
  const value = {
    user,                              // Dados do usuário logado
    loading,                           // Estado de carregamento
    isAuthenticated: !!user,           // Se está autenticado (true/false)
    login,                             // Função para fazer login
    signup,                            // Função para criar conta
    forgotPassword,                   // Função para recuperação de senha
    changePassword,                   // Função para MUDAR a senha
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
