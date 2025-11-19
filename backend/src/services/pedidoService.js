import {supabaseSchema} from "../config/db.js";

export default class PedidoService{
    schema = supabaseSchema
    database = "pedidos"

    constructor(){}

    async validadorDeProduto(novoPedido) {


        if(novoPedido.produto_id == null || this.produto_id == ""){
            throw  new Error("id do produto nao pode ser nulo ou vazio");        }

        const { data: produto, error: produtoError } = await this.schema
            .from("produtos")
            .select("id")
            .eq("id", novoPedido.produto_id)
            .single();

        if (produtoError) throw new Error(`Erro ao buscar produto pelo produto_id: ${produtoError.message}`);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
    }

    async validadorDeUsuario(novoPedido) {

        if(novoPedido.cliente_cpf_cnpj == null || this.cliente_cpf_cnpj == ""){
            throw  new Error("cpf nao pode ser nulo ou vazio");
        }


        if(novoPedido.cliente_codigo == null || this.cliente_codigo == ""){
            throw  new Error("codigo do cliente nao pode ser nulo ou vazio");        }
        let clienteEncontrado = null;

        if (novoPedido.cliente_cpf_cnpj) {
            const { data, error } = await this.schema
                .from("clientes")
                .select("id")
                .eq("cpf_cnpj", novoPedido.cliente_cpf_cnpj)
                .single();

            if (error) throw new Error(`Erro ao buscar cliente por CPF: ${error.message}`);
            clienteEncontrado = data;

        } 
        else if (novoPedido.cliente_codigo) {
            const { data, error } = await this.schema
                .from("clientes")
                .select("id")
                .eq("codigo", novoPedido.cliente_codigo)
                .single();

            if (error) throw new Error(`Erro ao buscar cliente por CODIGO: ${error.message}`);
            clienteEncontrado = data;
        }

        if (!clienteEncontrado) {
            throw new Error("Cliente não encontrado.");
        }
        return clienteEncontrado;
    }

    async criarPedido(novoPedido) {
        // Acha Cliente
        let idCliente = await this.validadorDeUsuario(novoPedido);

        // Vericica se o produto é valido
        await this.validadorDeProduto(novoPedido);

        // Insere na database
        const { data, error } = await this.schema.
        from(this.database).insert({
            "cliente_id": idCliente.id,
            "produto_id": novoPedido.produto_id,
            "assinatura_base64": novoPedido.assinatura_base64,
            "data_aluguel": novoPedido.data_aluguel,
            "data_devolucao": novoPedido.data_devolucao,
            "link_assinatura_externa": novoPedido.link_assinatura_externa,
            "status": novoPedido.status,
            "status_assinatura": novoPedido.status_assinatura,
            "valor": novoPedido.valor
        })

        if (error){
            console.error("Erro ao criar pedido:", error.message);
            throw new Error("Nao foi possivel criar o pedido");
        } 
        else{
            return { success: true, message: "Pedido criado" };
        }
    }

    async listarPedidos(query){

        let selectQuery = this.schema.from(this.database).select()

        if(query.produto_id){
           selectQuery= selectQuery.eq("produto_id", query.produto_id)
        }
        if(query.cliente_id){
            selectQuery=  selectQuery.eq("cliente_id", query.cliente_id)
        }
        if(query.id){
            selectQuery= selectQuery.eq("id", query.id)
        }
        const {data, error} = await selectQuery
        if(error){
            throw Error(error.message);
        }
        return data;

    }

    async atualizarPedido(pedido){

        if(!pedido.id){
            throw Error("O 'id' do pedido é obrigatório para fazer a alteração")
        }

        // Se nenhum valor for inserido, nenhum dado vai ser atualizado
         const {data, error} = await this.schema.from(this.database).update({
            valor: pedido.valor,
            data_devolucao: pedido.data_devolucao,
            status: pedido.status,
            status_assinatura: pedido.status_assinatura,
            assinatura_base64: pedido.assinatura_base64,
            link_assinatura_externa:pedido.link_assinatura_externa,
            produto_id: pedido.produto_id,
            data_aluguel: pedido.data_aluguel
        }).eq("id",pedido.id).select()
        if (error){
            console.error("Erro ao buscar pedido:", error.message);
            throw new Error(error.message);
        }

        return data
    }

    async excluirPedido(query){

        if(!query.id){
            throw Error("O 'id' do pedido é obrigatório para a sua deleção")
        }

        const {data, error} = await this.schema.from(this.database).delete().eq("id",query.id).select()

        if (error){
            console.error("Erro ao buscar pedido:", error.message);
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            console.error("Pedido não encontrado: Nenhum item com o ID fornecido foi deletado.");
            throw new Error("Pedido não encontrado. O ID pode estar incorreto.");
        }
    }


}


