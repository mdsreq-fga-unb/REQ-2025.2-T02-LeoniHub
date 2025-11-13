import * as API from '../utils/helper'


// Função de Login -- POST
export const login = (lojaId, email, password) => {
  return API.apiFetch(`auth/${lojaId}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

// Função de Cadastro -- POST
export const signup = (lojaId, email, password, nome, cpf) => {
  return API.apiFetch(`auth/${lojaId}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, nome, cpf }),
  });
};

// Função de Recuperação de Senha -- POST
export const forgotPassword = (email, lojaId) => {
  return API.apiFetch(`auth/${lojaId}/forgotPassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

// Função de Mudança de Senha -- POST
export const changePassword = (token, newPassword, newPasswordConfirmation, lojaId) => {
  return API.apiFetch(`auth/${lojaId}/changePassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword, newPasswordConfirmation }),
  });
};

// Função de Logout -- POST
export const logout = async (token, lojaId) => {
  try {
    await fetch(`http://localhost:5000/api/auth/${lojaId}/logout`, {
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