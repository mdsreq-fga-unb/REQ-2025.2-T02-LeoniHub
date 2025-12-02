export const API_BASE_URL = 'https://req-2025-2-t02-leonihub-1.onrender.com';

export const apiFetch = async (endpoint, options = {}) => {

    const url = `${API_BASE_URL}/${endpoint}`;

  if (options.body) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  }

  const response = await fetch(url, options);
  const data = await response.json();

  // Tratamento centralizado de erros
  if (!response.ok) {
    throw new Error(data.error || `Erro na requisição: ${response.statusText}`);
  }

  if (data.success === false) {
    throw new Error(data.message || 'Ocorreu um erro na API');
  }

  return data;
};