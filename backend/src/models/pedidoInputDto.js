export default class PedidoInputDto {

    id;
    cliente_cpf_cnpj
    cliente_codigo
    valor;
    data_aluguel;
    data_devolucao;
    status;
    status_assinatura;
    assinatura_base64;
    link_assinatura_externa;
    produto_id;

    /**
     * @param {object} data
     */
    constructor(data) {
        this.id = data.id;
        this.cliente_cpf_cnpj = data.cliente_cpf_cnpj;
        this.cliente_codigo = data.cliente_codigo;
        this.valor = data.valor;
        this.data_aluguel = data.data_aluguel;
        this.data_devolucao = data.data_devolucao;
        this.status = data.status;
        this.status_assinatura = data.status_assinatura;
        this.assinatura_base64 = data.assinatura_base64;
        this.link_assinatura_externa = data.link_assinatura_externa;
        this.produto_id = data.produto_id;
    }
}