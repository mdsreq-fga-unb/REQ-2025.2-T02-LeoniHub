import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import * as produtoService from '../../services/produtoService';
import './ProdutoForm.css';

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    cor: '',
    tamanho: '',
    quantidade: '',
    valor: ''
  });

  const [novaImagem, setNovaImagem] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduto();
  }, [id]);

  const loadProduto = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await produtoService.getProdutoById(id);
      
      if (response.success && response.data) {
        const produto = response.data;
        setFormData({
          codigo: produto.codigo || '',
          descricao: produto.descricao || '',
          cor: produto.cor || '',
          tamanho: produto.tamanho || '',
          quantidade: produto.quantidade?.toString() || '0',
          valor: produto.valor?.toString() || ''
        });

        if (produto.foto) {
          setPreview(produto.foto);
        }

      } else {
        setError(response.error || 'Erro ao carregar produto');
      }
    } catch (err) {
      console.error('Erro ao carregar produto:', err);
      setError('Erro ao carregar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // --- Lógica de Imagem ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNovaImagem(file); // Guarda o arquivo para enviar depois
      setPreview(URL.createObjectURL(file)); // Mostra preview
    }
  };

  const removeNewImage = () => {
    setNovaImagem(null);
    loadProduto();
  };
  
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
      setSaving(true);
      setError(null);
      
      const dataToSend = new FormData();

      // Campos a serem atualizados
      dataToSend.append('codigo', formData.codigo);
      dataToSend.append('descricao', formData.descricao);
      dataToSend.append('cor', formData.cor);
      dataToSend.append('tamanho', formData.tamanho);
      dataToSend.append('quantidade', formData.quantidade);
      dataToSend.append('valor', formData.valor);

      if (novaImagem) {
        dataToSend.append('imagem', novaImagem);
      }

      const response = await produtoService.updateProduto(id, dataToSend);
      
      if (response.success) {
        alert('Produto atualizado com sucesso!');
        navigate(`/produtos/${id}`);
      } else {
        setError(response.error || 'Erro ao atualizar produto');
        alert(response.error || 'Erro ao atualizar produto');
      }
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      const errorMsg = 'Erro ao atualizar produto. Tente novamente.';
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="produto-form-page">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.codigo) {
    return (
      <div className="produto-form-page">
        <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/produtos')}
            style={{ 
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#14b8a6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Voltar para Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="produto-form-page">
      <div className="form-header">
        <button 
          className="btn-back"
          onClick={() => navigate(`/produtos/${id}`)}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1>Editar Produto</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>

          {/* CAMPO DA IMAGEM */}
          <div className="form-section">
            <h3>Imagem do Produto</h3>
            <div className="image-upload-container">
                {!preview ? (
                    <label className="image-upload-box">
                        <Upload size={32} className="upload-icon" />
                        <span>Clique para alterar a foto</span>
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
                        <label className="btn-change-image" title="Trocar foto">
                            <Upload size={16} color="white"/>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange}
                                hidden 
                            />
                        </label>
                    </div>
                )}
            </div>
            {!novaImagem && preview && (
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '-10px'}}>
                   * A foto atual será mantida se você não selecionar uma nova.
                </p>
            )}
          </div>

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
              onClick={() => navigate(`/produtos/${id}`)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
