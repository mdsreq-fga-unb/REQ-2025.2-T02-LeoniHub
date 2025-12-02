import * as API from '../utils/helper'

// Helper para obter token
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }
  return token;
};

// Listar todos os clientes
export const getAllClientes = async () => {
  return API.apiFetch(`clientes/`);
};

// Buscar cliente por ID
export const getClienteById = async (id) => {
  return API.apiFetch(`clientes/${id}`);
};

// Criar novo cliente
export const createCliente = async (clienteData) => {
  return API.apiFetch(`clientes/`, {
    method: 'POST',
    body: JSON.stringify(clienteData),
  });
};

// Atualizar cliente
export const updateCliente = async (id, clienteData) => {
  return API.apiFetch(`clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(clienteData),
  });
};

// Deletar cliente
export const deleteCliente = async (id) => {
  return API.apiFetch(`clientes/${id}`, {
    method: 'DELETE',
  });
};
