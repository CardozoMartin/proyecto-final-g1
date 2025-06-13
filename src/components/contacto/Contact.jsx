import React, { useState } from "react";
import "../../css/Contact.css";

const Contact = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  //hola

  const [errores, setErrores] = useState({});

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

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      nuevosErrores.email = "El correo no tiene un formato válido.";
    }

    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    console.log("Datos enviados:", datos);

    setErrores(nuevosErrores); //limpiar errores
    setDatos({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="card p-4 contact-card">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4 text-white">Dejanos tu mensaje</h3>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label label-80 text-white"> Ingresa tu nombre</label>
            <input
              type="text"
              className="form-control mx-auto"
              id="nombre"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
            />
            {errores.nombre && <div className="text-danger mt-1" role="alert">{errores.nombre} </div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Correo electrónico
            </label>
            <input
              type="text"
              className="form-control  mx-auto"
              id="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />
            {errores.email && (
              <div className="text-danger mt-1" role="alert">
                {errores.email}
              </div>
            )}
            <div id="emailHelp" className="form-text text-gray-700">
              Nunca compartiremos tu correo con nadie más.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label text-white">
              Mensaje
            </label>
            <textarea
              className="form-control  mx-auto"
              id="mensaje"
              name="mensaje"
              value={datos.mensaje}
              onChange={handleChange}
              rows="4"
              placeholder="Escribe tu mensaje aquí"
            />
            {errores.mensaje && (
              <div className="text-danger mt-1" role="alert">
                {errores.mensaje}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-item w-100 mt-3">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
