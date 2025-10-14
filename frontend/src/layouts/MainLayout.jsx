import React from 'react';
import { Outlet } from 'react-router-dom'; // 👈 PASSO MAIS IMPORTANTE!
import Header from '../components/Header/Header'; // Ajuste o caminho se necessário
import Footer from '../components/Footer/Footer'; // Ajuste o caminho se necessário

const MainLayout = () => {
  return (
    <div className="app-container">
      {/* O Header (com a Navbar dentro) aparece em todas as páginas */}
      <Header />

      {/* A tag <main> é semanticamente correta para o conteúdo principal */}
      <main>
        {/* 👇 Aqui é onde o conteúdo da sua página específica será renderizado */}
        <Outlet />
      </main>

      {/* O Footer também aparece em todas as páginas */}
      <Footer />
    </div>
  );
};

export default MainLayout;