import axios from 'axios';
import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
const useCustomProductos = () => {

    const [productos, setProductos] = useState({ productos: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //para mostrar todos los productos
    const obtenerProductos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/productos/obtenerProductos`);
            setProductos(response.data)

        } catch (error) {
            console.error("Error al obtener los productos:", error);
            setError(error.message);
            setProductos({ productos: [] });
        } finally {
            setLoading(false);
        }
    };
    // para buscar un producto por nombre
    const buscarProducto= async (nombreProducto) => {
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
    //para agregar un producto
    const agregarProducto = async (nuevoProducto) => {
        try {
            const response = await axios.post(`${API_URL}/api/productos/crearProducto`, nuevoProducto);

            if (response.data) {
                // Actualizamos la lista de productos agregando el nuevo al array dentro del objeto
                setProductos(prev => ({
                    ...prev,
                    productos: [...(prev.productos || []), response.data]
                }));
                console.log("Producto agregado:", response.data);
                return { success: true, data: response.data };
            } else {
                return { success: false, error: "No se recibió respuesta del servidor" };
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };
    //pra editar un producto
    const editarProducto = async (id, productoActualizado) => {
        try {
            const response = await axios.put(`${API_URL}/api/productos/actualizarProducto/${id}`, productoActualizado);
            if (response.data) {
                // Actualizamos el producto en el estado
                setProductos(prev => ({
                    ...prev,
                    productos: prev.productos.map(prod => prod.id === id ? response.data : prod)
                }));

                return { success: true, data: response.data };
            } else {
                return { success: false, error: "No se recibió respuesta del servidor" };
            }
        } catch (error) {
            console.error("Error al editar producto:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };
    //para eliminar un producto
    const eliminarProducto = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/productos/cambiarEstado/${id}`);
            if (response.data) {
                // Actualizamos la lista de productos eliminando el producto del array dentro del objeto
                setProductos(prev => ({
                    ...prev,
                    productos: prev.productos.filter(prod => prod.id !== id)
                }));
                console.log("Producto eliminado:", response.data);
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

