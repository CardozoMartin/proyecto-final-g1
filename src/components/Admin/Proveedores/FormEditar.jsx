import React, { useState, useEffect } from "react";
import useCustomProveedores from "../../../CustomHooks/CustomProveedores/CustomProveedores";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "../../../css/Proveedores/FormsProveedores.css";

const FormEditar = ({ proveedor, onClose }) => {
  const { actualizarProveedor } = useCustomProveedores();

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombreProveedores: "",
    TelefonoProveedores: "",
    EmailProveedores: "",
    DomicilioProveedores: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (proveedor) {
      setNuevoProveedor({
        nombreProveedores: proveedor.nombreProveedores || "",
        TelefonoProveedores: proveedor.TelefonoProveedores || "",
        EmailProveedores: proveedor.EmailProveedores || "",
        DomicilioProveedores: proveedor.DomicilioProveedores || "",
      });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Preguntar antes de editar
    const result = await Swal.fire({
      title: "¿Editar proveedor?",
      text: "¿Estás seguro de que deseas actualizar los datos de este proveedor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      setLoading(false);
      return;
    }

    try {
      const response = await actualizarProveedor(proveedor.idProveedores, nuevoProveedor);

      if (response.success) {
        toast.success("Proveedor actualizado correctamente");
        if (onClose) onClose();
      } else {
        if (response.error?.includes("email")) {
          toast.error("El email ya está registrado.");
        } else if (response.error?.includes("teléfono")) {
          toast.error("El teléfono ya está registrado.");
        } else if (response.error?.includes("domicilio")) {
          toast.error("El domicilio ya está registrado.");
        } else {
          toast.error(`Error: ${response.error || "No se pudo actualizar el proveedor"}`);
        }
      }
    } catch (error) {
      toast.error("Error inesperado al actualizar proveedor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="formulario shadow modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Datos del Proveedor</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
              disabled={loading}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreProveedores" className="form-label">
                  Nombre del Proveedor
                </label>
                <input
                  id="nombreProveedores"
                  name="nombreProveedores"
                  value={nuevoProveedor.nombreProveedores}
                  onChange={handleChange}
                  placeholder="Ej: Proveedora del Sur"
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="TelefonoProveedores" className="form-label">
                  Teléfono
                </label>
                <input
                  id="TelefonoProveedores"
                  name="TelefonoProveedores"
                  value={nuevoProveedor.TelefonoProveedores}
                  onChange={handleChange}
                  placeholder="Ej: 11-3456-7890"
                  className="form-control"
                  required
                  disabled={loading}
                  type="tel"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="EmailProveedores" className="form-label">
                  Email
                </label>
                <input
                  id="EmailProveedores"
                  name="EmailProveedores"
                  type="email"
                  value={nuevoProveedor.EmailProveedores}
                  onChange={handleChange}
                  placeholder="Ej: proveedor@correo.com"
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="DomicilioProveedores" className="form-label">
                  Domicilio
                </label>
                <input
                  id="DomicilioProveedores"
                  name="DomicilioProveedores"
                  value={nuevoProveedor.DomicilioProveedores}
                  onChange={handleChange}
                  placeholder="Ej: Av. Belgrano 123"
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Actualizando..." : "Actualizar Proveedor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditar;
