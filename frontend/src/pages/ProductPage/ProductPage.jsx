import ProductForm from '../../components/UI/ProductPage/ProductForm';

export default function Product() {
    const handleSubmit = (data) => {
        // placeholder: aqui você integrará com o backend quando estiver pronto
        console.log('Produto enviado:', data);
    };

    const handleCancel = () => {
        // placeholder: ações ao cancelar
        console.log('Formulário cancelado');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
    );
}

