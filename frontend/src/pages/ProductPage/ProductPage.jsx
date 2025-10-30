import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/UI/ProductPage/ProductForm';


export default function Product() {

    const { lojaId: contextLojaId } = useStore();
    const { lojaId: paramLojaId } = useParams();
    const lojaId = String(paramLojaId || contextLojaId || 'loja1');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setLoading(true);

        try {

            const preco = formData.get('preco');
            const quantidade = formData.get('quantidade');

            const precoNum = parseFloat(preco.replace(',', '.'));
            const quantidadeNum = parseInt(quantidade || 0, 10);

            if (isNaN(precoNum) || isNaN(quantidadeNum)) {
                window.alert('Erro: Preço e Quantidade devem ser números válidos.');
                setLoading(false);
                return;
            }
            console.log('Loja ID enviado ao backend:', lojaId, typeof lojaId);

            const res = await fetch(`http://localhost:3001/products`, {
                method: 'POST',
                headers: {
                    'x-loja-id': lojaId
                },
                body: formData
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            window.alert(`Produto "${data.data.nome}" criado com sucesso na loja ${lojaId}!`);

            // Após criar com sucesso, navegar para a página de Estoque (dashboard)
            try {
                navigate(`/dashboard/${lojaId}`);
            } catch (e) {
                console.warn('Navegação falhou:', e);
            }

        } catch (err) {
            console.error('Erro ao criar produto:', err);
            window.alert(`Erro ao criar produto: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        console.log('Formulário cancelado');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>Salvando...</div>}
            <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} disabled={loading} />
        </div>
    );

}

