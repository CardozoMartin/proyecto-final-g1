import axios from 'axios';
import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;

const useCustomProductos = () => {
    const [productos, setProductos] = useState({ productos: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Para mostrar todos los productos
    const obtenerProductos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/productos/obtenerProductos`);
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            setError(error.message);
            setProductos({ productos: [] });
        } finally {
            setLoading(false);
        }
    };

    // Para buscar un producto por nombre
    const buscarProducto = async (nombreProducto) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/productos/obtenerProductos/nombreProducto/${nombreProducto}`);
            if (response.data) {
                setProductos({ productos: response.data });
            } else {
                setProductos({ productos: [] });
            }
        } catch (error) {
            console.error("Error al buscar el producto:", error);
            setError(error.message);
            setProductos({ productos: [] });
        } finally {
            setLoading(false);
        }
    }

    // Para agregar un producto
    const agregarProducto = async (nuevoProducto) => {
        try {
            const response = await axios.post(`${API_URL}/api/productos/crearProducto`, nuevoProducto);

            if (response.data) {
                console.log("Producto agregado:", response.data);
                // REMOVIDO: La actualización manual del estado
                // Ya no actualizamos manualmente aquí, solo llamamos obtenerProductos
                // desde el componente después de esta función
                return { success: true, data: response.data };
            } else {
                return { success: false, error: "No se recibió respuesta del servidor" };
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };

    // Para editar un producto
    const editarProducto = async (id, productoActualizado) => {
        try {
            const response = await axios.put(`${API_URL}/api/productos/actualizarProducto/${id}`, productoActualizado);
            if (response.data) {
                console.log("Producto editado:", response.data);
                // REMOVIDO: La actualización manual del estado
                // El problema era que estabas comparando prod.id === id
                // pero tu producto usa idProductos, no id
                return { success: true, data: response.data };
            } else {
                return { success: false, error: "No se recibió respuesta del servidor" };
            }
        } catch (error) {
            console.error("Error al editar producto:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };

    // Para eliminar un producto
    const eliminarProducto = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/productos/cambiarEstado/${id}`);
            if (response.data) {
                console.log("Producto eliminado:", response.data);
                // REMOVIDO: La actualización manual del estado
                // Mismo problema: comparabas prod.id pero debería ser idProductos
                return { success: true, data: response.data };
            } else {
                return { success: false, error: "No se recibió respuesta del servidor" };
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return {
        productos,
        loading,
        error,
        obtenerProductos,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        buscarProducto
    }
}

export default useCustomProductos