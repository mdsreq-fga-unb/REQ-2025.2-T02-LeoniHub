const API_URL = 'http://localhost:5000/clientes';

// Helper para obter token
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }
  return token;
};

// Helper genérico para chamadas fetch
const apiFetch = async (url, options = {}) => {
  try {
    const token = getAuthToken();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Erro na requisição: ${response.statusText}`);
    }

    if (data.success === false) {
      throw new Error(data.error || 'Ocorreu um erro na API');
    }

    return data;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};

// Listar todos os clientes
export const getAllClientes = async () => {
  return apiFetch(API_URL);
};

// Buscar cliente por ID
export const getClienteById = async (id) => {
  return apiFetch(`${API_URL}/${id}`);
};

// Criar novo cliente
export const createCliente = async (clienteData) => {
  return apiFetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(clienteData),
  });
};

// Atualizar cliente
export const updateCliente = async (id, clienteData) => {
  return apiFetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(clienteData),
  });
};

// Deletar cliente
export const deleteCliente = async (id) => {
  return apiFetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
