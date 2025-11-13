import React, { useState, useEffect } from 'react';
import styles from './CriarPedido.module.css';
import { useNavigate } from 'react-router-dom';

import { useProduto } from '../../contexts/ProdutoContext';
import { usePedido } from '../../contexts/PedidoContext';

// MOCK: SIMULAÇÃO DA FUNÇÃO DE CLIENTES
const useCliente = () => ({
    listarClientes: async () => [
        { id: '1', nome: 'João da Silva' , cpf:'05323378166'},
        { id: '2', nome: 'Maria Souza' , cpf: '06256329155'},
    ]
});

export default function CriarPedido() {
  const navigate = useNavigate();

  // Campos das informações da DataBase
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // Campos do formulário
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [dataAluguel, setDataAluguel] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('PIX');


  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingDados, setLoadingDados] = useState(true);

  const { criarPedido, loading } = usePedido();
  const { listarProdutos } = useProduto();
  const { listarClientes } = useCliente(); // ESTÁ NO MOCK (TEMPORARIO)


  const validaCampos = () => {
    if (!cliente) return 'Selecione um cliente';
    if (!produto) return 'Selecione um produto';
    if (!dataAluguel) return 'Informe a data de retirada';
    if (!dataDevolucao) return 'Informe a data de devolução';
    if (new Date(dataDevolucao) < new Date(dataAluguel)) return 'Data de devolução anterior à retirada';
    if (!valorTotal || Number.isNaN(Number(valorTotal))) return 'Informe um valor total válido';
    return null;
  };

  const handleCriarPedido = async (e) => {
    e.preventDefault();
    setError('');

    const err = validaCampos();
    if (err) {
      setError(err);
      return;
    }

    const pedidoData = {
      cliente_cpf_cnpj: cliente,
      valor: parseFloat(valorTotal),
      data_aluguel: dataAluguel,
      data_devolucao: dataDevolucao,
      status: "AGUARDANDO_ASSINATURA",
      status_assinatura: "PENDENTE",
      assinatura_base64: "TESTE",
      link_assinatura_externa: "TESTE",
      produto_id: produto,
    };

    console.log(produto) ;
    console.log(cliente) ;

    // Chama Context
    const result = await criarPedido(pedidoData);
    
    if (result.success) {
      setCliente('');
      setProduto('');
      setDataAluguel('');
      setDataDevolucao('');
      setValorTotal('');
      setFormaPagamento('PIX'); 

      setSuccessMessage('Pedido criado com sucesso!');
      console.log('Pedido criado:', pedidoData);
    } 
    else {
      setError(result.error || 'Erro ao criar pedido');
    }

  };

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      setLoadingDados(true);
      setError('');
      try {

        setClientes(await listarClientes()); 

        const produtos = await listarProdutos() ;
        setProdutos(produtos); 

        console.log('Produtos Carregados:', produtos);
      } 
      catch (e) {
        console.error('Erro ao carregar dados iniciais:', e);
        setError('Erro ao carregar clientes e produtos. Tente novamente');
      } 
      finally {
        setLoadingDados(false);
      }
    };

    carregarDadosIniciais();
  }, []);

  const isFormDisabled = loading || loadingDados;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Pedido</h1>

      <div className={styles.content}>
        <div className={styles.card}>
          {loadingDados ? (
            <p>Carregando dados iniciais (clientes e produtos)...</p>
          ) : (
            <form className={styles.form} onSubmit={handleCriarPedido}>
              {error && <div className={styles.alertError}>{error}</div>}
              {successMessage && <div className={styles.alertSuccess}>{successMessage}</div>}

              <label>Cliente</label>
              <select 
                value={cliente} 
                onChange={(e) => setCliente(e.target.value)}
                disabled={isFormDisabled}
              >
                <option value="">Selecione um Cliente</option>
                {clientes.map(c => (
                    <option key={c.id} value={c.cpf}>
                        {c.nome}
                    </option>
                ))}
              </select>

              <label>Produto</label>
              <select 
                value={produto} 
                onChange={(e) => setProduto(e.target.value)}
                disabled={isFormDisabled}
              >
                <option value="">Selecione um Produto</option>
                {produtos.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.descricao}
                    </option>
                ))}
              </select>

              <label>Data de Retirada</label>
              <input 
                type="date" 
                value={dataAluguel} 
                onChange={(e) => setDataAluguel(e.target.value)} 
                disabled={isFormDisabled}
              />

              <label>Data de Devolução</label>
              <input 
                type="date" 
                value={dataDevolucao} 
                onChange={(e) => setDataDevolucao(e.target.value)} 
                disabled={isFormDisabled}
              />

              <label>Valor Total</label>
              <input 
                type="number" 
                step="0.01" 
                value={valorTotal} 
                onChange={(e) => setValorTotal(e.target.value)} 
                placeholder="0.00" 
                disabled={isFormDisabled}
              />

              <label>Forma de pagamento</label>
              <select 
                value={formaPagamento} 
                onChange={(e) => setFormaPagamento(e.target.value)}
                disabled={isFormDisabled}
              >
                <option>PIX</option>
                <option>Cartão de Crédito</option>
                <option>Cartão de Débito</option>
                <option>Dinheiro</option>
              </select>

              <div className={styles.buttons}>

                <button type="submit" className={styles.primary} disabled={isFormDisabled}>
                  {loading ? 'Confirmando...' : 'Confirmar Pedido'}
                </button>

                <button type="button" className={styles.secondary} onClick={() => navigate(-1)} disabled={isFormDisabled}>
                  Cancelar
                </button>

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}