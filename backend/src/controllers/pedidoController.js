import PedidoInputDto from "../models/pedidoInputDto.js";
import PedidoService from "../services/pedidoService.js";

export default class pedidoController{

    service;
    constructor(){
        this.service = new PedidoService();
    }


    criarPedido = async (req,res )=>{
        try {
            let novoPedido  = new PedidoInputDto(req.body)
            let response = await this.service.criarPedido(novoPedido)
            return res.status(200).send({response})
        }
        catch (error) {

            if (error.message.includes('Erro ao buscar cliente por CPF:')){
                return res.status(400).json({"message":"Erro ao tentar buscar o cliente por CPF","error":`${error.message}` });
            }

            if (error.message.includes('Erro ao buscar cliente por CODIGO:')){
                return res.status(400).json({"message":"Erro ao tentar buscar o cliente por codigo","error":`${error.message}` });
            }

            if (error.message.includes('Erro ao buscar produto pelo produto_id:')){
                return res.status(400).json({"message":"Erro ao buscar produto pelo produto_id:","error":`${error.message}` });
            }
            if (error.message.includes('Não foi possivel criar o pedido')){
                return res.status(400).json({"message":"Não foi possivel criar o pedido","error":`${error.message}` });
            }
            return res.status(400).json({ error: error.message });


        }
    }

    listarPedidos = async (req,res)=>{
        try {
            return res.status(200).json( await this.service.listarPedidos(req.query))
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }

    atualizarPedido = async (req,res) =>{
        try {
            let novoPedido  = new PedidoInputDto(req.body)
            let result = await this.service.atualizarPedido(novoPedido)
            return res.status(200).send(result)
        }
        catch (error) {
            if(error.message.includes("O 'id' do pedido é obrigatorio para realizar alterações")){
                return res.status(400).json({error:error.message})
            }
            return res.status(500).json({ error: error.message });
        }

    }

    excluirPedido = async (req,res )=>{
    
        try {
            await this.service.excluirPedido(req.query);
            return res.status(200).json({message: "Pedido Excluído com Sucesso!"}).send();
        }
        catch (error) {
            return res.status(400).json({ error: error.message }).send();
        }
    }
}
