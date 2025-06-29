import React, { useEffect, useState } from "react";
import "../../css/Register/MainRegister.css";
import useCustomCliente from "../../CustomHooks/CustomCliente/useCustomCliente";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();
  const {crearCliente, obtenerClientes }= useCustomCliente();
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

  useEffect(() => {
    const traerClientes = async () => {
      const data = await obtenerClientes();
      setClientes(data || []);
    };
    traerClientes();
  },[]);

  const ObtenerDatosDelCliente = (e)=> {
    e.preventDefault();
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén completos
    if (
      !nuevoCliente.nombreCliente.trim()||
      !nuevoCliente.apellidoCliente.trim() ||
      !nuevoCliente.DNI.trim() ||
      !nuevoCliente.telefonoCliente.trim() ||
      !nuevoCliente.emailCliente.trim() ||
      !nuevoCliente.domicilioCliente.trim() ||
      !nuevoCliente.contraseña.trim()
    ) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    // Validar que DNI y teléfono sean solo números y sin espacios
    if (!/^\d+$/.test(nuevoCliente.DNI.trim())) {
      toast.error("El DNI debe contener solo números y sin espacios.");
      return;
    }
    if (!/^\d+$/.test(nuevoCliente.telefonoCliente.trim())) {
      toast.error("El teléfono debe contener solo números y sin espacios.");
      return;
    }
    // Validar que el email tenga un formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nuevoCliente.emailCliente.trim())) { 
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    // validar que los datos ingresados de email deni y telefono sean unicos
    const existeDNI = clientes.some((cliente) => cliente.DNI === nuevoCliente.DNI.trim());
    if (existeDNI) {
      toast.error("El DNI ingresado ya está registrado.");
      return;
    }
    const existeTelefono = clientes.some((cliente) => cliente.telefonoCliente === nuevoCliente.telefonoCliente.trim());
    if (existeTelefono) { 
      toast.error("El teléfono ingresado ya está registrado.");
      return;
    }
    const existeEmail = clientes.some((cliente) => cliente.emailCliente === nuevoCliente.emailCliente.trim());
    if (existeEmail) {
      toast.error("El correo electrónico ingresado ya está registrado.");
      return;
    }
    // Si todas las validaciones pasan, crear el cliente
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
  //actualizar la lista de clientes
  const data = await obtenerClientes()
  setClientes(data || []);  
  navigate("/login");
};

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