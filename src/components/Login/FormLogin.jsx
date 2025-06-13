import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/FormLogin.css";

const FormLogin = () => {
  const [datos, setDatos] = useState({ email: "", password: "" });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });

    if (e.target.name === "email" && e.target.value !== "") {
      setErrorEmail("");
    }

    if (e.target.name === "password" && e.target.value !== "") {
      setErrorPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (datos.email.trim() === "") {
      setErrorEmail("Por favor, ingresá un email.");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(datos.email)) {
        setErrorEmail("El formato del email no es válido.");
        valid = false;
      } else {
        setErrorEmail("");
      }
    }

    if (datos.password.trim() === "") {
      setErrorPassword("Por favor, ingresá una contraseña.");
      valid = false;
    } else {
      setErrorPassword("");
    }

    if (!valid) return;

    console.log("Formulario enviado:", datos);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 login-card">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-white text-center">Iniciar sesión</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="Ingresá tu email"
            />
            {errorEmail && <div className="text-danger mt-1">{errorEmail}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={datos.password}
              onChange={handleChange}
              placeholder="Ingresá tu contraseña"
            />
            {errorPassword && <div className="text-danger mt-1">{errorPassword}</div>}
          </div>

          <button type="submit" className="btn btn-item w-100 mt-3">Ingresar</button>

          <p className="mt-4 text-white text-center">
            ¿No tenés cuenta?
            <Link to="/register" className="btn btn-item ms-2">
              Registrate acá
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
