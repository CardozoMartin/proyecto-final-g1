import React, { useState } from "react";
import Productos from "../components/Admin/Productos/Productos";
import Pedidos from "../components/Admin/Pedidos/Pedidos";
import Cliente from "../components/Admin/Cliente/Cliente";
import Empleados from "../components/Admin/Empleados/Empleados";
import Proveedores from "../components/Admin/Proveedores/Proveedores";
import Categorias from "../components/Admin/Categorias/categorias";
import Mensajes from "../components/Admin/Mensajes/Mensajes";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    {
      title: "Usuarios Totales",
      value: "12,345",
      change: "+12%",
      icon: "👥",
      color: "primary",
    },
    {
      title: "Ventas Mensuales",
      value: "$45,678",
      change: "+8%",
      icon: "💰",
      color: "success",
    },
    {
      title: "Pedidos",
      value: "1,234",
      change: "-3%",
      icon: "📦",
      color: "warning",
    },
    {
      title: "Conversión",
      value: "3.4%",
      change: "+15%",
      icon: "📈",
      color: "info",
    },
  ];

  const menuItems = [
    { id: "orders", label: "Pedidos", icon: "📦" },
    { id: "products", label: "Productos", icon: "🛍️" },
    { id: "customers", label: "Cliente", icon: "👥" },
    { id: 'supplients', label: 'Proveedores', icon: '👥' },
  
    { id: "empleados", label: "Empleados", icon: "👥" },
    { id: "mensajes", label: "Mensajes", icon: "👥" }
  ];

  return (
    <>
      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <div
          className={`bg-dark text-white ${
            sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
          }`}
          style={{
            width: sidebarCollapsed ? "70px" : "250px",
            transition: "width 0.3s ease",
            position: "sticky",
            top: "0",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          {/* Sidebar Header */}
          <div className="p-3 border-bottom border-secondary">
            <div className="d-flex align-items-center justify-content-between">
              {!sidebarCollapsed && (
                <h5 className="mb-0 fw-bold">
                  <span className="me-2">📊</span>
                  Panel Administrador
                </h5>
              )}
              <button
                className="btn btn-link text-white p-0"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                style={{ fontSize: "1.2rem" }}
              >
                {sidebarCollapsed ? "➡️" : "⬅️"}
              </button>
            </div>
          </div>
          {/* Menu Items */}
          <nav className="nav flex-column p-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link text-start border-0 rounded mb-2 p-3 ${
                  activeTab === item.id
                    ? "bg-primary text-white"
                    : "text-light bg-transparent hover-bg-secondary"
                }`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span className="me-3" style={{ fontSize: "1.1rem" }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          {/* User Section */}
          {!sidebarCollapsed && (
            <div className="mt-auto p-3 border-top border-secondary">
              <div className="d-flex align-items-center">
                <div>
                  <div className="fw-bold d-flex align-items-center">
                    <p className="mb-0">Usuario Admin</p>
                  </div>
                  <small className="text-muted">admin@empresa.com</small>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="flex-grow-1 bg-light">
          {/* Top Bar */}
          <div className="bg-white shadow-sm border-bottom p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0"></h4>
                <small className="text-muted">Bienvenido de vuelta</small>
              </div>
            </div>
          </div>
          {/* Content Area */}
          <div className="p-4">
            {activeTab === "overview" && (
              <>
                {/* Stats Cards */}
                <div className="row mb-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-lg-3 col-md-6 mb-3">
                      <div className="card h-100 shadow-sm border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="card-subtitle mb-2 text-muted">
                                {stat.title}
                              </h6>
                              <h3 className="card-title mb-0 fw-bold">
                                {stat.value}
                              </h3>
                              <small
                                className={`text-${
                                  stat.color === "warning"
                                    ? "danger"
                                    : "success"
                                }`}
                              >
                                {stat.change} vs mes anterior
                              </small>
                            </div>
                            <div
                              className={`bg-${stat.color} bg-opacity-10 p-3 rounded-circle`}
                            >
                              <span style={{ fontSize: "1.5rem" }}>
                                {stat.icon}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Dashboard Overview Content */}
                <div className="row">
                  <div className="col-lg-8 mb-4">
                    <div className="card shadow-sm border-0">
                      <div className="card-header bg-white">
                        <h5 className="card-title mb-0">Actividad Reciente</h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-center py-5">
                          <div className="text-center text-muted">
                            <span style={{ fontSize: '3rem' }}>📊</span>
                            <p className="mt-2">Gráfico de actividad aquí</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm border-0">
                      <div className="card-header bg-white">
                        <h5 className="card-title mb-0">Acciones Rápidas</h5>
                      </div>
                      <div className="card-body">
                        <div className="d-grid gap-2">
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => setActiveTab('customers')}
                          >
                            <span className="me-2">👥</span>Ver Clientes
                          </button>
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setActiveTab('orders')}
                          >
                            <span className="me-2">📦</span>Ver Pedidos
                          </button>
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setActiveTab('products')}
                          >
                            <span className="me-2">🛍️</span>Ver Productos
                          </button>
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setActiveTab('categories')}
                          >
                            <span className="me-2">🏷️</span>Ver Categorías
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Pedidos Component */}
            {activeTab === "orders" && <Pedidos />}
            {/* Productos Component */}
            {activeTab === "products" && (
              <Productos menuItems={menuItems} activeTab={activeTab} />
            )}
            {/* Cliente Component */}
            {activeTab === "customers" && (
              <Cliente menuItems={menuItems} activeTab={activeTab} />
            )}
            {activeTab === "cualquier" && (
              <Cliente menuItems={menuItems} activeTab={activeTab} />
            )}
            {/* Empleado Component */}
            {activeTab === "empleados" && (
              <Empleados menuItems={menuItems} activeTab={activeTab} />
            )}
             {activeTab === "categoria" && (
              <Categorias menuItems={menuItems} activeTab={activeTab} />
            )}
            {activeTab === "mensajes" && (
              <Mensajes menuItems={menuItems} activeTab={activeTab} />
            )}
             {activeTab === 'supplients' && (
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <Proveedores/>
              </div>
              <div className="card-body p-0">
  
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
           
