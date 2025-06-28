import { useState } from "react";
import BusquedaEmpleado from "./BusquedaEmpleado";
import useCustomEmpleados from "../../../CustomHooks/CustomEmpleado/useCustomEmpleados";

const Empleados = () => {
  const {
    empleados,
    loading,
    error,
    nombreEmpleado,
    obtenerTodosEmpleados,
    crearEmpleado,
    eliminarEmpleado,
    editarEmpleado,
  } = useCustomEmpleados();
  console.log(nombreEmpleado)

  const resultado = empleados.empleados || [];
  const [formEmpleado, setFormEmpleado] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    DNI: "",
    telefonoEmpleado: "",
    emailEmpleado: "",
    domicilioEmpleado: "",
    categoriaRol: "Empleado",
    estadoEmpleado: "Activo",
  });
  // Nuevo nombre para el estado
  const [idEmpleadoEditar, setIdEmpleadoEditar] = useState(null);

  // Estados para mensajes
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // "success" o "danger"

  // Estados para modales
  const [openModalNuevo, setOpenModalNuevo] = useState(false);
  const [openModalVer, setOpenModalVer] = useState(false);

  // Función para mostrar mensaje y ocultarlo después de 3s
  const mostrarMensaje = (msg, tipo) => {
    setMensaje(msg);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleChange = (e) => {
    setFormEmpleado({
      ...formEmpleado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (
      !formEmpleado.nombreEmpleado.trim() ||
      !formEmpleado.apellidoEmpleado.trim() ||
      !formEmpleado.DNI.trim() ||
      !formEmpleado.telefonoEmpleado.trim() ||
      !formEmpleado.emailEmpleado.trim() ||
      !formEmpleado.domicilioEmpleado.trim()
    ) {
      mostrarMensaje("Todos los campos son obligatorios.", "danger");
      return;
    }

    const datosEmpleado = {
      ...formEmpleado,
      idCat_empleados: 1, 
    };

    try {
      if (idEmpleadoEditar) {
        await editarEmpleado(idEmpleadoEditar, datosEmpleado);
        mostrarMensaje("Empleado actualizado correctamente.", "success");
      } else {
        await crearEmpleado(datosEmpleado);
        mostrarMensaje("Empleado creado correctamente.", "success");
      }

      await obtenerTodosEmpleados();

      setFormEmpleado({
        nombreEmpleado: "",
        apellidoEmpleado: "",
        DNI: "",
        telefonoEmpleado: "",
        emailEmpleado: "",
        domicilioEmpleado: "",
        categoriaRol: "Empleado",
        estadoEmpleado: "Activo",
      });
      setIdEmpleadoEditar(null);
      setOpenModalNuevo(false); // Cierra el modal por estado
    } catch (error) {
      console.log(error)
      mostrarMensaje("Ocurrió un error al guardar el empleado.", "danger");
      setOpenModalNuevo(false); // Opcional: cerrar también en error
    }
  };

  const handlerDeleteEmpleado = async (emp) => {
    try {
      await eliminarEmpleado(emp.idEmpleados);
      await obtenerTodosEmpleados();
      mostrarMensaje("Empleado eliminado correctamente.", "success");
    } catch (error) {
      console.log(error)
      mostrarMensaje("Ocurrió un error al eliminar el empleado.", "danger");
    }
  };

  const handleEditEmpleado = (emp) => {
    setFormEmpleado({
      nombreEmpleado: emp.nombreEmpleado || "",
      apellidoEmpleado: emp.apellidoEmpleado || "",
      DNI: emp.DNI || "",
      telefonoEmpleado: emp.telefonoEmpleado || "",
      emailEmpleado: emp.emailEmpleado || "",
      domicilioEmpleado: emp.domicilioEmpleado || "",
      categoriaRol: emp.categoriaRol || "Empleado",
      estadoEmpleado: emp.estadoEmpleado || "Activo",
    });
    setIdEmpleadoEditar(emp.idEmpleados);
    setOpenModalNuevo(true);
  };

  const handleNuevoEmpleado = () => {
    setFormEmpleado({
      nombreEmpleado: "",
      apellidoEmpleado: "",
      DNI: "",
      telefonoEmpleado: "",
      emailEmpleado: "",
      domicilioEmpleado: "",
      categoriaRol: "Empleado",
      estadoEmpleado: "Activo",
    });
    setIdEmpleadoEditar(null);
    setOpenModalNuevo(true);
  };

  const handleVerEmpleado = (emp) => {
    setFormEmpleado({
      nombreEmpleado: emp.nombreEmpleado || "",
      apellidoEmpleado: emp.apellidoEmpleado || "",
      DNI: emp.DNI || "",
      telefonoEmpleado: emp.telefonoEmpleado || "",
      emailEmpleado: emp.emailEmpleado || "",
      domicilioEmpleado: emp.domicilioEmpleado || "",
      categoriaRol: emp.categoriaRol || "Empleado",
      estadoEmpleado: emp.estadoEmpleado || "Activo",
    });
    setOpenModalVer(true);
  };

  const closeModalNuevo = () => setOpenModalNuevo(false);
  const closeModalVer = () => setOpenModalVer(false);



  return (
    <>
      <BusquedaEmpleado />

      {/* Alertas de mensaje */}
      {mensaje && (
        <div className={`alert alert-${tipoMensaje} alert-dismissible fade show`} role="alert">
          {mensaje}
          <button type="button" className="btn-close" onClick={() => setMensaje("")}></button>
        </div>
      )}

      {/* Mensaje de error global del hook */}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {/* Spinner de carga */}
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div>Cargando empleados...</div>
        </div>
      )}

      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Empleados</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNuevoEmpleado}
        >
          Agregar nuevo Empleado
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Direccion</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((emp) => (
                <tr key={emp.idEmpleados}>
                  <td>{emp.idEmpleados}</td>
                  <td>{emp.nombreEmpleado}</td>
                  <td>{emp.apellidoEmpleado}</td>
                  <td>{emp.DNI}</td>
                  <td>{emp.telefonoEmpleado}</td>
                  <td>{emp.emailEmpleado}</td>
                  <td>{emp.domicilioEmpleado}</td>
                  <td>{emp.categoriaRol}</td>
                  <td>{emp.estadoEmpleado}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEditEmpleado(emp)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleVerEmpleado(emp)}
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handlerDeleteEmpleado(emp)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar/editar empleado */}
      {openModalNuevo && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header bg-dark text-white" style={{ position: "relative" }}>
                <h5 className="modal-title">
                  {idEmpleadoEditar ? "Editar Empleado" : "Nuevo Empleado"}
                </h5>
                <button
                  type="button"
                  className="btn-close bg-warning "
                  onClick={closeModalNuevo}
                  aria-label="Cerrar"
                  title="Cerrar"
                >
                  
                </button>
              </div>
              <div className="modal-body bg-dark text-white">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreEmpleado"
                      value={formEmpleado.nombreEmpleado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      name="apellidoEmpleado"
                      value={formEmpleado.apellidoEmpleado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">DNI</label>
                    <input
                      type="text"
                      className="form-control"
                      name="DNI"
                      value={formEmpleado.DNI}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefonoEmpleado"
                      value={formEmpleado.telefonoEmpleado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="emailEmpleado"
                      value={formEmpleado.emailEmpleado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      name="domicilioEmpleado"
                      value={formEmpleado.domicilioEmpleado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <input
                      type="text"
                      className="form-control"
                      name="categoriaRol"
                      value={formEmpleado.categoriaRol}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      name="estadoEmpleado"
                      value={formEmpleado.estadoEmpleado}
                      onChange={handleChange}
                      required
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {idEmpleadoEditar ? "Actualizar" : "Guardar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver empleado */}
      {openModalVer && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header bg-dark text-white" style={{ position: "relative" }}>
                <h5 className="modal-title">Datos del Empleado</h5>
                <button
                  type="button"
                  className="btn-close bg-warning "
                  onClick={closeModalVer}
                  aria-label="Cerrar"
                  title="Cerrar"
                >
                  
                </button>
              </div>
              <div className="modal-body bg-dark text-white">
                <div className="mb-2"><b>Nombre:</b> {formEmpleado.nombreEmpleado}</div>
                <div className="mb-2"><b>Apellido:</b> {formEmpleado.apellidoEmpleado}</div>
                <div className="mb-2"><b>DNI:</b> {formEmpleado.DNI}</div>
                <div className="mb-2"><b>Teléfono:</b> {formEmpleado.telefonoEmpleado}</div>
                <div className="mb-2"><b>Email:</b> {formEmpleado.emailEmpleado}</div>
                <div className="mb-2"><b>Dirección:</b> {formEmpleado.domicilioEmpleado}</div>
                <div className="mb-2"><b>Rol:</b> {formEmpleado.categoriaRol}</div>
                <div className="mb-2"><b>Estado:</b> {formEmpleado.estadoEmpleado}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Empleados;
