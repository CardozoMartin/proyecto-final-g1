import React, { useState } from "react";
import "../../css/Contact.css";
import useCustomMensajes from "../../CustomHooks/CustomMensajes/CustomMensajes";
import Swal from "sweetalert2";

const Contact = () => {
  const { enviarMensaje } = useCustomMensajes();

  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [errorEnvio, setErrorEnvio] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEnvio("");

    const resultado = await enviarMensaje({
      nombreMensaje: datos.nombre,
      correoMensaje: datos.email,
      telefonoMensaje: datos.telefono,
      mensajeTexto: datos.mensaje,
    });

    if (resultado.success) {
      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Tu mensaje ha sido enviado correctamente.",
        confirmButtonColor: "#3085d6",
      });

      setDatos({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
    } else {
      setErrorEnvio(resultado.error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 contact-card">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4 text-white">Dejanos tu mensaje</h3>

          {errorEnvio && <div className="alert alert-danger">{errorEnvio}</div>}

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label label-80 text-white">
              Ingresa tu nombre
            </label>
            <input
              type="text"
              className="form-control mx-auto"
              id="nombre"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Correo electrónico
            </label>
            <input
              type="text"
              className="form-control mx-auto"
              id="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />
            <div id="emailHelp" className="form-text text-gray-700">
              Nunca compartiremos tu correo con nadie más.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label text-white">
              Teléfono
            </label>
            <input
              type="text"
              className="form-control mx-auto"
              id="telefono"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              placeholder="Ingresa tu teléfono"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label text-white">
              Mensaje
            </label>
            <textarea
              className="form-control mx-auto"
              id="mensaje"
              name="mensaje"
              value={datos.mensaje}
              onChange={handleChange}
              rows="4"
              placeholder="Escribe tu mensaje aquí"
            />
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
