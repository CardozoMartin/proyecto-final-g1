import React, { useEffect, useState } from "react";
import "../../css/Register/MainRegister.css";
import useCustomCliente from "../../CustomHooks/CustomCliente/useCustomCliente";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();
  const { crearCliente, obtenerClientes } = useCustomCliente();
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    DNI: "",
    telefonoCliente: "",
    emailCliente: "",
    domicilioCliente: "",
    contraseña: "",
  });

  // Estados de error para cada campo
  const [error, setError] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  useEffect(() => {
    const traerClientes = async () => {
      const data = await obtenerClientes();
      setClientes(data || []);
    };
    traerClientes();
  }, []);

  const ObtenerDatosDelCliente = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
    setErrorGeneral("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newError = {};

    // Validar campos vacíos
    Object.entries(nuevoCliente).forEach(([key, value]) => {
      if (!value.trim()) {
        newError[key] = "Este campo es obligatorio";
        valid = false;
      }
    });

    // Validar DNI y teléfono
    if (nuevoCliente.DNI && !/^\d+$/.test(nuevoCliente.DNI.trim())) {
      newError.DNI = "El DNI debe contener solo números y sin espacios.";
      valid = false;
    }
    if (nuevoCliente.telefonoCliente && !/^\d+$/.test(nuevoCliente.telefonoCliente.trim())) {
      newError.telefonoCliente = "El teléfono debe contener solo números y sin espacios.";
      valid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (nuevoCliente.emailCliente && !emailRegex.test(nuevoCliente.emailCliente.trim())) {
      newError.emailCliente = "Por favor, ingresa un correo electrónico válido.";
      valid = false;
    }

    // Validar unicidad
    if (clientes.some((cliente) => cliente.DNI === nuevoCliente.DNI.trim())) {
      newError.DNI = "El DNI ingresado ya está registrado.";
      valid = false;
    }
    if (clientes.some((cliente) => cliente.telefonoCliente === nuevoCliente.telefonoCliente.trim())) {
      newError.telefonoCliente = "El teléfono ingresado ya está registrado.";
      valid = false;
    }
    if (clientes.some((cliente) => cliente.emailCliente === nuevoCliente.emailCliente.trim())) {
      newError.emailCliente = "El correo electrónico ingresado ya está registrado.";
      valid = false;
    }

    setError(newError);

    if (!valid) {
      setErrorGeneral("Por favor, corrige los errores antes de continuar.");
      toast.error("Por favor, corrige los errores antes de continuar.");
      return;
    }

    try {
      await crearCliente(nuevoCliente);
      toast.success("Cliente registrado correctamente");
      setNuevoCliente({
        nombreCliente: "",
        apellidoCliente: "",
        DNI: "",
        telefonoCliente: "",
        emailCliente: "",
        domicilioCliente: "",
        contraseña: "",
      });
      setClientes(await obtenerClientes() || []);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrorGeneral("Error al registrar cliente");
      toast.error("Error al registrar cliente");
    }
  };

  return (
    <div className="container mt-5">
      {/* Agrega el Toaster aquí para asegurar que los toasts se muestren */}
      <Toaster position="top-right" richColors />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="formulario text-center" onSubmit={handleSubmit}>
            {errorGeneral && (
              <div className="alert alert-danger py-2">{errorGeneral}</div>
            )}
            <div className="mb-3 formint">
              <label htmlFor="nombreCliente" className="form-label label-80">
                Nombre
              </label>
              <input
                type="text"
                className={`form-control w-75 mx-auto inputform ${error.nombreCliente ? "is-invalid" : ""}`}
                id="nombreCliente"
                placeholder="Nombre"
                name="nombreCliente"
                value={nuevoCliente.nombreCliente}
                onChange={ObtenerDatosDelCliente}
              />
              {error.nombreCliente && <div className="invalid-feedback">{error.nombreCliente}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="apellidoCliente" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className={`form-control w-75 mx-auto inputform ${error.apellidoCliente ? "is-invalid" : ""}`}
                id="apellidoCliente"
                placeholder="Apellido"
                name="apellidoCliente"
                value={nuevoCliente.apellidoCliente}
                onChange={ObtenerDatosDelCliente}
              />
              {error.apellidoCliente && <div className="invalid-feedback">{error.apellidoCliente}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="DNI" className="form-label">
                DNI
              </label>
              <input
                type="text"
                className={`form-control w-75 mx-auto inputform ${error.DNI ? "is-invalid" : ""}`}
                id="DNI"
                name="DNI"
                value={nuevoCliente.DNI}
                onChange={ObtenerDatosDelCliente}
              />
              {error.DNI && <div className="invalid-feedback">{error.DNI}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="telefonoCliente" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className={`form-control w-75 mx-auto inputform ${error.telefonoCliente ? "is-invalid" : ""}`}
                id="telefonoCliente"
                placeholder="1234567890"
                name="telefonoCliente"
                value={nuevoCliente.telefonoCliente}
                onChange={ObtenerDatosDelCliente}
              />
              {error.telefonoCliente && <div className="invalid-feedback">{error.telefonoCliente}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="emailCliente" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className={`form-control w-75 mx-auto inputform ${error.emailCliente ? "is-invalid" : ""}`}
                id="emailCliente"
                placeholder="name@example.com"
                name="emailCliente"
                value={nuevoCliente.emailCliente}
                onChange={ObtenerDatosDelCliente}
              />
              {error.emailCliente && <div className="invalid-feedback">{error.emailCliente}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="domicilioCliente" className="form-label">
                Domicilio
              </label>
              <input
                type="text"
                className={`form-control w-75 mx-auto inputform ${error.domicilioCliente ? "is-invalid" : ""}`}
                id="domicilioCliente"
                placeholder="Calle 123, Ciudad"
                name="domicilioCliente"
                value={nuevoCliente.domicilioCliente}
                onChange={ObtenerDatosDelCliente}
              />
              {error.domicilioCliente && <div className="invalid-feedback">{error.domicilioCliente}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className={`form-control w-75 mx-auto inputform ${error.contraseña ? "is-invalid" : ""}`}
                id="contraseña"
                placeholder="abc123*"
                name="contraseña"
                value={nuevoCliente.contraseña}
                onChange={ObtenerDatosDelCliente}
              />
              {error.contraseña && <div className="invalid-feedback">{error.contraseña}</div>}
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