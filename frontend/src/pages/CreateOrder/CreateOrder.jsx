import React, { useState } from 'react';
import styles from './CreateOrder.module.css';
import { useNavigate } from 'react-router-dom';

/**
 * Tela de "Criar Pedido" - versão inicial apenas UI+validação leve.
 * Integre com sua API de pedidos substituindo o bloco do fetch (comentado). Assim que substituído, apagar os comentários deixados!
 */

export default function CreateOrder() {
  const navigate = useNavigate();

  // campos do formulário
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('PIX');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // MOCK: substitua por fetch para sua API de clientes/produtos!!!!!!
  // NÃO ESQUEÇA DE REMOVER ESSE BLOCO DEPOIS!!!!
  const clientes = [
    { id: 'c1', nome: 'João Silva' },
    { id: 'c2', nome: 'Maria Souza' }
  ];
  const produtos = [
    { id: 'p1', nome: 'Terno Slim Fit' },
    { id: 'p2', nome: 'Paletó Clássico' }
  ];

  const validate = () => {
    if (!cliente) return 'Selecione um cliente';
    if (!produto) return 'Selecione um produto';
    if (!dataRetirada) return 'Informe a data de retirada';
    if (!dataDevolucao) return 'Informe a data de devolução';
    if (new Date(dataDevolucao) < new Date(dataRetirada)) return 'Data de devolução anterior à retirada';
    if (!valorTotal || Number.isNaN(Number(valorTotal))) return 'Informe um valor total válido';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setSubmitting(true);
    try {
      // Substitua este bloco por chamada real à sua API:
      // const resp = await fetch(`/api/pedidos`, { method: 'POST', body: JSON.stringify({ ... }) })
      // const data = await resp.json()
      await new Promise(r => setTimeout(r, 700)); 
      console.log('Pedido criado:', {
        cliente, produto, dataRetirada, dataDevolucao, valorTotal, formaPagamento
      });

      setSuccess('Pedido criado com sucesso!');
      setCliente('');
      setProduto('');
      setDataRetirada('');
      setDataDevolucao('');
      setValorTotal('');
      setFormaPagamento('PIX');


    } catch (e) {
      setError('Erro ao criar pedido');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Pedido</h1>

      <div className={styles.content}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.alertError}>{error}</div>}
          {success && <div className={styles.alertSuccess}>{success}</div>}

          <label>Cliente</label>
          <select value={cliente} onChange={(e) => setCliente(e.target.value)}>
            <option value="">Selecione</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>

          <label>Produto</label>
          <select value={produto} onChange={(e) => setProduto(e.target.value)}>
            <option value="">Selecione</option>
            {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>

          <label>Data de Retirada</label>
          <input type="date" value={dataRetirada} onChange={(e) => setDataRetirada(e.target.value)} />

          <label>Data de Devolução</label>
          <input type="date" value={dataDevolucao} onChange={(e) => setDataDevolucao(e.target.value)} />

          <label>Valor Total</label>
          <input type="number" step="0.01" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} placeholder="0.00" />

          <label>Forma de pagamento</label>
          <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
            <option>PIX</option>
            <option>Cartão</option>
            <option>Dinheiro</option>
          </select>

          <div className={styles.buttons}>
            <button type="submit" className={styles.primary} disabled={submitting}>
              {submitting ? 'Confirmando...' : 'Confirmar Pedido'}
            </button>
            <button type="button" className={styles.secondary} onClick={() => navigate(-1)} disabled={submitting}>
              Cancelar
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}