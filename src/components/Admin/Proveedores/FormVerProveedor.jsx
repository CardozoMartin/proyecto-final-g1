import React, { useEffect, useState } from "react";
import "../../../css/Proveedores/FormsProveedores.css";
const FormVerProveedor = ({ proveedor, onClose }) => {
  const [datosProveedor, setDatosProveedor] = useState({
    nombreProveedores: "",
    TelefonoProveedores: "",
    EmailProveedores: "",
    DomicilioProveedores: "",
  });

  useEffect(() => {
    if (proveedor) {
      setDatosProveedor({
        nombreProveedores: proveedor.nombreProveedores || "",
        TelefonoProveedores: proveedor.TelefonoProveedores || "",
        EmailProveedores: proveedor.EmailProveedores || "",
        DomicilioProveedores: proveedor.DomicilioProveedores || "",
      });
    }
  }, [proveedor]);

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="formulario modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Ver Datos del Proveedor</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="nombreProveedores" className="form-label">
                  Nombre del Proveedor
                </label>
                <input
                  id="nombreProveedores"
                  name="nombreProveedores"
                  value={datosProveedor.nombreProveedores}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="TelefonoProveedores" className="form-label">
                  Teléfono
                </label>
                <input
                  id="TelefonoProveedores"
                  name="TelefonoProveedores"
                  value={datosProveedor.TelefonoProveedores}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="EmailProveedores" className="form-label">
                  Email
                </label>
                <input
                  id="EmailProveedores"
                  name="EmailProveedores"
                  value={datosProveedor.EmailProveedores}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="DomicilioProveedores" className="form-label">
                  Domicilio
                </label>
                <input
                  id="DomicilioProveedores"
                  name="DomicilioProveedores"
                  value={datosProveedor.DomicilioProveedores}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVerProveedor;