import React from "react";
import useUserStore from "../../store/clienteStore"; 
const Informacion = () => {
  const { usuario } = useUserStore();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="formulario text-center">
            <div className="mb-3 formint">
              <label htmlFor="nombre" className="form-label label-80">
                Nombre
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="nombre"
                name="nombre"
                value={usuario.nombre}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="apellido"
                value={usuario.apellido}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control w-75 mx-auto inputform"
                id="fecha"
                value={usuario.fechaNac}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="direccion"
                value={usuario.direccion}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="correo"
                value={usuario.correo}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control w-75 mx-auto inputform"
                id="password"
                value={usuario.contraseña}
                disabled
              />
            </div>

            <button type="button" className="btn btn-primary w-auto">
              Cerrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
