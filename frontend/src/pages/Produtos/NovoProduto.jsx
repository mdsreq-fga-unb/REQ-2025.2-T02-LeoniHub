import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ProdutoForm.css';

export default function NovoProduto() {
  const navigate = useNavigate();
  
  const [tipoProduto, setTipoProduto] = useState('individual');
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    valorDia: '',
    estoque: '',
    tamanho: '',
    cor: '',
    marca: ''
  });

  // Para conjuntos
  const [pecasConjunto, setPecasConjunto] = useState([
    { id: 1, tipo: '', tamanho: '', cor: '' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePecaChange = (id, field, value) => {
    setPecasConjunto(prev => 
      prev.map(peca => 
        peca.id === id ? { ...peca, [field]: value } : peca
      )
    );
  };

  const adicionarPeca = () => {
    const novoId = Math.max(...pecasConjunto.map(p => p.id)) + 1;
    setPecasConjunto(prev => [
      ...prev,
      { id: novoId, tipo: '', tamanho: '', cor: '' }
    ]);
  };

  const removerPeca = (id) => {
    if (pecasConjunto.length > 1) {
      setPecasConjunto(prev => prev.filter(peca => peca.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (tipoProduto === 'individual') {
      if (!formData.nome || !formData.categoria || !formData.valorDia || !formData.estoque) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
      }
    } else {
      if (!formData.nome || !formData.valorDia) {
        alert('Por favor, preencha o nome e valor do conjunto');
        return;
      }
      const pecasValidas = pecasConjunto.every(peca => peca.tipo && peca.tamanho);
      if (!pecasValidas) {
        alert('Por favor, preencha tipo e tamanho de todas as peças do conjunto');
        return;
      }
    }

    console.log('Tipo:', tipoProduto);
    console.log('Dados:', formData);
    if (tipoProduto === 'conjunto') {
      console.log('Peças do conjunto:', pecasConjunto);
    }
    
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
          {/* Tipo de Produto */}
          <div className="form-section">
            <h3>Tipo de Produto</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="individual"
                  checked={tipoProduto === 'individual'}
                  onChange={(e) => setTipoProduto(e.target.value)}
                />
                <span>Produto Individual</span>
                <p className="radio-description">Um único item para aluguel</p>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="conjunto"
                  checked={tipoProduto === 'conjunto'}
                  onChange={(e) => setTipoProduto(e.target.value)}
                />
                <span>Conjunto</span>
                <p className="radio-description">Conjunto de peças (ex: calça + paletó + colete)</p>
              </label>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="form-section">
            <h3>Informações Básicas</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome do Produto *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Terno Slim Azul Marinho"
                  required
                />
              </div>

              {tipoProduto === 'individual' && (
                <div className="form-group">
                  <label>Categoria *</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Paletó">Paletó</option>
                    <option value="Calça">Calça</option>
                    <option value="Colete">Colete</option>
                    <option value="Camisa">Camisa</option>
                    <option value="Gravata">Gravata</option>
                    <option value="Sapato">Sapato</option>
                    <option value="Acessórios">Acessórios</option>
                  </select>
                </div>
              )}

              <div className="form-group full-width">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descrição detalhada do produto..."
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Peças do Conjunto (apenas se tipo = conjunto) */}
          {tipoProduto === 'conjunto' && (
            <div className="form-section">
              <div className="section-header">
                <h3>Peças do Conjunto</h3>
                <button 
                  type="button" 
                  className="btn-add-peca"
                  onClick={adicionarPeca}
                >
                  + Adicionar Peça
                </button>
              </div>
              
              {pecasConjunto.map((peca, index) => (
                <div key={peca.id} className="peca-card">
                  <div className="peca-header">
                    <span className="peca-numero">Peça {index + 1}</span>
                    {pecasConjunto.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove-peca"
                        onClick={() => removerPeca(peca.id)}
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Tipo *</label>
                      <select
                        value={peca.tipo}
                        onChange={(e) => handlePecaChange(peca.id, 'tipo', e.target.value)}
                        required
                      >
                        <option value="">Selecione...</option>
                        <option value="Paletó">Paletó</option>
                        <option value="Calça">Calça</option>
                        <option value="Colete">Colete</option>
                        <option value="Camisa">Camisa</option>
                        <option value="Gravata">Gravata</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tamanho *</label>
                      <input
                        type="text"
                        value={peca.tamanho}
                        onChange={(e) => handlePecaChange(peca.id, 'tamanho', e.target.value)}
                        placeholder="Ex: P, M, 42, 48"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cor</label>
                      <input
                        type="text"
                        value={peca.cor}
                        onChange={(e) => handlePecaChange(peca.id, 'cor', e.target.value)}
                        placeholder="Ex: Azul Marinho"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="info-box">
                <strong>Dica:</strong> Cada peça do conjunto pode ter tamanhos diferentes, 
                permitindo flexibilidade na composição dos conjuntos para os clientes.
              </div>
            </div>
          )}

          {/* Detalhes do Produto (apenas se individual) */}
          {tipoProduto === 'individual' && (
            <div className="form-section">
              <h3>Detalhes do Produto</h3>
              <div className="form-grid">
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
                  <label>Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    placeholder="Marca do produto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Valores e Estoque */}
          <div className="form-section">
            <h3>Valores e Estoque</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Valor por Dia (R$) *</label>
                <input
                  type="number"
                  name="valorDia"
                  value={formData.valorDia}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              {tipoProduto === 'individual' && (
                <div className="form-group">
                  <label>Quantidade em Estoque *</label>
                  <input
                    type="number"
                    name="estoque"
                    value={formData.estoque}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              )}
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
