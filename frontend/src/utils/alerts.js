import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MySwal = Swal.mixin({
  customClass: {
    confirmButton: 'btn-confirm-custom', 
    cancelButton: 'btn-cancel-custom'
  },
  buttonsStyling: true,
  confirmButtonColor: '#177b81', 
  cancelButtonColor: '#d33'
});

// Função para Sucesso 
export const notifySuccess = (message) => {
  return Swal.fire({
    title: 'Sucesso!',
    text: message,
    icon: 'success',
    confirmButtonColor: '#177b81',
    confirmButtonText: 'OK'
  });
};

// Função para Erro
export const notifyError = (message) => {
  toast.error(message || "Ocorreu um erro inesperado.");
};

// Função para Confirmação
export const confirmAction = async (title, text) => {
  const result = await MySwal.fire({
    title: title || 'Tem certeza?',
    text: text || "Essa ação não pode ser desfeita.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, confirmar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  });

  return result.isConfirmed; // Retorna true ou false
};