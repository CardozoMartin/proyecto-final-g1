import axios from 'axios';
import React, { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

const useCustomCliente = () => {
    // Variable de estado para guardar los clientes
    const [cliente, setCliente] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Método GET para obtener los clientes
    const obtenerClientes = async () => {
        try {
            setLoading(true);
            setError(null);
            // Hacemos la petición al servidor
            const respuesta = await axios.get(`${API_URL}/api/clientes/ObtenerTodosLosClientes`);
            
            // CORREGIDO: Aseguramos que siempre devolvamos un array
            const clientesData = respuesta.data.Clientes || [];
            setCliente(clientesData);
            console.log("Clientes obtenidos:", clientesData);
            setLoading(false);
            
            // IMPORTANTE: Devolver los datos para usar en el componente
            return clientesData;
            
        } catch (error) {
            console.log("Error al obtener clientes:", error);
            setError(error.message);
            setLoading(false);
            return []; // Devolver array vacío en caso de error
        }
    }

    const crearCliente = async (nuevoCliente) => {
        try {
            setLoading(true);
            
            const respuesta = await axios.post(`${API_URL}/api/clientes/CrearCliente`, nuevoCliente);
            
            if (respuesta.data) {
                console.log("Respuesta del servidor:", respuesta.data);
                
                // CORREGIDO: Actualizar correctamente el estado
                // Si cliente es un array, agregamos el nuevo cliente
                setCliente(prev => {
                    if (Array.isArray(prev)) {
                        return [...prev, respuesta.data];
                    } else {
                        return [respuesta.data];
                    }
                });
                
                setLoading(false);
                return { success: true, data: respuesta.data };
            } else {
                setLoading(false);
                return { success: false, error: "No se recibió respuesta del servidor" };
            }
        } catch (error) {
            console.error("Error al crear cliente:", error);
            setLoading(false);
            
            // IMPORTANTE: Manejar errores del servidor correctamente
            const errorMessage = error.response?.data?.message || error.message;
            
            // Si el error es por duplicado, lanzar el error para que lo capture el componente
            if (error.response?.status === 400 || error.response?.status === 409) {
                throw new Error(errorMessage);
            }
            
            return { success: false, error: errorMessage };
        }
    }

    const nuevoEstado = async (usuario) => {
        setLoading(true);
        setError(null);

        try {
            const nuevoEstado = usuario.estadoCliente === "Activo" ? "Inactivo" : "Activo";
            const respuesta = await axios.put(
                `${API_URL}/api/clientes/estadoCliente/${usuario.idClientes}`,
                { estadoCliente: nuevoEstado }
            );
            await obtenerClientes();
            setLoading(false);
        } catch (error) {
            console.error("Error al cambiar estado:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    return { 
        cliente, 
        loading, 
        error, 
        crearCliente, 
        obtenerClientes, 
        nuevoEstado 
    }
}

export default useCustomCliente;