import { useState } from "react";
import Swal from "sweetalert2";
import BusquedaEmpleado from "./BusquedaEmpleado";
import useCustomEmpleados from "../../../CustomHooks/CustomEmpleado/useCustomEmpleados";

const Empleados = () => {
  const {
    empleados,
    loading,
    error,
    obtenerTodosEmpleados,
    crearEmpleado,
    editarEmpleado,
  } = useCustomEmpleados();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");
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
  const [idEmpleadoEditar, setIdEmpleadoEditar] = useState(null);

  // Estados para mensajes
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

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

    // Validación frontend de DNI y email únicos
    const existeDNI = (empleados || []).some(
      (emp) =>
        emp.DNI === formEmpleado.DNI && emp.idEmpleados !== idEmpleadoEditar
    );
    const existeEmail = (empleados || []).some(
      (emp) =>
        emp.emailEmpleado === formEmpleado.emailEmpleado &&
        emp.idEmpleados !== idEmpleadoEditar
    );
    const existeTelefono = (empleados || []).some(
      (emp) =>
        emp.telefonoEmpleado === formEmpleado.telefonoEmpleado &&
        emp.idEmpleados !== idEmpleadoEditar
    );

    if (existeDNI) {
      mostrarMensaje("El DNI ya está registrado.", "danger");
      return;
    }
    if (existeEmail) {
      mostrarMensaje("El email ya está registrado.", "danger");
      return;
    }
    if (existeTelefono) {
      mostrarMensaje("El teléfono ya está registrado.", "danger");
      return;
    }
    const result = await Swal.fire({
      title: idEmpleadoEditar
        ? "¿Guardar cambios del empleado?"
        : "¿Crear nuevo empleado?",
      text: idEmpleadoEditar
        ? "¿Estás seguro de que deseas guardar los cambios?"
        : "¿Estás seguro de que deseas crear este empleado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      mostrarMensaje("Operación cancelada.", "info");
      return;
    }

    const datosEmpleado = {
      ...formEmpleado,
      idCat_empleados: 1,
    };

    try {
      let resultado;
      if (idEmpleadoEditar) {
        resultado = await editarEmpleado(idEmpleadoEditar, datosEmpleado);
        if (resultado?.success) {
          mostrarMensaje("Empleado actualizado correctamente.", "success");
        } else {
          mostrarMensaje(
            resultado?.error || "Ocurrió un error al guardar el empleado.",
            "danger"
          );
          setOpenModalNuevo(false);
          return;
        }
      } else {
        resultado = await crearEmpleado(datosEmpleado);
        if (resultado?.success) {
          mostrarMensaje("Empleado creado correctamente.", "success");
        } else {
          mostrarMensaje(
            resultado?.error || "Ocurrió un error al guardar el empleado.",
            "danger"
          );
          setOpenModalNuevo(false);
          return;
        }
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
      setOpenModalNuevo(false);
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || error.response?.data?.error || "";
      if (
        mensajeError.toLowerCase().includes("dni") ||
        mensajeError.toLowerCase().includes("email")
      ) {
        mostrarMensaje(mensajeError, "danger");
      } else {
        mostrarMensaje("Ocurrió un error al guardar el empleado.", "danger");
      }
      setOpenModalNuevo(false);
    }
  };

  const handleEditEmpleado = (emp) => {
    Swal.fire({
      title: "¿Deseas editar este empleado?",
      text: `Empleado: ${emp.nombreEmpleado} ${emp.apellidoEmpleado}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
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
        mostrarMensaje("Modo edición activado.", "info");
      }
    });
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

  const resultado = (empleados || []).filter((emp) => {
    if (!terminoBusqueda.trim()) return true;
    const termino = terminoBusqueda.toLowerCase();

    // Filtrado inteligente por estado
    if ("activo".startsWith(termino)) {
      return emp.estadoEmpleado.toLowerCase() === "activo";
    }
    if ("inactivo".startsWith(termino)) {
      return emp.estadoEmpleado.toLowerCase() === "inactivo";
    }

    // Filtrado general
    return (
      emp.nombreEmpleado.toLowerCase().includes(termino) ||
      emp.apellidoEmpleado.toLowerCase().includes(termino) ||
      emp.DNI.toLowerCase().includes(termino)
    );
  });

  return (
    <>
      <BusquedaEmpleado setTerminoBusqueda={setTerminoBusqueda} />

      {mensaje && (
        <div
          className={`alert alert-${tipoMensaje} alert-dismissible fade show`}
          role="alert"
        >
          {mensaje}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMensaje("")}
          ></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

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
                <th>ID</th>
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
              {resultado.length === 0 && !loading ? (
                <tr>
                  <td colSpan={10} className="text-center text-secondary">
                    No hay empleados registrados
                  </td>
                </tr>
              ) : (
                resultado.map((emp) => (
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
                        {/* <button
                          onClick={() => handlerCambiarEstado(emp)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Estado
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openModalNuevo && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">
                  {idEmpleadoEditar ? "Editar Empleado" : "Nuevo Empleado"}
                </h5>
                <button
                  type="button"
                  className="btn-close bg-warning "
                  onClick={closeModalNuevo}
                  aria-label="Cerrar"
                  title="Cerrar"
                ></button>
              </div>
              <div className="modal-body bg-dark text-white">
                {mensaje && (
                  <div
                    className={`alert alert-${tipoMensaje} alert-dismissible fade show`}
                    role="alert"
                  >
                    {mensaje}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setMensaje("")}
                    ></button>
                  </div>
                )}
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
                      placeholder="Ej: Juan"
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
                      placeholder="Ej: Pérez"
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
                      placeholder="Ej: 12345678"
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
                      placeholder="Ej: 1122334455"
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
                      placeholder="Ej: juan@email.com"
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
                      placeholder="Ej: Calle Falsa 123"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <input
                      type="text"
                      className="form-control"
                      name="categoriaRol"
                      value={formEmpleado.categoriaRol}
                      disabled
                      placeholder="Empleado"
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

      {openModalVer && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Datos del Empleado</h5>
                <button
                  type="button"
                  className="btn-close bg-warning "
                  onClick={closeModalVer}
                  aria-label="Cerrar"
                  title="Cerrar"
                ></button>
              </div>
              <div className="modal-body bg-dark text-white">
                <div className="mb-2">
                  <b>Nombre:</b> {formEmpleado.nombreEmpleado}
                </div>
                <div className="mb-2">
                  <b>Apellido:</b> {formEmpleado.apellidoEmpleado}
                </div>
                <div className="mb-2">
                  <b>DNI:</b> {formEmpleado.DNI}
                </div>
                <div className="mb-2">
                  <b>Teléfono:</b> {formEmpleado.telefonoEmpleado}
                </div>
                <div className="mb-2">
                  <b>Email:</b> {formEmpleado.emailEmpleado}
                </div>
                <div className="mb-2">
                  <b>Dirección:</b> {formEmpleado.domicilioEmpleado}
                </div>
                <div className="mb-2">
                  <b>Rol:</b> {formEmpleado.categoriaRol}
                </div>
                <div className="mb-2">
                  <b>Estado:</b> {formEmpleado.estadoEmpleado}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Empleados;