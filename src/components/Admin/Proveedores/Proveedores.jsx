import React, { useState } from "react";
import FormProveedor from "./FormProveedor";
import useCustomProveedores from "../../../CustomHooks/CustomProveedores/CustomProveedores";
import FormEditar from "./FormEditar";

const Proveedores = () => {
  const { proveedor, eliminarProveedor } = useCustomProveedores();
  const resultado = proveedor || [];

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proveedorEditar, setProveedorEditar] = useState(null); // Estado para proveedor a editar

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este proveedor?")) {
      const response = await eliminarProveedor(id);
      if (response.success) {
        alert("Proveedor eliminado correctamente.");
      } else {
        alert(`Error al eliminar proveedor: ${response.error}`);
      }
    }
  };

  const handleEditarClick = (prov) => {
    setProveedorEditar(prov);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setProveedorEditar(null);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Listado de Proveedores</h5>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-sm me-2"
                placeholder="Buscar proveedor..."
                style={{ maxWidth: "200px" }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setProveedorEditar(null); // al crear nuevo no hay proveedor editar
                  setMostrarFormulario(true);
                }}
              >
                Nuevo Proveedor
              </button>
            </div>
          </div>

          <div className="card-body">
            {mostrarFormulario && (
              proveedorEditar ? (
                <FormEditar proveedor={proveedorEditar} onClose={handleCerrarFormulario} />
              ) : (
                <FormProveedor onClose={handleCerrarFormulario} />
              )
            )}

            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Domicilio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.map((p) => (
                    <tr key={p.idProveedores}>
                      <td></td>
                      <td>{p.idProveedores}</td>
                      <td>{p.nombreProveedores}</td>
                      <td>{p.TelefonoProveedores}</td>
                      <td>{p.EmailProveedores}</td>
                      <td>{p.DomicilioProveedores}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleEditarClick(p)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleEliminar(p.idProveedores)}
                          >
                            Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {resultado.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No se encontraron proveedores.
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
  );
};

export default Proveedores;
