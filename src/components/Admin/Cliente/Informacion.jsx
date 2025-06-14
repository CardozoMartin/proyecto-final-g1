import React from "react";

const Informacion = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="formulario text-center ">
              <div className="mb-3 formint">
                <label htmlFor="nombre" className="form-label label-80">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control w-75 mx-auto inputform"
                  id="nombre"
                  placeholder="Nombre"
                  name="nombre"

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
                  placeholder="Apellido"
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
                  name="fechaNac"
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
                  placeholder="nombrecalle 123"
                  name="direccion"
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
                  placeholder="name@example.com"
                  name="correo"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control w-75 mx-auto inputform"
                  id="text"
                  placeholder="abc123*"
                  name="contraseña"
                />
              </div>
              <button type="submit" className="btn btn-primary w-auto">
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Informacion;
