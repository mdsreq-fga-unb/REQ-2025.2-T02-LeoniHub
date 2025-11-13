import React, { createContext, useContext, useState, useEffect } from 'react';

import * as produtoService from '../services/produtoService';

const produtoContext = createContext({});

export const ProductProvider = ({ children }) => {

    // Estados compartilhados
    const [lojaId, setLojaId] = useState(null);
    const [loading, setLoading] = useState(true);


    // Função de CRIAR PRODUTO
    const createProduto = async (nome, estado, tamanho, descricao) => {

        try{
            setLoading(true) ;

            const data = await produtoService.criarProduto(nome, estado, tamanho, descricao) ;

        }
        catch{



        }
        finally{
            setLoading(false) ;
        }

    }
}