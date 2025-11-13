import React, { createContext, useContext, useState, useEffect } from 'react';

import * as produtoService from '../services/produtoService';

const ProdutoContext = createContext({});

export const ProdutoProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);

    const criarProduto = async (nome, estado, tamanho, descricao) => {

        try{
            setLoading(true) ;

            const data = await produtoService.criarProduto(nome, estado, tamanho, descricao) ;

            return { success: true, data: data.data };
        }
        catch(error){
            return { success: false, error: error.message };
        }
        finally{
            setLoading(false) ;
        }

    }

    const atualizarProduto = async (codigo, nome, estado, tamanho, descricao) => {
        try{
            setLoading(true) ;

            const data = await produtoService.atualizarProduto(nome, estado, tamanho, descricao) ;

            return { success: true, data: data.data };
        }
        catch(error){
            return { success: false, error: error.message };
        }
        finally{
            setLoading(false) ;
        }
    }

    const removerProduto = async (codigo) => {
        try{
            setLoading(true) ;

            const data = await produtoService.removerProduto(codigo) ;

            return { success: true, data: data.data };
        }
        catch(error){
            return { success: false, error: error.message };
        }
        finally{
            setLoading(false) ;
        }
    }

    const listarProdutos = async () => {
        try{
            setLoading(true) ;

            const produtos = await produtoService.listarProdutos() ;

            return ( produtos ); 
        }
        catch(error){
            return { success: false, error: error.message };
        }
        finally{
            setLoading(false) ;
        }
    }

    // Valores que serão compartilhados com toda aplicação
        const value = {
            criarProduto,
            atualizarProduto,
            removerProduto,
            listarProdutos,
        };
    
        return (
            <ProdutoContext.Provider value={value}>
                {children}
            </ProdutoContext.Provider>
        );
};
    
export const useProduto = () => {
    const context = useContext(ProdutoContext);
    
    if (!context) {
    throw new Error('useProduto deve ser usado dentro de um ProdutoProvider');
    }
    
    return context;
};

export default ProdutoContext;
    
