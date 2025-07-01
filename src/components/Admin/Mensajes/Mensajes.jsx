import React, { useEffect, useState } from "react";
import FormVerMensaje from "./FormVerMensaje";
import useCustomMensajes from "../../../CustomHooks/CustomMensajes/CustomMensajes";
import BuscarMensaje from "./BuscarMensaje";

const Mensajes = () => {
  const { mensajes, obtenerMensajes, marcarComoVisto } = useCustomMensajes();
  const [mensajeVer, setMensajeVer] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {
    obtenerMensajes();
  }, []);

  const handleVerClick = async (mensaje) => {
    setMensajeVer(mensaje);

    if (mensaje.estadoMensaje !== "VISTO") {
      const resultado = await marcarComoVisto(mensaje.idMensaje);
      if (resultado.success) {
        setMensajeVer((prev) => ({ ...prev, estadoMensaje: "VISTO" }));
      } else {
        alert("Error al marcar el mensaje como visto");
      }
    }
  };

  const handleCerrarVer = () => {
    setMensajeVer(null);
  };

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
            <div className="card-header text-black d-flex justify-content-between align-items-center">
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
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajesFiltrados.length > 0 ? (
                    mensajesFiltrados.map((m) => (
                      <tr key={m.idMensaje}>
                        <td>{m.idMensaje}</td>
                        <td>{m.nombreMensaje}</td>
                        <td>{m.correoMensaje}</td>
                        <td>{m.telefonoMensaje}</td>
                        <td>{m.fechaMensaje ? m.fechaMensaje.substring(0, 10) : ""}</td>
                        <td>
                          <span
                            className={
                              m.estadoMensaje === "VISTO"
                                ? "badge bg-success"
                                : "badge bg-warning text-dark"
                            }
                          >
                            {m.estadoMensaje}
                          </span>
                        </td>
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
                      <td colSpan="7" className="text-center">
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
