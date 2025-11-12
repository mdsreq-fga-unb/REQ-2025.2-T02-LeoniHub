
const API_URL = 'http://localhost:3001/auth'; // Link padrão para evitar re-escrita

// Helper genérico para chamadas fetch --> Trata os erros de forma centralizada.
const apiFetch = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Erro na requisição: ${response.statusText}`);
  }

  if (data.success === false) {
    throw new Error(data.message || 'Ocorreu um erro na API');
  }

  return data;
};

// Função de Login -- POST
export const login = (lojaId, email, password) => {
  return apiFetch(`${API_URL}/${lojaId}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

// Função de Cadastro -- POST
export const signup = (lojaId, email, password, nome, cpf) => {
  return apiFetch(`${API_URL}/${lojaId}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, nome, cpf }),
  });
};

// Função de Recuperação de Senha -- POST
export const forgotPassword = (email, lojaId) => {
  return apiFetch(`${API_URL}/${lojaId}/forgotPassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

// Função de Mudança de Senha -- POST
export const changePassword = (token, newPassword, newPasswordConfirmation, lojaId) => {
  return apiFetch(`${API_URL}/${lojaId}/changePassword`, {
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