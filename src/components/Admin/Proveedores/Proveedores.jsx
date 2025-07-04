import React, { useState } from "react";
import FormProveedor from "./FormProveedor";
import useCustomProveedores from "../../../CustomHooks/CustomProveedores/CustomProveedores";
import FormEditar from "./FormEditar";
import FormVerProveedor from "./FormVerProveedor";
import BusquedaProveedor from "./BusquedaProveedor";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Proveedores = () => {
  const { proveedor, eliminarProveedor, obtenerProveedor } = useCustomProveedores();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proveedorEditar, setProveedorEditar] = useState(null);
  const [proveedorVer, setProveedorVer] = useState(null);
  const [busqueda, setBusqueda] = useState("");

 
  const filtrarProveedores = () => {
    if (!busqueda.trim()) return proveedor || [];
    const termino = busqueda.trim().toLowerCase();

    return (proveedor || []).filter((p) => {
      return (
        String(p.idProveedores).toLowerCase().includes(termino) ||
        (p.nombreProveedores || "").toLowerCase().includes(termino) ||
        (p.EmailProveedores || "").toLowerCase().includes(termino) ||
        (p.TelefonoProveedores || "").toLowerCase().includes(termino)
      );
    });
  };

  const resultado = filtrarProveedores();

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar proveedor?",
      text: "¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await eliminarProveedor(id);
      if (response.success) {
        toast.success("Proveedor eliminado correctamente.");
      } else {
        toast.error(`Error al eliminar proveedor: ${response.error}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el proveedor.");
    }
  };

  const handleEditarClick = (prov) => {
    setProveedorEditar(prov);
    setProveedorVer(null);
    setMostrarFormulario(true);
    obtenerProveedor()
  };

  const handleNuevoClick = () => {
    setProveedorEditar(null);
    setProveedorVer(null);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setProveedorEditar(null);
    obtenerProveedor()
  };

  const handleVerClick = (prov) => {
    setProveedorVer(prov);
    setMostrarFormulario(false);
  };

  const handleCerrarVer = () => {
    setProveedorVer(null);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <BusquedaProveedor valorBusqueda={busqueda} onBuscar={setBusqueda} />

          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Listado de Proveedores</h5>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleNuevoClick}
              >
                Nuevo Proveedor
              </button>
            </div>
          </div>

          <div className="card-body">
            {mostrarFormulario &&
              (proveedorEditar ? (
                <FormEditar
                  proveedor={proveedorEditar}
                  onClose={handleCerrarFormulario}
                />
              ) : (
                <FormProveedor onClose={handleCerrarFormulario} />
              ))}

            {proveedorVer && (
              <FormVerProveedor
                proveedor={proveedorVer}
                onClose={handleCerrarVer}
              />
            )}

            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
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
                  {resultado.length > 0 ? (
                    resultado.map((p) => (
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
                              className="btn btn-outline-info btn-sm"
                              onClick={() => handleVerClick(p)}
                            >
                              Ver
                            </button>
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
                    ))
                  ) : (
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
