import React, { useEffect, useState } from "react";
import "../../../css/Proveedores/FormsProveedores.css";

const FormVerMensaje = ({ mensaje, onClose }) => {
  const [datosMensaje, setDatosMensaje] = useState({
    nombreMensaje: "",
    correoMensaje: "",
    telefonoMensaje: "",
    mensajeTexto: "",
    fechaMensaje: ""
  });

  useEffect(() => {
    if (mensaje) {
      setDatosMensaje({
        nombreMensaje: mensaje.nombreMensaje || "",
        correoMensaje: mensaje.correoMensaje || "",
        telefonoMensaje: mensaje.telefonoMensaje || "",
        mensajeTexto: mensaje.mensajeTexto || "",
        fechaMensaje: mensaje.fechaMensaje || ""
      });
    }
  }, [mensaje]);

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="formulario modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Ver Mensaje</h5>
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
                <label htmlFor="nombreMensaje" className="form-label">Nombre</label>
                <input
                  id="nombreMensaje"
                  name="nombreMensaje"
                  value={datosMensaje.nombreMensaje}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="correoMensaje" className="form-label">Correo</label>
                <input
                  id="correoMensaje"
                  name="correoMensaje"
                  value={datosMensaje.correoMensaje}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="telefonoMensaje" className="form-label">Teléfono</label>
                <input
                  id="telefonoMensaje"
                  name="telefonoMensaje"
                  value={datosMensaje.telefonoMensaje}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensajeTexto" className="form-label">Mensaje</label>
                <textarea
                  id="mensajeTexto"
                  name="mensajeTexto"
                  value={datosMensaje.mensajeTexto}
                  className="form-control"
                  rows={3}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechaMensaje" className="form-label">Fecha</label>
                <input
                  id="fechaMensaje"
                  name="fechaMensaje"
                  value={datosMensaje.fechaMensaje}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
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

export default FormVerMensaje;
