import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [lojaId, setLojaIdState] = useState(() => {
        try {
            return window.localStorage.getItem('lojaId') || null;
        } catch (e) {
            return null;
        }
    });

    // Detecta :lojaId em padrões conhecidos de rota e sincroniza com o estado
    useEffect(() => {
        const path = location.pathname || '';

        // padrões suportados: /products/:lojaId, /dashboard/:lojaId, /loja/:lojaId, /stores/:lojaId
        const re = /(^\/(?:products|dashboard|loja|stores|shop)\/)([^\/]+)/i;
        const m = path.match(re);
        if (m && m[2]) {
            const slug = m[2];
            if (slug !== lojaId) {
                setLojaIdState(slug);
                try { window.localStorage.setItem('lojaId', slug); } catch (e) { }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const setLojaId = (id, { navigateTo = null } = {}) => {
        setLojaIdState(id);
        try {
            if (id) window.localStorage.setItem('lojaId', id);
            else window.localStorage.removeItem('lojaId');
        } catch (e) { }

        if (navigateTo && id) {
            // substitui :lojaId em navigateTo se conter :lojaId, senão concatena
            const target = navigateTo.includes(':lojaId') ? navigateTo.replace(':lojaId', id) : `${navigateTo.replace(/\/$/, '')}/${id}`;
            navigate(target);
        }
    };

    const clearLoja = () => setLojaId(null);

    return (
        <StoreContext.Provider value={{ lojaId, setLojaId, clearLoja }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error('useStore must be used within StoreProvider');
    return ctx;
};
