import React, { useState } from "react";
import Busqueda from "./Busqueda";
import Informacion from "./Informacion";
import clientStore from "../../../store/clientStore";


const Cliente = () => {
  const { usuarios } = clientStore();

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const getStatusBadge = (status) => {
    const badges = {
      Activa: "success",
      Inactiva: "warning",
      Bloqueada: "danger",
    };
    return badges[status] || "secondary";
  };

  const handleVer = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarInfo(true);
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
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Correo Electrónico</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario, index) => (
                      <tr key={index}>
                        <td>
                          <code>{usuario.id}</code>
                        </td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido}</td>
                        <td>{usuario.correo}</td>
                        <td>
                          <span
                            className={`badge bg-${getStatusBadge("Activa")}`}
                          >
                            Activa
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleVer(usuario)}
                            >
                              Ver
                            </button>
                            <button className="btn btn-outline-secondary btn-sm">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {usuarios.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          No hay clientes registrados aún.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mostrarInfo && usuarioSeleccionado && (
        <Informacion
          usuario={usuarioSeleccionado}
          onCerrar={() => setMostrarInfo(false)}
        />
      )}
    </>
  );
};

export default Cliente;
