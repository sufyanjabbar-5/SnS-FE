import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="SnSCCS" className="logo-img" />
            {/* {sidebarOpen && <span>PMI Academy</span>} */}
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className="nav-item">
            <i className="fas fa-chart-line"></i>
            {sidebarOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/admin/certifications" className="nav-item">
            <i className="fas fa-certificate"></i>
            {sidebarOpen && <span>Certifications</span>}
          </NavLink>

          <NavLink to="/admin/enrollments" className="nav-item">
            <i className="fas fa-user-graduate"></i>
            {sidebarOpen && <span>Enrollments</span>}
          </NavLink>

          <NavLink to="/admin/users" className="nav-item">
            <i className="fas fa-users"></i>
            {sidebarOpen && <span>Users</span>}
          </NavLink>



          <NavLink to="/admin/chat-leads" className="nav-item">
            <i className="fas fa-comments"></i>
            {sidebarOpen && <span>Chat Leads</span>}
          </NavLink>

          <div className="nav-divider"></div>

          <NavLink to="/admin/settings" className="nav-item">
            <i className="fas fa-cog"></i>
            {sidebarOpen && <span>Settings</span>}
          </NavLink>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'}`}></i>
          </button>

          <div className="header-right">
            <div className="header-user">
              <div className="user-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="user-info">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
