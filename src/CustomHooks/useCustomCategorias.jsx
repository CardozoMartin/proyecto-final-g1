import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const useCustomCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Para mostrar todas las categorías
  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/categorias/obtenerTodasLasCategorias`);
      console.log('Datos recibidos:', response.data);
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      setError(error.response?.data?.message || 'No se pudieron cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  // Para agregar una categoría
  const agregarCategoria = async (nuevaCategoria) => {
    try {
      const response = await axios.post(`${API_URL}/api/categorias/crearCategoria`, nuevaCategoria);
     
      if(response.data) {
        // Recargar todas las categorías para asegurar que la tabla se actualice
        await obtenerCategorias();
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Ocurrió un error" };
      }
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Para editar una categoría
  const editarCategoria = async (id, categoriaActualizada) => {
    try {
      const response = await axios.put(`${API_URL}/api/categorias/actualizarCategoria/${id}`, {
        nombreCategoriaProductos: categoriaActualizada.nombreCategoriaProductos,
        imagenCategoriaProductos: categoriaActualizada.imagenCategoriaProductos,
        estado: categoriaActualizada.estado
      });
      
      // Recargar todas las categorías para asegurar consistencia
      await obtenerCategorias();
      return { success: true, data: response.data.categoria };
    } catch (error) {
      console.error('Error al editar categoría:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Para actualizar el estado de múltiples categorías
  const actualizarEstadoCategoria = async (ids, estado) => {
    try {
      const updatePromises = ids.map((id) =>
        axios.patch(`${API_URL}/api/categorias/actualizarCategoria/${id}`, { estado })
      );
      const responses = await Promise.all(updatePromises);
      return { success: true, data: responses.map(res => res.data) };
    } catch (error) {
      console.error('Error al actualizar estados:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    obtenerCategorias,
    agregarCategoria,
    editarCategoria,
    actualizarEstadoCategoria
  };
};

export default useCustomCategorias;