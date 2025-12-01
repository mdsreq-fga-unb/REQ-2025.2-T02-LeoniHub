import React from 'react';
import { Outlet } from 'react-router-dom';
import { Package, BarChart3, Users, ShoppingCart, Calendar, DollarSign, UserCheck, Truck, LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import leoniLogo from '../../assets/img/leonni_logo.jpeg';
import './MainLayout.css';

export function MainLayout() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { title: "Dashboard", url: "/", icon: BarChart3 },
    { title: "Clientes", url: "/clientes", icon: Users },
    { title: "Produtos", url: "/produtos", icon: Package },
    { title: "Pedidos", url: "/pedidos", icon: ShoppingCart },
    { title: "Agenda", url: "/agenda", icon: Calendar },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <img src={leoniLogo} alt="Leoni Hub Logo" />
            </div>
            <div className="logo-text">
              <h1>Leoni Hub</h1>
              <p>Gestão de Aluguéis</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">Navegação</p>
          <ul className="nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className={`nav-link ${isActive(item.url) ? 'active' : ''}`}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleSignOut}>
            <LogOut className="nav-icon" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="main-header">
          <h2>Sistema de Gestão de Aluguéis</h2>
        </header>
        
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
