import React from "react";
import "../../../css/Clientes/Informacion.css";

const Informacion = ({ usuario, onCerrar }) => {

  return (
    <>
      <div
        className="modal fade show d-block bg-light"
      >
        <div className="modal-dialog modal-dialog-centered text-center">
          <div className="modal-content text-center">

            <div className="modal-header">
              <h5 className="modal-title ">Información del Cliente</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCerrar}
              ></button>
            </div>

            <div className="modal-body">
              <form className="text-center">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={usuario.nombre}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    value={usuario.apellido}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={usuario.fechaNac}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={usuario.direccion}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={usuario.correo}
                    disabled
                  />
                </div>

                <div className="mb-3">
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCerrar}
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Informacion;