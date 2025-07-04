import React, { useState } from "react";
import Informacion from "./Informacion";
import useCustomCliente from "../../../CustomHooks/CustomCliente/useCustomCliente";
import FormClientes from "./FormClientes";



const Cliente = () => {
  //--------------Importaciones del useCliente
  const { cliente, nuevoEstado, loading } = useCustomCliente();
  console.log(cliente);
  const resultado = cliente?.Clientes || cliente || [];

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [infoUser, setInfoUser] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const getStatusBadge = (status) => {
    const badges = {
      Activo: "success",
      Inactivo: "warning",
      Bloqueado: "danger",
    };
    return badges[status] || "secondary";
  };

  const handleVer = (usuario) => {
    setOpenModal(true);
    setInfoUser(usuario)
  };
  // Nueva función para cambiar el estado en el backend
  const handleToggleEstado = (usuario) => {
    nuevoEstado(usuario);
  };
  if (
    loading
  ) {
    return (<div>
      cargando
    </div>)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
      </div>
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
                      <th>DNI</th>
                      <th>Telefono</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cliente.map((usuario, index) => (
                      <tr key={index}>
                        <td>
                          <code>{usuario.idClientes}</code>
                        </td>
                        <td>{usuario.nombreCliente}</td>
                        <td>{usuario.apellidoCliente}</td>
                        <td>{usuario.DNI}</td>

                        <td>{usuario.telefonoCliente}</td>

                        <td>
                          <span className={`badge bg-${getStatusBadge(usuario.estadoCliente)}`}>{usuario.estadoCliente}</span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleVer(usuario)}>Ver</button>
                            <br />
                            <button className={`btn btn-sm ${usuario.estadoCliente === "Activo" ? "btn-warning" : "btn-success"}`} onClick={() => handleToggleEstado(usuario)}>
                              {usuario.estadoCliente === "Activo" ? "Desactivar" : "Activar"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {resultado.length === 0 && (
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

      {/* Modal para agregar/editar un cliente */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Agregar Cliente
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Pasamos el producto seleccionado al formulario */}
              <FormClientes />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <div
          className={`modal fade ${openModal ? 'show' : ''}`}
          style={{ display: openModal ? 'block' : 'none' }}
          id="modalCompra"
          tabIndex="-1"
          aria-labelledby="modalCompraLabel"
          aria-hidden={!openModal}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenModal(false)}></button>
              </div>
              <div className="modal-body text-dark">
                <div className="mt-4 text-dark">
                  <h5>Datos Personales</h5>
                  <div className="card p-3 mb-2 shadow-sm">
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <strong>Nombre:</strong> {infoUser?.nombreCliente}
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>Apellido:</strong> {infoUser?.apellidoCliente}
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>Email:</strong> {infoUser?.emailCliente}
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>Teléfono:</strong> {infoUser?.telefonoCliente}
                      </div>
                      <div className="col-12 mb-2">
                        <strong>Dirección:</strong> {infoUser?.domicilioCliente}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};


export default Cliente;
