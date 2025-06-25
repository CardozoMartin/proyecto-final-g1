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
        const respuesta = await axios.get(`http://localhost:4000/api/clientes/ObtenerTodosLosClientes`)
        setCliente(respuesta.data);
        console.log(respuesta.data);
        setLoading(false);
        
    }catch{

    }
}

useEffect(() => {
    obtenerClientes();
}, []);
    
  return {cliente,loading, error}
}

export default useCustomCliente