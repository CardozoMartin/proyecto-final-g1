import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/FormLogin.css";
import useCustomLogin from "../../CustomHooks/CustomLogin/useCustomLogin";

const FormLogin = () => {
  const { login } = useCustomLogin();
  const [emailCliente, setEmailCliente] = useState("");
  const [contraseña, setContraseña] = useState("");

  const obtenerDatosDelForm= (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setEmailCliente(email);
    setContraseña(password);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    await login(emailCliente, contraseña)
  }
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 login-card">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-white text-center">Iniciar sesión</h2>

          <div className="mb-3">
            <label htmlFor="emailCliente" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control"
              id="emailCliente"
              name="emailCliente"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              placeholder="Ingresá tu email"
            />
           
          </div>

          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label text-white">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="contraseña"
              name="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ingresá tu contraseña"
            />
            
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
