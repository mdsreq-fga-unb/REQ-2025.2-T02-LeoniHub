import * as API from '../utils/helper'


// Função de Login -- POST
export const login = ( email, password) => {
  return API.apiFetch(`auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

// Função de Cadastro -- POST
export const signup = (email, password, nome, cpf) => {
  return API.apiFetch(`auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, nome, cpf }),
  });
};

// Função de Recuperação de Senha -- POST
export const forgotPassword = (email) => {
  return API.apiFetch(`auth/forgotPassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

// Função de Mudança de Senha -- POST
export const changePassword = (token, newPassword, newPasswordConfirmation) => {
  return API.apiFetch(`auth/changePassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword, newPasswordConfirmation }),
  });
};

// Função de Logout -- POST
export const logout = async (token) => {
  try {
    await fetch(`http://localhost:3001/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return { success: true };
  } catch (error) {
    console.warn('Erro ao fazer logout no backend, limpando localmente.', error);
    return { success: false, error: 'API_LOGOUT_FAILED' };
  }
};