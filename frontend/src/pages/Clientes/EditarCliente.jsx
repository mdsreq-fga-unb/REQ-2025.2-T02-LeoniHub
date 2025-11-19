import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ClienteForm.css';

export default function EditarCliente() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simula buscar dados do cliente da API
    // Em produção, você faria: fetch(`/api/clientes/${id}`)
    const clienteMock = {
      id: id,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      endereco: 'Rua Exemplo, 123 - São Paulo, SP'
    };
    
    setFormData(clienteMock);
  }, [id]);

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

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Atualizando cliente:', formData);
      alert('Cliente atualizado com sucesso!');
      navigate(`/clientes/${id}`);
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

      <div className="form-card">
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

            <div className="form-group full-width">
              <label htmlFor="endereco">Endereço</label>
              <textarea
                id="endereco"
                name="endereco"
                value={formData.endereco}
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
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
