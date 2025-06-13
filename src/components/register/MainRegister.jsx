import React, { useState } from "react";
import '../../css/Register/MainRegister.css'
const initialState = {
  nombre: "",
  apellido: "",
  fechaNac: "",
  correo: "",
  contraseña: ""
};

const MainRegister = () => {
  const [datos, setDatos] = useState(initialState);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value
    });
  };
  const { nombre, apellido, fechaNac, correo, contraseña } = datos;
  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datos);
    setDatos(initialState);
  };

  return (
    <div className="container mt-5">
      <br />
      <h2 className="text-center">REGISTRO</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label label-80">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                name="apellido"
                value={apellido}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                name="fechaNac"
                value={fechaNac}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="name@example.com"
                name="correo"
                value={correo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="abc123*"
                name="contraseña"
                value={contraseña}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainRegister;
