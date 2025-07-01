import axios from 'axios';
import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
const useCustomCliente = () => {
   //vamos crear la variable de estado donde vamos a guardar los clientes que traigamos
   const [ cliente , setCliente] = useState([])
   const [ loading, setLoading ] = useState(true);
   const [ error, setError ] = useState(null);

//creamos el metodo get para obtener los clientes

const obtenerClientes = async ()=>{
    try{
        setLoading(true);
        setError(null);
        //hacemos la peticion al servidor
        const respuesta = await axios.get(`${API_URL}/api/clientes/ObtenerTodosLosClientes`)
        setCliente(respuesta.data.Clientes);
        console.log(respuesta.data);
        setLoading(false);
        
    }catch(error){

        console.log(error);
 }

}
const crearCliente = async (nuevoCliente)=>{
    try {
        const respuesta = await axios.post(`${API_URL}/api/clientes/CrearCliente`, nuevoCliente);
        if (respuesta.data) {
            // Actualizamos la lista de clientes agregando el nuevo al array dentro del objeto
            setCliente(prev => ({
                    ...prev,
                    cliente: [...(prev.cliente || []), respuesta.data]}));
           
            console.log("Cliente agregado:", respuesta.data);
            return { success: true, data: respuesta.data };
        } else {
            return { success: false, error: "No se recibió respuesta del servidor" };
        }
    } catch (error) {
        console.error("Error al agregar cliente:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
}

const nuevoEstado = async (usuario) => {
    setLoading(true);
    setError(null);
     try {
    const nuevoEstado = usuario.estadoCliente === "Activo" ? "Inactivo" : "Activo";
    const respuesta= await axios.put(
      `http://localhost:3000/api/clientes/estadoCliente/${usuario.idClientes}`,
      { estadoCliente: nuevoEstado }
    );
    await obtenerClientes()
    setLoading(false);
    
  }
   catch (error) {
    console.error("error", error);
  }
  };

useEffect(() => {
    obtenerClientes();
}, []);
    
  return {cliente,loading, error,crearCliente,obtenerClientes, nuevoEstado}
}

export default useCustomCliente