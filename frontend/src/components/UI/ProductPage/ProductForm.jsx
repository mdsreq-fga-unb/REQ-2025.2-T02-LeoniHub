import React, { useState } from 'react';
import styles from './ProductForm.module.css';

export default function ProductForm({ initialData = {}, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nome: initialData.nome || '',
        codigo: initialData.codigo || '',
        tamanho: initialData.tamanho || '',
        tipo: initialData.tipo || '',
        cor: initialData.cor || '',
        estado: initialData.estado || '',
        preco: initialData.preco || '',
        quantidade: initialData.quantidade || '',
        foto: initialData.foto || null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
        }
    };

    const handleSalvar = () => {
        if (!formData.nome || !formData.tipo || !formData.preco || !formData.quantidade) {
            window.alert('Por favor, preencha o nome, tipo e preço do produto');
            return;
        }

        const dataToSend = new FormData();

        if (formData.foto && formData.foto instanceof File) {
            dataToSend.append('foto', formData.foto);
        }

        for (const key in formData) {
            if (key !== 'foto') {
                dataToSend.append(key, formData[key]);
            }
        }

        if (onSubmit) onSubmit(dataToSend);
    }

    const handleLimpar = () => {
        setFormData({
            nome: '',
            codigo: '',
            tamanho: '',
            tipo: '',
            cor: '',
            estado: '',
            preco: '',
            quantidade: '',
            foto: null,
        });
        if (onCancel) onCancel();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Cadastro de Produto</h3>
                </div>
                <div className={styles.content}>
                    <div className={styles.field}>
                        <label htmlFor="nome" className={styles.label}>Nome do Produto</label>
                        <input id="nome" name="nome" type="text" placeholder="Digite o nome do produto" value={formData.nome} onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="codigo" className={styles.label}>Código</label>
                        <input id="codigo" name="codigo" type="text" placeholder="SKU-001" value={formData.codigo} onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="preco" className={styles.label}>Preço</label>
                        <input id="preco" name="preco" type="text" placeholder="200,00" value={formData.preco} onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="tamanho" className={styles.label}>Tamanho</label>
                        <select id="tamanho" value={formData.tamanho} onChange={(e) => handleSelectChange('tamanho', e.target.value)} className={styles.select}>
                            <option value="">Selecione</option>
                            <option value="pp">PP</option>
                            <option value="p">P</option>
                            <option value="m">M</option>
                            <option value="g">G</option>
                            <option value="gg">GG</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="tipo" className={styles.label}>Tipo</label>
                        <select id="tipo" value={formData.tipo} onChange={(e) => handleSelectChange('tipo', e.target.value)} className={styles.select}>
                            <option value="">Selecione</option>
                            <option value="terno">terno</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="cor" className={styles.label}>Cor</label>
                        <select id="cor" value={formData.cor} onChange={(e) => handleSelectChange('cor', e.target.value)} className={styles.select}>
                            <option value="">Selecione</option>
                            <option value="vermelho">Vermelho</option>
                            <option value="amarelo">Amarelo</option>
                            <option value="verde">Verde</option>
                            <option value="azul">Azul</option>
                            <option value="cinza">Cinza</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="estado" className={styles.label}>Estado</label>
                        <select id="estado" value={formData.estado} onChange={(e) => handleSelectChange('estado', e.target.value)} className={styles.select}>
                            <option value="">Selecione</option>
                            <option value="novo">Novo</option>
                            <option value="usado">Usado</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="quantidade" className={styles.label}>Quantidade</label>
                        <input id="quantidade" name="quantidade" type="text" placeholder="5" value={formData.quantidade} onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="foto" className={styles.label}>Foto do Produto</label>
                        <input id="foto" name="foto" type="file" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
                        {formData.foto && <p className="text-xs" style={{ color: '#6b7280' }}>Arquivo: {formData.foto.name}</p>}
                    </div>

                    <div className={styles.actions}>
                        <button onClick={handleSalvar} className={styles.primaryBtn}>Salvar</button>
                        <button onClick={handleLimpar} className={styles.secondaryBtn}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
