import React, { createContext, useContext, useState, useEffect } from 'react';

import * as pedidoService from '../services/pedidoService';
import { criarPedido } from '../services/pedidoService';

export const PedidoContext = createContext({});

export const PedidoProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);

    const criarPedido = async (pedidoData) => {

        try{
            setLoading(true) ;

            console.log(pedidoData);
            const data = await pedidoService.criarPedido(pedidoData) ;

            return { success: true, data: data.data };
        }
        catch(error){
            return { success: false, error: error.message };
        }
        finally{
            setLoading(false) ;
        }
    }

    const listarPedidos = async () => {
        
        try{

            const data = await pedidoService.listarPedidos() ;

            return { success: true, data: data.data };
        }
        catch(error){
            return { success: false, error: error.message };
        }
        finally{
        }
    }



    // Valores que serão compartilhados com toda aplicação
    const value = {
        criarPedido,
    };

    return (
        <PedidoContext.Provider value={value}>
            {children}
        </PedidoContext.Provider>
    );
};

export const usePedido = () => {
  const context = useContext(PedidoContext);
  
  if (!context) {
    throw new Error('usePedido deve ser usado dentro de um PedidoProvider');
  }
  
  return context;
};

export default PedidoContext;
