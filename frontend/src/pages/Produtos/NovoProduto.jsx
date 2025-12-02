import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import * as produtoService from '../../services/produtoService';
import { notifySuccess, notifyError, confirmAction } from '../../utils/alerts';
import './ProdutoForm.css';

export default function NovoProduto() {
  const navigate = useNavigate();
  
  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [preview, setPreview] = useState('');

  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    cor: '',
    tamanho: '',
    quantidade: '0',
    valor: ''
  });

  const [loading, setLoading] = useState(false);

  // --- Lógica de Imagem ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemArquivo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagemArquivo(null);
    setPreview('');
  };
  // ------------------------

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
      notifyError('Por favor, preencha todos os campos obrigatórios (código, descrição e valor)');
      return;
    }

    try {
      setLoading(true);
      
      const dataToSend = new FormData();

      dataToSend.append('codigo', formData.codigo);
      dataToSend.append('descricao', formData.descricao);
      dataToSend.append('cor', formData.cor);
      dataToSend.append('tamanho', formData.tamanho);
      dataToSend.append('quantidade', formData.quantidade);
      dataToSend.append('valor', formData.valor);

      if (imagemArquivo) {
        dataToSend.append('imagem', imagemArquivo); 
      }
      // ---------------------------------------------------------

      const response = await produtoService.createProduto(dataToSend);
      
      if (response.success) {
        await notifySuccess('Produto criado com sucesso!');
        navigate('/produtos');
      } else {
        notifyError(response.error || 'Erro ao criar produto');
      }
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      const errorMsg = 'Erro ao criar produto. Tente novamente.';
      notifyError(errorMsg);
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
          
          {/* --- SEÇÃO DE IMAGEM --- */}
          <div className="form-section">
            <h3>Imagem do Produto</h3>
            <div className="image-upload-container">
                {!preview ? (
                    <label className="image-upload-box">
                        <Upload size={32} className="upload-icon" />
                        <span>Clique para enviar uma foto</span>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            hidden 
                        />
                    </label>
                ) : (
                    <div className="image-preview-box">
                        <img src={preview} alt="Preview do produto" />
                        <button type="button" onClick={removeImage} className="btn-remove-image" title="Remover foto">
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>
          </div>

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