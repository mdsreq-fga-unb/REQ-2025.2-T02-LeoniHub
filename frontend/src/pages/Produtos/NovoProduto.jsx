import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as produtoService from '../../services/produtoService';
import './ProdutoForm.css';

export default function NovoProduto() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    cor: '',
    tamanho: '',
    quantidade: '0',
    valor: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.codigo || !formData.descricao || !formData.valor) {
      alert('Por favor, preencha todos os campos obrigatórios (código, descrição e valor)');
      return;
    }

    try {
      setLoading(true);
      
      const produtoData = {
        ...formData,
        quantidade: parseInt(formData.quantidade) || 0,
        valor: parseFloat(formData.valor)
      };

      const response = await produtoService.createProduto(produtoData);
      
      if (response.success) {
        alert('Produto criado com sucesso!');
        navigate('/produtos');
      } else {
        alert(response.error || 'Erro ao criar produto');
      }
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      const errorMsg = 'Erro ao criar produto. Tente novamente.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="produto-form-page">
      <div className="form-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/produtos')}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>
        <h1>Novo Produto</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          
          <div className="form-section">
            <h3>Informações do Produto</h3>
            
            <div className="form-grid">
              
              <div className="form-group span-4"> 
                <label>Código *</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ex: PROD001"
                  required
                  style={{ maxWidth: '300px' }} 
                />
              </div>

              <div className="form-group span-4">
                <label>Descrição do Produto *</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descrição detalhada do produto..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group span-1">
                <label>Cor</label>
                <input
                  type="text"
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                  placeholder="Ex: Preto"
                />
              </div>

              <div className="form-group span-1">
                <label>Tamanho</label>
                <input
                  type="text"
                  name="tamanho"
                  value={formData.tamanho}
                  onChange={handleChange}
                  placeholder="Ex: P, M, G"
                />
              </div>

              <div className="form-group span-1">
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

              <div className="form-group span-1">
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

          <div className="form-divider"></div>

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
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}