import React, { useState, useEffect } from 'react';
import styles from './CriarPedido.module.css';
import { useNavigate } from 'react-router-dom';

import { getAllProdutos } from '../../services/produtoService';
import { criarPedido } from '../../services/pedidoService';
import { getClienteById, getAllClientes } from '../../services/clienteService';
import { notifySuccess, notifyError, confirmAction } from '../../utils/alerts';

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
  const [descricao, setDescricao] = useState('');


  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingDados, setLoadingDados] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const carregarDadosIniciais = async () => {
        setLoadingDados(true);
        setError('');
        try {

          const clientesResponse = await getAllClientes();
          setClientes(clientesResponse.data || []); 

          const produtosResponse = await getAllProdutos();
          setProdutos(produtosResponse.data || []); 
          console.log('Produtos Carregados:', produtosResponse.data);
          
        }
        catch (e) {
          console.error('Erro ao carregar dados iniciais:', e);
          notifyError('Erro ao carregar clientes e produtos. Tente novamente');
        } 
        finally {
          setLoadingDados(false);
        }
      };

    carregarDadosIniciais();
  }, []);

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
    setLoading(true);

    const err = validaCampos();
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    let clienteObjeto = (await getClienteById(cliente)).data ;

    // Objeto para Pedido
    const pedidoData = {
      cliente_cpf_cnpj: clienteObjeto.cpf_cnpj,
      valor: parseFloat(valorTotal),
      data_aluguel: dataAluguel,
      data_devolucao: dataDevolucao,
      status: "PREPARACAO",
      produto_id: produto,
      descricao: descricao,
    };
    
    try{
      // Chama Service 
      await criarPedido(pedidoData);
    
      setCliente('');
      setProduto('');
      setDataAluguel('');
      setDataDevolucao('');
      setValorTotal('');
      setFormaPagamento('PIX'); 

      await notifySuccess('Pedido criado com sucesso!');
      console.log('Pedido criado:', pedidoData);
      navigate('/pedidos');
    } 
    catch(error){
      console.log(error);
      await notifyError('Erro ao Criar Pedido');
    } finally {
      setLoading(false);
    }
    
  };

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
                    <option key={c.id} value={c.id}>
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
                      {p.codigo}
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

              <label>Descrição do Pedido</label>
              <textarea 
                id="descricao"
                name="descricao"
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                placeholder="Detalhes adicionais..."
                disabled={isFormDisabled}
                rows={4}
              />

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
};