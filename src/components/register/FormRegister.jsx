import React, { useState } from "react";
import useUserStore from "../../store/clientStore"; 
import "../../css/Register/MainRegister.css";
import useCustomCliente from "../../CustomHooks/CustomCliente/useCustomCliente";
import { toast } from "sonner";

const FormRegister = () => {
  const {crearCliente,cliente,ObtenerClientes}= useCustomCliente();
  const [nuevoCliente, setNuevoCliente] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    DNI: "",
    telefonoCliente: "",
    emailCliente: "",
    domicilioCliente: "",
    contraseña: "",
  });
  const ObtenerDatosDelCliente = (e)=> {
    e.preventDefault();
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  })}

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="formulario text-center" onSubmit={handleSubmit}>
            <div className="mb-3 formint">
              <label htmlFor="nombreCliente" className="form-label label-80">
                Nombre
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="nombreCliente"
                placeholder="Nombre"
                name="nombreCliente"
                value={nuevoCliente.nombreCliente}
                onChange={ObtenerDatosDelCliente}
              />    
            </div>

            <div className="mb-3">
              <label htmlFor="apellidoCliente" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="apellidoCliente"
                placeholder="Apellido"
                name="apellidoCliente"
                value={nuevoCliente.apellidoCliente}
                onChange={ObtenerDatosDelCliente}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="DNI" className="form-label">
                DNI
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="DNI"
                name="DNI"
                value={nuevoCliente.DNI}
                onChange={ObtenerDatosDelCliente}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefonoCliente" className="form-label">
                Telefono
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="telefonoCliente"
                placeholder="nombrecalle 123"
                name="telefonoCliente"
                value={nuevoCliente.telefonoCliente}
                onChange={ObtenerDatosDelCliente}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailCliente" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control w-75 mx-auto inputform"
                id="emailCliente"
                placeholder="name@example.com"
                name="emailCliente"
                value={nuevoCliente.emailCliente}
                onChange={ObtenerDatosDelCliente}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="domicilioCliente" className="form-label">
                Domicilio
              </label>
              <input
                type="text"
                className="form-control w-75 mx-auto inputform"
                id="domicilioCliente"
                placeholder="name@example.com"
                name="domicilioCliente"
                value={nuevoCliente.domicilioCliente}
                onChange={ObtenerDatosDelCliente}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                contraseña
              </label>
              <input
                type="password"
                className="form-control w-75 mx-auto inputform"
                id="contraseña"
                placeholder="abc123*"
                name="contraseña"
                value={nuevoCliente.contraseña}
                onChange={ObtenerDatosDelCliente}
              />
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