import axios from 'axios';
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const useCustomCategorias = () => {
  const [categorias, setCategorias] = useState({ categorias: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Para mostrar todas las categorías
  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/categorias/obtenerCategorias`);
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setError(error.message);
      setCategorias({ categorias: [] });
    } finally {
      setLoading(false);
    }
  };

  // Para agregar una categoría
  const agregarCategoria = async (nuevaCategoria) => {
    try {
      const response = await axios.post(`${API_URL}/api/categorias/crearCategoria`, {
        nombreCategoriaProductos: nuevaCategoria.nombreCategoriaProductos
      });
      if (response.data.categoria) {
        setCategorias(prev => ({
          ...prev,
          categorias: [...(prev.categorias || []), response.data.categoria]
        }));
        console.log("Categoría agregada:", response.data.categoria);
        return { success: true, data: response.data.categoria };
      } else {
        return { success: false, error: "No se recibió respuesta del servidor" };
      }
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Para editar una categoría
  const editarCategoria = async (id, categoriaActualizada) => {
    try {
      const response = await axios.put(`${API_URL}/api/categorias/actualizarCategoria/${id}`, {
        nombreCategoriaProductos: categoriaActualizada.nombreCategoriaProductos
      });
      if (response.data.categoria) {
        setCategorias(prev => ({
          ...prev,
          categorias: prev.categorias.map(cat => cat.idCat_productos === id ? response.data.categoria : cat)
        }));
        return { success: true, data: response.data.categoria };
      } else {
        return { success: false, error: "No se recibió respuesta del servidor" };
      }
    } catch (error) {
      console.error("Error al editar categoría:", error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Para eliminar una categoría
  const eliminarCategoria = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/categorias/eliminarCategoria/${id}`);
      if (response.data) {
        setCategorias(prev => ({
          ...prev,
          categorias: prev.categorias.filter(cat => cat.idCat_productos !== id)
        }));
        console.log("Categoría eliminada:", response.data);
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "No se recibió respuesta del servidor" };
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
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
    eliminarCategoria
  };
};

export default useCustomCategorias;