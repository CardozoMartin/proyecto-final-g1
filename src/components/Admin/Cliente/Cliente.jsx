import React from "react";
import Busqueda from "./Busqueda";

const Cliente = () => {
  const recentOrders = [
    {
      id: "#001",
      nombre: "Juan",
      apellido: "Gomez",
      correo: "juang95@gmail.com",
      status: "Activa",
    },
    {
      id: "#002",
      nombre: "Maria",
      apellido: "Lopez",
      correo: "marialopez@hotmail.com",
      status: "Inactiva",
    },
    {
      id: "#003",
      nombre: "Carlos",
      apellido: "Perez",
      correo: "cperez.8080@outlook.com",
      status: "Activa",
    },
    {
      id: "#004",
      nombre: "Ana",
      apellido: "Martinez",
      correo: "anita.rrhh@gmail.com",
      status: "Bloqueada",
    },
  ];
  const getStatusBadge = (status) => {
    const badges = {
      Activa: "success",
      Inactiva: "warning",
      Bloqueada: "danger",
    };
    return badges[status] || "secondary";
  };

  return (
    <>
      <Busqueda />
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Clientes Registrados</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Correo Electronico</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <code>{order.id}</code>
                        </td>
                        <td>{order.nombre}</td>
                        <td>{order.apellido}</td>
                        <td>{order.correo}</td>
                        <td>
                          <span
                            className={`badge bg-${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm">
                              Ver
                            </button>
                            <button className="btn btn-outline-secondary btn-sm">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cliente;
