import React, { useState } from "react";
import useUserStore from "../../store/clientStore"; 
import "../../css/Register/MainRegister.css";

const initialState = {
  nombre: "",
  apellido: "",
  fechaNac: "",
  direccion: "",
  correo: "",
  contraseña: "",
};

const FormRegister = () => {
  const [datos, setDatos] = useState(initialState);
  const [errores, setErrores] = useState({});
  const { setUsuario } = useUserStore(); 

  const { nombre, apellido, fechaNac, direccion, correo, contraseña } = datos;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};

    for (const key in datos) {
      if (datos[key].trim() === "") {
        nuevosErrores[key] = "Este campo es obligatorio.";
      }
    }

    const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre && !soloLetrasRegex.test(nombre)) {
      nuevosErrores.nombre = "El nombre solo debe contener letras";
    }

    if (apellido && !soloLetrasRegex.test(apellido)) {
      nuevosErrores.apellido = "El apellido solo debe contener letras";
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !correoRegex.test(correo)) {
      nuevosErrores.correo = "El correo no tiene un formato válido.";
    }

    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    if (contraseña && !passRegex.test(contraseña)) {
      nuevosErrores.contraseña =
        "Su contraseña debe contener al menos una mayúscula, una minúscula y un carácter especial.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setUsuario(datos);
    console.log("Datos guardados en el store global:", datos);


    setDatos(initialState);
    setErrores({});
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="formulario text-center" onSubmit={handleSubmit}>
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
                value={nombre}
                onChange={handleChange}
              />
              {errores.nombre && (
                <div className="text-danger">{errores.nombre}</div>
              )}
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
                name="apellido"
                value={apellido}
                onChange={handleChange}
              />
              {errores.apellido && (
                <div className="text-danger">{errores.apellido}</div>
              )}
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
                value={fechaNac}
                onChange={handleChange}
              />
              {errores.fechaNac && (
                <div className="text-danger">{errores.fechaNac}</div>
              )}
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
                value={direccion}
                onChange={handleChange}
              />
              {errores.direccion && (
                <div className="text-danger">{errores.direccion}</div>
              )}
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
                value={correo}
                onChange={handleChange}
              />
              {errores.correo && (
                <div className="text-danger">{errores.correo}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control w-75 mx-auto inputform"
                id="password"
                placeholder="abc123*"
                name="contraseña"
                value={contraseña}
                onChange={handleChange}
              />
              {errores.contraseña && (
                <div className="text-danger">{errores.contraseña}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-auto">
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;