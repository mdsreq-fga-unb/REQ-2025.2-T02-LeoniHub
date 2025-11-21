import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ProdutoForm.css';

export default function NovoProduto() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    cor: '',
    tamanho: '',
    quantidade: '',
    valor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.codigo || !formData.descricao || !formData.quantidade || !formData.valor) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    console.log('Dados do produto:', formData);
    navigate('/produtos');
  };

  return (
    <div className="produto-form-page">
      <div className="form-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/produtos')}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1>Novo Produto</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Informações do Produto */}
          <div className="form-section">
            <h3>Informações do Produto</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Código *</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ex: PROD001"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Descrição do Produto *</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descrição detalhada do produto..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Cor</label>
                <input
                  type="text"
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                  placeholder="Ex: Preto, Azul Marinho"
                />
              </div>

              <div className="form-group">
                <label>Tamanho</label>
                <input
                  type="text"
                  name="tamanho"
                  value={formData.tamanho}
                  onChange={handleChange}
                  placeholder="Ex: P, M, G, 42, 48"
                />
              </div>

              <div className="form-group">
                <label>Quantidade *</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Valor (R$) *</label>
                <input
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/produtos')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-save"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
