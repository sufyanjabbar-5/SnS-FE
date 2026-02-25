import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./StudentLayout.css";

const StudentLayout: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    showToast("Logged out successfully", "info");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="student-layout">
      <aside className={`student-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <div className="logo" onClick={() => navigate("/")}>
              <img
                src="/logo.png"
                alt="SnSCCS"
                className="logo-img"
              />
            </div>
            <button className="sidebar-toggle-sidebar" onClick={toggleSidebar}>
              <i className={`fas fa-${sidebarOpen ? 'chevron-left' : 'bars'}`}></i>
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/student/dashboard" className="nav-item">
            <i className="fas fa-home"></i>
            {sidebarOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/student/enrollments" className="nav-item">
            <i className="fas fa-book-open"></i>
            {sidebarOpen && <span>My Courses</span>}
          </NavLink>

          <NavLink to="/student/certifications" className="nav-item">
            <i className="fas fa-award"></i>
            {sidebarOpen && <span>My Certifications</span>}
          </NavLink>

          <NavLink to="/student/profile" className="nav-item">
            <i className="fas fa-user"></i>
            {sidebarOpen && <span>Profile</span>}
          </NavLink>

          <NavLink to="/student/study-buddy" className="nav-item">
            <i className="fas fa-robot"></i>
            {sidebarOpen && <span>Study Buddy</span>}
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-menu">
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            {sidebarOpen && (
              <div className="user-info">
                <span className="user-name">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="user-email">{user?.email}</span>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="student-main">
        <main className="student-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
