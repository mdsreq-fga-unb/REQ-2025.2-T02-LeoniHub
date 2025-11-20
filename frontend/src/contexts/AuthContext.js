import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService'


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
        setUser(JSON.parse(savedUser));
      }

    } 
    catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Se houver erro, limpar dados
      logout();
    } 
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

 // Função de LOGIN 
  const login = async ( email, password) => {
    try {
      setLoading(true);

      const data = await authService.login( email, password); // Chama Service

      // Caso o Service não retorne "error" --> Roda o restante do código
      localStorage.setItem('token', data.data.session.access_token);
      localStorage.setItem('refresh_token', data.data.session.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      // Define usuário
      setUser(data.data.user);

      if (data.success && data.data) {
        
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

      // CHAMA O SERVIÇO
      const data = await authService.signup(email, password, nome, cpf);

      // ATUALIZA O ESTADO
      localStorage.setItem('user', JSON.stringify(data.data.user));

      setUser(data.data.user);

      return { success: true, data: data.data };

    } 
    catch (error) {
      return { success: false, error: error.message };
    } 
    finally {
      setLoading(false);
    }
  };

  // Função de RECUPERAR a senha
  const forgotPassword = async (email ) => {
    try {
      setLoading(true);
      
      // CHAMA SERVICE
      const response = await authService.forgotPassword(email ); 

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
  const changePassword = async (token, newPassword, newPasswordConfirmation ) => {
    try {
      setLoading(true);
  
      // CHAMA SERVICE
      const data = await authService.changePassword(token, newPassword, newPasswordConfirmation); 
      
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

    if (token) {
      await authService.logout(token); // Chama Service
    }
    
    // Limpar TODOS os dados locais PRIMEIRO
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    setUser(null);
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
