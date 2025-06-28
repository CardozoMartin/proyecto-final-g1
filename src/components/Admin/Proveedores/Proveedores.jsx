import React, { useState } from "react";
import FormProveedor from "./FormProveedor";
import useCustomProveedores from "../../../CustomHooks/CustomProveedores/CustomProveedores";

const Proveedores = () => {
  const { proveedor } = useCustomProveedores();
  console.log(proveedor);
  const resultado = proveedor || [];
  return (
    <div className="row">
      <FormProveedor />
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
              <button className="btn btn-primary btn-sm">
                Nuevo Proveedor
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"               
                      />
                    </th>
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
                    <tr key={p.id}>
                      <td>
                      </td>
                      <td>{p.idProveedores}</td>
                      <td>{p.nombreProveedores}</td>
                      <td>{p.TelefonoProveedores}</td>
                      <td>{p.EmailProveedores}</td>
                      <td>{p.DomicilioProveedores}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-outline-secondary btn-sm">
                            Editar
                          </button>
                          <button className="btn btn-outline-danger btn-sm">
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
