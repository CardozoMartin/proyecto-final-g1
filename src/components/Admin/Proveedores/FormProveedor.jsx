import React, { useState } from "react";
import { toast } from "sonner";
import useCustomProveedores from "../../../CustomHooks/CustomProveedores/CustomProveedores";
import "../../../css/Proveedores/FormsProveedores.css";

const FormProveedor = ({ onClose }) => {
  const { insertarProveedor } = useCustomProveedores();

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombreProveedores: "",
    TelefonoProveedores: "",
    EmailProveedores: "",
    DomicilioProveedores: "",
  });

  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validar = () => {
    const errores = {};

    if (!nuevoProveedor.nombreProveedores.trim()) {
      errores.nombreProveedores = "El nombre es obligatorio.";
    }

    if (!nuevoProveedor.TelefonoProveedores.trim()) {
      errores.TelefonoProveedores = "El teléfono es obligatorio.";
    } else if (!/^\d{2,4}-?\d{3,4}-?\d{3,4}$/.test(nuevoProveedor.TelefonoProveedores)) {
      errores.TelefonoProveedores = "Formato de teléfono inválido.";
    }

    if (!nuevoProveedor.EmailProveedores.trim()) {
      errores.EmailProveedores = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(nuevoProveedor.EmailProveedores)) {
      errores.EmailProveedores = "Email inválido.";
    }

    if (!nuevoProveedor.DomicilioProveedores.trim()) {
      errores.DomicilioProveedores = "El domicilio es obligatorio.";
    }

    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      Object.values(erroresValidacion).forEach((msg) => toast.error(msg));
      setLoading(false);
      return;
    }

    setErrores({});

    try {
      const response = await insertarProveedor(nuevoProveedor);
      if (response.success) {
        toast.success("Proveedor agregado correctamente");
        setNuevoProveedor({
          nombreProveedores: "",
          TelefonoProveedores: "",
          EmailProveedores: "",
          DomicilioProveedores: "",
        });
        if (onClose) onClose();
      } else {
        toast.error(`Error: ${response.error || "No se pudo agregar el proveedor"}`);
      }
    } catch (error) {
      toast.error("Error inesperado al agregar proveedor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="formulario modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Nuevo Proveedor</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          <div className="modal-body">
            <form className="formulario" onSubmit={handleSubmit}>
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
                {errores.nombreProveedores && (
                  <div className="text-danger">{errores.nombreProveedores}</div>
                )}
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
                {errores.TelefonoProveedores && (
                  <div className="text-danger">{errores.TelefonoProveedores}</div>
                )}
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
                {errores.EmailProveedores && (
                  <div className="text-danger">{errores.EmailProveedores}</div>
                )}
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
                {errores.DomicilioProveedores && (
                  <div className="text-danger">{errores.DomicilioProveedores}</div>
                )}
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
                  {loading ? "Agregando..." : "Agregar Proveedor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProveedor;
