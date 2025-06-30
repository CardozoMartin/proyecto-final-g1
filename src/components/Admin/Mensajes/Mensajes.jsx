import React, { useEffect, useState } from "react";
import FormVerMensaje from "./FormVerMensaje";
import useCustomMensajes from "../../../CustomHooks/CustomMensajes/CustomMensajes";
import BuscarMensaje from "./BuscarMensaje";

const Mensajes = () => {
  const { mensajes, obtenerMensajes } = useCustomMensajes(); // mensajes y función del hook
  const [mensajeVer, setMensajeVer] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {
    obtenerMensajes(); // carga los mensajes al montar
  }, []);

  const handleVerClick = (mensaje) => {
    setMensajeVer(mensaje);
  };

  const handleCerrarVer = () => {
    setMensajeVer(null);
  };

  // Filtrar mensajes por fecha
  const mensajesFiltrados = fechaFiltro
    ? mensajes.filter((m) => m.fechaMensaje.startsWith(fechaFiltro))
    : mensajes;

  return (
    <>
      {mensajeVer && (
        <FormVerMensaje mensaje={mensajeVer} onClose={handleCerrarVer} />
      )}

      <div className="container mt-4">
        <div className="card-body">
            <div className="container my-3 px-0">
              <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8 px-0">
                  <BuscarMensaje valorFecha={fechaFiltro} onBuscar={setFechaFiltro} />
                </div>
              </div>
            </div>
        <div className="card shadow border-0">
          <div className="card-header  text-black d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Mensajes Recibidos</h5>
          </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajesFiltrados && mensajesFiltrados.length > 0 ? (
                    mensajesFiltrados.map((m) => (
                      <tr key={m.idMensaje}>
                        <td>{m.idMensaje}</td>
                        <td>{m.nombreMensaje}</td>
                        <td>{m.correoMensaje}</td>
                        <td>{m.telefonoMensaje}</td>
                        <td>{m.fechaMensaje ? m.fechaMensaje.substring(0, 10) : ""}</td>
                        <td>
                          <button
                            className="btn btn-outline-info btn-sm"
                            onClick={() => handleVerClick(m)}
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No hay mensajes disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mensajes;
