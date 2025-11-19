import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getClienteById, updateCliente } from '../../services/clienteService';
import './ClienteForm.css';

export default function EditarCliente() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    cep: '',
    cidade: '',
    estado: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadClienteData();
  }, [id]);

  const loadClienteData = async () => {
    try {
      setLoadingData(true);
      setErrorMessage('');
      
      const response = await getClienteById(id);
      // Garante que todos os campos existam, mesmo que sejam vazios
      setFormData({
        nome: response.data.nome || '',
        email: response.data.email || '',
        telefone: response.data.telefone || '',
        cpf: response.data.cpf_cnpj || '',
        endereco: response.data.endereco || '',
        cep: response.data.cep || '',
        cidade: response.data.cidade || '',
        estado: response.data.estado || ''
      });
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
      setErrorMessage(error.message || 'Erro ao carregar dados do cliente');
      
      if (error.message.includes('Token')) {
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

    if (!formData.nome || !formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone || !formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.cpf || !formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setLoading(true);
        setErrorMessage('');
        
        await updateCliente(id, formData);
        
        alert('Cliente atualizado com sucesso!');
        navigate(`/clientes/${id}`);
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        setErrorMessage(error.message || 'Erro ao atualizar cliente. Tente novamente.');
        
        if (error.message.includes('Token')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="cliente-form-page">
      <div className="form-header">
        <button 
          className="btn-back"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          <ArrowLeft className="icon" />
          Voltar
        </button>
        <h1>Editar Cliente</h1>
      </div>

      {loadingData ? (
        <div className="form-card">
          <p>Carregando dados do cliente...</p>
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
            <div className="form-group">
              <label htmlFor="nome">
                Nome <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={errors.nome ? 'error' : ''}
                placeholder="Digite o nome completo"
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="email@exemplo.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefone">
                Telefone <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className={errors.telefone ? 'error' : ''}
                placeholder="(11) 99999-9999"
              />
              {errors.telefone && <span className="error-message">{errors.telefone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cpf">
                CPF/CNPJ <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className={errors.cpf ? 'error' : ''}
                placeholder="000.000.000-00"
              />
              {errors.cpf && <span className="error-message">{errors.cpf}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep || ''}
                onChange={handleChange}
                placeholder="00000-000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade || ''}
                onChange={handleChange}
                placeholder="Digite a cidade"
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado || ''}
                onChange={handleChange}
                placeholder="UF (ex: SP, RJ)"
                maxLength="2"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="endereco">Endereço</label>
              <textarea
                id="endereco"
                name="endereco"
                value={formData.endereco || ''}
                onChange={handleChange}
                rows="3"
                placeholder="Rua, número, complemento, bairro, cidade, estado"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(`/clientes/${id}`)}
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
