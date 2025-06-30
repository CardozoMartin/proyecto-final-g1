import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Css/FormLogin.css";
import useCustomLogin from "../../CustomHooks/CustomLogin/useCustomLogin";
import { toast } from "sonner";


const FormLogin = () => {
  const navigate = useNavigate()
  const { login } = useCustomLogin();
  const [emailCliente, setEmailCliente] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    setErrorLogin("");

    let valid = true;

    // Validación de email
    if (!emailCliente.trim()) {
      setErrorEmail("Por favor, ingresá un email.");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailCliente)) {
        setErrorEmail("El formato del email no es válido.");
        valid = false;
      }
    }

    // Validación de contraseña
    if (!contraseña.trim()) {
      setErrorPassword("Por favor, ingresá una contraseña.");
      valid = false;
    }

    if (!valid) return;

    // Intentar login
    try {
      const result = await login(emailCliente, contraseña);
      if(result.cliente.rol === 'ADMIN'){
        navigate('/Admin');
      }else{
        navigate('/'); 
      }

      if (result && result.error) {
        // Si el custom hook retorna un error
        setErrorLogin(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      setErrorLogin("Email o contraseña incorrectos.");
      toast.error("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 login-card">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-white text-center">Iniciar sesión</h2>

          <div className="mb-3">
            <label htmlFor="emailCliente" className="form-label text-white">Email</label>
            <input
              type="email"
              className={`form-control ${errorEmail ? "is-invalid" : ""}`}
              id="emailCliente"
              name="emailCliente"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              placeholder="Ingresá tu email"
            />
            {errorEmail && <div className="invalid-feedback">{errorEmail}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label text-white">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errorPassword ? "is-invalid" : ""}`}
              id="contraseña"
              name="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ingresá tu contraseña"
            />
            {errorPassword && <div className="invalid-feedback">{errorPassword}</div>}
          </div>

          {errorLogin && (
            <div className="alert alert-danger py-2">{errorLogin}</div>
          )}

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
