import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { notifySuccess, notifyError, confirmAction } from '../../utils/alerts';
import { getClienteById } from '../../services/clienteService';
import { getProdutoById } from '../../services/produtoService';
import { atualizarPedido, getPedidoById } from '../../services/pedidoService'; 
import './PedidoForm.css';

export default function EditarPedido() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Inicializa com os campos do DTO
  const [formData, setFormData] = useState({
    cliente_cpf_cnpj: '',
    cliente_id: '',
    produto_id: '',
    valor: '',
    data_aluguel: '',
    data_devolucao: '',
    status: '',
    descricao: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [produtoNome, setProdutoNome] = useState('');

  useEffect(() => {
    loadPedidoData();
  }, [id]);

  const formatarDataParaInput = (dataString) => {
    if (!dataString) return '';
    return dataString.split('T')[0];
  };

  const loadPedidoData = async () => {
    try {
      setLoadingData(true);
      setErrorMessage('');
      
      const response = await getPedidoById(id);
      const data = response.data || response;

      const responseCliente = await getClienteById(data.cliente_id) ;
      const dataCliente = responseCliente.data || responseCliente;

      setFormData({
        cliente_cpf_cnpj: dataCliente.cpf_cnpj || '',
        cliente_id: dataCliente.id || '',
        produto_id: data.produto_id || '',
        valor: data.valor || '',
        data_aluguel: formatarDataParaInput(data.data_aluguel),
        data_devolucao: formatarDataParaInput(data.data_devolucao),
        status: data.status,
        descricao: data.descricao,
      });

      const produto = await getProdutoById(data.produto_id);
      setProdutoNome((produto.data).codigo);

    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
      setErrorMessage(error.message || 'Erro ao carregar dados do pedido');
      
      if (error.message && error.message.includes('Token')) {
        navigate('/login');
      }
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.produto_id) {
      newErrors.produto_id = 'ID do Produto é obrigatório';
    }

    if (!formData.valor) {
      newErrors.valor = 'Valor é obrigatório';
    }

    if (!formData.data_aluguel) {
      newErrors.data_aluguel = 'Data de Retirada é obrigatória';
    }

    if (!formData.data_devolucao) {
      newErrors.data_devolucao = 'Data de Devolução é obrigatória';
    }

    // Validação lógica de datas
    if (formData.data_aluguel && formData.data_devolucao) {
      if (new Date(formData.data_devolucao) < new Date(formData.data_aluguel)) {
        newErrors.data_devolucao = 'Devolução não pode ser antes da retirada';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const confirmado = await confirmAction(
      'Alterar Pedido?', 
      'Essa ação não pode ser desfeita.'
    );
    if (!confirmado) return;

    if (validateForm()) {
      try {
        setLoading(true);
        setErrorMessage('');
        
        if(formData.status === 'DEVOLUCAO'){
          throw new Error('O pedido não pode ser alterado pois o cliente está com o produto.');
        }

        const payload = {
            ...formData,
            id: id,
            valor: parseFloat(formData.valor)
        };

        await atualizarPedido(payload);
        
        notifySuccess('Pedido atualizado com sucesso!');
        navigate(`/pedidos/`); 
      } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        setErrorMessage(error.message || 'Erro ao atualizar pedido. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pedido-form-page">
      <div className="form-header">
        <button 
          className="btn-back"
          onClick={() => navigate(`/pedidos/`)}
        >
          <ArrowLeft className="icon" />
          Voltar
        </button>
        <h1>Editar Pedido #{id}</h1>
      </div>

      {loadingData ? (
        <div className="form-card">
          <p>Carregando dados do pedido...</p>
        </div>
      ) : (
        <div className="form-card">
          {errorMessage && (
            <div className="error-banner">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* Identificação do Cliente */}
            <div className="form-group">
              <label htmlFor="cliente_cpf_cnpj">CPF/CNPJ Cliente</label>
              <input
                type="text"
                id="cliente_cpf_cnpj"
                name="cliente_cpf_cnpj"
                readOnly = {true}
                value={formData.cliente_cpf_cnpj}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </div>

            {/* Dados do Produto e Valor */}
            <div className="form-group">
              <label htmlFor="produto_id">
                Código do Produto <span className="required">*</span>
              </label>
              <input
                type="text"
                id="produto_id"
                name="produto_id"
                readOnly = {true}
                value={produtoNome}
                onChange={handleChange}
                className={errors.produto_id ? 'error' : ''}
              />
              {errors.produto_id && <span className="error-message">{errors.produto_id}</span>}
            </div>

            {/* Datas */}
            <div className="form-group">
              <label htmlFor="data_aluguel">
                Data de Retirada <span className="required">*</span>
              </label>
              <input
                type="date"
                id="data_aluguel"
                name="data_aluguel"
                value={formData.data_aluguel}
                onChange={handleChange}
                className={errors.data_aluguel ? 'error' : ''}
              />
              {errors.data_aluguel && <span className="error-message">{errors.data_aluguel}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="data_devolucao">
                Data de Devolução <span className="required">*</span>
              </label>
              <input
                type="date"
                id="data_devolucao"
                name="data_devolucao"
                value={formData.data_devolucao}
                onChange={handleChange}
                className={errors.data_devolucao ? 'error' : ''}
              />
              {errors.data_devolucao && <span className="error-message">{errors.data_devolucao}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="valor">
                Valor Total (R$) <span className="required">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                className={errors.valor ? 'error' : ''}
              />
              {errors.valor && <span className="error-message">{errors.valor}</span>}
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">Status do Pedido</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="PREPARACAO">Preparação</option>
                <option value="RETIRADA">Retirada</option>
                <option value="DEVOLUCAO">Devolução</option>
                <option value="CONCLUIDO">Concluído</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="descricao">Descrição do Pedido</label>
                <textarea 
                  id="descricao"
                  name="descricao"
                  value={formData.descricao || ''} 
                  onChange={handleChange} 
                  placeholder="Detalhes adicionais..."
                  rows={4}
                />
            </div>

          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(`/pedidos/`)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
      )}
    </div>
  );
}