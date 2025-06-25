import React, { useState } from "react";
import Busqueda from "./Busqueda";
import Informacion from "./Informacion";
import clientStore from "../../../store/clientStore";
import useCustomCliente from "../../../CustomHooks/CustomCliente/useCustomCliente";
import FormClientes from "./FormClientes";


const Cliente = () => {

  //--------------Importaciones del useCliente
  const { cliente, isLoading, isError } = useCustomCliente();

  const resultado = cliente?.Clientes || cliente || [];

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

  if (!resultado || resultado.length === 0) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"

        >
          Agregar Clientes
        </button>
        <div className="text-center text-muted alert alert-info">
          No hay clientes registrados aún.
        </div>
      </div>
    );
  }

  if (isLoading) {


    return <div className="text-center">Cargando clientes...</div>;
  }

  if (isError) {
    return <div className="text-center text-danger">Error al cargar los clientes.</div>;
  }
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <Busqueda />

         <button
          type="button"
          className="btn btn-primary mt-2 mb-3 col-12 col-md-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"

        >
          Agregar Clientes
        </button>
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
                      <th>Correo Electrónico</th>
                      <th>Telefono</th>
                      <th>Domicilio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.map((usuario, index) => (
                      <tr key={index}>
                        <td>
                          <code>{usuario.idClientes}</code>
                        </td>
                        <td>{usuario.Nombre}</td>
                        <td>{usuario.Apellido}</td>
                        <td>{usuario.DNI}</td>
                        <td>{usuario.Email}</td>
                        <td>{usuario.Telefono}</td>
                        <td>{usuario.Domicilio}</td>
                        <td><span>{usuario.Estado}</span> </td>
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
    </>
  );
};

export default Cliente;
